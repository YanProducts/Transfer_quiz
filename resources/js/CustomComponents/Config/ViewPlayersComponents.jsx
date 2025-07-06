//該当する選手リストの表示 
export default function ViewPlayersComponents({borderColorCSS,matchedTheme,matchedPlayersComponents,index}){
  return(
    <div className={`my-5 w-[400px] ${borderColorCSS} border-4  border-opacity-100 px-5 pt-4 pb-7 mx-auto text-xl rounded-xl`} key={index}>
    <h2 className="base_h my-3 font-bold text-left w-[200px] min-w-[150px]">{matchedTheme}</h2>
     {matchedPlayersComponents}
  </div>
  )

}