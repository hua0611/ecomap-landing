## T10: QA 自我稽核

### npm run build
`✓ Compiled successfully` — 無 type error，無 build error。Route：`○ /`（static）、`ƒ /api/subscribe`（dynamic）。

### npm run lint
通過，0 errors，0 warnings。（修正了一個 `@next/next/no-html-link-for-pages` error：nav.tsx 的 `<a href="/">` 改為 `<Link href="/">`）

### API 實測
- POST 正確 email → 200 `{"ok":true}` ✓
- POST 格式錯誤 → 400 `{"ok":false,"error":"invalid_email"}` ✓
- POST 無 webhook URL（預設狀態）→ 200 `{"ok":true}` ✓（fail-soft 行為正確）

### Import 路徑檢查
所有元件使用 `@/` alias 路徑，tsconfig.json 已正確設定 `"paths": { "@/*": ["./*"] }`。元件間互相引用使用相對路徑（`./ui/container`），無錯誤路徑。

### 已知限制 / TODO
- OG image 使用 SVG 格式（`/og-image.svg`），若需 PNG 格式請自行轉換
- Demo iframe 在行動裝置以橫向滾動方式處理（spec 允許），可選擇加「請用桌面查看」overlay
- Noto Serif TC / Noto Sans TC 需要首次載入從 Google Fonts CDN 取得，部署時建議設定字體快取或考慮自托管字體
- `npm audit` 顯示 2 個 moderate vulnerabilities（來自 next 16 的 peer dependency），不影響功能

狀態：完成
