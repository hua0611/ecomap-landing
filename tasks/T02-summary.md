## T02: 色票 token 與字體設定

在 `app/globals.css` 以 Tailwind 4 的 `@theme {}` 語法（非 V3 的 tailwind.config.ts）注入全部 9 個色票 token：forest-900/700/500、cream-50/100、coral-500/600、ink-900/600。字體 CSS variable 也在 `@theme` 內定義：`--font-serif` 和 `--font-sans`。`app/layout.tsx` 改用 `Noto_Serif_TC` + `Noto_Sans_TC`（next/font/google），語言設為 `zh-TW`。同時加入 `animate-spin-slow` 和 `animate-fade-in-up` CSS keyframe 動畫用於 loading 狀態。

狀態：完成
