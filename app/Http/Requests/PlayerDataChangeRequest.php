<?php

namespace App\Http\Requests;

use App\Rules\ConfigPassWordRule;
use Illuminate\Foundation\Http\FormRequest;
use App\Enums\UpdateDataChangeThemeEnum;
use App\Enums\UpdateDataSeasonEnum;
use Illuminate\Support\Facades\Log;

class PlayerDataChangeRequest extends FormRequest
{
    //選手登録データのバリデーション

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
            "changeTheme"=>"required|in:".implode(",",UpdateDataChangeThemeEnum::getDescriptions()),
            "updateSeason"=>"required|in:no_choice,".implode(",",UpdateDataSeasonEnum::getDescriptions()),
            "passWord"=>["required",new ConfigPassWordRule]
        ];
    }
    public function messages(): array
    {
        return [
            "changeTheme.required"=>"登録内容が選択されていません",
            "changeTheme.in"=>"登録内容の値が異常です",
            "updateSeason.required"=>"登録年が選択されていません",
            "updateSeason.in"=>"登録内容の値が異常です",
            "passWord.required"=>"パスワードが記入されていません",
        ];
    }

    // changeThemeがonlyPlayerで年代がnot_used以外 changeThemeがtransferDataで年代がnot_used これを付け足す
    public function withValidator($validator){

        // このafterは「rulesの終了後に行う」という意味
        $validator->after(function ($validator) {
        if(($this->input("changeTheme")==="onlyPlayer" && $this->input("updateSeason")!=="no_choice") || ($this->input("changeTheme")==="transferData" && $this->input("updateSeason")==="no_choice")){
            $validator->errors()->add("common","予期せぬエラーが発生しました");
        }
       });
    }
}
