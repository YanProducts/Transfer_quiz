<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DataChangeDate extends Model
{
  // 一括代入許可(カラム１つだけど念の為。saveではなくcreateするなら必要)
  protected $fillable=["now_player_data_date"];
}
