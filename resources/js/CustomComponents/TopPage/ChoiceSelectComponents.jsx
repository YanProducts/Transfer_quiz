import SelectOptionComponents from "../Common/SelectOptionComponents"

// クイズの選択パターンを返す
export default function ChoiceSelectComponents({what,obj,phrase,setData,errors,errorDisplay}){
    const onChoiceSelectChange=(e)=>{
        setData(prevState=>({
            ...prevState,
            [what]:e.target.value
        }))
    }

    return(
        <div className='base_frame base_backColor my-5 py-5 rounded-xl max-w-[700px]'>
        <p className='text-lg font-bold text-center mb-2'>{phrase}</p>
        <SelectOptionComponents onChoiceSelectChange={onChoiceSelectChange} obj={obj} errors={errors} what={what} errorDisplay={errorDisplay} />
        </div>
    )
}
