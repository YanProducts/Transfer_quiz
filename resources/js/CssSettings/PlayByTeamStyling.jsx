    // flexの個数と長さの定義用
    export const InnerWidthSetting=(setFlexCounts,innerWidth,setEachFlexWidth)=>{

            // widthのベース
            let baseWidth=innerWidth*4/5;
            // width最小値
            if(innerWidth<375){
                baseWidth=300;
            }

            let flexWidth="";
            if(innerWidth>1450){
                flexWidth=(baseWidth/7 -32);
                setFlexCounts(7)
            }else if(innerWidth>1250){
                flexWidth=(baseWidth/6 -28);
                setFlexCounts(6)
            }else if(innerWidth>1050){
                flexWidth=baseWidth/5 -24;
                setFlexCounts(5)
            }else if(innerWidth>850){
                flexWidth=baseWidth/4 -20;
                setFlexCounts(4)
            }else if(innerWidth>650){
                flexWidth=baseWidth/3 -16;
                setFlexCounts(3)
            }else if(innerWidth>400){
                flexWidth=baseWidth/2 -12;
                setFlexCounts(2)
            }else{
                flexWidth=baseWidth -8;
                setFlexCounts(1)
            }
            setEachFlexWidth(flexWidth + "px")
    }


    // inputの高さ定義用
    export const LiHeightSetting=(setLiHeight,teamsAndBoxes)=>{
        let liHeightBase={}
        Object.entries(teamsAndBoxes).forEach((teamsAndBox)=>{
        const team=teamsAndBox[0];
        const box=Number(teamsAndBox[1]);
        if(box===0){
            liHeightBase={...liHeightBase,[team]:"0px"}
        }else if(box<3){
            liHeightBase={...liHeightBase,[team]:"45px"}
        }else if(box<5){
            liHeightBase={...liHeightBase,[team]:"40px"}
        }else if(box<7){
            liHeightBase={...liHeightBase,[team]:"38px"}
        }else if(box<9){
            liHeightBase={...liHeightBase,[team]:"35px"}
        }else if(box<11){
            liHeightBase={...liHeightBase,[team]:"32px"}
        }else if(box<13){
            liHeightBase={...liHeightBase,[team]:"29px"}
        }else{
            liHeightBase={...liHeightBase,[team]:"25px"}
        }
     })
    //  stateに反映
     setLiHeight(liHeightBase);
    }
