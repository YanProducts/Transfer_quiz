import React from "react";

import { useForm } from "@inertiajs/react";

export default function useCssSettingDefinitions(){

  // Css系統
    // flexの数
    const [flexCounts,setFlexCounts]=React.useState("");
    // flexの長さ
    const [eachFlexWidth,setEachFlexWidth]=React.useState("");
    // liのheight
    // const [liHeight,setLiHeight]=React.useState("30px");
    const [liHeight,setLiHeight]=React.useState({});

  return [flexCounts,setFlexCounts,eachFlexWidth,setEachFlexWidth,liHeight,setLiHeight];

}
