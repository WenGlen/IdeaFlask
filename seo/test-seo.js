/**
 * SEO 測試腳本
 * 功能：驗證產生的 HTML 是否包含必要的 SEO 元素
 * 使用方式：node test-seo.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 開始檢測 SEO 優化情況...\n');

// 讀取 HTML 檔案
const htmlPath = path.join(__dirname, '..', 'index-seo.html');

if (!fs.existsSync(htmlPath)) {
  console.error('❌ 錯誤：找不到 index-seo.html 檔案');
  console.log('💡 提示：請先執行 npm run build:seo 產生檔案\n');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf-8');

// 測試項目
const tests = [
  {
    name: 'Meta Description',
    pattern: /<meta name="description" content=".+"/,
    points: 10,
  },
  {
    name: 'Meta Keywords',
    pattern: /<meta name="keywords" content=".+"/,
    points: 5,
  },
  {
    name: 'Open Graph Title',
    pattern: /<meta property="og:title" content=".+"/,
    points: 10,
  },
  {
    name: 'Open Graph Description',
    pattern: /<meta property="og:description" content=".+"/,
    points: 10,
  },
  {
    name: 'Open Graph Image',
    pattern: /<meta property="og:image" content=".+"/,
    points: 10,
  },
  {
    name: 'Twitter Card',
    pattern: /<meta name="twitter:card" content=".+"/,
    points: 5,
  },
  {
    name: 'Structured Data (JSON-LD)',
    pattern: /<script type="application\/ld\+json">/,
    points: 15,
  },
  {
    name: 'Advantages 預渲染內容',
    pattern: /data-seo-rendered="true"[\s\S]*?想說的.*?資訊太多了/,
    points: 10,
  },
  {
    name: 'Portfolio 預渲染內容',
    pattern: /data-seo-rendered="true"[\s\S]*?WUWU 小世界/,
    points: 10,
  },
  {
    name: 'About Me 預渲染內容',
    pattern: /data-seo-rendered="true"[\s\S]*?Hi！我是 Glen！/,
    points: 5,
  },
  {
    name: 'Steps 預渲染內容',
    pattern: /data-seo-rendered="true"[\s\S]*?需求.*?整理/,
    points: 5,
  },
  {
    name: 'FAQ 預渲染內容',
    pattern: /data-seo-rendered="true"[\s\S]*?我想做網站/,
    points: 5,
  },
];

let score = 0;
let maxScore = 0;
let passed = 0;
let failed = 0;

console.log('📋 檢測結果：\n');

tests.forEach(test => {
  maxScore += test.points;
  const pass = test.pattern.test(html);
  
  if (pass) {
    console.log(`✅ ${test.name} (${test.points} 分)`);
    score += test.points;
    passed++;
  } else {
    console.log(`❌ ${test.name} (0/${test.points} 分)`);
    failed++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`\n📊 總分：${score}/${maxScore} (${Math.round(score/maxScore*100)}%)`);
console.log(`✅ 通過：${passed} 項`);
console.log(`❌ 失敗：${failed} 項\n`);

// 評級
let grade = '';
let emoji = '';
let advice = '';

if (score >= 90) {
  grade = 'A+';
  emoji = '🏆';
  advice = '完美！您的網站 SEO 優化非常出色！';
} else if (score >= 80) {
  grade = 'A';
  emoji = '🌟';
  advice = '很好！SEO 優化做得不錯！';
} else if (score >= 70) {
  grade = 'B';
  emoji = '👍';
  advice = '良好！還有一些改進空間。';
} else if (score >= 60) {
  grade = 'C';
  emoji = '⚠️';
  advice = '及格！建議檢查未通過的項目。';
} else {
  grade = 'D';
  emoji = '❌';
  advice = '需要改進！請檢查建置過程是否正確執行。';
}

console.log(`${emoji} 評級：${grade}`);
console.log(`💡 ${advice}\n`);

// 額外檢查
console.log('🔍 額外檢查：\n');

// 檢查檔案大小
const stats = fs.statSync(htmlPath);
const fileSizeInMB = stats.size / (1024 * 1024);
console.log(`📦 檔案大小：${fileSizeInMB.toFixed(2)} MB`);

if (fileSizeInMB > 1) {
  console.log('⚠️  警告：檔案較大，可能影響載入速度');
} else {
  console.log('✅ 檔案大小適中');
}

// 檢查關鍵內容是否存在
const keywordChecks = [
  { keyword: 'Landing Page', name: '核心關鍵字' },
  { keyword: '網頁設計', name: '相關關鍵字' },
  { keyword: 'IdeaFlask', name: '品牌名稱' },
];

console.log('\n🔑 關鍵字檢查：\n');

keywordChecks.forEach(check => {
  const count = (html.match(new RegExp(check.keyword, 'g')) || []).length;
  if (count > 0) {
    console.log(`✅ "${check.keyword}" (${check.name}) - 出現 ${count} 次`);
  } else {
    console.log(`⚠️  "${check.keyword}" (${check.name}) - 未找到`);
  }
});

// 檢查 H1 標籤
console.log('\n📝 標題結構檢查：\n');

const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
const h2Count = (html.match(/<h2[^>]*>/g) || []).length;
const h3Count = (html.match(/<h3[^>]*>/g) || []).length;

console.log(`H1 標籤：${h1Count} 個 ${h1Count === 1 ? '✅' : '⚠️ (建議只有 1 個)'}`);
console.log(`H2 標籤：${h2Count} 個 ${h2Count > 0 ? '✅' : '⚠️'}`);
console.log(`H3 標籤：${h3Count} 個 ${h3Count > 0 ? '✅' : '⚠️'}`);

console.log('\n' + '='.repeat(50));
console.log('\n✨ 檢測完成！\n');

// 建議
if (failed > 0) {
  console.log('💡 改進建議：');
  console.log('1. 檢查 build-seo.js 中的設定');
  console.log('2. 確保所有 JSON 檔案格式正確');
  console.log('3. 重新執行 npm run build:seo\n');
}

console.log('📚 更多資訊請查看：');
console.log('- 快速開始.md');
console.log('- SEO-README.md');
console.log('- SEO方案說明.md\n');

// 返回狀態碼
process.exit(failed > 0 ? 1 : 0);

