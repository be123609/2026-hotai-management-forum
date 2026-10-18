(() => {
  "use strict";

  const config = window.EVENT_CONFIG;
  const seating = window.SEATING_DATA;
  const page = document.body.dataset.page || "home";
  const event = config.event;
  const logo = "assets/images/和泰汽車Hotai LOGO.png";

  const navItems = [
    ["home", "首頁", "index.html"], ["agenda", "議程", "agenda.html"],
    ["speakers", "講者", "speakers.html"], ["checkin", "報到", "checkin.html"],
    ["seating", "座位圖", "seating.html"], ["resources", "會後資料", "resources.html"],
    ["venue", "活動地點", "venue.html"], ["delivery", "企劃與上線", "delivery.html"]
  ];

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c.5-5 3-7 8-7s7.5 2 8 7"/></svg>',
    document: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>'
  };

  const logoMarkup = (footer = false) => `<img class="brand__logo${footer ? " brand__logo--footer" : ""}" src="${logo}" alt="和泰汽車 Hotai LOGO">`;

  function pageIntro(kicker, title, text) {
    return `<section class="page-hero"><div class="shell page-hero__inner reveal"><p class="kicker">${kicker}</p><h1>${title}</h1><p class="page-hero__lead">${text}</p></div></section>`;
  }

  function renderHeader() {
    const links = navItems.map(([id, label, href]) => `<a href="${href}" ${page === id ? 'aria-current="page"' : ""}>${label}</a>`).join("");
    document.querySelector("#site-header").innerHTML = `
      <div class="utility-note"><div class="shell"><strong>${event.name}</strong><span>${event.timeDisplay}</span></div></div>
      <header class="header"><div class="shell header__inner">
        <a class="brand" href="index.html" aria-label="${event.name}首頁">${logoMarkup()}</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span><span class="sr-only">開啟導覽選單</span></button>
        <nav class="primary-nav" id="primary-nav" aria-label="主要導覽">${links}</nav>
        <div class="theme-control"><label for="theme-select">視覺模式</label><select id="theme-select" aria-label="切換藍紫視覺模式"><option value="future">A｜柔霧藍紫</option><option value="editorial">B｜清晰藍紫</option></select></div>
      </div></header>`;
  }

  function renderFooter() {
    document.querySelector("#site-footer").innerHTML = `
      <footer class="footer"><div class="shell footer__grid">
        <div><a class="brand brand--footer" href="index.html" aria-label="和泰汽車首頁識別">${logoMarkup(true)}</a><p>${event.name}<br>${event.timeDisplay}</p></div>
        <div><h2>活動資訊</h2><a href="agenda.html">正式議程</a><a href="speakers.html">講者介紹</a><a href="venue.html">場地與交通</a></div>
        <div><h2>活動服務</h2><a href="checkin.html">線上報到</a><a href="seating.html">會議／晚宴座位圖</a><a href="resources.html">滿意度調查</a></div>
        <div><h2>主辦單位</h2><p>${event.organizer}</p></div>
      </div><div class="shell footer__bottom"><span>網站內容更新：2026 年 10 月 18 日</span><a href="delivery.html">網站企劃與上線檢查</a></div></footer>`;
  }

  function speakerCard(s) {
    return `<article class="speaker-card reveal"><figure class="speaker-card__visual speaker-card__visual--${s.accent}"><img src="${s.photo}" alt="${s.photoAlt}" loading="lazy"></figure><div class="speaker-card__body"><div class="status-row"><span class="status status--ready">${s.eventRole}</span><span class="status status--source">正式照片</span></div><h3>${s.zhName} <small>${s.enName}</small></h3><p class="speaker-role">${s.role}</p><p class="speaker-topic">${s.sessionTitle}</p><a class="text-link" href="speakers.html#${s.id}">查看講者資料 ${icons.arrow}</a></div></article>`;
  }

  function renderHome() {
    return `<main id="main-content">
      <section class="hero"><div class="hero__mesh" aria-hidden="true"></div><div class="dream-orb dream-orb--one" aria-hidden="true"></div><div class="dream-orb dream-orb--two" aria-hidden="true"></div>
        <div class="shell hero__grid"><div class="hero__content reveal"><p class="kicker">${event.eyebrow}</p><h1>${event.name}</h1><p class="hero__tagline">${event.timeDisplay}</p><p class="hero__description">${event.description}</p><div class="hero__actions"><a class="button button--primary" href="agenda.html">查看正式議程 ${icons.arrow}</a><a class="button button--ghost" href="checkin.html">前往線上報到</a></div></div>
          <aside class="event-pass reveal delay-1" aria-label="活動資訊摘要"><div class="event-pass__top"><span>活動資訊</span><span class="live-dot">正式版本</span></div><div class="event-pass__title"><small>會議地點</small><strong>${event.venueName}</strong></div><dl class="event-pass__meta"><div><dt>${icons.calendar}<span>會議時間</span></dt><dd>${event.timeDisplay}</dd></div><div><dt>${icons.pin}<span>地址</span></dt><dd>${event.address}</dd></div><div><dt>${icons.user}<span>主辦單位</span></dt><dd>${event.organizer}</dd></div></dl><a class="event-pass__link" href="venue.html">查看場地與交通 ${icons.arrow}</a></aside>
        </div><a class="scroll-cue" href="#highlights"><span>向下探索</span><i></i></a>
      </section>
      <section class="section" id="highlights"><div class="shell"><div class="section-heading reveal"><div><p class="kicker">活動導覽</p><h2>重要資訊快速前往</h2></div><p>正式議程、報到、座位、場地及問卷均已集中於活動網站。</p></div><div class="journey-grid">${[
        ["01","正式議程","從 09:30 報到到 19:30 交流晚宴的完整時段。","agenda.html"],
        ["02","講者介紹","查看朱建平與蘇書平的講題、照片及資料來源。","speakers.html"],
        ["03","線上報到","直接填寫正式 Microsoft Forms 報到表單。","checkin.html"],
        ["04","正式座位圖","查看會議座位配置與晚宴七桌分桌名單。","seating.html"],
        ["05","滿意度調查","活動後前往 SurveyCake 填寫正式問卷。","resources.html"],
        ["06","場地與交通","查看金萱廳、士林廚房及龍井廳資訊。","venue.html"]
      ].map(item=>`<a class="journey-card reveal" href="${item[3]}"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p><b>開啟頁面 ${icons.arrow}</b></a>`).join("")}</div></div></section>
      <section class="section section--contrast"><div class="shell"><div class="section-heading reveal"><div><p class="kicker">專題講者</p><h2>講者與分享主題</h2></div><p>講者資料保留指定人物頁面的來源超連結。</p></div><div class="speaker-preview-grid">${config.speakers.map(speakerCard).join("")}</div></div></section>
      <section class="section"><div class="shell data-banner reveal"><div><p class="kicker">活動後回饋</p><h2>滿意度調查問卷</h2><p>活動結束後，請使用 SurveyCake 正式問卷提供回饋。</p></div><a class="button button--primary" href="${config.integrations.surveyCakeUrl}" target="_blank" rel="noopener noreferrer">填寫滿意度調查 ${icons.arrow}</a></div></section>
    </main>`;
  }

  function renderAgenda() {
    return `<main id="main-content">${pageIntro(event.date, "正式議程", "以下時段依最新正式資料逐項呈現；09:30 報到，17:30–19:30 交流晚宴。")}
      <section class="section"><div class="shell agenda-page"><aside class="side-card reveal"><p class="kicker">活動資訊</p><h2>${event.name}</h2><dl class="mini-details"><div><dt>會議時間</dt><dd>${event.timeDisplay}</dd></div><div><dt>會議場地</dt><dd>${event.meetingVenue}</dd></div><div><dt>晚宴場地</dt><dd>${event.dinnerVenue}</dd></div></dl></aside>
        <div class="agenda-panel reveal delay-1"><div class="agenda-toolbar"><div><span class="status status--ready">正式議程</span><h2>2026/10/22（四）</h2></div></div><div class="agenda-timeline" aria-label="活動正式議程">${config.agenda.map(item=>`<article class="agenda-item agenda-item--${item.type}"><time>${item.time}</time><div><span>${item.type === "session" ? "專題分享" : item.type === "policy" ? "方針說明" : "活動流程"}</span><h3>${item.title}</h3>${item.details.length ? `<ul>${item.details.map(d=>`<li>${d}</li>`).join("")}</ul>` : ""}</div></article>`).join("")}</div></div>
      </div></section>
    </main>`;
  }

  function renderSpeakers() {
    return `<main id="main-content">${pageIntro("專題講者", "講者介紹", "講者照片依指定附件套用，人物資料與外部來源連結完整保留。")}
      <section class="section"><div class="shell speaker-list">${config.speakers.map((s,index)=>`<article class="profile reveal" id="${s.id}"><figure class="profile__visual profile__visual--${s.accent}"><img src="${s.photo}" alt="${s.photoAlt}" loading="lazy"><b>0${index+1}</b></figure><div class="profile__content"><div class="status-row"><span class="status status--ready">${s.eventRole}</span><span class="status status--source">正式照片</span></div><h2>${s.zhName} <small>${s.enName}</small></h2><p class="profile__role">${s.role}</p><div class="session-callout"><small>分享主題</small><strong>${s.sessionTitle}</strong></div>${s.summary?`<p class="profile__summary">${s.summary}</p>`:""}<div class="profile__columns"><div><h3>專長</h3><div class="tag-list">${s.specialties.map(tag=>`<span>${tag}</span>`).join("")}</div></div>${s.education?`<div><h3>學歷</h3><ul class="clean-list">${s.education.map(i=>`<li>${i}</li>`).join("")}</ul></div>`:""}<div><h3>經歷摘錄</h3><ul class="clean-list">${s.experience.map(i=>`<li>${i}</li>`).join("")}</ul></div></div><a class="source-link" href="${s.sourceUrl}" target="_blank" rel="noopener noreferrer">查看資料來源：${s.sourceLabel} <span aria-hidden="true">↗</span></a></div></article>`).join("")}</div></section>
    </main>`;
  }

  function renderCheckin() {
    const url = config.integrations.checkinFormUrl;
    return `<main id="main-content">${pageIntro("Microsoft Forms", "活動報到", "正式報到表單內嵌於本頁；若瀏覽器或公司安全設定限制顯示，請使用另開視窗連結。")}
      <section class="section"><div class="shell form-embed-shell"><div class="form-embed__toolbar reveal"><div><span class="status status--ready">正式表單</span><h2>${event.name}報到</h2></div><a class="button button--ghost" href="${url}" target="_blank" rel="noopener noreferrer">另開視窗填寫 ${icons.arrow}</a></div><div class="form-embed reveal delay-1"><iframe src="${url}" title="${event.name}正式報到表單" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen"></iframe><div class="form-embed__fallback"><strong>表單無法顯示嗎？</strong><p>部分瀏覽器、登入狀態或公司網路會限制第三方內嵌內容。</p><a href="${url}" target="_blank" rel="noopener noreferrer">開啟正式 Microsoft Forms 報到表單</a></div></div></div></section>
    </main>`;
  }

  function renderMeetingMap() {
    const features = seating.meeting.features.map(f=>`<div class="room-feature room-feature--${f.type}" style="--col:${f.col};--span:${f.span};--row:${f.row}">${f.label}</div>`).join("");
    const people = seating.meeting.participants.map(p=>`<div class="meeting-seat" style="--col:${p.col};--row:${p.group+2}"><span>${p.company}</span><strong>${p.name}</strong></div>`).join("");
    return `<section class="seat-section reveal" id="meeting-seating"><div class="seat-section__head"><div><span class="status status--ready">最新附件</span><h2>${seating.meeting.title}</h2><p>${seating.meeting.venue}｜姓名與公司依原配置呈現，座位編號已移除。</p></div><span class="seat-count">85 位</span></div><div class="room-scroll" tabindex="0" aria-label="可水平捲動查看完整會議座位圖"><div class="meeting-room" style="--grid-cols:${seating.meeting.gridColumns}">${features}${people}</div></div><p class="scroll-help">在小螢幕上可左右滑動查看完整空間配置。</p></section>`;
  }

  function renderDinnerMap() {
    return `<section class="seat-section reveal" id="dinner-seating"><div class="seat-section__head"><div><span class="status status--ready">最新附件</span><h2>${seating.dinner.title}</h2><p>${seating.dinner.venue}｜保留桌次、分桌、姓名、公司與職稱，座位編號已移除。</p></div><span class="seat-count">72 位／7 桌</span></div><div class="dinner-room"><div class="dinner-tables">${seating.dinner.tables.map(t=>`<article class="dinner-table"><header><span>${t.id}</span><div><h3>${t.label}</h3><small>${t.count} 人</small></div></header><ul>${t.people.map(person=>`<li><span>${person.company}</span><strong>${person.name}</strong><em>${person.title}</em></li>`).join("")}</ul></article>`).join("")}</div></div></section>`;
  }

  function renderSeating() {
    return `<main id="main-content">${pageIntro("最新附件", "正式座位圖", "會議座位圖與晚宴座位圖均依最新 Excel 附件重建，移除座位編號並保留指定資料與空間標示。")}
      <section class="section"><div class="shell seating-page"><nav class="seat-jump" aria-label="座位圖頁內導覽"><a href="#meeting-seating">會議座位圖</a><a href="#dinner-seating">晚宴座位圖</a></nav>${renderMeetingMap()}${renderDinnerMap()}</div></section>
    </main>`;
  }

  function renderResources() {
    const survey = config.integrations.surveyCakeUrl;
    return `<main id="main-content">${pageIntro("活動後回饋", "會後資料", "本頁僅提供已確認的正式滿意度調查；目前沒有列出其他公開下載內容。")}
      <section class="section"><div class="shell"><section class="survey-card reveal"><div class="survey-card__icon">${icons.document}</div><div><span class="status status--ready">正式問卷連結</span><p class="kicker">SurveyCake</p><h2>滿意度調查問卷</h2><p>感謝參與 ${event.name}。請於活動後填寫問卷，協助主辦單位持續改善活動內容與體驗。</p><a class="button button--primary" href="${survey}" target="_blank" rel="noopener noreferrer">前往填寫問卷 ${icons.arrow}</a><small>連結將於新分頁開啟。</small></div></section></div></section>
    </main>`;
  }

  function renderVenue() {
    return `<main id="main-content">${pageIntro("台北士林萬麗酒店", "活動地點與交通", `${event.venueName}｜${event.address}`)}
      <section class="section"><div class="shell venue-page"><section class="venue-summary reveal"><div class="venue-summary__visual"><span>${icons.pin}</span><strong>台北士林萬麗酒店</strong><p>${event.address}</p><div class="venue-actions"><a class="button button--primary" href="${event.navigationUrl}" target="_blank" rel="noopener noreferrer">開啟地圖導航 ${icons.arrow}</a><a class="button button--ghost" href="${event.officialVenueUrl}" target="_blank" rel="noopener noreferrer">飯店官方資訊</a></div></div><div class="venue-summary__content"><span class="status status--ready">正式場地</span><h2>${event.venueName}</h2><dl class="detail-list"><div><dt>會議場地</dt><dd>${event.meetingVenue}</dd></div><div><dt>午宴場地</dt><dd>${event.lunchVenue}</dd></div><div><dt>晚宴場地</dt><dd>${event.dinnerVenue}</dd></div><div><dt>飯店電話</dt><dd>${event.phone}</dd></div></dl></div></section>
        <section class="travel-section reveal"><div class="section-heading"><div><p class="kicker">交通方式</p><h2>前往飯店</h2></div><p>以下僅使用飯店正式地址與官方可驗證設施資訊，不提供未經確認的固定班次或步行分鐘數。</p></div><div class="travel-grid">${config.transport.map((item,i)=>`<article><span>0${i+1}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}</div></section></div></section>
    </main>`;
  }

  function renderDelivery() {
    return `<main id="main-content">${pageIntro("網站交付", "網站企劃與上線檢查", "網站已依最新正式資訊、兩份座位圖 Excel 與 Hotai LOGO 全面更新。")}
      <section class="section"><div class="shell"><div class="number-heading"><span>01</span><div><p class="kicker">內容與品牌</p><h2>最新資料已套用</h2></div></div><div class="plan-grid"><article><h3>活動資訊</h3><p>活動名稱、會議時間、主辦單位、飯店地址及三個場地均已更新。</p></article><article><h3>正式議程</h3><p>八個時段依指定文字呈現，包含 09:30 報到及 17:30–19:30 晚宴。</p></article><article><h3>品牌視覺</h3><p>全站統一使用最新 Hotai LOGO，保留淺藍與淺紫響應式設計。</p></article><article><h3>外部服務</h3><p>Microsoft Forms 報到與 SurveyCake 問卷使用已確認正式連結。</p></article></div></div></section>
      <section class="section section--contrast"><div class="shell"><div class="number-heading"><span>02</span><div><p class="kicker">座位資料</p><h2>兩份最新 Excel 已重建</h2></div></div><div class="concept-grid"><article class="concept-card"><div class="concept-preview"><strong>85</strong></div><div><span class="status status--ready">會議</span><h3>金萱廳座位配置</h3><p>保留公司、姓名、投影幕、講台、電腦、入口及柱子，刪除座位編號。</p></div></article><article class="concept-card"><div class="concept-preview"><strong>7</strong></div><div><span class="status status--ready">晚宴</span><h3>龍井廳七桌分桌</h3><p>保留桌次、人員分桌、公司、姓名與職稱，刪除座位編號。</p></div></article></div></div></section>
      <section class="section"><div class="shell"><div class="number-heading"><span>03</span><div><p class="kicker">功能狀態</p><h2>上線檢查</h2></div></div><div class="launch-grid">${[["內容","活動、場地與議程已依最新資料更新"],["LOGO","全站品牌位置均使用最新 PNG 附件"],["座位","85 位會議配置與 72 位晚宴分桌已核對"],["表單","報到 iframe 與另開視窗備援已驗證"],["問卷","SurveyCake 正式問卷連結已驗證"],["響應式","桌機、手機、導覽與橫向座位圖已檢查"]].map(item=>`<article><span class="launch-check launch-check--done">✓</span><div><h3>${item[0]}</h3><p>${item[1]}</p><small>已完成</small></div></article>`).join("")}</div></div></section>
    </main>`;
  }

  const renderers = {home:renderHome,agenda:renderAgenda,speakers:renderSpeakers,checkin:renderCheckin,seating:renderSeating,resources:renderResources,venue:renderVenue,delivery:renderDelivery};

  function bindInteractions() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".primary-nav");
    navToggle?.addEventListener("click",()=>{const open=navToggle.getAttribute("aria-expanded")==="true";navToggle.setAttribute("aria-expanded",String(!open));nav.classList.toggle("is-open",!open);navToggle.querySelector(".sr-only").textContent=open?"開啟導覽選單":"關閉導覽選單";});
    const select=document.querySelector("#theme-select");
    const preferred=localStorage.getItem("forum-theme")==="editorial"?"editorial":"future";
    document.documentElement.dataset.theme=preferred;if(select)select.value=preferred;
    select?.addEventListener("change",event=>{const theme=event.target.value==="editorial"?"editorial":"future";document.documentElement.dataset.theme=theme;localStorage.setItem("forum-theme",theme);});
    const observer="IntersectionObserver" in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.06}):null;
    document.querySelectorAll(".reveal").forEach(el=>observer?observer.observe(el):el.classList.add("is-visible"));
  }

  renderHeader();
  document.querySelector("#app").innerHTML=renderers[page]();
  renderFooter();
  bindInteractions();
})();
