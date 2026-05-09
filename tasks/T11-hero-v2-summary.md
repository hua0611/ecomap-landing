# T11: Hero V2 — 4-Slide Carousel + EmailBar

## 任務描述

將 EcoMap landing page 的 V1 Hero（單張靜態）升級為 4-slide 自動輪播，套用 TRON OPTO 官網模板的 hero pattern，新增 EmailBar section。

## 修改 / 新增的檔案

| 檔案 | 動作 |
|------|------|
| `components/hero.tsx` | 覆寫（V1 → V2 4-slide carousel） |
| `components/email-bar.tsx` | 新增（Hero 下方 mini email bar） |
| `app/page.tsx` | 插入 `<EmailBar />` 在 Hero 之後、ProblemStats 之前 |
| `package.json` | 新增 framer-motion ^12.38.0 |

## 技術實作摘要

### framer-motion
- 版本：12.38.0（React 19 + Next.js 16.2.6 相容，無破壞性 API）
- 使用：AnimatePresence、motion、useMotionValue、useTransform

### hero.tsx V2 架構
- `SLIDES_CONFIG`：4 張 slide 內容全部寫死常數（dashboard / tracking / merchant / policy）
- `AnimatedTitle`：逐字 stagger 進場（delay = lineIdx * 0.06 + charIdx * 0.025）
- `SlideText`：AnimatePresence mode='wait' 包覆，slide 切換時 exit fade
- `GlowFollower`：useSyncExternalStore 防 hydration mismatch；useMotionValue + useTransform 計算 left/top
- `AUTO_INTERVAL = 6000`：useEffect setInterval，互動後 setIsPlaying(false) 停止
- Gradient 背景：AnimatePresence mode='wait' 動畫切換（opacity 0→1）
- CTA：珊瑚橘漸層主 CTA + shimmer hover；次 CTA outline 隨 hasOverlay 切換顏色
- 響應式：style 內嵌 media query 讓手機標題降至 clamp(2rem, 8vw, 3rem)

### email-bar.tsx
- 米白底（#F5F0E5），上下細框線
- 左側標題「想第一時間試用 EcoMap？」+ 副說明
- 右側復用現有 `<EmailForm source='hero' variant='light' />`
- 桌面橫排 / 手機 stack（style 內嵌 media query）

## build / lint 結果

```
npm run build  → ✓ 通過（TypeScript 無 error，靜態頁 / API route 正常）
npm run lint   → ✓ 通過（無 warning、無 error）
```

## 已知 TODO / 限制

1. **手機 stack** 目前透過 `<style>` 標籤內嵌 media query 實現（因為 Tailwind 4 breakpoint prefix 在部分 inline-style 場景失效）；如需改用 Tailwind 類名可在後續 QA 優化。
2. **手機標題縮字** 同樣用 `<style>` 標籤，但 H1 沒有 `className="hero-title-h1"`（inline fontSize 優先），改用 clamp 已足夠覆蓋響應式需求，保持 clamp(2.5rem, 5.5vw, 6rem) 在手機上也能縮到 ~2.5rem。
3. **framer-motion 12.x** 不需要 @gsap/react 或任何 peer dependency，React 19 支援已內建。

## 給使用者的下一步操作

1. `cd projects/ecomap-landing && npm run dev` → 開啟 `localhost:3000` 驗收
2. 在桌面模式確認：
   - 4 張 slide 每 6 秒自動切換
   - 點 ◀ / ▶ 或進度條可手動切換並停止 autoplay
   - 標題逐字進場動畫
   - 滑鼠移動時光暈跟隨
   - 主 CTA hover 出現 shimmer
3. 切 375px 確認：標題不破版，EmailBar 上下排列
4. 確認 Hero 下方緊接 EmailBar（米白底），再下方是 ProblemStats
