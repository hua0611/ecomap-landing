## T03: 共用元件（Nav / EmailForm / Footer）

建立三個共用元件：
- `components/nav.tsx`（client component）：透明置頂 nav，useEffect 監聽 scroll，超過 20px 加米白底 + backdrop-blur。Logo 使用 `next/link`（修正 eslint no-html-link-for-pages 錯誤）。
- `components/email-form.tsx`（client component）：props 為 `source: 'hero'|'footer'` + `variant: 'light'|'dark'`，四個狀態（idle/submitting/success/error），客端先以 regex 預檢 email，useRef 取 input 值（避免 React 19 setState updater side effect 問題）。
- `components/footer.tsx`（server component）：顯示 Logo + 版權 + 聯絡 email，底部資料來源備註，不顯示隊伍/黑客松資訊。
- `components/ui/container.tsx` + `components/ui/section.tsx`：共用 max-width wrapper 與 section padding。

狀態：完成
