<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\CateEnum;
use App\Enums\QuizEnum;
use App\Enums\NameEnum;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

// ゲームクリアの時のリクエスト
class GameClearRequest extends FormRequest
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
            "cate"=>["required","in:".implode(",",CateEnum::jpnDescriptions()).",すべて"],
            "quiz"=>["required","in:".implode(",",array_keys(QuizEnum::jpnDescriptions()))],
            "name"=>["required","in:".implode(",",NameEnum::jpnDescriptions())],
        ];
    }

    public function messagas(){
        return[
            "cate.required"=>"カテゴリーは必須です",
            "quiz.required"=>"クイズ形式は必須です",
            "name.required"=>"名前形式は必須です",
            "cate.in"=>"カテゴリーの値が不正です",
            "quiz.in"=>"クイズ形式の値が不正です",
            "name.in"=>"名前形式の値が不正です",
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        Log::info($validator->errors());
        throw new HttpResponseException(
            redirect()->route("error_page_route",[
                "message"=>"予期せぬエラーです"
            ])
        );
    }
}
