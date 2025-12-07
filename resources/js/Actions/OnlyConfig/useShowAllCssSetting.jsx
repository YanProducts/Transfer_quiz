// 全新加入選手リストにおける色の設定
export function useShowAllCssSetting(){

  // 背景とフォントの色
  const needSettingBackGroundColorDiv=document.getElementsByClassName("needSettingBackGroundColor")
  Array.from(needSettingBackGroundColorDiv).forEach((div)=>{
    div.style.backgroundColor="rgb(" + div.dataset.red + "," + div.dataset.green + "," + div.dataset.blue + ")" 
    div.style.color=0.299*div.dataset.red + 0.587 *div.dataset.green + 0.114*div.dataset.blue > 128 ? "black" : "white";
  })

  // ボーダーの色
  const needSettingBorderColorH3=document.getElementsByClassName("needSettingBorderColor")
  Array.from(needSettingBorderColorH3).forEach(h3=>{
    const div=h3.closest("div");
    h3.style.borderColor=0.299*div.dataset.red + 0.587 *div.dataset.green + 0.114*div.dataset.blue > 128 ? "black" : "white";
  })
}