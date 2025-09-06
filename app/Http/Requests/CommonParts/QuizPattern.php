<?php

nameSpace App\Http\Requests\CommonParts;

use App\Enums\CateEnum;
use App\Enums\QuizEnum;
use App\Enums\NameEnum;

class QuizPattern{
  public static function quizPatternRule(){
    return [
      "cate"=>["required","in:".implode(',', array_keys(CateEnum::jpnDescriptions()))],
      "quiz"=>["required","in:".implode(",",array_keys(QuizEnum::jpnDescriptions()))],
      "name"=>["required","in:".implode(",",array_keys(NameEnum::jpnDescriptions()))],
  ];
  }
}