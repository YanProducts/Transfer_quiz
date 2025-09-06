// css設定の一連の流れ（最初のロード終了時のみ）
// 各機能はCSSフォルダの内部にあり

import React from "react";
import { useForm } from "@inertiajs/react";
import { InnerWidthSetting,LiHeightSetting} from "../../CssSettings/PlayByTeamStyling";

export default function useDefaultCssSetFlow(setLiHeight,teamsAndBoxes,flexCounts,setFlexCounts,setEachFlexWidth){ 
       // innerWidthのセットエラー用(メインのgetと重ならないよう、ここで定義する)
      const {get}=useForm()

      React.useLayoutEffect(()=>{

        // まずはレンダリングを完全に完成させる(window.innerWidthはズレる可能性あり)
        //flexの個数と長さ
        InnerWidthSetting(setFlexCounts,window.innerWidth,setEachFlexWidth);

        // 完成した描画のもとで、レスポンシブに対応させる
        requestAnimationFrame(() => {
            InnerWidthSetting(setFlexCounts,window.innerWidth,setEachFlexWidth);
        },)


        const resizeHandler=()=>{
            InnerWidthSetting(setFlexCounts,window.innerWidth,setEachFlexWidth,get);
        }

        //windowがresizeされたときのflexの個数の定義
        window.addEventListener("resize",resizeHandler)

        // 最初だけなのでいらないが念の為
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    },[])



    // InnerWidthSettingが変更した際には、必ずliHeightを設定しなおす
    React.useLayoutEffect(()=>{
        if(!flexCounts){
            return;
        }
        LiHeightSetting(setLiHeight,teamsAndBoxes);
    },[flexCounts])
}