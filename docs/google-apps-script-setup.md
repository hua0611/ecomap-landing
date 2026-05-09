# Google Apps Script 設定指南

本指南說明如何建立 Google Sheet + Apps Script Webhook，讓 EcoMap Landing Page 能自動收集 email 候補名單。

---

## 前置需求

- Google 帳號（免費）
- 5 分鐘時間

---

## Step 1：建立 Google Sheet

1. 前往 [Google Sheets](https://sheets.google.com) 並建立新試算表
2. 將第一行（Row 1）設定為標題列：

   | A | B | C | D |
   |---|---|---|---|
   | email | source | timestamp | user_agent |

3. 記下試算表的 **Spreadsheet ID**（URL 中的那一串 ID）：
   ```
   https://docs.google.com/spreadsheets/d/【這裡是 ID】/edit
   ```

---

## Step 2：開啟 Apps Script

1. 在試算表中，點選上方選單 **「擴充功能」→「Apps Script」**
2. 刪除預設的 `Code.gs` 內容

---

## Step 3：貼入 Webhook 程式碼

將以下程式碼完整貼入 `Code.gs`：

```javascript
const SHEET_NAME = 'Sheet1' // 如果你的工作表名稱不同請修改

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME)

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'sheet_not_found' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    sheet.appendRow([
      data.email      || '',
      data.source     || '',
      data.timestamp  || new Date().toISOString(),
      data.user_agent || '',
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// 測試用：直接在 Apps Script 執行這個函數可以在 Sheet 新增一筆測試資料
function testInsert() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME)

  sheet.appendRow([
    'test@example.com',
    'hero',
    new Date().toISOString(),
    'Apps Script Test',
  ])

  Logger.log('Test row inserted.')
}
```

儲存（Ctrl+S 或 Cmd+S）。

---

## Step 4：部署為 Web App

1. 點選右上角 **「部署」→「新增部署作業」**
2. 選擇類型：**「網路應用程式」**
3. 設定如下：
   - **說明**：EcoMap Email Webhook
   - **以以下身份執行**：我（你的 Google 帳號）
   - **誰可以存取**：**「所有人」**（包含匿名者，這樣 Next.js server 才能呼叫）
4. 點選 **「部署」**
5. 若出現授權要求，請允許（需要讀寫 Spreadsheet 權限）
6. 複製產生的 **「網路應用程式 URL」**，格式如下：
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 5：設定環境變數

將上一步複製的 URL 貼入 `.env.local`：

```bash
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

重新啟動開發伺服器或重新部署到 Vercel/Zeabur。

---

## 驗證 Webhook 正常運作

用 curl 測試（在 terminal 執行）：

```bash
curl -X POST https://script.google.com/macros/s/AKfycb.../exec \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"hero","timestamp":"2026-01-01T00:00:00Z","user_agent":"curl"}'
```

若回傳 `{"ok":true}`，並在 Google Sheet 看到新增的一列，代表設定成功。

---

## 注意事項

- **更新程式碼後必須重新部署**：修改 Apps Script 後，需重新「部署 → 管理部署作業 → 建立新版本」，舊的 URL 才會反映新邏輯
- **授權範圍**：Apps Script 僅讀寫你自己的 Spreadsheet，不會存取其他資料
- **隱私**：email 資料儲存在你的 Google Sheet，你完全掌控；不透過任何第三方 email 服務
- **配額**：Google Apps Script 免費額度為每天 6 分鐘執行時間，足以處理早期 waitlist 流量

---

如有問題請聯絡 hello@ecomap.example
