/**
 * 檢查容器是否已有 SEO 預渲染的內容
 * @param {string} containerId - 容器的 ID
 * @returns {boolean}
 */
function hasStaticContent(containerId) {
  const container = document.getElementById(containerId);
  return container && container.dataset.seoRendered === 'true' && container.children.length > 0;
}

async function loadData() {
  try {
    const [advantages, portfolio, aboutMe, aboutAch, steps, faq, privacy] = await Promise.all([
        fetch('./js/data/advantages.json').then(res => res.json()),
        fetch('./js/data/portfolio.json').then(res => res.json()),
        fetch('./js/data/aboutMe.json').then(res => res.json()),
        fetch('./js/data/aboutAch.json').then(res => res.json()),
        fetch('./js/data/steps.json').then(res => res.json()),
        fetch('./js/data/faq.json').then(res => res.json()),
        fetch('./js/data/privacy.json').then(res => res.json())

    ]);

    console.log("✅ Advantages 載入成功", advantages);
    console.log("✅ Portfolio 載入成功", portfolio);
    console.log("✅ AboutMe 載入成功", aboutMe);
    console.log("✅ AboutAch 載入成功", aboutAch);
    console.log("✅ Steps 載入成功", steps);
    console.log("✅ FAQ 載入成功", faq);
    console.log("✅ Privacy 載入成功", privacy);

    // 只在沒有靜態內容時才渲染
    // 如果已有 SEO 預渲染的內容，則跳過 DOM 渲染，只綁定事件
    if (!hasStaticContent('advantages-container')) {
      renderAdvantages(advantages);
    } else {
      console.log("ℹ️ Advantages 使用預渲染內容");
      // 綁定互動事件
      bindAdvantagesEvents();
    }

    if (!hasStaticContent('portfolio-container')) {
      renderPortfolio(portfolio);
    } else {
      console.log("ℹ️ Portfolio 使用預渲染內容");
      setupPortfolioControls(portfolio.length);
      updateContainerHeight();
    }

    if (!hasStaticContent('about-content')) {
      renderAboutMe(aboutMe);
    } else {
      console.log("ℹ️ About Me 使用預渲染內容");
    }

    // AboutAch 始終需要渲染（因為沒有在 SEO 版本中）
    renderAboutAch(aboutAch);

    if (!hasStaticContent('steps-list')) {
      renderSteps(steps);
    } else {
      console.log("ℹ️ Steps 使用預渲染內容");
      bindStepsEvents();
    }

    if (!hasStaticContent('faq-container')) {
      renderFAQ(faq);
    } else {
      console.log("ℹ️ FAQ 使用預渲染內容");
      bindFAQEvents();
    }

    renderPrivacy(privacy);
    
  } catch (err) {
    console.error("❌ JSON 載入失敗", err);
  }
}

/**
 * 為預渲染的 Advantages 卡片綁定事件
 */
function bindAdvantagesEvents() {
  const cards = document.querySelectorAll('#advantages-container .cardCanUp');
  
  cards.forEach(content => {
    content.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        content.classList.toggle('active');
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      document.querySelectorAll('.cardCanUp.active')
        .forEach(el => el.classList.remove('active'));
    }
  });
}

/**
 * 為預渲染的 Steps 綁定事件
 */
function bindStepsEvents() {
  const step_Name = document.querySelectorAll('.step-name');
  const step_Content = document.querySelectorAll('.step-content');
  const content_Container = document.getElementById('steps-content');

  // 點擊左側按鈕 → 捲動到右側對應區塊
  step_Name.forEach(item => {
    item.addEventListener('click', () => {
      const stepIndex = parseInt(item.dataset.step);
      const target = document.querySelector(`.step-content[data-step="${stepIndex}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 捲動右側 → 左側同步 focus
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.step;
        step_Name.forEach(item => item.classList.remove('active'));
        const active = document.querySelector(`.step-name[data-step="${index}"]`);
        if (active) {
          active.classList.add('active');
        }
      }
    });
  }, {
    root: content_Container,
    threshold: 0.5
  });

  step_Content.forEach(div => observer.observe(div));
}

/**
 * 為預渲染的 FAQ 綁定事件
 */
function bindFAQEvents() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const arrow = question.querySelector('svg');
    
    question.addEventListener('click', () => {
      answer.classList.toggle('hidden');
      arrow.classList.toggle('rotate-180');
    });
  });
}

loadData();