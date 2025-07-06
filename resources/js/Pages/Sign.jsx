import Layout from "@/Layouts/Layout"

export default function Sign({message=null}){
    return(
        <Layout pageName="Sign" title="お知らせ">
            <p>　</p>
            <div className="base_frame base_error text-xl py-3 font-bold whitespace-pre-line">
                <p className="text-center">{message ?? "お知らせはありません"}</p>
            </div>
        </Layout>
    )
}
