import { Inertia } from "@inertiajs/inertia";
// stateのerrorが変化した時に、errorをInertiaで投稿する
export default function visitErrorPage(error){
  

  if(Object.keys(error).length==0 || !Object.keys(error).includes("message")){
    return;
  }else{    
    const message=error?.message ? error.message : "undefined";
    Inertia.visit("error_from_front",{
      "method":"get",
      "data":{
        "message":message
      }
  });
  }
}