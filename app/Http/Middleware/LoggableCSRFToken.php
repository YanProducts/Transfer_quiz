<?php

namespace App\Http\Middleware;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Log;

class LoggableCSRFToken extends ValidateCsrfToken{

    protected function tokensMatch($request)
    {
        Log::info('XSRF-TOKEN cookie: ' . $request->cookie('XSRF-TOKEN'));
        Log::info('X-CSRF-TOKEN header: ' . $request->header('X-CSRF-TOKEN'));

        return parent::tokensMatch($request);
    }
}
