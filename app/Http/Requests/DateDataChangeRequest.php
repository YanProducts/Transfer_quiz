<?php

namespace App\Http\Requests;

use DateTime;
use Illuminate\Foundation\Http\FormRequest;
use App\Constants\Date;
use App\Enums\UpdateDataChangeThemeEnum;
use Illuminate\Support\Facades\Log;

class DateDataChangeRequest extends FormRequest
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
            "changeTheme"=>"required|in:".implode(",",UpdateDataChangeThemeEnum::getDescriptions()),
            "year"=>["required","in:".implode(",",[
                (int)(new DateTime()->format("Y"))-1,
                (int)(new DateTime()->format("Y")),
                (int)(new DateTime()->format("Y"))+1]),
            ],
            "month"=>["required","in:".implode(",",range(1,12))],
            "day"=>["required","in:".implode(",",range(1,31))],
        ];
    }
    public function messages()
    {
        return [
            "changeTheme.required"=>"条件のエラーです",
            "changeTheme.in"=>"条件のエラーです",
            "year.required"=>"年が選択されていません",
            "year.in"=>"年の値が異常です",
            "month.required"=>"月が選択されていません",
            "month.in"=>"月の値が異常です",
            "day.required"=>"日が選択されていません",
            "day.in"=>"日の値が異常です",
        ];
    }

    public function withValidator($validator){
        $int_month=(int)($this->input("month"));
        $int_day=(int)($this->input("day"));
        $validator->after(function($validator)use($int_month,$int_day){
            if((in_array($int_month,Date::dayUntil30Month) && $int_day===30) ||
               ($int_month===2 && $int_day>30) ||
               ($int_month===2 && $int_day===29 && (int)($this->input("year"))%4 !==0)
            ){
                $validator->errors()->add("common","日の値が異常です");
            }
        });
    }
}
