// 月の最終日のセット
export default function LastDayOnMonthSetting(selectedMonth,selectedYear,setMonthLastDay){
    if(selectedMonth==="no_choice"){
        setMonthLastDay(31)
        return;
    }

  selectedMonth=Number(selectedMonth)

 if([1,3,5,7,8,10,12].includes(selectedMonth)){
    setMonthLastDay(31);
  }else if([4,6,9,11].includes(selectedMonth)){
    setMonthLastDay(30);
  }else if(selectedYear!=="no_choice" && Number(selectedYear)%4===0){
    setMonthLastDay(29);
  }else{
    setMonthLastDay(28);
  }
}
