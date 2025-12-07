<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewComer extends Model
{
  // 一括代入許可
  protected $fillable=["full,part,team,season,answer_full,answer_part"];
}
