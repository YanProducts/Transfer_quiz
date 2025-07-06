// selectとoptionのDOM
// optionのvaalue:HTML表示がkey:valueのオブジェクトで渡された場合に限る
export default function SelectOptionComponents({onChoiceSelectChange,obj,errors,what,errorDisplay,className=""}){

  return(
    <>
      <select className={`block base_frame h-10 text-center font-bold min-w-[250px] ${className}`} onChange={onChoiceSelectChange}>
      <option key="0" value="no_choice" hidden>選択してください</option>
      {
          (Object.keys(obj)).map((key,index) =>
              <option key={index +1} value={key}>{obj[key]}</option>
          )
      }
    </select>
  
    {/* エラー表示 */}
    { errors?.[what] ? <div className={`base_error mt-3 base_frame ${errorDisplay}`}><p>{errors?.[what]}</p></div> : null}
  </>
  )
}