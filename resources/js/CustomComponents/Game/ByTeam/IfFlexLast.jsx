// flexCountで割ったあまりがflexCounts-1になる時、もしくは最後の要素の時は、flexで要素ごとにまとめる
export default function ifFlexLast(returnedByTeamComponents,groupComponents,index,flexCounts,teams,group_index){
    if(index%flexCounts===flexCounts-1 || index===teams.length-1 || flexCounts==1){
      returnedByTeamComponents.push(
          <div key={group_index} className="flex justify-around my-3 mx-1">
              {groupComponents}
          </div>
      )
      // グループ番号
      group_index++;
      // グループを空に
      groupComponents=[];
  }
  return [returnedByTeamComponents,groupComponents,group_index]
}