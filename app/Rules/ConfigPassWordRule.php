<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;

class ConfigPassWordRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    // パスワードが違うルール
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if($value!==config("app.admin_pass")){
            $fail("パスワードが違います");
        }
    }
}
