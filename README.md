# 2026 和泰集團管理論壇網站

可直接部署的繁體中文響應式網站，採淺藍、淺紫主視覺，整合正式議程、講者資料、Microsoft Forms 報到、會議與晚宴座位圖、台北士林萬麗酒店場地交通，以及 SurveyCake 滿意度調查。

## 本機預覽

```bash
python3 -m http.server 8080
```

開啟 `http://localhost:8080/`。正式測試請使用 HTTP 伺服器，不建議直接以 `file://` 開啟。

## 正式活動資訊

- 活動名稱：2026 和泰集團管理論壇
- 會議時間：2026/10/22（四）上午10:00 至晚上 19:00（含晚宴）
- 會議地點：台北士林萬麗酒店 2樓 金萱廳
- 地址：台北市士林區中山北路五段470巷8號
- 會議場地：2樓 金萱廳
- 午宴場地：1樓 士林廚房自助餐廳
- 晚宴場地：2樓 龍井廳
- 主辦單位：和泰汽車股份有限公司

議程頁依正式時段呈現，包含 09:30–10:00 報到及 17:30–19:30 交流晚宴；首頁的會議時間文字則依指定版本顯示，網站不自行改寫或推算。

## 最新附件套用

- `assets/images/和泰汽車Hotai LOGO.png`：頁首、頁尾與品牌識別
- `assets/images/朱建平.jpg`：朱建平講者卡片及完整介紹
- `assets/images/蘇書平.jpg`：蘇書平講者卡片及完整介紹
- `assets/seat-data.js`：由最新 `會議座位圖.xlsx` 與 `晚宴座位圖.xlsx` 轉換的正式座位資料

會議座位圖保留姓名、公司、投影幕、講台、電腦、入口與柱子等位置；晚宴座位圖保留七個桌次、人員分桌、姓名、公司與職稱。兩種座位圖均已移除座位編號。

## 正式外部服務

- Microsoft Forms 報到：設定於 `assets/data.js` 的 `integrations.checkinFormUrl`
- SurveyCake 滿意度調查：設定於 `assets/data.js` 的 `integrations.surveyCakeUrl`

報到頁同時提供 iframe 與另開視窗備援，以處理登入、瀏覽器或公司網路限制。

## 網站結構

- `index.html`：首頁
- `agenda.html`：正式議程
- `speakers.html`：講者照片、講題、經歷與來源
- `checkin.html`：正式 Microsoft Forms 報到
- `seating.html`：正式會議座位與晚宴分桌
- `resources.html`：SurveyCake 滿意度調查
- `venue.html`：飯店場地與交通
- `delivery.html`：網站企劃與上線檢查
- `assets/data.js`：活動、議程、場地與外部服務設定
- `assets/seat-data.js`：正式座位資料
- `assets/app.js`：頁面內容與互動
- `assets/styles.css`：淺藍、淺紫響應式樣式

## 部署注意事項

可部署至 Azure Static Web Apps、Azure Storage Static Website、GitHub Pages、Cloudflare Pages 或既有 Web Server。上傳專案根目錄即可。

正式環境請確認：

- HTTPS 與正式網域
- Content Security Policy 允許 `forms.cloud.microsoft` iframe
- 公司 Proxy 與登入政策允許 Microsoft Forms 及 SurveyCake
- 隱私權與個資蒐集告知
- 監控、備份及緊急聯絡窗口
