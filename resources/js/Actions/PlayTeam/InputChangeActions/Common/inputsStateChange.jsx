// ①日本語入力終了、②半角変換終了、このどちらかで生じるStateの変更(投稿・カーソルの位置と文字の位置)
export default function inputsStateChange(setInputSets,total_n,team,tempInputValue,setChangePoint,inputRefs,setFocusIndex){
        // 確定された値で更新
        setInputSets((prevState) => ({
          ...prevState,
          [total_n]: {
            "team":team,
            "player":tempInputValue.current[total_n]
          }
        }));
      setChangePoint(inputRefs.current[total_n].selectionStart || "")
      setFocusIndex(total_n);
}