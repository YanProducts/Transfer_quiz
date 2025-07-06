<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;
use App\Traits\EnumTrait;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */

//  カテゴリー選択のEnum
// チームのテーブルで使うが、クイズ選択ではallを含むので使用しない

final class NameEnum extends Enum
{
    const full = 0;
    const part = 1;

    // キーを配列返し
    use EnumTrait;

        // ビュー用に日本語とセットになった配列を返す
    public static function jpnDescriptions(){
        return
        [
            "full"=>"登録名",
            "part"=>"名前の一部"
        ];
    }
}
