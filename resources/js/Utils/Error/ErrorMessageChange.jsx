// フロントからURL伝いで来たエラーメッセージを英語から日本語へ
export default function ErrorMessageChange(base_message){
    switch(base_message){
        case "configNoLocalError":
            return "ローカルでしか行わないでください";
        break;
        case "clearResponseError":
            return "処理が異常です";
        break;
        case "unExpected":
            return "予期せぬエラーです";
        break;
        default:
         return import.meta.env.VITE_APP_ENV=== "local" ? base_message : "予期せぬエラーです";
    }
}
