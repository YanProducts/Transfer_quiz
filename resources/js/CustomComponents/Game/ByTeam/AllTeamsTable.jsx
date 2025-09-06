import useCssSettingDefinitions from "@/Definitions/PlayTeam/useCssSettingDefinitions";
import useDefaultCssSetFlow from "@/Actions/PlayTeam/useDefaultCssSetFlow";
import { AnsweredLiComponents } from "./AnsweredLiComponents";
import LastRawAdujsting from "./LastRawAdjusting";
import ifFlexLast from "./IfFlexLast";

// チームごとの表(全てここで分かる)
// 回答済みのものはlist、未回答のものはinputで表示
// 各チームの要素。表示のチームごとにflexで分割
   export default function AllTeamsTable({openedInput,nowAnalyzing,isAfter,inputRefs,inputSets,setInputSets,teams,teamsAndBoxes}){


      // CSS系統の定義
  const [flexCounts,setFlexCounts,eachFlexWidth,setEachFlexWidth,liHeight,setLiHeight]=useCssSettingDefinitions();
  // 初期のCSS設定
  useDefaultCssSetFlow(setLiHeight,teamsAndBoxes,flexCounts,setFlexCounts,setEachFlexWidth)


  // 全体の要素
   let returnedByTeamComponents=[];
 // 改行ごとに分けたflex要素
   let groupComponents=[];
    let group_index=0;

    // inputもしくはliがトータルで何番目か
    let total_n=0;

    teams.forEach((team,index)=>{

        const blackOrWhite=0.299*team.red + 0.587 *team.green + 0.114*team.blue > 128 ? "black" : "white";

        // 各チームの要素
        let eachComponent=(

            <div key={index} className="border-black border-2 p-2 mx-1" style={{ backgroundColor:`rgb(${team.red},${team.green},${team.blue})`,color:`${blackOrWhite}`,width:`${eachFlexWidth}`}}>
                <p className="text-center font-bold mb-2">{team.jpn_name}</p>
                <ul>
                <AnsweredLiComponents 
                key={index}
                total_n={total_n}
                team={team.eng_name}    
                blackOrWhite={blackOrWhite}
                boxes={teamsAndBoxes[team.eng_name]}
                openedInput={openedInput}
                liHeight={liHeight[team.eng_name]}            
                nowAnalyzing={nowAnalyzing}
                isAfter={isAfter}
                inputRefs={inputRefs} 
                inputSets={inputSets}
                setInputSets={setInputSets}       
                />
                </ul>
            </div>
        );

        // グループに、それぞれの要素を追加
        groupComponents.push(eachComponent);
        
        // チームの最終行の場合、UIのバランスを整える
        groupComponents=LastRawAdujsting(groupComponents,index,teams,flexCounts,eachFlexWidth);

        // flexCountで割ったあまりがflexCounts-1になる時、もしくは最後の要素の時は、flexで要素ごとにまとめる
        [returnedByTeamComponents,groupComponents,group_index]=ifFlexLast(returnedByTeamComponents,groupComponents,index,flexCounts,teams,group_index);

        // 合計数に、そのチームの人数合計をたす
        total_n=total_n+Number(teamsAndBoxes[team.eng_name]);

    })
    return(returnedByTeamComponents);
};