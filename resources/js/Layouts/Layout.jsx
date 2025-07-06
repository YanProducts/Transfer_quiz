import backgroundImage from '../../img/back.jpg';
import { Link,Head } from '@inertiajs/react';

export default function Layout({ children,pageName="TopPage", title="トップ"}) {
    return (
        <>
            <Head title={`移籍クイズ-${title}`}/>
            <main className="min-h-screen" style={{backgroundImage: `url(${backgroundImage})`,backgroundSize:"contain",backgroundRepeat:"repeat",}}>
                    {children}
            {pageName==="TopPage" ? null :
               <div className='base_link base_frame mx-auto max-w-[600px]'><p className='base_link_p'><Link href="topPage">トップへ</Link></p></div>
             }
            </main>

        </>
    );
}
