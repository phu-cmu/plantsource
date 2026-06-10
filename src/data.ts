import { Product, Article } from './types';

export const IMAGES = {
  heroMain: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWzmWsLh1wuNT7QjU7a9GfCFlPFd_A2sfKXGbTJsmH-JNAkcom7DLhJYHkBzWuU1h8ztnvLGNfQNLbCwUU3LnbHmPzOr8aCKhnkBbLbx2ewGIlFpX6wrx1GguI4JSdBhWSfTgBMBV3u2qxG2lttfjogNaVcOG3yQykpsTPETRXOLmODAZ23A9ps4M2jRH7tlUqVDmnwyRQaprrXcQ2IzPGfkOZgJemxPd1yivpOeXYfLB2zGNws0V1AHoCFhoZG-3Ajd8PYpN4ZY",
  heroAlt: "https://lh3.googleusercontent.com/aida-public/AB6AXuADantjhXv-PAiqK8_pn8BCWQKsaXRqZlUi3dA6fEJNxjP76PLs4yhXkeadP5gDC_s-1QF_l6Jyere5OlaSGXEfPyMgWtZPTa8X91spDBYsckF8_7ezggaKeA1jZcHbivCPXGdFsYG6bM_wAUSPw-g3gtcRkJEMCaFg6n7XybkdwCOscMaSeuz0oCtW-Umo-3GEvfdVlAkH6oQz-KG4836Vx8sk_HIt7MQ339hy4s80ooDsJV5vAt6azNjrUrZ5VaReJtbIEK-Umyo",
  earthFirst: "https://lh3.googleusercontent.com/aida-public/AB6AXu-ippHJGdKkXwtr4aFq12amKm8LAuJYvCZkazAl4Oq5nNbM63Khu4lH-3w2H18jj7fTvfpy_fyvadLCCuUswB_-lPz7j5LRr3w8ha6IPxA9Ii53UqD87L8lRN6z49hB3I6LDGgQWdVx-BriO6YTtABKYiiPvtF2STJBIC8NkXwk4Iw2Qh2TFoEk4xDrqTo7npzCoPCXrNJ5BHZ27pffO4jxL2NVUardl-GZE_xqLrWxiFGlU8LivquE1oiMSMd20o7vqGpZaiRmZE",
  sunriseFarm: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuXUZSfAjfwKZJvE5_Fne9dtqvNMz_CrD00E31ji-hz3AoIuQs9IAujGeIsAbbobA4v3kEFp9xj1QtaYmd-WBvo8DnFQfzxbZv0aIa7-1nAf8GuDOX88xGQRvxANSNTF5QEce3rg7XyZBDKxXzkjD7XZdiaOkYwoijgnCyMjqig-TFpm1r1TwCdRN5YIX0FcQjRLwBoHE5tlTsqxobDSIwP-hjWuU5GA4NZ3UkEnR4B0LLLgGSxyeXWMzydsUFv9W25So7DX1EVwE",
  handsSoil: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa6EhPpQd5FTBM5sviK0yUe_mGfVoaP0ReghOT3n487GJMx1RDC4eaVHifl6qsfu1caZzigUOB-ELfbODQzNjyCjE-YeKwEtJCg3KZmM2nriJ1VFFs2g5y0Cciaeivfr9Vq-2EjT_-IOU7vczUqUidpg88vQLbvKWZbpjSBNuLUdLcmQUqY2KiCjUwt78o0UuR2mqXlopSjp0cM8Sdyk2QCsGJpZjkvR7FjgiXaS5M9B78D0nvq0fHC1ZwW3yrIDXRd_Z25P4ZR_M",
  freshProduce: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz4SPE71-4zY4etknIV7NRQAVPvKyeg4GqvlWSH86n1jQMacpQQWPWqdzmJ8coP70U-P-8GjHlLs6eEDx7kR803flnQTFEAGo9_o54BVnpsts30pemvvIKMGrufZQYRg6Ba23BszDHUH7aObIpb2vSny-66TCe2mpORwPLEeH03_PZZ8FH0IK6CxkRJ89s-sKRVCTzgdx29SM_fdo0qB8thNnCxyi1Pbc8eoD-DDpEsxUiSKQpQxUnJUTGXre2JKTJ_viZWmGGse8",
  pantryJars: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTZITEFjk1aSbJOrd36YmAs41Nrxw4cq15Onj6WujG_rtVaRgLZp6FcVo5Sn17l0u8UZ60MZrlO2c8qv4gsrp5fV_PAuMrasu79IEgl9sacMlzZtkVSnCWWwffzvgZQd8UGk4gw4AUxL2dLq8X-bmfOFF516kGXeWcD04io6_nyNO0DxIZxpIlxwXr8dI1P-Y2ekoLFAsA0Ivr2khVyOH3em9nDdpnn5yzVgu7CxrKtP4E1u-dvlmElSicxbHQs5jcF9UCSYROT_0",
  readyMeals: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU4_iJQFDAGlmu9mFdmDiMBraJW9hKGpSeFAcueD9TPeIvOqyr7pVUEmw8HlIrRWWTlgINpBrZWvYESW8eX5HXRsfhHeA7EAzGDT9ANUnIjL2yv4uFSzzkFCLVZFmXf5HaunEQcmH-vGsAu_5VcXq4APTmgJ3ObtufusV5vtdBnCbOyNDvBWE0rJkDTf3OJJktqaG3TbKX3-QwWCxBA-vvHWsh9MHC41J32Clhp8QDMztPx-H1zXaEutOCOrp0ZzcUFc2B5zgmy2U",
  seasonalStewing: "https://lh3.googleusercontent.com/aida-public/AB6AXuAebJhxJ-JRYnmPJ-vxTA16zwYKBpM5Mus83SAvCqI4kkUNov36tfsVzkvYiriRaHbXQ3BvD5Jt4vc4eNwZeOy85VtQh93iylC06__ncvJhKnpbgZ1kRKfk4fteJWLKxA2uFDWYdfvaEeOmqvINkUISpC1nyq5CDYckjKbtEfLIUeL2snrHGIuy3JfildiX7QnTHlKGleaF0LGsN5xc2VeDXGt6m8o6R5XlBstaBzvhAbfubeRjJqWlWZ08u64zv0OnKOnq0A7Gg7w",
  plantProtein: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqFkWeCqrNpPy1ddAugzDGtHoO0JUvDT7bPsD5rS9rHFkeNgFPVyvZaur-w0F-7LLVuJHj3N-fvi-GT1-Q2Qq3IbRi91fZ3Z95QTfwwTdwC_nPLOuHi222VwfYKCEWruRxeB_A-CE8-pxedQ95huSNIBpgDBGuQRZBEt9v9x8i74XVEW-9F1ShUzhFllOky8RvgApL5mrGqM-O3aRbRFNDO1fCKOuAeh-cY9s4HZiFUAUB0zfuLZlximz_QYyGtgZf32OZ6gheZow",
};

