# Hero V2 — 4-Slide Carousel 重設計

## 變更動機

V1 Hero 是單張靜態畫面，適合稅務型 landing page，但對黑客松評審來說資訊密度低、視覺衝擊弱。V2 改為 4-slide 自動輪播 hero，套用 TRON OPTO 官網模板的 hero pattern，一次秀 4 個產品功能切面，提升評審記憶點與停留時間。

## 參考來源（必讀，**不可重新發明**）

- 模板路徑：`D:\TASK\forge-internal\projects\tron-opto\offical_website_template-main\offical_website_template-main\src\app\[locale]\_components\home\Hero.tsx`
- 此檔已整合：framer-motion AnimatePresence + 逐字 stagger 標題 + 滑鼠跟隨光暈 + 進度條 indicator + 自動輪播 + 互動後停止
- 直接 copy 結構，把 TRON OPTO 的 SLIDE_KEYS / SLIDE_IMAGES / 文案套成 EcoMap 4 張

## V2 變更鎖定清單

### 1. 引入 framer-motion（解禁原 spec 第 9 節「不在範圍」）

```bash
npm install framer-motion
```

V1 spec 第 9 節「不在範圍」中的「動畫框架（GSAP / Framer Motion）」一項 → V2 解除限制，僅允許 framer-motion 用於 Hero。其他 section 仍維持 Tailwind transition + CSS keyframes。

### 2. Hero 改為 4-slide 結構

四張 slide 的內容（**鎖定**，不可自由發揮）：

#### Slide 1 — `dashboard`（政策儀表板）
- **Badge 文字**：即時更新 • Live
- **標題（換行用 \n）**：
  ```
  看見一座城市的
  循環呼吸。
  ```
- **副標**：每分鐘更新的容器流轉、減塑成效、店家加入率 — 所有政策數據，一張表掌握。
- **主 CTA**：查看 Demo（連到 `#demo` 錨點）
- **次 CTA**：加入候補名單（連到 `#cta` 錨點）
- **Gradient 背景**：
  ```css
  background:
    radial-gradient(ellipse at 18% 25%, rgba(31,61,46,0.08) 0%, transparent 48%),
    radial-gradient(ellipse at 88% 82%, rgba(107,142,111,0.12) 0%, transparent 48%),
    #F5F0E5;
  ```
- **文字色**：`hasOverlay = false`（深色文字 in 米白底）

#### Slide 2 — `tracking`（容器旅程追蹤）
- **Badge 文字**：從借出到歸還 • Tracking
- **標題**：
  ```
  每一個容器，
  都有自己的故事。
  ```
- **副標**：QR Code 掃碼追蹤 — 它去過哪些店、用過幾次、洗了幾次、減了多少 CO₂，全部可追溯。
- **主 CTA**：了解技術（連 `#features`）
- **次 CTA**：查看 Demo（連 `#demo`）
- **Gradient 背景**（深綠 + 珊瑚橘斜對角光暈）：
  ```css
  background:
    radial-gradient(ellipse at 75% 30%, rgba(224,120,86,0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 20% 80%, rgba(31,61,46,0.45) 0%, transparent 60%),
    linear-gradient(135deg, #1F3D2E 0%, #2A5240 100%);
  ```
- **文字色**：`hasOverlay = true`（白色文字 + 深色 textShadow）

#### Slide 3 — `merchant`（店家管理後台）
- **Badge 文字**：給合作店家 • Operators
- **標題**：
  ```
  免押金、免清洗、
  免操心。
  ```
- **副標**：店家不買容器、不收押金、不用洗 — 掃 QR 出餐，平台處理所有後勤物流。
- **主 CTA**：成為合作店家（連 `#cta`）
- **次 CTA**：看店家後台（連 `#demo`）
- **Gradient 背景**（亮米白 + 柔綠點綴）：
  ```css
  background:
    radial-gradient(ellipse at 25% 30%, rgba(107,142,111,0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 75%, rgba(234,227,210,0.6) 0%, transparent 55%),
    #F5F0E5;
  ```
- **文字色**：`hasOverlay = false`

#### Slide 4 — `policy`（政策證明工具）
- **Badge 文字**：給政策制定者 • Policy
- **標題**：
  ```
  把減塑成果，
  變成政策證明。
  ```
- **副標**：自動產出減塑量、CO₂ 減排、回收率報告 — 符合 ESG 申報格式，一鍵下載。
- **主 CTA**：下載樣本報告（連 `#cta`）
- **次 CTA**：聯繫顧問（mailto:hello@ecomap.example，與 footer 一致）
- **Gradient 背景**（深綠重色 + 金黃光暈）：
  ```css
  background:
    radial-gradient(ellipse at 70% 25%, rgba(244,196,48,0.20) 0%, transparent 55%),
    radial-gradient(ellipse at 15% 75%, rgba(31,61,46,0.55) 0%, transparent 60%),
    linear-gradient(135deg, #1F3D2E 0%, #1a3326 100%);
  ```
- **文字色**：`hasOverlay = true`

