<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Keeps the API / admin host (api.plantsourcewholesale.com) out of search results.
 * The public website lives on plantsourcewholesale.com; this host only serves JSON,
 * the admin panel and the default Laravel page.
 *
 * Uploaded images under /storage are served directly by the web server and are not
 * affected, so they stay crawlable for Google Images.
 */
class NoIndexResponses
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        $response->headers->set('X-Robots-Tag', 'noindex, nofollow');

        return $response;
    }
}
