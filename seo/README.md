# 📁 SEO 工具資料夾

這個資料夾包含所有 SEO 相關的工具和文檔。

---

## 📂 資料夾內容

### 🛠️ 工具腳本
- **`build-seo.js`** - SEO 建置腳本（產生預渲染的 HTML）
- **`test-seo.js`** - SEO 測試腳本（驗證 SEO 優化是否正確）

### 📚 說明文檔
- **`快速開始.md`** - 3 步驟快速上手指南
- **`開始使用.txt`** - 最簡單的入門說明
- **`模板使用說明.md`** - 共用模板系統使用教學
- **`SEO-README.md`** - 完整詳細的使用文檔
- **`SEO方案說明.md`** - 技術原理和設計理念
- **`README-SEO.md`** - 總結和快速參考

---

## 🚀 常用指令

在專案根目錄執行：

```bash
# 建置 SEO 版本
npm run build:seo

# 測試 SEO 效果
npm run test:seo

# 建置並自動部署
npm run deploy
```

---

## 📝 日常使用

### 修改內容文案
1. 編輯 `js/data/*.json` 檔案
2. 執行 `npm run build:seo`
3. 執行 `cp index-seo.html index.html`

### 修改 HTML 結構（引用文案的區塊）
1. 編輯 `js/templates.js` 檔案
2. 執行 `npm run build:seo`
3. 執行 `cp index-seo.html index.html`

### 修改 CSS 或其他部分
1. 編輯 `index.html` 檔案
2. 執行 `npm run build:seo`
3. 執行 `cp index-seo.html index.html`

---

## ⚠️ 重要提醒

**這個資料夾中的檔案是 SEO 工具，不需要在日常修改樣式時處理。**

您只需要：
1. 修改內容 → 改 `js/data/*.json`
2. 修改結構 → 改 `js/templates.js`
3. 修改樣式 → 改 `index.html`
4. 執行建置 → `npm run build:seo`

---

## 📖 更多資訊

詳細的使用說明請參考本資料夾中的文檔：
- 想快速開始 → 看 `快速開始.md` 或 `開始使用.txt`
- 想了解模板 → 看 `模板使用說明.md`
- 想深入了解 → 看 `SEO方案說明.md`
- 需要完整文檔 → 看 `SEO-README.md`

---

**🎉 享受 SEO 優化帶來的流量成長！**

