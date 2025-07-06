import SelectOptionComponents from "../Common/SelectOptionComponents"

export default function ChoiceSelectComponents({what,obj,phrase,setData,errors,errorDisplay,plusClassName=""}){

    const onChoiceSelectChange=(e)=>{
      setData(prevState=>({...prevState,[what]:e.target.value}))
    }

  return(
    <div className="base_frame border-2 border-black rounded-md pt-5 pb-7 text-center mb-5  min-w-[400px]">
    <p className="mb-3">{phrase}</p>

    <SelectOptionComponents onChoiceSelectChange={onChoiceSelectChange} obj={obj} errors={errors} what={what} errorDisplay={errorDisplay} className={plusClassName}/>
  
  </div>
  )
}