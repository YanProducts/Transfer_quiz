<?php

namespace App\Traits;

// Enumのキーの配列を返す
Trait EnumTrait{

// デフォルトではキャメルケースをキャピタルケースに変換するため、getDescriptionを上書き
   public static function getDescription(mixed $value): string{
       return self::getKey($value) ?? 'unExpected';
    }

 // key(文面)の配列を返す
  public static function getDescriptions(){
    // selfは呼び出し先のEnumで呼び出される
    return array_map(fn($value)=>self::getDescription($value),self::getValues());
  }
}
