# Session 2026-05-09 — 專案啟動 + 完整 Landing Page 建構

## 背景

使用者 Frank 為黑客松產品 EcoMap（循環容器經濟成果儀表板）做單頁式 landing page，需求：
- 嵌入 demo iframe
- 收 email 候補名單
- 視覺風格與 demo 截圖一致（深森林綠 + 米白 + 編輯感）

## 進行流程

### 1. 路由判定
- 用戶意圖：landing page 開發 → 路由 A（新需求）
- 觸發 PM-style intake（簡化版，因為需求明確）

### 2. 需求釐清（6 個關鍵決定）
| 問題 | 用戶決定 |
|---|---|
| Demo 嵌入形式 | iframe（指向已部署 URL） |
| Email 儲存 | Google Sheet via Apps Script Webhook |
| 技術棧 | Next.js 15 + Tailwind 4 |
| Demo URL 狀態 | 還沒部署，用 placeholder |
| Footer 顯示隊伍/黑客松名 | 不要（保持乾淨） |
| Hero 主標語 | 「讓每一個容器，都被看見它的循環價值。」 |

### 3. 專案 scaffolding
- 建立 `projects/cycmap-landing/` 資料夾結構
- 寫 `project.json`、`spec/current.md`、`README.md`

### 4. 派遣 fullstack-dev agent
- 完整 spec 路徑提供
- 強調：執行 framework-version-guard、Tailwind 4 用 @theme 語法
- 鎖定不可改清單（主標語、色票、footer、技術棧、無 DB）

### 5. Dev agent 交付
- Next.js 升級為 16.2.6（spec 寫 15，API 相容，agent 適配成功）
- 11 個 components + API route + lib + docs 全數產出
- `npm run build` ✓、`npm run lint` ✓
- API 三種測試 case 全通過（含 fail-soft）

## 交付物清單

```
app/
  layout.tsx, page.tsx, globals.css, favicon.ico
  api/subscribe/route.ts
components/
  nav.tsx, hero.tsx, problem-stats.tsx, solution-demo.tsx,
  demo-frame.tsx, feature-cards.tsx, final-cta.tsx, footer.tsx,
  email-form.tsx
  ui/container.tsx, ui/section.tsx
lib/
  validate.ts
docs/
  google-apps-script-setup.md
public/
  logo.svg, og-image.svg
README.md, .env.example, project.json
```

## 使用者待辦（已交接）

1. 照 `docs/google-apps-script-setup.md` 建 Google Sheet + Apps Script webhook → 拿 URL → 填 `.env.local`
2. 部署 EcoMap demo → 拿 URL → 填 `.env.local` 的 `NEXT_PUBLIC_DEMO_URL`
3. 部署到 Vercel 或 Zeabur

## 關鍵決策回憶

- **不引入動畫框架**（GSAP/Framer Motion）— 黑客松時程考量，Tailwind transition 已足夠
- **不引入 DB** — 用 Google Sheet webhook 即可滿足候補名單需求
- **OG image 用 SVG** — placeholder 等使用者後續補正式 PNG
- **iframe 手機版**用 `overflow-x-auto` 而非強行縮放 — dashboard 內容密度高，桌面查看為主

## 下次 session 預期

- 部署協助（Vercel push 或 Zeabur cli）
- demo 部署完成後填 env var 並驗證
- 視情況 polish 視覺細節（grain texture、字體 fallback、og-image PNG）
