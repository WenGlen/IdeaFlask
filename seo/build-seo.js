/**
 * SEO 預渲染建置腳本
 * 功能：讀取 JSON 資料，產生 SEO 友善的 HTML 內容
 * 使用方式：node build-seo.js
 */

const fs = require('fs');
const path = require('path');

// 載入共用模板（✨ 自動同步！）
const templates = require('../js/templates.js');

// 讀取 JSON 檔案
function loadJSON(filename) {
  const filePath = path.join(__dirname, '..', 'js', 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// 移除 HTML 標籤（用於純文字 meta description）
function stripHTML(html) {
  return html.replace(/<[^>]*>/g, '');
}

// 產生 Advantages 區塊的 HTML（✨ 使用共用模板）
function generateAdvantagesHTML(data) {
  return data.map(item => templates.advantageCardTemplate(item)).join('\n');
}

// 產生 Portfolio 區塊的 HTML（✨ 使用共用模板）
function generatePortfolioHTML(data) {
  return data.map((item, index) => templates.portfolioItemTemplate(item, index)).join('\n');
}

// 產生 Portfolio 圓點指示器（✨ 使用共用模板）
function generatePortfolioDots(data) {
  return data.map((item, index) => templates.portfolioDotTemplate(index, index === 0)).join('\n');
}

// 產生 About Me 區塊的 HTML（✨ 使用共用模板）
function generateAboutMeHTML(data) {
  return data.map(item => templates.aboutMeTemplate(item)).join('\n');
}

// 產生 Steps 區塊的 HTML（✨ 使用共用模板）
function generateStepsHTML(data) {
  const listHTML = data.map(item => templates.stepButtonTemplate(item)).join('\n');
  const contentHTML = data.map(item => templates.stepContentTemplate(item)).join('\n');
  return { listHTML, contentHTML };
}

// 產生 FAQ 區塊的 HTML（✨ 使用共用模板）
function generateFAQHTML(data) {
  return data.map((item, index) => templates.faqItemTemplate(item, index)).join('\n');
}

// 產生結構化資料 (JSON-LD)
function generateStructuredData(advantages, portfolio, faq) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "IdeaFlask - Landing Page 設計開發服務",
    "description": "專業的 Landing Page 設計與開發服務，提供資訊規劃、視覺設計、網站開發一氣呵成的解決方案。",
    "url": "https://yourdomain.com",
    "telephone": "+886-xxx-xxx-xxx",
    "email": "glenwen.studio@gmail.com",
    "priceRange": "$$",
    "areaServed": "TW",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Landing Page 製作服務",
      "itemListElement": advantages.map((item, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": stripHTML(item.title),
          "description": item.content + " " + item.emphasis
        }
      }))
    },
    "workExample": portfolio.map(item => ({
      "@type": "CreativeWork",
      "name": item.title,
      "description": item.objectives,
      "image": `https://yourdomain.com/img${item.image16_9}`
    })),
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": stripHTML(item.answer) + " " + stripHTML(item.emphasis)
        }
      }))
    }
  };

  return JSON.stringify(structuredData, null, 2);
}

