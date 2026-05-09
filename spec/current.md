# EcoMap Landing Page — Spec

## 0. 專案目標

替黑客松產品 EcoMap（循環容器經濟成果儀表板）做一頁式 landing page，主要目的：
1. 讓黑客松評審 / 早期關注者**留下 email**（候補名單）
2. **嵌入 demo iframe** 讓訪客實際操作 dashboard
3. 視覺風格與 demo 本體一致（深森林綠 + 米白 + 編輯感字體）

## 1. 技術棧（鎖定，不可變更）

- **框架**：Next.js 15（App Router）
- **語言**：TypeScript
- **樣式**：Tailwind 4（用 `@theme` 語法注入色票，不用 tailwind.config.ts 的 V3 寫法）
- **字體**：Noto Serif TC（標題）+ Noto Sans TC（內文），透過 `next/font/google` 載入
- **部署**：預設兼容 Vercel 與 Zeabur，產出兩者部署指南
- **Email 儲存**：Google Sheets via Apps Script Webhook（不用 DB）

⚠️ **框架版本查核協議**：開工前必須執行 `framework-version-guard` skill 三步驟，確認 Next.js 15 / Tailwind 4 / React 19 的最新 API。Tailwind 4 與 V3 設定方式差異極大，務必以官方 v4 文件為準。

## 2. 色票（從 demo 截圖萃取，鎖定）

```css
@theme {
  --color-forest-900: #1F3D2E;   /* 主深綠 — sidebar、按鈕主色、深底反白區 */
  --color-forest-700: #2A5240;   /* 副深綠 — hover 狀態 */
  --color-forest-500: #6B8E6F;   /* 圖表柔綠 — accent、icon */
  --color-cream-50:   #F5F0E5;   /* 米白底 — 主背景 */
  --color-cream-100:  #EAE3D2;   /* 副底色 — 卡片、區塊區隔 */
  --color-coral-500:  #E07856;   /* 強調色 — 主 CTA 按鈕 */
  --color-coral-600:  #C8633F;   /* CTA hover */
  --color-ink-900:    #2A3A2E;   /* 主要文字 */
  --color-ink-600:    #5A6B5E;   /* 次要文字 */
}
```

## 3. 頁面結構（5 段 + Nav + Footer）

### 3.1 Nav（透明置頂，scroll 後加米白底）
- Left: `EcoMap` logo 文字（serif 字體，深綠色）
- Right: 「查看 Demo」錨點連結（捲到 #demo）

### 3.2 Hero
- **主標語**（鎖定，不可改）：
  > 讓每一個容器，都被看見它的循環價值。
- **副標**：
  > EcoMap 把外送與外帶包材的循環數據，變成一張人人都看得懂的政策儀表板。
- **主 CTA**：Email input + 「加入候補」按鈕（珊瑚橘）
- **副文案**：「一個 email 就能在公測時搶先試用」
- 背景：cream-50，可選擇加極輕微的 grain texture（CSS noise filter）

### 3.3 Problem（震撼數字）
- 標題：「為什麼這件事重要？」
- 三個數字卡片（橫排，手機改直排）：
  - **80 億**｜台灣每年丟棄的一次性飲料杯數量
  - **38%**｜外送平台訂單佔餐飲業比例（持續上升）
  - **<3%**｜目前實際進入循環系統的容器比例
- 每個卡片：大數字（serif）+ 標籤 + 簡短說明
- 註：數字若無法 100% 確認，使用「估計」字樣，並在 footer 註明資料來源 placeholder

### 3.4 Solution + Demo（核心區，#demo 錨點）
- 區塊標題：「一張表，看懂全城循環容器的流轉。」
- 簡短三句話描述功能（例：店家加入、容器旅程、政策成效）
- **Demo iframe**：
  - 容器：`max-w-6xl`，aspect-ratio `16:10` 桌面、`9:16` 不適用（保持桌面比例，手機可橫向滾動或顯示「請用桌面查看」提示）
  - 邊框：模擬 Mac 視窗 chrome（三個圓點 + 假網址列），增加質感
  - Loading：iframe 載入前顯示 skeleton（深綠 spinner on cream）
  - **iframe src**：`process.env.NEXT_PUBLIC_DEMO_URL`，預設值 placeholder（例如指向 `https://ecomap-demo-placeholder.vercel.app` 或顯示 fallback 區塊「Demo 即將上線」）

