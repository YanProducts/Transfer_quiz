<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NowPlayerList extends Model
{
  // 一括代入許可
  protected $fillable=["full,part,team"];
}
