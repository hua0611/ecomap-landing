## T09: README + Apps Script 設定指南 + 部署指南

`README.md`：含本地開發 5 步驟（install → .env.local → dev → curl 驗證）、環境變數說明表格、Vercel 部署指南（5 步驟）、Zeabur 部署指南（6 步驟）、常見問題 FAQ。

`docs/google-apps-script-setup.md`：完整 5 步驟指南（建立 Sheet → 開啟 Apps Script → 貼入完整 GAS 程式碼 → 部署為 Web App → 設定環境變數），含可直接貼用的 Apps Script doPost 函數（含 testInsert 測試函數）、curl 驗證指令、注意事項（更新後需重新部署等）。

`.env.example`：含 NEXT_PUBLIC_SITE_URL、NEXT_PUBLIC_DEMO_URL、GOOGLE_SHEET_WEBHOOK_URL 三個變數及說明。`.gitignore` 修正：排除 `.env` / `.env.local` 等但保留 `.env.example`。

`public/logo.svg`：28x28 循環容器主題 SVG logo（圓形箭頭 + 葉片）。`public/og-image.svg`：1200x630 OG image placeholder（深綠背景 + 白字）。

狀態：完成
