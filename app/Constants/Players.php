<?php
namespace App\Constants;
// 選手データの定数

class Players{
 // 過去、登録名が例外だった選手たち
 public static $past_exception_names=[
  "ファンウェルメスケルケン際"=>"ファン　ウェルメスケルケン　際",
  "舞行龍ジェームズ"=>"舞行龍　ジェームズ",
  "キアッドティフォーンウドム"=>"キアッドティフォーン・ウドム",
  "ジャルンサックウォンコーン"=>"ジャルンサック　ウォンコーン",
  "ウボングリチャードマンデー"=>"ウボング　リチャード　マンデー"
 ];

 //  新たに昇格したチームの新加入選手
 public static $new_players_in_new_teams=[
    ["team"=>"teamA","player"=>"山田　あああ"],
    ["team"=>"teamA","player"=>"俺ないくん"],
    // ["team"=>"teamA","player"=>"ギグス"],
    ["team"=>"teamB","player"=>"ギグス　ラン"],
 ];

//  例外的に新加入に加える選手(同姓同名の場合など)
 public static $special_case_players=[
    ["team"=>"tokyo_v","player"=>"マテウス"],
    ["team"=>"tokyo_v","player"=>"森田　晃樹"],
    // ["team"=>"kashima","player"=>"ん"],
 ];

//  新加入から除去する選手(登録名変更など)
 public static $remove_players=[
   ["team"=>"akita","player"=>"ははは"],
 ];

//  同じチームに山　昇太と山昇　太
 public static  $special_similar_names=[
    // team=>[nameAのpart,nameBのpart]
 ];

}
