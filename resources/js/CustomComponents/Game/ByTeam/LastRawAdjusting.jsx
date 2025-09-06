// チームの最終行の場合、UIのバランスを整える
export default function LastRawAdujsting(groupComponents,index,teams,flexCounts,eachFlexWidth){

          // 最後の要素の時はUIのバランスを整える
          if(index===teams.length-1){
            // 必要な追加要素の数
            const requiredFlexDivCounts=(index+1)%flexCounts === 0 ? 0 : flexCounts-(index+1)%flexCounts;
    
            for(let n=0; n<requiredFlexDivCounts;n++){
                let eachHiddenComponent=(
                    <div key={index+n+1} className="border-2 p-2 mx-1 opacity-0" style={{width:`${eachFlexWidth}`}}>
                            <div>
                                <input className="w-full"/>
                            </div>
                    </div>
                );
                groupComponents.push(eachHiddenComponent);
                }
            }
  return groupComponents;    
}