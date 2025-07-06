<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;
use App\Traits\EnumTrait;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class UpdateDataChangeThemeEnum extends Enum
{
    const onlyPlayer = 0;
    const transferData = 1;

    // キーを配列返し
    use EnumTrait;

    // ビュー用に日本語とセットになった配列を返す
    public static function jpnDescriptions(){
        return[
            "onlyPlayer"=>"選手データのみ",
            "transferData"=>"新加入データもセット"
        ];
    }
}
