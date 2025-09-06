    // 回答後のUI
    import React from "react";
    import { useForm } from "@inertiajs/react";

    // 分割代入
    export const AfterAnswerComponent=({isAfter,setIsAfter,setNowAnalyzing,isCorrectState,setIsCorrectState,answeredCounts,answerBoxCounts,nameType,cate,gameId})=>{

        // 2重のgetの防止用
        const [moveResult,setMoveResult]=React.useState(false);

        // clearの遷移用
        const {post,data,setData,errors,setError,processing}=useForm({
            "quiz":"random",
            "name":nameType,
            "cate":cate,
            "gameId":gameId
        });
      

        React.useEffect(()=>{
            // クイズ回答後の場合は3秒後にクイズ回答前の状態にする
            if(isAfter){

                // isAfterがtrueになると解析中を戻す
                setNowAnalyzing(false);

                // 回答前のUIへ戻す
                const timer=setTimeout(()=>{

                    
                    // 実験中
                    answerBoxCounts=1;

                    // クリアしたかどうか
                    if(answerBoxCounts<=answeredCounts){
                        // storageにクリアのフラグを挿入
                        localStorage.setItem("TransferQuizCleared",true);
                        setIsAfter(false);
                        setNowAnalyzing(false);

                            // 2回以上呼び出さないための条件づけ
                            if(!moveResult){
                                setMoveResult(true);
                                // 遷移(gameIdを送るのは戻るから再遷移の対策)
                                post(route(`game_clear_route`));
                            }
                        
                        return null;
                    } else {
                        setIsAfter(false);
                        setNowAnalyzing(false);
                    }
                },2000)
            // useEffect内部での処理を終了後に、useEffectが発生する前の状態に戻す
                return()=>{
                    setNowAnalyzing(false);
                    setIsAfter(false);
                    clearTimeout(timer);
                    setIsCorrectState("yet");

                    // 遷移させないために呼ばない
                    // setMoveResult(false);
                }
            }
        },[isAfter])

        // 回答前なら何もしない
        if(!isAfter){
            return null;
        }
        // 回答後(buttonのpointerEventはInput側で操作)
        switch(isCorrectState){
            case "correct":
                return <div className='correct_div'>正解！</div>
            case "wrong":
                return <div className='wrong_div'>X</div>
            case "already":
            return  <div className='already_div'>回答済</div>
            default:
            // 処理段階のエラー
            return  <div className='already_div'>エラー</div>
        }
    }
