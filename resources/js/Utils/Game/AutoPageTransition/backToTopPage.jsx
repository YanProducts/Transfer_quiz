import { useForm } from '@inertiajs/react';
import React from 'react';
import { router } from '@inertiajs/react';

export default function backToTopPageWhenPlayGame(){

// 戻るページで表示された遷移用のため
const {get}=useForm();

    // 正式にレンダリング
    React.useEffect(()=>{
        const onNav=()=>{
            // もしクリアした後なら、storageを削除して、何もしない(お祝いページへ行けるようにする)
            if(localStorage.getItem("TransferQuizCleared")){
                localStorage.removeItem("TransferQuizCleared");
                return;
            }
            // もしゲーム後に戻るボタンからきた時はtopPageへ移動
                if(localStorage.getItem("TransferQuizAlreadyPlayed")){
                 //  ページ移動時に確認のアラートを出さない
                    localStorage.setItem("TransferQuizErrorOccured",true);
                    get("topPage");
                    localStorage.setItem("TransferQuizErrorOccured",false);
                    return;
                }
        }
        router.on("navigate", onNav);

        // 初期画面で描写されるだけなので、returnは必要ない
        // return () => router.off("navigate", onNav);
    },[]);

//  reactの機能を使うなら関数呼び出しでもUIが操作されないだけでコンポーネントとして処理される
  return null;


}
