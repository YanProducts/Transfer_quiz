<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\CommonParts\QuizPattern;

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
        return  QuizPattern::quizPatternRule();
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