### 3.5 Features（3 張小卡）
- 為店家：免押金、免清洗、按次計費
- 為消費者：掃 QR Code 借還、累積環保里程
- 為政策制定者：即時儀表板看城市減塑成效
- 每張卡：icon + 標題 + 1-2 句說明

### 3.6 Final CTA（深綠反白）
- 背景：forest-900
- 文字：cream-50
- 標題：「準備好讓你的城市開始計算循環價值了嗎？」
- Email input + 「加入候補」按鈕（珊瑚橘 CTA）
- 副文案：「公測啟動時第一時間通知你」

### 3.7 Footer
- 左側：EcoMap logo + 「© 2026 EcoMap」
- 右側：聯絡 email（placeholder：`hello@ecomap.example`）
- 底部：資料來源備註（placeholder）
- **不顯示**隊伍名、黑客松名、年份外的識別資訊

## 4. Email 收集流程

```
[使用者] → [EmailForm 元件] → POST /api/subscribe
                                    ↓
                              [zod 驗證 email 格式]
                                    ↓
                              [forward to Google Apps Script Webhook]
                                    ↓
                          [寫進 Google Sheet]
                                    ↓
                          [回傳 {ok: true}]
                                    ↓
                       [前端顯示「已收到」訊息]
```

### 4.1 API Route 規格
- 路徑：`app/api/subscribe/route.ts`
- 方法：POST
- 請求 body：`{ email: string, source: "hero" | "footer" }`
- 驗證：
  - email 格式必須合法（用 zod 或 regex）
  - source 必須是 `"hero"` 或 `"footer"`
- 處理：
  - 從 `process.env.GOOGLE_SHEET_WEBHOOK_URL` 拿 URL
  - 若 env var 不存在 → 回傳 500 + log warning，但 **不要拋給前端**，前端顯示「已收到」（避免 demo 時尷尬）
  - 用 fetch POST 到 webhook，附上 `email`、`source`、`timestamp`、`user-agent`
- 回應：
  - 成功：`{ ok: true }` 200
  - email 格式錯誤：`{ ok: false, error: "invalid_email" }` 400
  - webhook 失敗：仍然回 `{ ok: true }` 200（fail-soft，但內部 log 錯誤）

### 4.2 EmailForm 元件規格
- 共用元件：`components/email-form.tsx`
- props：`source: "hero" | "footer"`、`variant: "light" | "dark"`（控制配色）
- 狀態：
  - idle（初始）
  - submitting（按鈕 disabled，文字「送出中…」）
  - success（顯示「✓ 已收到，我們上線時通知你」，hide form）
  - error（顯示錯誤文字，保留 form 可重試）
- 客端先做 `type="email"` + regex 預檢，避免空送
- HTML：`<form>` + `<input>` + `<button type="submit">`，無 JS 也至少能送（但成功訊息需 JS）

## 5. 元件清單（建議拆法）

```
app/
  layout.tsx             ← 字體、metadata、OG tags、html lang="zh-TW"
  page.tsx               ← 組合所有 section
  globals.css            ← Tailwind import + @theme 色票 + 全域字體
  api/subscribe/route.ts ← Email API
components/
  nav.tsx
  hero.tsx
  problem-stats.tsx
  demo-frame.tsx         ← iframe wrapper（含 Mac chrome、skeleton）
  feature-cards.tsx
  final-cta.tsx
  email-form.tsx         ← 共用，hero + final CTA 都用它
  footer.tsx
  ui/
    container.tsx        ← max-width wrapper
    section.tsx          ← 統一 section padding
lib/
  validate.ts            ← email 驗證 helper
public/
  logo.svg               ← 簡易 SVG logo（serif "EcoMap" 文字 + 葉片符號）
  og-image.png           ← placeholder 1200x630
```

## 6. 環境變數

