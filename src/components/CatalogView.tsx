'use client'
import React, { useEffect, useRef, useState } from 'react';
// Type-only import: erased at compile time, so this never gets bundled by webpack.
import type * as PdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// react-pageflip's type declarations mark every prop (and ref) as required even though
// the runtime component provides defaults for all of them — cast to bypass that.
const FlipBook: any = HTMLFlipBook;

const PDF_URL = '/plant/PlantSource_Catalog_2026.pdf';

// pdfjs-dist's bundled .mjs breaks when webpack wraps/evaluates it in Next.js dev mode
// (TypeError: Object.defineProperty called on non-object). It's served as a static asset
// instead and loaded with a genuine native dynamic import that webpack never touches.
let pdfjsLibPromise: Promise<typeof PdfjsLib> | null = null;
function loadPdfjsLib(): Promise<typeof PdfjsLib> {
  if (!pdfjsLibPromise) {
    // @ts-expect-error — runtime-only static asset path; types come from the type-only import above.
    pdfjsLibPromise = import(/* webpackIgnore: true */ '/pdfjs/pdf.mjs') as Promise<typeof PdfjsLib>;
  }
  return pdfjsLibPromise;
}

interface CatalogPageProps {
  image: string;
  number: number;
}

const CatalogPage = React.forwardRef<HTMLDivElement, CatalogPageProps>(({ image, number }, ref) => (
  <div ref={ref} className="bg-white overflow-hidden">
    <img
      src={image}
      alt={`Catalog page ${number}`}
      className="w-full h-full object-contain select-none pointer-events-none"
      draggable={false}
    />
  </div>
));
CatalogPage.displayName = 'CatalogPage';

export default function CatalogView() {
  const [pages, setPages] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState(0.75);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void } } | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdfjsLib = await loadPdfjsLib();
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

        const pdf = await pdfjsLib.getDocument(PDF_URL).promise;
        const total = pdf.numPages;
        const images: string[] = [];

        for (let i = 1; i <= total; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          if (i === 1) setAspectRatio(viewport.width / viewport.height);

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvas, viewport }).promise;

          images.push(canvas.toDataURL('image/jpeg', 0.85));
          if (!cancelled) setLoadingProgress(Math.round((i / total) * 100));
        }

        if (!cancelled) {
          setPages(images);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load the catalog. Please try again later.');
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const width = 520;
  const height = Math.round(width / aspectRatio);

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-10">

        <section className="text-center space-y-4">
          <h1 className="font-serif text-[#edc14d] text-xs font-bold tracking-widest uppercase">
            Plantsource Wholesale
          </h1>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1C1C1C] font-bold leading-tight">
            Product Catalog
          </h2>
          <div className="w-16 h-1 bg-[#edc14d] rounded-full mx-auto" />
        </section>

        {error && (
          <p className="text-center text-red-600 font-sans text-sm">{error}</p>
        )}

        {isLoading && !error && (
          <div className="flex flex-col items-center gap-4 py-24">
            <Loader2 className="animate-spin text-[#edc14d]" size={36} />
            <p className="font-sans text-sm text-[#556260]">Loading catalog… {loadingProgress}%</p>
          </div>
        )}

        {!isLoading && !error && pages.length > 0 && (
          <div className="flex flex-col items-center gap-6">
            <FlipBook
              width={width}
              height={height}
              size="stretch"
              minWidth={280}
              maxWidth={900}
              minHeight={360}
              maxHeight={1200}
              showCover
              mobileScrollSupport
              maxShadowOpacity={0.5}
              className="shadow-2xl"
              ref={bookRef}
              onFlip={(e: { data: number }) => setCurrentPage(e.data)}
            >
              {pages.map((src, idx) => (
                <CatalogPage key={idx} image={src} number={idx + 1} />
              ))}
            </FlipBook>

            <div className="flex items-center gap-6">
              <button
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
                className="w-11 h-11 rounded-full bg-[#013120] text-[#edc14d] flex items-center justify-center hover:bg-[#1A4233] transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-sans text-sm text-[#556260] tracking-wide">
                Page {currentPage + 1} / {pages.length}
              </span>
              <button
                onClick={() => bookRef.current?.pageFlip().flipNext()}
                className="w-11 h-11 rounded-full bg-[#013120] text-[#edc14d] flex items-center justify-center hover:bg-[#1A4233] transition-colors cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
