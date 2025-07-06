<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        // webミドルウェアにappendしているだけで、既存のwebミドルウェアは別途定義されている
        $middleware->web(
            remove: [
                // Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
            ],
           append: [
            // App\Http\Middleware\LoggableCSRFToken::class,
            // inertiaを通じさせる
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);


    })
    ->withExceptions(function (Exceptions $exceptions) {
    // Inertiaからの419エラー
     $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
        if ($response->getStatusCode() === 419 && $request->header('X-Inertia')) {
            return redirect()->route('error_page_route')->with('errorMessage','時間切れです');
        }
        if ($response->getStatusCode() === 500) {
            return redirect()->route('error_page_route')->with('errorMessage','何らかのエラーです');
        }
         // 通常のエラー処理
        return $response;
     });

    })->create();
