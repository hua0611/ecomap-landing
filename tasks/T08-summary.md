## T08: /api/subscribe API route + Google Sheet webhook 整合

`app/api/subscribe/route.ts`（Next.js App Router Route Handler）：POST method，使用 zod 4 的 `z.email()` + `z.enum()` 驗證 request body（`{ email, source }`）。

Fail-soft 行為：
- GOOGLE_SHEET_WEBHOOK_URL 未設定 → console.warn + 回傳 200 ok:true
- webhook fetch 失敗 → console.error + 回傳 200 ok:true
- email 格式錯誤 → 回傳 400 `{ ok: false, error: "invalid_email" }`
- source 格式錯誤 → 回傳 400 `{ ok: false, error: "invalid_source" }`

Webhook payload 包含：email、source、timestamp（ISO 8601）、user_agent。

實測結果：
- POST 正確 email → 200 `{"ok":true}` ✓
- POST 無效 email → 400 `{"ok":false,"error":"invalid_email"}` ✓
- POST 無效 source → 400 `{"ok":false,"error":"invalid_source"}` ✓

狀態：完成
