/**
 * 共用 HTML 模板
 * 這個檔案被 build-seo.js 和瀏覽器共用
 * 修改這裡，兩邊都會自動同步！
 */

// 判斷是在 Node.js 環境還是瀏覽器環境
const isNode = typeof module !== 'undefined' && module.exports;

/**
 * Advantages 卡片模板
 */
function advantageCardTemplate(item) {
  // 處理 HTML 標籤（瀏覽器不需要，Node.js 需要）
  const stripHTML = (html) => html.replace(/<[^>]*>/g, '');
  
  return `
    <div class="max-w-[480px] group transition-all bg-white rounded-sm overflow-hidden shadow-md h-[360px] cursor-pointer md:h-[420px] md:cursor-default">
      <div class="cardCanUp w-full h p-6 flex flex-col justify-center overflow-hidden object-cover transition-transform duration-500 md:group-hover:-translate-y-[280px]">
        <div class="UpDisappear w-full overflow-hidden flex items-center justify-center h-[240px] md:group-hover:opacity-0 duration-500 md:h-[240px] md:mt-6 lg:h-[280px]">
          <img src="./img${item.image}" alt="${isNode ? stripHTML(item.title) : item.title.replace(/<[^>]*>/g, '')}" class="max-w-[280px] min-h-[240px] max-h-[280px] object-cover">
        </div>
        <p class="UpAppear text-gray-300 text-right md:opacity-0 md-narrow:text-md">▲</p>
        <h3 class="font-bold text-2xl text-IF text-center md-narrow:text-xl">
          ${item.title}
        </h3>
        <p class="UpDisappear text-gray-300 text-right md:hidden">▼</p>
        <br class="hidden md:block">
        <br>
        <p class="UpAppear leading-relaxed opacity-0 md:group-hover:opacity-100 duration-500 text-xl md:text-lg md:opacity-0 lg:text-xl">
          <span>${item.content}</span>
          <br class="md-narrow:hidden">
          <br>
          <span class="font-bold text-IF">${item.emphasis}</span>
        </p>
      </div>
    </div>
  `;
}

/**
 * Portfolio 項目模板
 */
function portfolioItemTemplate(item, index) {
  return `
    <div class="portfolio-item absolute inset-0 h-full transition-all duration-500 ease-in-out ${index === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}">
      <div class="portfolio-inner flex flex-col md:flex-row md:w-full md:h-full">
        <img src="./img${item.image16_9}" alt="${item.title}" class="object-cover block h-[300px] min-h-[300px] md:hidden">
        <img src="./img${item.image3_4}" alt="${item.title}" class="object-cover hidden md:block md:w-1/2 md:h-full">
        <div class="w-full px-8 py-24 leading-relaxed overflow-y-auto text-xl md:text-lg lg:text-xl">
          <p class="mb-2 font-bold text-IF">作品名稱</p>
          <h3 class="font-bold text-3xl">${item.title}</h3>
          <br>
          <p class="mt-4 mb-2 font-bold text-IF">頁面目標</p>
          <p>${item.objectives}</p>
          <br>
          <p class="mt-4 mb-2 font-bold text-IF">解決方案</p>
          <ul class="list-disc pl-6 space-y-4">
            ${item.solution}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * Portfolio 圓點模板
 */
function portfolioDotTemplate(index, isActive) {
  return `<button class="dot w-3 h-3 rounded-full ${isActive ? 'bg-IF' : 'bg-gray-300'}" data-index="${index}"></button>`;
}

/**
 * About Me 模板
 */
function aboutMeTemplate(item) {
  return `
    <div class="leading-relaxed text-xl">
      <h3 class="mb-4 text-2xl">${item.title}</h3>
      <p>${item.content}</p>
    </div>
  `;
}

/**
 * Steps 按鈕模板
 */
function stepButtonTemplate(item) {
  const stripHTML = (html) => html.replace(/<[^>]*>/g, '');
  return `
    <button class="step-name bg-gray-300 rounded-sm p-4 flex-1 md:h-auto" data-step="${item.step}">
      ${item.step}. <br class="block md:hidden">${stripHTML(item.title)}
    </button>
  `;
}

/**
 * Steps 內容模板
 */
function stepContentTemplate(item) {
  return `
    <div class="step-content flex snap-start h-[800px] px-6 md:h-[640px] md:px-12" data-step="${item.step}">
      <div class="my-auto">
        <p class="mb-2 font-bold text-IF">階段目標：</p>
        <p>${item.objectives}</p>
        <p class="mt-6 mb-2 font-bold text-IF">執行項目：</p>
        <ul class="list-disc pl-6 space-y-4">
          ${item.details}
        </ul>
        <p class="mt-6 mb-2 font-bold text-IF">預估工期：</p>
        <p>${item.estimated}</p>
      </div>
    </div>
  `;
}

/**
 * FAQ 項目模板
 */
function faqItemTemplate(item, index) {
  return `
    <div class="faq-item mb-6 border-b border-IF-border pb-6">
      <button class="faq-question w-full flex text-left justify-between font-black text-xl">
        <div class="flex mr-2">
          <span class="q-number text-IF mr-2">Q${index + 1}.</span> ${item.question}
        </div>
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-7 h-7 transform transition-transform duration-300">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="faq-answer hidden mt-4 mb-0 mx-6 text-xl leading-loose">
        <div class="flex">
          <span class="text-IF mr-2">A:</span>
          <div>
            <span>${item.answer}</span>
            <br>
            <span class="text-IF">${item.emphasis}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 匯出給 Node.js 使用
if (isNode) {
  module.exports = {
    advantageCardTemplate,
    portfolioItemTemplate,
    portfolioDotTemplate,
    aboutMeTemplate,
    stepButtonTemplate,
    stepContentTemplate,
    faqItemTemplate
  };
}

/* 完成修改後，建置 SEO 版本 */
  /*
  cd /Users/simpleinfo/Documents/Project/Github/LandingPage/IdeaFlask
  npm run build:seo
  cp index-seo.html index.html
  */