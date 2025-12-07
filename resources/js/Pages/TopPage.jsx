import Layout from '@/Layouts/Layout';
import ChoiceSelectComponents from '@/CustomComponents/TopPage/ChoiceSelectComponents';
import useTopPageDefinitions from '@/Definitions/TopPage/useTopPageDefinitions';
import React from 'react';
import useDeleteSessionDefinitions from '@/Definitions/TopPage/useDeleteSessionDefinitions';


export default function TopPage({quizSets,nameSets,cateSets}){

  
  // ゲームのsession一式を削除のfetch
  // (cacheをno-storeにはしているが)万が一、戻るから再びゲームに入るのを防ぐために先に定義
  useDeleteSessionDefinitions();

  // 定義セット
  const [setData,pageErrors,errors,setError,processing,errorDisplay,onDecideBtnClick]=useTopPageDefinitions();


    return(
      <Layout pageName="TopPage" pageErrors={pageErrors}>
        <>
           <div>　</div>
            <h1 className='base_h base_h1 py-2 mb-0'>Jリーグ(25年夏)</h1>
            <h1 className='base_h base_h1 mt-0 pb-2'>新加入選手クイズ</h1>
            <form className='base_frame'>
              <h3 className='base_h py-2 text-lg rounded-lg max-w-[700px]'>以下を選んでください</h3>
              <div>
                    <ChoiceSelectComponents what={"cate"} obj={cateSets} phrase={"カテゴリーは？"} setData={setData} errors={errors} errorDisplay={errorDisplay}/>
                    <ChoiceSelectComponents what={"quiz"} obj={quizSets} phrase={"問題形式は？"} setData={setData} errors={errors} errorDisplay={errorDisplay}/>
                    <ChoiceSelectComponents what={"name"} obj={nameSets} phrase={"回答形式は？"} setData={setData} errors={errors} errorDisplay={errorDisplay}/>
              </div>
              <div className='base_frame'>
                <button className={`base_btn font-bold ${processing ? "pointer-events-none opacity-30" : "pointer-events-auto opacity-100"}`} onClick={onDecideBtnClick}>決定！</button>
              </div>

            </form>
        </>
        </Layout>
    )
}
