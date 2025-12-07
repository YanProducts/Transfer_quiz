import React from "react";
export default function useDeleteSessionDefinitions(){
  // 戻るからの再びゲームに入らないように送るfetch
  React.useEffect(()=>{
    // Inertiaで戻った際にfetchでセッションを消す
    deleteSessionResponse();
    // BFCacheで戻った際にfetchでsessionを消す（登録される？BFcacheで戻ったときに呼び出される？アンマウントしてるのに？）
    window.addEventListener("pageshow",deleteSessionResponse);
    return ()=>{window.removeEventListener("pageshow",deleteSessionResponse)}
  },[])

    // sessionの削除
    const deleteSessionResponse= async ()=>{
      try{
                //fetchのヘッダー
          const headers=new Headers({
            'Content-Type': 'application/json',
            // 自動送信されているが、念のため行う(laravelとの変更で適合しないので非推奨)
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content || "missingToken"
        });
  
        const response= await fetch(`${import.meta.env.VITE_APP_URL}/gameSessionsDelete`,{
          headers:headers,
          method:"post",        
        });
        if(!response.ok){
          throw new Error("post error");
        }
        const sessionDeleteSign=await response.json();
        if(!sessionDeleteSign?.deleteOk || sessionDeleteSign.deleteOk!=="ok"){
          throw new Error("session消去の過程でのエラーです")
        }
      }catch(e){
        console.log(import.meta.env.VITE_APP_ENV ==="local" ? e.message : "deleteNotOk");
      }        
    }
  
}