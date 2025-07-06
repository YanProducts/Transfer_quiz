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

final class QuizEnum extends Enum
{
    const byTeam = 0;
    const random = 1;

    // キーを配列返し
    use EnumTrait;

    // ビュー用に日本語とセットになった配列を返す
    public static function jpnDescriptions(){
        return
        [
            "byTeam"=>"チームごと",
            "random"=>"ランダム",
        ];
    }
}
