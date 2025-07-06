import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

//envの読み込みができるようにする(VITE_が付いたもの)
import dotenv from 'dotenv';
// .env の読み込み
dotenv.config();


export default defineConfig({
    base: process.env.VITE_APP_ENV === 'production' ? '/build/' : "",
    plugins: [
        react(),
        laravel({
//reactを仕様する場合はjsxにする
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
    css:{
     devSourcemap: true,  //エラーの原因がどこか
    },
    optimizeDeps: {
        exclude: ['fsevents']
       },
//ローカルの際のfetch送信に使用(本番はbuild済のファイルから)
    server: {
        host: "0.0.0.0",
        port: 5173, // 通常のViteサーバーのポートを指定
        proxy: {
            '/api': 'http://localhost:8000', // Laravelバックエンドへのプロキシ設定
        },
           fs: {
        strict: false, // ファイルシステムの制約を解除
        }
    },

    // 本番用
    build: {
        outDir: 'public/build', // ← このフォルダが参照される
        emptyOutDir: true, // ビルド前にフォルダをクリア
    },
});