### 3. CTA 配色調整（沿用珊瑚橘）

主 CTA 不論 slide 都是珊瑚橘漸層 + shimmer hover，沿用原模板的 shimmer 邏輯但改色：

```css
/* hasOverlay = false（亮底）的主 CTA */
background: linear-gradient(135deg, #E07856 0%, #C8633F 100%);
color: white;

/* hasOverlay = true（深底）的主 CTA：保持珊瑚橘以維持品牌一致 */
/* 同上 */
```

次 CTA 用 outline 風格，邊框與文字隨 `hasOverlay` 切換：
- `hasOverlay = false`：邊框 `#1F3D2E`，文字 `#1F3D2E`
- `hasOverlay = true`：邊框 `rgba(255,255,255,0.8)`，文字 `#ffffff`

### 4. EmailForm 從 Hero 移走

V1 的 `<EmailForm>` 在 hero 內 inline。V2 改為：

- Hero 內**不再放 EmailForm**（CTA 改為按鈕導錨點）
- Hero **下方插入新的 mini email bar section**（在 ProblemStats 之前）：
  ```
  ┌──────────────────────────────────────────────┐
  │  想第一時間試用 EcoMap？                       │
  │  [email input]  [加入候補 →]                   │  ← 米白底，深綠按鈕
  └──────────────────────────────────────────────┘
  ```
  這個 mini email bar 要 source="hero"（保持資料追蹤）
- Final CTA section 的 EmailForm 維持不變（source="footer"）

新增元件：`components/email-bar.tsx`（共用 EmailForm 但用更精簡的 layout）。

### 5. 技術細節（從 TRON OPTO 模板搬過來不要重新發明）

- `useState` for `current` / `isPlaying`
- `useMotionValue` + `useTransform` for 滑鼠光暈
- `useEffect` setInterval 6 秒切換
- `AUTO_INTERVAL = 6000`
- 互動（點 prev / next / 進度條）後 → `setIsPlaying(false)`，停止自動切換
- `useSyncExternalStore` 處理 SSR/hydration mismatch（GlowFollower 元件）
- `AnimatePresence mode='wait'` 包 SlideText
- 標題字級：`clamp(2.5rem, 5.5vw, 6rem)` （與模板一致）
- Hero 高度：`100vh, minHeight: 600px`

### 6. 移除原模板的「產品圖呼吸浮動」

EcoMap 沒有產品圖，slide 是純 gradient + 大字型。移除：

- ❌ `FloatingProductImage` 元件（保留模板的 import 結構但不用它）
- ❌ `SLIDE_IMAGES` / `SLIDE_FIT` constants
- ❌ 暗色 overlay 層（`hasOverlay` 邏輯保留，但不再因為「圖片是 cover 模式」自動套用，改為「深色 slide 用 overlay=true」）

### 7. 字體與品牌

繼續用 `Noto Serif TC`（標題 H1）+ `Noto Sans TC`（副標、Badge、CTA 文字）。模板的 `font-display` class 要對應到 `Noto Serif TC`。

### 8. 國際化（i18n）暫不引入

模板用 `useTranslations`，EcoMap V2 直接寫死中文文字（避免引入 next-intl 拖慢 hackathon 進度）。文案以常數 `SLIDES_CONFIG` 直接寫在 `hero.tsx` 內：

```tsx
type SlideKey = 'dashboard' | 'tracking' | 'merchant' | 'policy'
const SLIDES_CONFIG: Record<SlideKey, SlideContent> = { ... }
```

## V1 Hero 處理

舊的 `components/hero.tsx` **直接覆寫**，不要保留 V1 版本（黑客松不需要 A/B test）。

## 驗收標準

| 項目 | 標準 |
|---|---|
| `npm install framer-motion` | 成功，加進 `package.json` dependencies |
| `npm run build` | 通過，無 type error |
| `npm run lint` | 通過，無 warning |
| 4 張 slide 視覺 | 4 種不同 gradient + 文案，每張 6 秒自動切 |
| 互動 | 點 prev/next 切張、點進度條跳張、點任一互動後停止 autoplay |
| 標題逐字進場 | 第一張載入時標題逐字 stagger，切張時新標題重新 stagger |
| 滑鼠跟隨光暈 | 桌面版滑鼠移動時光暈跟隨，手機版可省略 |
| 響應式 | 手機 <768px：標題字級降到 `clamp(2rem, 8vw, 3rem)`，雙 CTA 改為 stack |
| EmailBar | Hero 下方緊接著一個米白底的 mini email bar，提交後一樣寫進 Google Sheet |
| 無 console error | 包含 hydration warning |

## 鎖定不可改

- ❌ 4 張 slide 的標題、副標文案（spec 寫死）
- ❌ 4 種 gradient 色碼（spec 寫死）
- ❌ Footer 內容（V1 已鎖定）
- ❌ 動畫框架不可換成 GSAP（hackathon 時程考量，沿用模板的 framer-motion 最快）
- ❌ Hero 仍要保留錨點導向 `#demo` 與 `#cta`（不要改 page.tsx 的 section 順序）
