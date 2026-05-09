## T06: Solution + Demo iframe section

`components/solution-demo.tsx`（server component）：id="demo" 錨點，標題「一張表，看懂全城循環容器的流轉。」+ 三亮點說明（店家加入、容器旅程、政策成效）。讀取 `process.env.NEXT_PUBLIC_DEMO_URL` 並傳給 `components/demo-frame.tsx`（client component）。

`demo-frame.tsx` 功能：Mac 風格視窗 chrome（三個圓點 + 假網址列）、iframe onLoad 後顯示 / skeleton spinner 載入動畫、手機版底部「建議桌面瀏覽」提示。當 URL 未設定或為 placeholder 時，fallback 顯示 forest-900 深綠底「Demo 即將上線」區塊（含嵌入的 EmailForm dark variant）。

狀態：完成
