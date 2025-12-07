import React from 'react';

// ①戻るからゲームに到達した時、②リロードした時、トップページに戻る処理(既にゲーム開始フラグがあったらlocation.hrefで遷移する)

export default function useBackToTopPageWhenPlayGame(){

    React.useEffect(()=>{

        // もしクリアした後なら、storageを削除して、何もしない(お祝いページへ行けるようにする)
        if(localStorage.getItem("TransferQuizCleared")){
            localStorage.removeItem("TransferQuizCleared");
            return;
        }

          // もしゲーム後に戻るボタンからきた時はtopPageへ移動
          if(localStorage.getItem("TransferQuizAlreadyPlayed")){
                      
            
              // 遷移の際はInertiaが構築されていない場合を考えてgetではなくJSで完全遷移させる
                const getMove=()=>{window.location.href="/redirectTopPage"};

                // 遷移
                getMove();

                // BFCacheでトップに戻ってから再表示された時の対策(トップに戻る時もアンマウントではない)
                window.addEventListener("pageshow",getMove)
                  
              
                return window.removeEventListener("pageshow",getMove);

              }else{
              // ページに辿り着いた後は、必ず設定
              localStorage.setItem("TransferQuizAlreadyPlayed",true);

            }
    },[]);
}
