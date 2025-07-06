<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\CateEnum;
use App\Enums\NameEnum;
use App\Enums\QuizEnum;
use BenSampo\Enum\Rules\Enum;
use BenSampo\Enum\Rules\EnumKey;

// ゲーム開始の値のバリデーション
class QuizPatternRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "cate"=>["required","in:".implode(',', array_keys(CateEnum::jpnDescriptions()))],
            "quiz"=>["required","in:".implode(",",array_keys(QuizEnum::jpnDescriptions()))],
            "name"=>["required","in:".implode(",",array_keys(NameEnum::jpnDescriptions()))],
        ];
    }
    public function messages(): array
    {
        return [
            "cate.required"=>"カテゴリーは入力必須です",
            "cate.in"=>"カテゴリーの値が不正です",
            "quiz.required"=>"クイズ形式は入力必須です",
            "quiz.in"=>"クイズ形式の値が不正です",
            "name.required"=>"回答形式は入力必須です",
            "name.in"=>"回答形式の値が不正です",
        ];
    }
}
