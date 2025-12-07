<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;
use App\Traits\EnumTrait;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class UpdateDataSeasonEnum extends Enum
{
    const Mid25 = 0;
    const End25 = 1;
    const End26 = 2;
    const Mid26_27 = 3;
    const End26_27 = 4;

    // キーを配列返し
    use EnumTrait;

    // ビュー用に日本語とセットになった配列を返す
    public static function jpnDescriptions(){
        return[
            "Mid25"=>"25年夏",
            "End25"=>"26年冬",
            "End26"=>"26年夏",
            "Mid26_27"=>"26-27の前期",
            "End26_27"=>"26-27年度末"
        ];
    }
}