export const PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Crisp Jade Winter Kale",
    price: 6.5,
    category: "produce",
    categoryLabel: "Fresh Produce",
    image: IMAGES.freshProduce,
    description: "Premium heirloom kale leaves, dew-kissed and hand-harvested at sunrise for supreme crispness and maximum mineral availability.",
    details: "Our signature organic leafy greens. Plump, structural leaves with intense emerald pigmentation indicating high antioxidant and chlorophyll density. Ideal for salads, slow-baked chips, or raw blending.",
    benefits: ["Rich in Vitamin K & A", "Grown in biologically active soil", "Zero chemical pesticides"],
    unit: "300g Bunch",
    rating: 4.9
  },
  {
    id: "prod_2",
    name: "Artisanal Sprouted Ancient Grains Basket",
    price: 18.0,
    category: "pantry",
    categoryLabel: "Pantry Staples",
    image: IMAGES.pantryJars,
    description: "Curated wild selection of dormant grains, sprouted for enhanced bioavailability, optimal nutrient assimilation, and soft, earthy flavor.",
    details: "A premium assortment including ancient wheat species, heritage spelt, wild red rice, and organic seed varieties carefully dried to preserve active grain enzymes under 38°C.",
    benefits: ["Sprouted for high digestion", "Low glycemic response", "Stone-milled heritage variety"],
    unit: "1.2kg Selection Jar",
    rating: 4.8
  },
  {
    id: "prod_3",
    name: "Gourmet Midnight Truffle Mushroom Pasta",
    price: 24.5,
    category: "meals",
    categoryLabel: "Ready Meals",
    image: IMAGES.readyMeals,
    description: "A decadent, ready-to-heat masterpiece featuring fresh-extruded organic semolina pasta tossed in white truffle extract and wild forest mushrooms.",
    details: "Handmade by our Michelin-starred in-house culinary artisans. Includes rich, single-estate olive oil emulsion, sustainably foraged chanterelles, porcini, and fresh shaved summer truffles.",
    benefits: ["100% Chef Prepared", "Ready in 8 minutes", "Naturally creamy recipe"],
    unit: "Single Serving Bowl",
    rating: 5.0
  },
  {
    id: "prod_4",
    name: "Organic Heirloom Rainbow Root Carrots",
    price: 8.0,
    category: "produce",
    categoryLabel: "Fresh Produce",
    image: IMAGES.seasonalStewing,
    description: "Freshly pulled heritage carrots spanning deep violet, vivid orange, and pale gold. Loaded with organic beta-carotene and vital root soil minerals.",
    details: "Sweet, crunchy roots harvested along with their deep green tops which can be made into organic pestos or stocks. Unpolished and un-waxed to protect the native soil biome benefits.",
    benefits: ["Un-waxed raw root skin", "Vivid natural anthocyanins", "Sweet earthy mineral profile"],
    unit: "500g Bunch",
    rating: 4.9
  },
  {
    id: "prod_5",
    name: "Bioavailable Sprouted Soybean & Edamame Blend",
    price: 9.5,
    category: "pantry",
    categoryLabel: "Pantry Staples",
    image: IMAGES.plantProtein,
    description: "High-protein edamame pods and young soybeans infused with micro-sprouts for supreme plant-based cellular recovery and amino acid density.",
    details: "An organic powerhouse designed for active lifestyle nourishment. Lightly steamed and quick-frozen or preserved dry to maintain live enzyme profiles and vibrant mineral content.",
    benefits: ["Complete protein chain", "Grown in trace-mineral soils", "Excellent fiber source"],
    unit: "450g Pouch",
    rating: 4.7
  },
  {
    id: "prod_6",
    name: "Wild Fermented Kombucha Superfood Brew",
    price: 14.0,
    category: "pantry",
    categoryLabel: "Pantry Staples",
    image: IMAGES.earthFirst,
    description: "Artisanal small-batch kombucha fermented with wild cultures and infused with adaptogenic herbs for gut restoration and cellular vitality.",
    details: "Each batch fermented over 21 days in ceramic crocks using wild SCOBY cultures. Contains live probiotic strains, organic acids, and polyphenol-rich botanical infusions.",
    benefits: ["Billions of live probiotics", "Adaptogenic herb blend", "Raw & unpasteurized"],
    unit: "750ml Bottle",
    rating: 4.8
  },
  {
    id: "prod_7",
    name: "Organic Miso & Tahini Buddha Bowl",
    price: 19.5,
    category: "meals",
    categoryLabel: "Ready Meals",
    image: IMAGES.heroAlt,
    description: "A nourishing chef-crafted bowl with ancient grain base, roasted seasonal vegetables, creamy tahini drizzle, and umami-rich white miso glaze.",
    details: "Prepared fresh daily using certified organic grains and vegetables sourced from partner farms. No preservatives, no stabilisers — just pure, whole-food culinary artistry.",
    benefits: ["High fibre ancient grains", "Live miso cultures", "Chef-prepared daily"],
    unit: "Single Serving Bowl",
    rating: 4.9
  },
  {
    id: "prod_8",
    name: "Heirloom Cherry Tomato Vine Cluster",
    price: 7.5,
    category: "produce",
    categoryLabel: "Fresh Produce",
    image: IMAGES.sunriseFarm,
    description: "Sun-ripened heirloom cherry tomatoes picked on the vine at peak sweetness, bursting with lycopene and natural sugars from mineral-rich volcanic soil.",
    details: "Grown in open polytunnels without artificial heating. Each cluster vine-ripened for maximum brix levels and deep umami complexity. Perfect raw or slow-roasted.",
    benefits: ["High lycopene content", "Vine-ripened for peak brix", "Zero wax coating"],
    unit: "400g Vine Cluster",
    rating: 4.6
  },
  {
    id: "prod_9",
    name: "Raw Activated Cashew & Herb Blend",
    price: 16.5,
    category: "pantry",
    categoryLabel: "Pantry Staples",
    image: IMAGES.handsSoil,
    description: "Whole cashews soaked, dehydrated at low temperature, and tossed in cold-pressed herb oils to activate enzymes while preserving delicate natural fats.",
    details: "Activation process removes enzyme inhibitors and phytic acid, dramatically improving mineral absorption. Finished with a blend of rosemary, thyme, and Himalayan mineral salt.",
    benefits: ["Enzyme-activated absorption", "Cold-dehydrated below 42°C", "Rich in healthy fats"],
    unit: "300g Jar",
    rating: 4.7
  },
  {
    id: "prod_10",
    name: "Seasonal Warming Spiced Lentil Potage",
    price: 21.0,
    category: "meals",
    categoryLabel: "Ready Meals",
    image: IMAGES.seasonalStewing,
    description: "A deeply aromatic slow-cooked lentil potage made with heritage red lentils, turmeric root, cumin, and winter vegetable stock. Ready in minutes.",
    details: "Each pot slow-simmered for six hours using traditional French braising methods. Uses only heirloom lentil varieties and whole hand-ground spices from certified organic farms.",
    benefits: ["Slow-cooked 6 hours", "Heirloom lentil varieties", "High iron & folate"],
    unit: "2-Serving Pot",
    rating: 4.8
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art_1",
    title: "The Future of Soil: Why Regenerative Agriculture is the New Organic",
    excerpt: "Discover how restoring the earth's natural rhythms creates a more potent, nutrient-dense harvest for your kitchen while balancing the ecosystem.",
    content: `For decades, the standard for healthy produce has been "organic"—a label certifies the absence of toxic synthetic pesticides and chemical fertilizers. While organic is an essential first step, the pioneering farmers of modern wellness are looking deeper: into the soil microbiome.

### The Soil-Human Connection

Like the human gut, dirt is not inert; it is a complex, living ecosystem of fungi, bacteria, and microscopic organisms. When soil is heavily tilled, monocropped, or even treated with organic-approved inputs too aggressively, this delicate network collapses. The plant can no longer absorb micronutrients naturally, resulting in beautiful but nutritionally hollow food.

Regenerative agriculture reverses this cycle by utilizing zero-tillage, multi-species cover cropping, and rotational animal grazing to rebuild topsoil. By fostering a biologically active soil community, plants develop more resilient roots and naturally manufacture higher concentrations of secondary metabolites—the very phytonutrients that boost human vitality and immune resilience.

### Demystifying Soil Quality

1. **Cover Cropping**: Keeping the soil covered with a variety of helper plants prevents erosion and fixes atmospheric nitrogen naturally.
2. **Biodiversification**: Planting diverse vegetables adjacent to each other breaks up pest cycles and fosters soil fungal diversity.
3. **Microbial Inoculation**: Treating soil with natural compost teas introduces billions of helpful bacteria directly to root zones.

By choosing ingredients cultivated with earth-first care, you are not just feeding your body; you are actively investing in the restoration of our planet's carbon-sink capacity and guaranteeing organic integrity for generations.`,
    category: "sustainability",
    categoryLabel: "Sustainability",
    readTime: "12 Min Read",
    date: "May 28, 2026",
    author: "Plantsource Wholesale Team",
    image: IMAGES.sunriseFarm,
    featured: true
  },
  {
    id: "art_2",
    title: "The Art of Seasonal Stewing",
    excerpt: "How to extract maximum flavor and vitalizing minerals from winter root vegetables by using artisanal culinary techniques.",
    content: `As the thermometer dips, our body's digestive fire naturally seeks warm, grounded, and deeply structured culinary nourishment. Seasonal stewing is not just a comfort technique—it is a traditional kitchen alchemy that breaks down complex plant fibers, unlocking bioavailable mineral reserves otherwise inaccessible in raw forms.

### The Golden Rule of Flavor Layers

To build an extraordinary vegan broth, we never just boil vegetables. We start with a heavy-bottomed cast iron pan, dynamic temperature spikes, and cold-pressed organic oils:

- **The Foundations**: Caramelize aromatic root crowns (onions, leeks, wild garlic) slowly at medium heat until they release sweet natural glucose.
- **The Core Roots**: Sear heirloom carrots, parsnips, and winter squashes directly to induce the Maillard reaction, forming earthy flavor structures.
- **The Mineral Boosters**: Deglaze the pan with raw kombu kelp tea or wild mushroom stock. This pulls dense trace minerals, iodine, and clean glutamate into the cooking liquid.
- **The Green Finish**: Only fold in delicate winter kale or spinach in the final three minutes, letting them wilt gently in the residual steam to protect heat-sensitive Vitamin C.

By honoring the natural structure of each root, simple vegetables transform into a rich, velvety elixir that nourishes the blood and provides deep energy.`,
    category: "recipes",
    categoryLabel: "Recipes",
    readTime: "5 Min Read",
    date: "Oct 24, 2024",
    author: "Chef Julian Vane",
    image: IMAGES.seasonalStewing
  },
  {
    id: "art_3",
    title: "Protein Purity: A Guide",
    excerpt: "Demystifying plant-based protein for optimal performance. Understanding how complete amino acid profiles are achieved without heavy processing.",
    content: `The modern supplement industry has taught us that protein must come in plastic tubs of highly refined whey isolated powders or chalky soy powders. But nature has always packed pristine amino chains in simpler, raw packages that do not cause inflammation or stress the liver.

### The Myth of Complete Proteins

It was once believed that vegans had to combine beans and rice in every single meal to get "complete" proteins. We now know the liver maintains a free amino acid pool, drawing resources as needed throughout the day. However, focusing on high-quality organic plant seeds and sprouts ensures a steady supply of clean, building blocks without chemical traces.

### Cleanest Plant-Based Sourcing

1. **Sprouted Legumes**: Sprouting deactivated organic trypsin inhibitors present in raw seeds, increasing protein digestibility by up to 300%.
2. **Young Edamame & Soy**: When grown organically in mineralized soil, fresh non-GMO soybeans represent a perfect amino profile, packed with cellular lecithin.
3. **Wild Hemp & Chia Seeds**: Cold-pressed seeds provide simple, anti-inflammatory globulin proteins (edestin and albumin) which are easily accepted by the body.

Adopt a clean, whole-food approach to protein and experience accelerated cellular tissue repair, stable mental focus, and lightweight organic power.`,
    category: "nutrition",
    categoryLabel: "Nutrition",
    readTime: "8 Min Read",
    date: "Oct 12, 2024",
    author: "Dr. Elara Vane",
    image: IMAGES.plantProtein
  },
  {
    id: "art_4",
    title: "Bioavailability: Maximizing Your Plant-Based Nutrients",
    excerpt: "Learn how pairing specific ingredients and using simple cooking prep can unlock hidden vitamins in your daily meals.",
    content: `Eating nutritious food is only half the battle. The critical question is: how much of it does your digestive tract actually absorb? Plants contain protective defenses like phytates and oxalates, which can bind to key iron, calcium, and zinc atoms, passing right through you.

Here are three simple, science-backed organic culinary rules to dramatically elevate absorption rates:

### Direct Nutrient Synergy

- **Iron + Vitamin C**: Non-heme iron in dark leafy greens (like our Crisp Jade Winter Kale) is poorly absorbed on its own. Pairing it with a squeeze of fresh lemon juice or a slice of bell pepper increases iron absorption up to six-fold.
- **Fat-Soluble Vitamins + Healthy Lipids**: Vitamins A, D, E, and K require high-quality fats to cross the intestinal wall. Always drizzle cold-pressed extra virgin olive oil, avocado oil, or toasted pumpkin seed butter over raw salads or roasted root squashes.
- **Sprouting and Fermenting**: Soaking raw nuts and ancient grains deactivated defense enzyme shielding. Fermentation goes further, introducing live probiotics that actively synthesize extra B vitamins inside the meal itself!

By being mindful of how you prep and pair, you get maximum cellular benefits from every bite.`,
    category: "nutrition",
    categoryLabel: "Nutrition",
    readTime: "6 Min Read",
    date: "Sep 15, 2024",
    author: "Plantsource Wholesale Nutrition Board",
    image: IMAGES.earthFirst
  },
  {
    id: "art_5",
    title: "Morning Rituals for Mental Clarity",
    excerpt: "Beyond the green juice: five-minute organic practices to ground your day in mindful intention, light, and vital focus.",
    content: `True nourishment is not just biochemical; it is neurological. How we utilize our initial morning thoughts dictates our autonomic nervous system balance for the entire day, controlling our digestion, spatial stress, and metabolic health.

### The 5-Minute Grounding Protocol

- **Step 1: Hydrate with Ocean Minerals**: Drink a large glass of warm filtered water mixed with a pinch of grey Celtic sea salt and a sliver of ginger. This wakes up the adrenals and stimulates digestive bile production.
- **Step 2: Mindful Light Saturation**: Stand near a window or step outside for 5 minutes of direct morning sunlight. This programs your circadian biological clock, setting up deep serotonin production for the evening.
- **Step 3: Diaphragmatic Breath Cycles**: Sit comfortably on a solid seat. Inhale slowly for 4 seconds, expand your low belly, hold for 4 seconds, and exhale silently for 6 seconds. This calms the sympathetic "fight-or-flight" fire and engages the restorative vagus nerve.

Practice these simple, somatic elements before checking your screen, and watch your creative focus expand with ease.`,
    category: "mindfulness",
    categoryLabel: "Mindfulness",
    readTime: "4 Min Read",
    date: "Aug 02, 2024",
    author: "Plantsource Wholesale Editorial Team",
    image: IMAGES.handsSoil
  }
];
