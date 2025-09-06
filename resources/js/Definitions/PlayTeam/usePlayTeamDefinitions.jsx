import React from "react";
import { useForm } from "@inertiajs/react";

export default function usePlayTeamDefinitions(uniqueTokenBase,teamsAndBoxes,nameType,cate,gameId){

  // 最初のアクセスか否か
  const [isFirst,setIsFirst]=React.useState(true);

  // 回答され開いてliに変更されたinput要素(開いた番目のinputを挿入)と、そこに埋まる値
  const [openedInput,setOpenedInput]=React.useState({});

  // 回答に向けたinputのセット(totalのliでn番目のものと、それに対応したinputの値)
  const [inputSets,setInputSets]=React.useState({});

  // inputのref(inputRefs.currentで配列)
  const inputRefs=React.useRef({});

  // fetch後のオブジェクト格納
  const [fetchReturn,setFetchReturn]=React.useState({});

  // エラー有無
  const [error,setError]=React.useState({});

  // ボタン操作の可否
  const [nowAnalyzing,setNowAnalyzing]=React.useState(false);

  // 回答後か否か
  const [isAfter,setIsAfter]=React.useState(false);

  // ２重投稿防止トークン
  const [uniqueToken,setUniqueToken]=React.useState(uniqueTokenBase);

  // 何人正解か？
  const [isRightState,setIsRightState]=React.useState("first");

  // 上記の表示用(佐藤3人に対応)
  const [rightCountForUI,setRightCountForUI]=React.useState("");

  // 全部回答されたチーム(上記に対応)
  // 新加入がゼロのチームは初期設定をゼロにする
  const [finishTeam,setFinishTeam]=React.useState(Object.keys(teamsAndBoxes).filter(team=>
    teamsAndBoxes[team] == 0
  ));

  // 重複回答になった選手たち
  const [nowAlreadyPlayers,setNowAlreadyPlayers]=React.useState([]);

  // 2重のgetの防止用
  const [moveResult,setMoveResult]=React.useState(false);

  // gameIdが変化→topPageへ 
  const {get}=useForm();
  // ゲームクリア用
  const {post}=useForm({
    "quiz":"byTeam",
    "name":nameType,
    "cate":cate,
    "gameId":gameId
});

  return{isFirst,setIsFirst,isAfter,uniqueToken,setUniqueToken,fetchReturn,setFetchReturn,error,setError,nowAnalyzing,setNowAnalyzing,setIsAfter,isRightState,setIsRightState,rightCountForUI,setRightCountForUI,inputSets,setInputSets,finishTeam,setFinishTeam,nowAlreadyPlayers,setNowAlreadyPlayers,openedInput,setOpenedInput,inputRefs,moveResult,setMoveResult,get,post};

}