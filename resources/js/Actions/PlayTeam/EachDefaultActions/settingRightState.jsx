// fetchが返る→正解かどうかをセットする
// effect内部の処理がここで終わるので、returnで終了させてOK
export default function settingRightState(fetchReturn,setUniqueToken,setIsRightState,setNowAlreadyPlayers,setError){
    // fetchReturn取得前は何もしない
    if(Object.keys(fetchReturn).length===0){
      return;
  }

  // UI初期化(既に送信済みなのでinputは空にできる)

  if(fetchReturn.success){
      // 新たなsessionの設定
      setUniqueToken(fetchReturn.new_token);

      // 正解人数の表示
      setIsRightState(fetchReturn.rightCounts);

      // 今回の回答における回答済リストに入れる
      setNowAlreadyPlayers(fetchReturn.returnedNowAnswerAleradyLists);

  }else{
      // 失敗の場合
      // 二重投稿の場合は何もしない
      if(fetchReturn.errorMessage.unCategorizedError && fetchReturn.errorMessage.unCategorizedError
          ==="duplicated"){
          return;
      }

      // それ以外の場合はエラー表示
      setError({"message":fetchReturn.errorMessage});
  }
}