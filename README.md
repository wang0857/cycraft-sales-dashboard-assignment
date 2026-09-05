# 資安產品 3 年銷售分析儀表板

用 Vite + React + TypeScript + MUI 打造的唯讀銷售分析儀表板，資料來源為
`backend/data/sales_data.json`（無真實後端 API，純前端專案）。

## Repo 總覽

```
.
├── backend/data/sales_data.json   # 原始銷售資料，唯一正本
├── design-temp/                   # Desktop / Mobile 視覺稿
└── frontend/                      # React 前端專案 —— 本文件其餘內容
    ├── DESIGN.md                  # 設計規格（色彩／字體／間距）
    └── ...                        # 除非特別註明，路徑皆相對於這個資料夾
```

## 技術棧

- Vite + React + TypeScript
- MUI（Material UI）＋ MUI X Charts
- Vitest + Testing Library（單元測試）

## 圖表 Library 選擇理由

圖表選用 **MUI X Charts**，而不是 Chart.js / Recharts / ECharts 等其他常見選項，理由：

- **跟畫面共用同一個設計系統**：整個專案已經用 MUI 當 UI 套件（Card、Table、
  Chip、Grid…），並把 `DESIGN.md` 的色彩／字體 token 統一寫進 `theme/theme.ts`
  一份 `createTheme()`。MUI X Charts 直接讀取同一個 `ThemeProvider`，圖表的
  底色、字體、tooltip 樣式會自動跟著整站主題走，不用額外寫一份「圖表專用的
  樣式對照表」去手動同步顏色。
- **同一套元件寫法**：跟其他 MUI 元件一樣是 React 元件、吃 `sx` prop，不需要
  另外學一套非 React 原生的圖表 API 或另一份 CSS 系統。
- **免費方案已足夠**：這次需要的長條＋折線雙軸複合圖、面積漸層圖、hover
  tooltip，都在 MUI X Charts 的 Community（免費）版範圍內，不需要付費授權。
- **官方維護、版本同步**：跟 `@mui/material` 同一個團隊維護，未來升級 MUI
  版本時相容性風險較低。

## 資料從哪來？為什麼不直接放在 frontend？

這份資料原始檔放在 `backend/data/sales_data.json`（repo 根目錄下），
**不是**直接複製一份長期放在 `frontend/` 裡維護，而是每次啟動開發 /
建置前，由腳本自動同步一份到 `frontend/src/data-source/`：

- `npm run dev` / `npm run build` 會先自動執行
  `frontend/scripts/sync-sales-data.mjs`，把 `backend/data/sales_data.json`
  複製到 `frontend/src/data-source/sales_data.json`，前端程式碼再以
  `import` 方式讀取、打包進 JS。
- **不放在 `public/` 資料夾**：`public/` 下的檔案會用固定網址直接對外
  公開（例如 `/data/sales_data.json`），任何人不用打開網站也能直接抓到
  完整資料，這在真實情境裡是資料外洩風險。改成打包進 JS 之後，至少不會
  有一個「可預測、可直接下載」的資料網址。

### 這是一個刻意的取捨（tradeoff）

這樣做是在模擬真實專案的情況：**原始資料的唯一真實來源（single source of
truth）應該歸屬後端，前端不該自己保管一份「正本」**，理由是資料隱私與
安全（誰能改資料、誰能看到完整資料，應該由後端統一管控，不是前端說了算）。

- 好處：資料只有一份正本（在 `backend/data/`），不會前後端各存一份、
  改了 A 忘記改 B 而兜不起來。`frontend/src/data-source/` 已加入
  `.gitignore`，不會被誤當成第二份正本提交。
- 代價：這次作業沒有真的後端 API，前端仍必須在「建置當下」有辦法讀到
  原始資料，所以才用 `predev` / `prebuild` 腳本在建置前先同步一份到
  前端專案內、再打包，而不是直接在前端資料夾長期保留一份資料。
- 之後如果真的接上後端 API：只要改 `src/services/salesDataService.ts`
  這一個檔案（把讀本地檔案換成 `fetch` API），其他元件、hooks 完全不用動。

## 開發指令

```bash
cd frontend
npm install
npm run dev      # 本地開發（會自動同步資料）
npm run build    # 建置正式版（會自動同步資料）
npm run test     # 執行 Vitest 單元測試
```

## CI（持續整合，沒有 CD／自動部署）

`.github/workflows/ci.yml`（repo 根目錄下）會在每次 push／PR 到 `main`
時，自動在 `frontend/` 底下依序跑：安裝套件 → 同步
`backend/data/sales_data.json` → lint → 型別檢查（`tsc -b`）→ 單元測試 →
`npm run build`。任何一步失敗，PR 上就會看到紅色叉叉。

**刻意只做 CI、不做 CD**：這是一份作業，對方沒有說可以把它部署到公開
網址，所以流程只驗證「這份程式碼跑得動、測試會過、build 得出來」，
不會自動發布到 Vercel / GitHub Pages 之類的地方。如果之後確認可以
部署，再另外加一個 deploy job 即可。

## 專案結構重點

