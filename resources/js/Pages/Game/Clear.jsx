import Layout from "@/Layouts/Layout";
export default function Clear({cate,nameType,quizType}){

  return(
    <Layout pageName="Claer" title="ゲームクリア" >
      <p>　</p>
      <div className="base_frame bg-black">
        <h1 className="text-center mt-5 base_h1 mx-auto text-white">ゲームクリア！</h1>
      </div>

        <div className="base_frame mt-3 base_border mb-5">
          <h2 className= "base_h text-3xl bg-gray-400 font-bold text-yellow-200 py-5 w-[100%] shadow-black">おめでとうございます</h2>
        </div>

        <div className="base_frame base_backColor base_border pb-5">
          <p className="font-bold text-center text-xl pt-4 pb-2 mb-2 border-b-2 border-black w-[3/5]">ゲーム内容</p>
          <p className="font-bold text-center text-xl mt-3">カテゴリー：{cate}</p>
          <p className="font-bold text-center text-xl mt-2">回答形式：{nameType}</p>
          <p className="font-bold text-center text-xl mt-2">クイズ形式：{quizType}</p>
        </div>
    </Layout>
    )
}