`.env.example`：
```
# Demo iframe 來源 URL（必填）
NEXT_PUBLIC_DEMO_URL=https://ecomap-demo.example.com

# Google Apps Script Webhook URL（必填，從 Sheet 取得）
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
```

## 7. 交付物清單

1. ✅ 完整 Next.js 15 專案，本地 `npm install && npm run dev` 即跑
2. ✅ `README.md`：本地開發指南、環境變數說明、部署指南（Vercel + Zeabur 兩版）
3. ✅ `docs/google-apps-script-setup.md`：5 步驟 Apps Script 設定教學（含完整 GAS 程式碼）
4. ✅ `.env.example`
5. ✅ `.gitignore`（標準 Next.js + 排除 `.env.local`）
6. ✅ TypeScript 嚴格模式、無 `any`
7. ✅ Tailwind 4 響應式（≥1024px 桌面 / ≥768px 平板 / <768px 手機）
8. ✅ Lighthouse 桌面分數 ≥ 90（Performance / Accessibility / Best Practices / SEO 全部）

## 8. 驗收標準（QA Reviewer 必查）

| 項目 | 標準 |
|---|---|
| 本地啟動 | `npm install && npm run dev` 無 error，瀏覽器打開 localhost:3000 完整顯示 |
| 色票一致 | 視覺與 demo screenshot 風格相符（深綠 + 米白 + 珊瑚橘 CTA） |
| 字體載入 | Noto Serif TC（標題）+ Noto Sans TC（內文）正確載入，無 FOUC |
| iframe | 顯示 placeholder 或 fallback；env var 改變後 src 跟著變 |
| Email API | 用 curl POST 測試三種 case：正確 email / 錯誤格式 / 無 webhook URL |
| 響應式 | Chrome devtools 切 iPhone 14 / iPad / Desktop 三尺寸無破版 |
| 無 console error | 開發者工具 console 沒有 red error |
| TS 編譯 | `npm run build` 成功，無 type error |
| Lint | `npm run lint` 通過（用 Next.js 內建 eslint-config-next） |
| README | 跟著走能 5 分鐘部署到 Vercel 並收到第一封 email |

## 9. 不在範圍

- ❌ 客製化 illustrative graphics（用簡單 SVG icon 或 emoji 替代）
- ❌ 動畫框架（GSAP）— 只用 Tailwind transitions 與 CSS keyframes
- ❌ 多語言（純 zh-TW）
- ❌ 後端 DB（純 Google Sheet）
- ❌ Auth / 用戶系統
- ❌ Cookie banner / 隱私政策頁（hackathon 階段不需要）
- ❌ Blog / Press / About 等次要頁面
- ❌ A/B test infra
- ❌ Email confirmation double opt-in（hackathon 階段省略）

## 10. 開工指令給 fullstack-dev agent

請依此 spec 執行下列順序：

1. 先執行 `framework-version-guard` skill 三步驟，確認 Next.js 15 / Tailwind 4 / React 19 的 API
2. 在 `D:\TASK\forge-internal\projects\cycmap-landing\` 下用 `npx create-next-app@latest .` 初始化（TypeScript + Tailwind + App Router + 不要 src/ + 不要 import alias 改）
3. 升級 / 確認 Tailwind 4，調整 `globals.css` 用 `@theme` 注入色票
4. 建立元件清單中的所有檔案
5. 實作 `/api/subscribe` route + zod 驗證 + Google Sheet webhook forward
6. 撰寫 `docs/google-apps-script-setup.md`（包含可直接貼用的 Apps Script 程式碼）
7. 撰寫 `README.md`（本地 + Vercel + Zeabur 部署指南）
8. 自我驗證：`npm run build` 通過、`npm run lint` 通過、本地實測 email API
9. 在 `tasks/T01-T10` 下逐項記錄完成狀態
10. 完成後回傳完整的 task summary，含已知 TODO 與部署步驟提示

**禁止行為**：
- ❌ 不可改主標語文案
- ❌ 不可改色票色碼
- ❌ 不可加 Footer 隊伍/黑客松資訊
- ❌ 不可改技術棧（Next.js 15 + Tailwind 4 鎖定）
- ❌ 不可加 DB（必須用 Google Sheet webhook）
