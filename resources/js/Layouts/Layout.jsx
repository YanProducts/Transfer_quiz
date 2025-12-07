import Ranking from '@/Pages/Ranking/Ranking';
import backgroundImage from '../../img/back.jpg';
import { Link,Head } from '@inertiajs/react';

export default function Layout({ children,pageName="TopPage", title="トップ", rankWhich="",pageErrors={}}) {
    return (
        <>
            <Head title={`移籍クイズ-${title}`}/>
            <main className="min-h-screen" style={{backgroundImage: `url(${backgroundImage})`,backgroundSize:"contain",backgroundRepeat:"repeat",}}>
                    {children}

            {/* 回答されたランクページへ */}
            {["TopPage","Clear"].includes(pageName) ? 
               <div className='base_link base_frame mx-auto max-w-[600px]'><p className='base_link_p'><Link href="/showRanking">回答された選手ランキングへ</Link></p></div> : null
             }
             {
                pageErrors.season ? <>
                    {/* 年代が異常値のときのエラー表示 */}
                    { errors?.season ? <div className={`base_error mt-3 base_frame`}><p>{pageErrors?.season}</p></div> : null}                
                </> :null
             }
             {/* 別の年代の回答ページを取得 */}
            {(pageName!=="Ranking"  || rankWhich!="") ? null :
               <div className='base_link base_frame mx-auto max-w-[600px] my-0'><p className='base_link_p'><Link href="/changeRankingSeason">別の年の結果を見る</Link></p></div>
             }
             {/* ランキングのトップページ */}
            {((pageName!=="Ranking" || rankWhich=="") && pageName!=="RankSeasonLists") ? null :
               <div className='base_link base_frame mx-auto max-w-[600px] my-0'><p className='base_link_p'><Link href="/showRanking">この年のランキングに戻る</Link></p></div>
             }
             {/* トップに戻る */}
            {pageName==="TopPage" ? null :
               <div className={`base_link base_frame mx-auto max-w-[600px]  ${pageName === "Ranking" ? "mt-2" : ""}`} ><p className="base_link_p" >{!pageName.includes("play") ? <Link href="/topPage">トップへ</Link> : <a href="/redirectTopPage">トップへ</a>} </p></div> 
             }
             <p>　</p>
            </main>

        </>
    );
}
