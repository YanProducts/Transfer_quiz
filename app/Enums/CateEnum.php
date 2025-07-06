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

final class CateEnum extends Enum
{
    // Enum自体にはallはつけない
    const J1 = 0;
    const J2 = 1;
    const J3 = 2;

    //全部のカテゴリーを記した配列で変換
    use EnumTrait;

    // ビュー用に日本語とセットになった配列を返す
    // 検索時の例外もここを呼び出す
    public static function jpnDescriptions(){
        return
        [
            "J1"=>"J1",
            "J2"=>"J2",
            "J3"=>"J3",
            // 日本語表示にはallをつける
            "all"=>"すべて"
        ];
    }
}
