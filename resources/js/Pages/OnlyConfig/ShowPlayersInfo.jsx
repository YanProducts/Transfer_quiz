import React from "react";
import { useForm } from "@inertiajs/react";
import ViewPlayersComponents from "@/CustomComponents/Config/ViewPlayersComponents";

export default function showPlayersInfo({with_kakko_players,no_comma_players,past_exception_players,folder,out_lists=null,in_lists=null}){

    // const pageReady=usePageReadyCheck();
    const {get}=useForm();

    // ローカルじゃなければエラーページへ
    React.useEffect(()=>{
        if(import.meta.env.VITE_APP_ENV!=="local"){
            get(`/error_from_front/?message=configNoLocalError`);
        }
    },[]);
    // },[pageReady]);


    const eachPlayersLists=(playersList,noPlayersWords)=>{
        return(
            playersList.length>0 ?
                playersList.map((player,index)=>
                    <p className="pl-2 base_backColor" key={index}>{player}</p>)
                    :
                    <p className="pl-2 base_backColor">{noPlayersWords}</p>
        )
    }

    return(
        <div className="bg-yellow-400 min-h-screen">
        <p>　</p>
        <div className="base_frame mt-5">
            <h1 className="base_h1 base_h py-2 w-[450px] rounded-md">例外の名前は以下の通りです<br/>{folder==="local" ? "現在登録のみ更新" : "新加入データ更新"}</h1>

            <ViewPlayersComponents borderColorCSS="border-green-700" matchedTheme="①カッコつきの選手" matchedPlayersComponents={eachPlayersLists(with_kakko_players,"カッコつきの選手はいません")} index={0} />

            <ViewPlayersComponents borderColorCSS="border-red-700" matchedTheme="②カンマなしの選手" matchedPlayersComponents={eachPlayersLists(no_comma_players,"カンマなしの選手はいません")}  index={1} />

            <ViewPlayersComponents borderColorCSS="border-sky-700" matchedTheme="③過去例外の選手" matchedPlayersComponents={eachPlayersLists(past_exception_players,"過去例外の選手はいません")} index={2} />

            {folder==="public" ?
            <>
            <ViewPlayersComponents borderColorCSS="border-pink-300" matchedTheme="④退団した選手" matchedPlayersComponents={eachPlayersLists(out_lists,"退団した選手はいません")} index={3} />

            <ViewPlayersComponents borderColorCSS="border-gray-200" matchedTheme="⑤新加入の選手" matchedPlayersComponents={eachPlayersLists(in_lists,"新加入の選手はいません")} index={4} />
            </>
            : null
            }
        </div>
        <p>　</p>
        </div>
    )
}
