<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
  // 一括代入許可
  protected $fillable=["eng_name","jpn_name","cate","red","green","blue"];
}
