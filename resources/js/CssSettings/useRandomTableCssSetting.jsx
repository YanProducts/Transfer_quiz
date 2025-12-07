import React from "react";

export default function useRandomTableCssSetting(setThContents,setThWidth){

    const thViewChange=()=>{
        if(window.innerWidth<400){
            setThWidth({1:"w-[15%]",2:"w-[65%]",3:"w-[35%]"})
            setThContents({
                num:"数",
                player:"選手",
                team:"チーム"
            })
        }else if(window.innerWidth<600){
            setThWidth({1:"w-1/6",2:"w-2/3",3:"w-1/6"})
            setThContents({
                num:"回答数",
                player:"選手",
                team:"チーム"
            })
        }else{
            setThContents({
                num:"回答数",
                player:"選手名",
                team:"チーム名"
            })
        }
    }

    // 初期にこの関数を無条件動作、イベントリスナー設定。アンマウント時に消去
    React.useEffect(()=>{
         window.addEventListener("resize",thViewChange)
         thViewChange();
        return(()=>{
         window.removeEventListener("resize",thViewChange)
        });
    },[]);
}

