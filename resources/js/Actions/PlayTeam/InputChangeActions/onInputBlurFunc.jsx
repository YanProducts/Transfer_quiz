// 離れる際に①フォーカスを今の位置から離す②値の確定(空値以外)
export default function onInputBlurFunc(ignoreInputFocus,tempInputValue,total_n,setInputSets,team){

  // 再度同じ位置のフォーカスを避ける
     ignoreInputFocus.current=true;

     // 一旦カーソルが当てられただけなら何もしないでreturn
     if(!tempInputValue.current[total_n]){
       return;
     }
 
     // Tabなどの自然フォーカス移動を邪魔しないよう、少し遅らせてstate更新(tabの方を先に更新)
     setTimeout(() => {
         setInputSets((prevState) => ({
         ...prevState,
         [total_n]:{
           "team":team,
           "player":tempInputValue.current[total_n]
         }}));
 
     }, 1);
}