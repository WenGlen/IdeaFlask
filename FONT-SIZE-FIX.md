# 跨平台字體大小統一方案

## 問題描述
原本的網站在不同作業系統（Mac vs Windows）上字體大小差異很大，主要原因是：
- 沒有設定明確的基礎字體大小
- 依賴各瀏覽器的預設值（Windows 通常較小）
- 缺乏響應式字體設計

## 解決方案

### 1. 響應式基礎字體設定
使用 CSS `clamp()` 函數實現流體字體，讓字體大小根據視窗寬度自動調整：

```css
html {
  /* 320px 螢幕: 14px, 768px 螢幕: 16px, 1920px 螢幕: 18px */
  font-size: clamp(0.875rem, 0.75rem + 0.5vw, 1.125rem);
}
```

### 2. 斷點備用方案
針對不同螢幕尺寸設定明確的字體大小：
- **640px 以下**（小手機）: 14px
- **641-1024px**（平板）: 15px  
- **1025-1440px**（筆電）: 16px
- **1441px 以上**（大螢幕）: 17px

### 3. 防止瀏覽器自動調整
添加 CSS 屬性防止移動版 Safari 等瀏覽器自動調整字體大小：
```css
-webkit-text-size-adjust: 100%;
```

### 4. 統一行高
設定 `line-height: 1.6` 確保各平台文字間距一致。

## 已更新的檔案

### HTML 檔案
- ✅ `index.html` - 主頁面
- ✅ `mockup.html` - 設計稿頁面
- ✅ `index-seo.html` - SEO 版本
- ✅ `wireframe.html` - 線框圖頁面
- ✅ `prototype/cardCanUp.html` - 原型頁面

### 樣式檔案
- ✅ `css/style.scss` - SCSS 源文件

## 如何調整字體大小

### 方法 1：調整流體字體公式
修改 `clamp()` 中的三個值：
```css
font-size: clamp(最小值, 理想值, 最大值);
```

例如，如果覺得整體字體太小，可以改為：
```css
font-size: clamp(1rem, 0.875rem + 0.5vw, 1.25rem);
/* 16px - 20px 的範圍 */
```

### 方法 2：調整斷點大小
直接修改各斷點的 `font-size` 值：
```css
@media screen and (min-width: 1025px) and (max-width: 1440px) {
  html { font-size: 18px; } /* 原本是 16px */
}
```

### 方法 3：針對特定元素調整
如果只想調整某些元素的字體，使用 Tailwind 的 `text-*` class：
```html
<p class="text-lg">較大的文字</p>
<p class="text-sm">較小的文字</p>
```

## 測試建議

### 測試環境
1. **Windows**: Chrome, Edge, Firefox
2. **Mac**: Safari, Chrome, Firefox  
3. **移動裝置**: iOS Safari, Android Chrome

### 測試項目
- [ ] 各平台字體大小是否一致
- [ ] 不同螢幕尺寸下的可讀性
- [ ] 響應式斷點切換是否平滑
- [ ] 移動裝置上的字體是否適中

## 技術細節

### 為什麼使用 clamp()？
`clamp()` 函數可以在一個範圍內動態調整值，避免字體在極小或極大螢幕上過小或過大。

### 為什麼設定 html 而非 body？
設定 `html` 元素的字體大小可以讓所有使用 `rem` 單位的元素自動按比例縮放，達到更好的響應式效果。

### rem vs px
- `rem`: 相對於 `html` 元素的字體大小，響應式友好
- `px`: 固定像素，不會隨基礎字體大小變化

## 注意事項

1. **Tailwind CSS 的 fontSize 配置** 使用 rem 單位，會自動隨著 html 的字體大小調整
2. **編譯 SCSS**: 如果修改了 `style.scss`，記得編譯：
   ```bash
   sass css/style.scss css/style.css
   ```
3. **瀏覽器兼容性**: `clamp()` 支援所有現代瀏覽器（2020+），舊版瀏覽器會使用 @media 斷點作為備用方案

## 常見問題

**Q: 為什麼 Windows 上還是感覺字體較細？**  
A: 這可能是字體渲染（font-rendering）的差異，可以添加：
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Q: 可以針對不同作業系統設定不同的字體大小嗎？**  
A: 可以，但不建議，因為難以維護。更好的方法是確保字體大小在所有平台上都足夠清晰。

**Q: 如何確認當前的字體大小？**  
A: 在瀏覽器開發者工具中檢查 `html` 元素的 computed font-size 值。

---
更新日期: 2025-10-11

