<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\UpdateDataChangeThemeEnum;
use App\Enums\UpdateDataSeasonEnum;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

// 回答された結果ランキング
class RankingRequest extends FormRequest
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

        // nullを許容(デフォルトの年代と30位以下は表示しないが返る)
        return [
            "season"=>[
                "nullable",
                Rule::in(array_keys(UpdateDataSeasonEnum::jpnDescriptions()))
            ],
            "viewAll"=>[
                "nullable",
                Rule::in(["answer_full","answer_part"])
            ]
        ];
    }
    public function messages(){
        return [
            "season.in"=>config("app.env")==="local" ? "シーズンの値が違います" :"予期せぬエラーです"
        ];
    }
}