- `src/utils/constants`、`src/utils/enums`、`src/utils/helpers`：常數、列舉、
  純函式邏輯（金額格式化、成長率計算、日期區間篩選等），跟畫面完全脫鉤，
  方便單元測試。
- `src/hooks`：畫面需要的狀態邏輯（讀資料、日期區間篩選、統計指標計算）。
- `src/components/common`：可重複使用的元件（統計卡片、趨勢徽章、日期
  篩選器、排行榜列表、區塊卡片、載入中／無資料／錯誤狀態）。
- `src/components/dashboard`：組裝出實際圖表／表格區塊的元件。
- `src/unit-test`：所有 Vitest 測試，依照上面資料夾結構分類存放。

## 元件架構說明（為什麼這樣拆分）

拆分的原則很單純：**一個元件的長相如果不需要知道「這是銷售儀表板」，
就放進 `components/common`；只有組裝出實際業務畫面時才需要它，才放進
`components/dashboard`。**

- `components/common`（可重複使用，不綁定任何業務邏輯）
  - `StatCard`：統計卡片外殼（icon＋標題＋卡片樣式），首頁 3 張統計卡都用它，
    各自塞不同內容進去。
  - `TrendBadge`：+/- 百分比徽章，在銷售明細表裡每一列都重複使用（20 次）。
  - `SectionCard`：每個圖表／排行榜／表格區塊都共用同一種「標題＋副標題＋
    右上角 chip＋內容」版型，也統一在這裡處理 loading／無資料／錯誤三種
    狀態 —— 這樣狀態處理只需要寫一次、測一次，四個區塊不用各寫一份。
  - `DateRangeFilter`、`RankingList`、`LoadingState` / `EmptyState` /
    `ErrorState`：同樣是「跟銷售資料無關、換個 prop 就能用在別的畫面」的
    通用元件。
- `components/dashboard`（跟這份銷售資料綁定的組裝元件）
  - `RevenueComboChart`、`RevenueTrendAreaChart`、`TopProductsRanking`、
    `ProductSalesTable`：各自把「資料怎麼餵進圖表／表格」的邏輯包起來，
    彼此獨立，方便單獨測試、單獨替換。
  - `DashboardOverview`：唯一的「頁面」層級元件，負責把上面所有區塊＋
    `common` 元件組裝成完整畫面，也是唯一知道「日期區間篩選會影響全部
    資料」這件事的地方。
- `components/layout`：`AppHeader`、`BottomNav` 是版面外殼，只會出現一次，
  但仍獨立成檔案，讓 `DashboardOverview` 專心處理資料排版，不用混雜標頭
  和導覽列的細節。

另外，邏輯刻意拆成三層，讓「畫面」以外的東西都能脫離 React 測試：

1. `utils/helpers`：純函式（金額格式化、成長率計算…），不吃 React、不吃
   DOM，測試最快、最穩定。
2. `hooks`：負責串接純函式與 React 狀態／生命週期（讀資料、日期篩選、
   計算出畫面要用的指標）。
3. `components`：只管「把 hooks 算好的資料畫出來」，盡量不在元件裡面
   直接寫商業邏輯。

這也是為什麼 54 個單元測試裡，大多數完全不需要掛載整個 `DashboardOverview`
就能測完。

## 設計依據

畫面規格對齊 `frontend/DESIGN.md`（色彩、字體、間距、卡片樣式）與
`design-temp/Desktop.png`、`design-temp/Mobile.png` 兩張視覺稿。兩張圖
內容有出入時，一律以 Desktop 版本的資料內容為準，Mobile 版只調整版面
排列（RWD），不會少算或多算資料。

畫面上的產品名稱與數字，一律取自 `backend/data/sales_data.json` 實際
計算結果，並未照抄視覺稿上的示意文字或示意數字（視覺稿的品項命名與
金額與實際資料檔案有出入，兩者不必一致）。

## 如果有更多時間，還想做的優化

- **i18n 多語系**：串接 `react-i18next`，目前畫面文字全部寫死繁體中文，
  沒有語系切換機制。
- **淺色／深色主題切換**：`DESIGN.md` 目前只定義了深色主題，之後可以在
  `theme/theme.ts` 補上一組淺色色票、加一個主題切換開關，並用
  `localStorage` 記住使用者上次選擇的主題。
- **圖表 bundle 瘦身**：目前 `npm run build` 後主要 JS 檔案約 740KB（超過
  Vite 500KB 的預設警告門檻），可以把 `@mui/x-charts` 相關元件改用動態
  `import()` 延遲載入，減少首屏需要下載的 JS 大小。
- **接上真的後端 API**：目前架構已經預留好切換點（見上方「資料從哪來」，
  只要改 `src/services/salesDataService.ts` 這一個檔案），之後有真的
  API 時可以直接串接，不用動到任何元件或 hooks。
- **無障礙（a11y）測試**：針對圖表的鍵盤操作、底部導覽列與圖表的 ARIA
  標籤補上專門的無障礙測試，目前只驗證了畫面內容，沒有系統性驗證
  螢幕閱讀器／鍵盤操作體驗。
