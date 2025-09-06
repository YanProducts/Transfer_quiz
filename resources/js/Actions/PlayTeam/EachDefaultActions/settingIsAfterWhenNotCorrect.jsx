  // isRightStateを依存に配列にして生じる、取得前・エラー・不正解・の時の変化
export function settingIsAfterWhenNotCorrect(isRightState,setIsAfter){
      // 最初のレンダリング時、また回答後に切り替わった画面では進ませない
      if(isRightState=="first" || isRightState=="yet"){
        return false;
    }

    // 数値かどうかをまずチェック
    if(isNaN(Number(isRightState))){
        // 数値でない場合
        // // 回答後画面へのフラグ(isAfter)反映=エラー
        setIsAfter(true);
        return false;
    }

    // 正解人数が0の場合はそのままsetIsAfterへ
    if(isRightState==0){
        setIsAfter(true);
        return false;
    }
    return true;
}