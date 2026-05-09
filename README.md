# EcoMap Landing Page

循環容器經濟成果儀表板 — 黑客松展示頁

> 讓每一個容器，都被看見它的循環價值。

---

## 技術棧

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Fonts**: Noto Serif TC + Noto Sans TC
- **Email 儲存**: Google Sheets via Apps Script Webhook

---

## 本地開發

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

```bash
cp .env.example .env.local
```

編輯 `.env.local`，填入以下兩個必要變數：

```bash
# Demo iframe 的 URL（你的 EcoMap demo 部署網址）
NEXT_PUBLIC_DEMO_URL=https://your-ecomap-demo.vercel.app

# Google Apps Script Webhook URL（請參考 docs/google-apps-script-setup.md）
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

瀏覽器打開 [http://localhost:3000](http://localhost:3000)

### 4. 驗證 Email API

```bash
# 正確 email（應回傳 200 + ok:true）
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"hero"}'

# 錯誤格式（應回傳 400）
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"notvalid","source":"hero"}'
```

---

## 環境變數說明

| 變數名 | 說明 | 必填 |
|--------|------|------|
| `NEXT_PUBLIC_DEMO_URL` | Demo iframe 的 URL，若未設定則顯示「Demo 即將上線」fallback 畫面 | 建議填 |
| `GOOGLE_SHEET_WEBHOOK_URL` | Google Apps Script Webhook URL，未設定時 email API 仍回傳成功（fail-soft）但不儲存資料 | 正式環境必填 |

---

## 設定 Email 收集（Google Sheet）

請參考 [`docs/google-apps-script-setup.md`](./docs/google-apps-script-setup.md) 的 5 步驟指南。

---

## 部署

### 方案 A：Vercel（推薦）

1. 登入 [vercel.com](https://vercel.com)
2. 點選「Add New Project」，選擇此 repo
3. Framework Preset 選 **Next.js**（自動偵測）
4. 在 **Environment Variables** 填入：
   - `NEXT_PUBLIC_DEMO_URL` = 你的 demo URL
   - `GOOGLE_SHEET_WEBHOOK_URL` = 你的 Apps Script URL
5. 點選 **Deploy**

部署完成後，Vercel 提供的網址即可使用（如 `ecomap-landing.vercel.app`）。

若需自定義域名，在 Vercel 專案設定 → Domains 新增即可。

---

### 方案 B：Zeabur

1. 登入 [zeabur.com](https://zeabur.com)
2. 建立新 Project → 「Deploy Service」→ 選 Git 來源
3. 連接此 repo
4. 在 Service 設定 → **Environment Variables** 填入：
   - `NEXT_PUBLIC_DEMO_URL`
   - `GOOGLE_SHEET_WEBHOOK_URL`
5. 選擇 **Node.js** Runtime（Zeabur 會自動偵測 Next.js）
6. 點選 **Deploy**

Zeabur 會提供一個 `.zeabur.app` 子域名，也可以在 Networking 設定自定義域名。

---

## 常見問題

**Q: Email 送出後沒有寫進 Google Sheet？**
A: 確認 `GOOGLE_SHEET_WEBHOOK_URL` 有設定正確，並參考 `docs/google-apps-script-setup.md` 確認 Apps Script 已部署且授權「所有人」可存取。

**Q: Demo iframe 顯示「即將上線」？**
A: 設定 `NEXT_PUBLIC_DEMO_URL` 為你的 EcoMap demo 部署網址，重新啟動伺服器或重新部署。

**Q: 字體顯示不正確？**
A: Noto Serif TC / Noto Sans TC 需要網路連線從 Google Fonts CDN 載入。本地開發確保有網路連線。

---

## Build & Lint

```bash
npm run build   # TypeScript 編譯 + Next.js 生產 build
npm run lint    # ESLint 檢查
npm run start   # 啟動生產版本（先跑 build）
```
