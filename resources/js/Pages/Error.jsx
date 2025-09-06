import ErrorMessageChange from "@/Utils/Error/ErrorMessageChange";
import Layout from "../Layouts/Layout";

export default function Error({message}){


    console.log(message);

    // エラーメッセージの変更
    // 必要なケースあるか要チェック！
    ErrorMessageChange(message);

    return(
        <Layout pageName="Error" title="エラー">
            <>　</>
            <h1 className="base_h base_h1 mt-5 py-5">エラーのお知らせ</h1>
            <div className="base_frame base_error text-xl py-3 font-bold whitespace-pre-line">
                <p className="text-center">{message ?? "予期せぬエラーです"}</p>
            </div>
        </Layout>
    )
}