// 主要函式：讀取範本並插入產生的 HTML
function buildSEOHTML() {
  console.log('🚀 開始建置 SEO 友善的 HTML...\n');

  // 載入所有 JSON 資料
  const advantages = loadJSON('advantages.json');
  const portfolio = loadJSON('portfolio.json');
  const aboutMe = loadJSON('aboutMe.json');
  const steps = loadJSON('steps.json');
  const faq = loadJSON('faq.json');

  console.log('✅ JSON 資料載入完成');

  // 產生各區塊的 HTML
  const advantagesHTML = generateAdvantagesHTML(advantages);
  const portfolioHTML = generatePortfolioHTML(portfolio);
  const portfolioDotsHTML = generatePortfolioDots(portfolio);
  const aboutMeHTML = generateAboutMeHTML(aboutMe);
  const stepsData = generateStepsHTML(steps);
  const faqHTML = generateFAQHTML(faq);
  const structuredData = generateStructuredData(advantages, portfolio, faq);

  console.log('✅ HTML 內容產生完成');

  // 讀取原始 index.html
  const indexPath = path.join(__dirname, '..', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  // 在 <head> 中加入 SEO meta 標籤
  const metaTags = `
    <!-- SEO Meta Tags -->
    <meta name="description" content="專業 Landing Page 設計開發服務。資訊規劃、視覺設計、網站開發一氣呵成，為你的需求打造剛剛好的入口網站。">
    <meta name="keywords" content="Landing Page, 網頁設計, 網站開發, RWD, 響應式網站, UI設計, UX設計">
    <meta name="author" content="Glen Wen">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="IdeaFlask - 為你打造剛剛好的 Landing Page">
    <meta property="og:description" content="資訊規劃、視覺設計、網站開發一氣呵成，做出適合你現在需要的入口網站。">
    <meta property="og:type" content="website">
    <meta property="og:image" content="./img/IdeaFlask_logo.png">
    <meta property="og:url" content="https://yourdomain.com">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="IdeaFlask - 為你打造剛剛好的 Landing Page">
    <meta name="twitter:description" content="資訊規劃、視覺設計、網站開發一氣呵成">
    <meta name="twitter:image" content="./img/IdeaFlask_logo.png">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
${structuredData}
    </script>
`;

  // 在 </head> 之前插入 meta 標籤
  html = html.replace('</head>', `${metaTags}\n  </head>`);

  // 替換各區塊的內容
  // Advantages
  html = html.replace(
    '<div id="advantages-container"',
    `<div id="advantages-container" data-seo-rendered="true"`
  );
  html = html.replace(
    /(<div id="advantages-container"[^>]*>\s*)([\s\S]*?)(\s*<\/div>)/,
    `$1\n${advantagesHTML}\n$3`
  );

  // Portfolio
  html = html.replace(
    '<div id="portfolio-container"',
    `<div id="portfolio-container" data-seo-rendered="true"`
  );
  html = html.replace(
    /(<div id="portfolio-container"[^>]*>\s*)([\s\S]*?)(\s*<\/div>)/,
    `$1\n${portfolioHTML}\n$3`
  );

  // Portfolio dots
  html = html.replace(
    /(<div id="dot-container"[^>]*>\s*)([\s\S]*?)(\s*<\/div>)/,
    `$1\n${portfolioDotsHTML}\n$3`
  );

  // About Me
  html = html.replace(
    '<div id="about-content"',
    `<div id="about-content" data-seo-rendered="true"`
  );
  html = html.replace(
    /(<div id="about-content"[^>]*>\s*)([\s\S]*?)(\s*<\/div>)/,
    `$1\n${aboutMeHTML}\n$3`
  );

  // Steps
  html = html.replace(
    '<div id="steps-list"',
    `<div id="steps-list" data-seo-rendered="true"`
  );
  html = html.replace(
    /(<div id="steps-list"[^>]*>\s*)([\s\S]*?)(\s*<\/div>)/,
    `$1\n${stepsData.listHTML}\n$3`
  );

  html = html.replace(
    '<div id="steps-content"',
    `<div id="steps-content" data-seo-rendered="true"`
  );
  html = html.replace(
    /(<div id="steps-content"[^>]*>\s*)([\s\S]*?)(\s*<\/div>)/,
    `$1\n${stepsData.contentHTML}\n$3`
  );

  // FAQ
  html = html.replace(
    '<div id="faq-container"',
    `<div id="faq-container" data-seo-rendered="true"`
  );
  html = html.replace(
    /(<div id="faq-container"[^>]*>\s*)([\s\S]*?)(\s*<\/div>)/,
    `$1\n${faqHTML}\n$3`
  );

  // 儲存為新檔案
  const outputPath = path.join(__dirname, '..', 'index-seo.html');
  fs.writeFileSync(outputPath, html, 'utf-8');

  console.log('✅ SEO 友善的 HTML 已產生');
  console.log(`📄 輸出檔案：${outputPath}\n`);
  console.log('🎉 建置完成！');
  console.log('\n📝 下一步：');
  console.log('1. 將 index-seo.html 重新命名為 index.html（記得備份原檔案）');
  console.log('2. 修改 load.js，讓它檢查是否已有靜態內容');
  console.log('3. 測試網站功能是否正常');
}

// 執行建置
try {
  buildSEOHTML();
} catch (error) {
  console.error('❌ 建置失敗：', error);
  process.exit(1);
}

