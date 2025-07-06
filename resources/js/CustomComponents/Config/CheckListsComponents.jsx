import Checkbox from "@/Components/Checkbox"

export default function CheckListsComponents({data,what,phrase,checkAllTaskes,setCheckAllTaskes}){
  return(
    <div className="base_frame border-2 border-black rounded-md pt-5 pb-7 text-center mb-5 min-w-[400px]">
    <p className="mb-1">{phrase}</p>

    {what==="playersFileOK" ?
    <p className="mb-3">{data?.changeTheme ? `"storage\/app/files\/${data.changeTheme ==="onlyPlayer" ? "local" : "public"}` :"お待ちください" }</p>
    : null
    }
    <div className="text-lg font-bold">
        <Checkbox className="appearance-none w-5 h-5 border-4 border-black rounded-md bg-white checked:bg-black " onChange={(e)=>{setCheckAllTaskes(prevState=>({
            ...prevState,
            [what]:!checkAllTaskes[what]
        }))}}/>
        <span className="inline-block pl-1" style={{"transform":"translateY(2px)"}}>はい</span>
        </div>
  </div>
  )
}
