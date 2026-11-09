(() => {
  'use strict';
  const data = window.VINCE_CONTENT;
  const main = document.getElementById('main');
  const scroll = document.getElementById('page-scroll');
  const byTitle = Object.fromEntries(data.sections.map(section => [section.title, section.text]));
  const e = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const labelPhrases = {"로어북 예산 안내":["로어북","예산 안내"],"채팅방 이전 안내":["채팅방","이전 안내"],"상태창 · 대사 복원 지침":["상태창 · 대사","복원 지침"],"추가 요약 지침":["추가 요약","지침"],"추천 설정값":["추천","설정값"],"모델 추천":["모델","추천"],"출력 가이던스":["출력","가이던스"],"집 구조 보기":["집 구조","보기"],"아파트 이웃 보기":["아파트 이웃","보기"],"박스 트럭 보기":["박스 트럭","보기"],"동네로 돌아가기":["동네로","돌아가기"],"할렘으로 돌아가기":["할렘으로","돌아가기"],"빈스의 집 보기":["빈스의 집","보기"],"YouTube에서 듣기":["YouTube에서","듣기"],"창문 너머의 돈봉투":["창문 너머의","돈봉투"],"비 오는 밤, 델리 앞":["비 오는 밤,","델리 앞"],"잘못 찾아온 밤손님":["잘못 찾아온","밤손님"],"기본 정보":["기본 정보"],"성격 · 버릇":["성격 · 버릇"],"아파트 생활":["아파트 생활"],"시작 전 설정":["시작 전","설정"],"명령어·상태창":["명령어·상태창"],"추가 요약 지침 (선택 사항)":["추가 요약 지침","(선택 사항)"],"항목별 의미 (prop)":["항목별 의미","(prop)"]};
  const phraseLabel = value => labelPhrases[value] ? `<span class="phrase-label">${labelPhrases[value].map(part=>`<span class="phrase-unit">${e(part)}</span>`).join(" ")}</span>` : e(value);
  const asset = name => `assets/${name}.webp`;
  const arrow = '<span aria-hidden="true">↗</span>';
  const state = {route:'home',profile:'nature',world:'harlem',guide:0,guidePlatforms:{},npc:0,apartmentView:'home',apartmentPinned:false};
  const guideData = window.VinceGuideData.build(data);
  const guides = guideData.items;
  const highlights = ['보호관찰 중','불법 화물','윗집 남자','곤란할수록 농담','눈앞의 욕심','혼자 버티는 것','입술을 씹으며','문과 계단','자잘한 볼일','위아래층','이웃 귀','돈봉투','뒤칸 소리','잠깐 머물러','짧게 대화해도','운송 일','동네 밖','천장 너머 소음'];
  function inline(value) {
    let output = e(value);
    for (const word of highlights) output = output.split(e(word)).join(`<strong class="ink-em">${e(word)}</strong>`);
    return output;
  }
  function rich(text, {emphasis=true} = {}) {
    const lines = String(text ?? '').split('\n');
    let out='', list=[];
    const format = value => {
      const text = emphasis ? inline(value) : e(value);
      const label = String(value).match(/^([^:\n]{1,28}:)(\s+)(.+)$/);
      if (!label || label[1].includes('http')) return text;
      const render = emphasis ? inline : e;
      return `<strong class="prose-label">${render(label[1])}</strong>${label[2]}${render(label[3])}`;
    };
    const flush = () => {if(list.length){out += `<ul class="prose-list">${list.map(line=>`<li>${format(line)}</li>`).join('')}</ul>`;list=[];}};
    lines.forEach((line, i) => {
      if(!line.trim()){flush();return;}
      if(line.startsWith('· ')){list.push(line.slice(2));return;}
      flush();
      if(line.startsWith('<VStatus')){out += `<pre class="code-block"><code>${e(line)}</code></pre>`;return;}
      if(/^https:\/\//.test(line)){out += `<p class="source-link"><a href="${e(line)}" target="_blank" rel="noopener noreferrer">${e(line)} ${arrow}</a></p>`;return;}
      if(line.startsWith('↳ ')){out += `<p class="subnote">${format(line.slice(2))}</p>`;return;}
      if(line.startsWith('▸ ')) {
        const value = line.slice(2);
        if(lines[i+1]?.startsWith('· ') || (value.length<35 && !/[.!?。]$/.test(value) && !value.includes('→'))) out += `<h3 class="prose-subheading">${format(value)}</h3>`;
        else out += `<p class="bullet-paragraph">${format(value)}</p>`;
        return;
      }
      out += `<p>${format(line)}</p>`;
    });
    flush();return out;
  }
  const img = (name, alt, classes='', eager=false) => `<img src="${asset(name)}" alt="${e(alt)}" class="${classes}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async" width="1536" height="1024">`;
  const buttonLink = (label, href, secondary=false) => `<a class="action${secondary?' action-outline':''}" href="${href}">${phraseLabel(label)}<span aria-hidden="true">→</span></a>`;
  const section = (title, text, extra='') => `<section class="reading-section ${extra}"><h2 class="section-heading"><span>${phraseLabel(title)}</span></h2><div class="prose">${rich(text)}</div></section>`;
  const title = (text, subtitle='') => `<div class="page-heading"><h1 id="page-title" tabindex="-1">${text}</h1>${subtitle?`<p class="eyebrow">${subtitle}</p>`:''}</div>`;
  function contextTags(){return `<ul class="context-tags" aria-label="캐릭터 태그">${data.context.split(' | ').map((tag,i)=>`<li class="context-tag" data-group="${e(data.contextGroups?.[i]??'identity')}">${e(tag)}</li>`).join('')}</ul>`;}
  function renderHome(){
    const intro = data.intro.split('\n').filter(Boolean);
    return `<section class="home-hero">
      ${img('hero-night','불 켜진 위층 창문과 소방계단이 있는 할렘 아파트','scene-background',true)}
      <div class="hero-copy"><h1 id="page-title" tabindex="-1"><small>윗집에</small><span class="hero-word">약쟁이가</span><span>이사 왔습니다.</span></h1>
      <p>${inline(intro[1])}</p><div class="actions">${buttonLink('프로필 보기','#profile')}${buttonLink('도입부 보기','#openings',true)}</div></div>
    </section>
    <section class="home-life content-width">
      <h2 class="section-heading"><span>아파트 생활</span></h2><p class="section-lead">처음엔 <strong class="ink-em underlined">천장 너머 소음</strong>과 복도 인사가 전부입니다.</p>
      <div class="home-tiles">
        <a class="scene-tile" href="#world/apartment"><div class="tile-art plan-thumbnail">${floorPlan('thumb')}</div><h3>집 구조 보기 <span aria-hidden="true">→</span></h3><p>공통 평면·빈스의 집</p></a>
        <a class="scene-tile" href="#world/people">${img('hall-door','현관문과 우편함이 있는 아파트 복도','tile-art')}<h3>이웃 보기 <span aria-hidden="true">→</span></h3><p>같은 건물의 사람들</p></a>
        <a class="scene-tile" href="#world/harlem">${img('harlem-street','델리와 빨래방이 있는 할렘 거리','tile-art')}<h3>동네 둘러보기 <span aria-hidden="true">→</span></h3><p>델리·빨래방·운송 일</p></a>
      </div>
    </section>
    <section class="intro-reading content-width"><div class="intro-quote"><span aria-hidden="true">“</span><p>${e(data.quote.replace(/^"|"$/g,''))}</p><span aria-hidden="true">”</span></div>
      <div class="intro-columns prose">${rich(intro.slice(2).join('\n\n'))}</div>
      ${contextTags()}
      <details class="content-note"><summary>⚠ TW</summary><div class="prose"><p>${e(data.warning)}</p></div></details>
      <div class="home-bottom-links"><a href="#guide">이용 가이드</a><span aria-hidden="true">|</span><a href="#playlist">플레이리스트</a></div>
    </section>`;
  }
  function profileBody(){
    if(state.profile==='voice')return section('말투',byTitle['말투'],'voice-sheet');
    if(state.profile==='taste')return section('취향',byTitle['취향'],'taste-sheet');
    const text=byTitle['성격 · 버릇'];
    const [nature, habits]=text.split('▸ 버릇');
    return `<div class="profile-editorial">${section('성격',nature.replace(/^▸ 성격\n/,''),'nature-sheet')}${section('버릇',habits.trim(),'habit-note').replace('</section>','<div class="habit-scene" aria-hidden="true"></div></section>')}</div>`;
  }
  function renderProfile(){return `<div class="profile-page content-width">
    <section class="profile-top"><figure class="portrait-block"><img class="portrait" src="${asset('vince-portrait')}" alt="헝클어진 짙은 갈색 머리와 푸른 눈, 낡은 가죽 재킷의 빈스 크라우더" width="1024" height="1536" fetchpriority="high"><figcaption class="fact-strip"><span>31세·남성·미국</span><span>186cm</span><span>불법 화물 운전수</span></figcaption><blockquote class="profile-quote">${e(data.quote.replace(/^"|"$/g,''))}</blockquote></figure>
      <div class="profile-identity"><div class="display-name" aria-hidden="true"><span>VINCE</span><b>CROWDER</b></div><h1 id="page-title" tabindex="-1">빈스 크라우더</h1><div class="ribbon-heading"><span>기본 정보</span></div><div class="prose profile-basics">${rich(byTitle['기본 정보'])}</div></div></section>
    <div class="profile-tabs local-tabs" role="tablist" aria-label="빈스 프로필"><button type="button" role="tab" id="profile-tab-nature" aria-controls="profile-panel" data-profile="nature">성격·버릇</button><button type="button" role="tab" id="profile-tab-voice" aria-controls="profile-panel" data-profile="voice">말투</button><button type="button" role="tab" id="profile-tab-taste" aria-controls="profile-panel" data-profile="taste">취향</button></div>
    <div id="profile-panel" role="tabpanel" class="profile-panel" tabindex="0">${profileBody()}</div>
    <div class="profile-detail-grid">${section('외형',byTitle['외형'])}${section('특징',byTitle['특징'])}</div>
    <div class="actions end-actions">${buttonLink('빈스의 집','#world/apartment')}${buttonLink('주변 인물','#world/people',true)}</div>
    </div>`;}
  function worldTabs(){return `<nav class="world-tabs" aria-label="세계관 항목">${[['harlem','할렘'],['apartment','아파트'],['truck','박스 트럭'],['people','주변 인물']].map(([id,label])=>`<a href="#world/${id}" ${state.world===id?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`;}
  function worldMasthead(){return `<div class="world-masthead"><div class="content-width"><div class="world-title-row"><h1 id="page-title" tabindex="-1"><span>1990년대</span> <b>할렘</b></h1><p class="eyebrow">1996–1999 · NEW YORK</p></div>${worldTabs()}</div></div>`;}
  function renderHarlem(){return `<div class="world-page content-width">
    <div class="neighborhood-layout"><div class="neighborhood-scene">${img('harlem-street','아파트와 델리, 빨래방, 박스 트럭이 있는 할렘 동네','',true)}
      <a href="#world/apartment" class="map-label label-apartment">아파트</a><button class="map-label label-deli" data-place="deli">델리</button><button class="map-label label-laundry" data-place="laundry">빨래방</button><a href="#world/truck" class="map-label label-truck">박스 트럭</a></div>
      <aside id="place-detail" class="place-detail"><h2 class="section-heading"><span>아파트</span></h2><div class="prose"><p>빈스와 당신은 벽 얇은 할렘 아파트의 <strong class="ink-em">위아래층</strong>에 삽니다.</p><p>복도에서 한 말은 문 열고 나온 <strong class="ink-em underlined">이웃 귀</strong>에도 들어갈 수 있습니다.</p></div><div class="actions vertical">${buttonLink('집 구조 보기','#world/apartment')}${buttonLink('아파트 이웃 보기','#world/people',true)}</div></aside></div>
    <div class="world-shortcuts"><section><h2 class="section-heading"><span>운송 일</span></h2><div class="shortcut-line"><p>운송을 마치면 집으로 돌아옵니다.</p>${buttonLink('박스 트럭 보기','#world/truck')}</div></section><section><h2 class="section-heading"><span>사람들</span></h2><div class="neighbor-names">${data.npcs.slice(0,5).map((npc,i)=>`<a href="#world/people/${i}"><span>${e(npc.name.replace(/ \(.+\)/,''))}</span><small>${e(npc.english)}</small></a>`).join('')}</div></section></div>
    <div class="world-reading">${section('세계관',byTitle['세계관'])}${section('1990년대 할렘',byTitle['1990년대 할렘'])}${section('빈스 크라우더',byTitle['빈스 크라우더'])}${section('아파트 생활',byTitle['아파트 생활'])}${section('공범화',byTitle['공범화'])}${section('진행 소재',byTitle['진행 소재'])}</div></div>`;}
  function floorPlan(id){return `<svg class="floor-plan" viewBox="0 0 1024 1536" role="img" aria-labelledby="plan-title-${id}"><title id="plan-title-${id}">위쪽 침실, 가운데 주방과 욕실, 아래 거실로 이어지는 공통 평면</title>
    <g fill="var(--cream)" stroke="var(--ink)" stroke-width="5"><rect x="178" y="132" width="666" height="1260"/>
    <path d="M178 132H844V1392H178Z M178 520H474 M559 520H844 M448 535V896H178 M574 535V752 M574 872V896H844" fill="none" stroke-width="22"/>
    <path d="M474 520V443 M474 443A77 77 0 0 1 551 520 M574 752H659 M659 752A85 85 0 0 1 574 837 M844 1210H746 M746 1210A98 98 0 0 0 844 1308" fill="none" stroke-width="3"/>
    <rect x="216" y="231" width="322" height="234" rx="12"/><rect x="222" y="242" width="59" height="209" rx="8"/><path d="M296 234V464 M528 234V464" fill="none"/><rect x="675" y="290" width="132" height="141"/><path d="M675 337H807M675 384H807"/>
    <path d="M209 574H418V699H273V862H209Z"/><rect x="217" y="646" width="48" height="71" rx="10"/><rect x="340" y="572" width="75" height="90"/><g fill="none"><circle cx="361" cy="593" r="13"/><circle cx="394" cy="593" r="13"/><circle cx="361" cy="630" r="13"/><circle cx="394" cy="630" r="13"/></g><rect x="211" y="764" width="83" height="104"/>
    <rect x="608" y="558" width="205" height="109" rx="30"/><rect x="618" y="569" width="185" height="87" rx="25"/><rect x="657" y="693" width="62" height="34" rx="7"/><ellipse cx="688" cy="749" rx="34" ry="41"/><rect x="751" y="781" width="63" height="64" rx="14"/><ellipse cx="784" cy="811" rx="21" ry="16"/>
    <rect x="217" y="974" width="169" height="348" rx="20"/><rect x="226" y="985" width="37" height="324" rx="12"/><path d="M270 998H374V1299H270ZM270 1098H374M270 1198H374"/><rect x="433" y="1053" width="100" height="196" rx="6"/><rect x="640" y="966" width="118" height="117"/><rect x="650" y="976" width="98" height="86"/><rect x="669" y="1121" width="84" height="103"/>
    </g><g stroke="var(--ink)" stroke-width="3" fill="var(--paper)"><path d="M293 121H431V146H293ZM598 121H731V146H598ZM288 1378H429V1401H288ZM557 1378H704V1401H557Z"/></g>
    <g class="plan-labels" fill="var(--ink)" text-anchor="middle"><text x="634" y="265">침실</text><text x="341" y="753">주방</text><text x="687" y="866">욕실</text><text x="565" y="1322">거실</text></g></svg>`;}
  function apartmentStage(){return `<div class="apartment-scene" id="apartment-scene"><svg class="apartment-floor" viewBox="0 0 1024 1536" aria-hidden="true"><defs><pattern id="wood" width="96" height="34" patternUnits="userSpaceOnUse"><rect width="96" height="34" fill="#a57a43"/><path d="M0 0H96M0 34H96M0 0V34M48 0V17" stroke="#67573b" stroke-width="1" opacity=".4"/></pattern><pattern id="tile" width="48" height="48" patternUnits="userSpaceOnUse"><rect width="48" height="48" fill="#eadab8"/><path d="M0 0H48V48" fill="none" stroke="#67573b" opacity=".35"/></pattern></defs><rect x="176" y="130" width="670" height="1270" fill="url(#wood)"/><rect x="202" y="540" width="242" height="345" fill="url(#tile)"/><rect x="586" y="540" width="240" height="345" fill="url(#tile)"/><rect x="207" y="914" width="610" height="445" fill="#67573b" opacity=".3"/></svg><div class="stage-plan">${floorPlan('stage')}</div><img class="apartment-lift" src="${asset('apartment-layer')}" alt="평면과 같은 위치에 놓인 침대·주방·욕실·소파와 벽" width="1024" height="1536"><button class="apartment-hit" type="button" aria-label="벽과 가구를 올린 상태로 고정" aria-pressed="false"></button></div>`;}
  function renderApartment(){return `<div class="apartment-page content-width"><div class="apartment-top"><div class="apartment-heading"><div class="page-heading"><h2>같은 구조,<br><em>다른 생활</em></h2></div><p class="subnote">배치 검토안·실제 세대의 실측 도면 아님</p></div></div>
    <div class="apartment-controls"><button type="button" class="action action-outline" data-apartment="plan">평면 보기</button><button type="button" class="action" data-apartment="home">${phraseLabel('빈스의 집 보기')}</button></div>
    <div class="apartment-comparison apartment-single"><section><h2 class="section-heading"><span>빈스의 집</span></h2>${apartmentStage()}</section></div>
    <p class="apartment-hint"><strong>마우스를 올리면</strong> 벽과 가구가 올라옵니다. <strong>클릭하면</strong> 열린 상태로 고정·모바일에서는 탭</p>
    ${section('아파트 생활',byTitle['아파트 생활'])}<div class="actions end-actions">${buttonLink('이웃들 만나기','#world/people')}${buttonLink('동네로 돌아가기','#world/harlem',true)}</div></div>`;}
  function renderTruck(){return `<div class="truck-page content-width"><div class="truck-layout">${img('truck-detail','화물 집하장에 세워진 낡은 흰색 박스 트럭','truck-art',true)}<div>${section('박스 트럭',byTitle['박스 트럭'])}</div></div><div class="world-reading">${section('운송 일', '빈스의 운송 일에 쓰는 낡은 박스 트럭. 밀폐형 짐칸이 달린 화물차.\n\n'+byTitle['진행 소재'].split('▸ 운송 일')[1].split('▸ 오래된 동료')[0].trim())}</div><div class="actions end-actions">${buttonLink('주변 인물','#world/people')}${buttonLink('할렘으로 돌아가기','#world/harlem',true)}</div></div>`;}
  function npcPicture(npc,thumbnail=false){
    if(!npc.image.src)return `<span class="npc-image-empty" aria-label="${e(npc.english)} 이미지 미등록"><span aria-hidden="true">${e(npc.english.split(/\s+/).map(word=>word[0]).join(''))}</span></span>`;
    return `<img src="${e(npc.image.src)}" alt="${e(npc.name.replace(/ \(.+\)/,''))}" width="832" height="1216" loading="lazy" decoding="async" class="${thumbnail?'npc-thumbnail-image':'npc-detail-image'}" style="--face-x:${npc.image.faceX}%;--face-y:${npc.image.faceY}%;--face-scale:${npc.image.scale}">`;
  }
  function npcDetail(){const npc=data.npcs[state.npc];return `<figure class="npc-detail-portrait${npc.image.src?'':' is-empty'}">${npcPicture(npc)}</figure><article class="npc-card" id="npc-${state.npc}" tabindex="-1"><h2>${e(npc.name.replace(/ \(.+\)/,''))}<span>${e(npc.english)}</span></h2><div class="prose">${rich(npc.text)}</div></article>`;}
  function npcDirectory(){return `<nav class="npc-directory" aria-label="주변 인물 선택">${data.npcs.map((npc,i)=>`<button type="button" data-npc="${i}" aria-pressed="${i===state.npc}"><span class="npc-thumbnail">${npcPicture(npc,true)}</span><span class="npc-index-name">${e(npc.name.replace(/ \(.+\)/,''))}<small>${e(npc.english)}</small></span></button>`).join('')}</nav>`;}
  function renderPeople(){return `<div class="people-page content-width"><div class="people-header">${img('hall-door','이웃들이 오가는 현관과 우편함','people-art',true)}<div><div class="page-heading"><h2>주변 인물</h2><p class="eyebrow">NEIGHBORS & THE ROAD</p></div><p>밤손님과는 계단에서 마주치고,<br>닫힌 문 너머 웃음소리는 아래층까지 새어 내려옵니다.</p></div></div><div class="npc-browser">${npcDirectory()}<div id="npc-detail" class="npc-detail" aria-live="polite">${npcDetail()}</div></div></div>`;}
  function chooseNPC(index){
    const y=scroll.scrollTop;state.npc=index;
    document.getElementById('npc-detail').innerHTML=npcDetail();
    document.querySelectorAll('[data-npc]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.npc)===index)));
    scroll.scrollTop=y;
  }
  function worldBody(){return ({harlem:renderHarlem,apartment:renderApartment,truck:renderTruck,people:renderPeople}[state.world]??renderHarlem)();}
  function renderWorld(){return `${worldMasthead()}<div id="world-body">${worldBody()}</div>`;}
  function renderOpenings(){const names=['opening-window','opening-deli','opening-door'];const alts=['열린 창문 턱에 놓인 돈봉투','비 오는 밤 델리 앞에 세워진 박스 트럭','열린 현관문 너머 재킷을 걸쳐 둔 빈 의자'];const previews=['창문으로 들어와 당신의 돈봉투를 가져가던 빈스가 들킵니다.','비 오는 밤, 빈스가 델리 앞에서 트럭 조수석 문을 열어 줍니다.','뒤늦게 착각을 알아차린 빈스가 잠깐 머물러 달라고 합니다.','직접 도입부를 작성하거나 새로운 시작을 선택할 수 있습니다.'];return `<section class="opening-banner">${img('hero-night','할렘 아파트의 불 켜진 창','scene-background',true)}<div class="content-width"><h1 id="page-title" tabindex="-1">어디서<br><span class="stroke-underline">시작할까요?</span></h1></div></section><div class="openings-page content-width">${data.openings.map((item,i)=>`<article class="opening-card ${i===3?'free-opening':''}">${i<3?img(names[i],alts[i],'opening-art'):''}<div class="opening-body"><div class="opening-title"><span class="opening-number" aria-hidden="true">0${i+1}</span><h2>${phraseLabel(item.title)}</h2>${item.adult?'<span class="adult-label">성인</span>':''}</div><p class="opening-preview">${inline(previews[i])}</p><details class="opening-detail"><summary>${i===3?'시작 방법':'내용 보기'} <span aria-hidden="true">→</span></summary><div class="prose"><p>${e(item.text)}</p>${i===3?'<a href="#guide">이용 가이드에서 진행 방법 확인 →</a>':''}</div></details></div></article>`).join('')}</div>`;}
  function commandRows(items){return `<div class="command-list">${items.map(item=>`<div class="command-row"><code>${e(item.command)}</code><p>${e(item.description)}</p></div>`).join('')}</div>`;}
  const guideName=item=>item.index===8?'기억 지침':item.title.replace(/^⭐ /,'');
  function copyBlock(heading,payload){return `<section class="guide-payload"><header><h3>${phraseLabel(heading)}</h3><button class="copy-button" data-copy="${e(payload)}" type="button" aria-label="${e(heading)} 본문 복사">COPY</button></header><pre><code>${e(payload)}</code></pre></section>`;}
  function guideParts(parts){return parts.map(part=>{
    if(part.heading&&!part.body){const pair=part.heading.split(' → ');return pair.length>1?`<section class="guide-fragment"><h3 class="prose-subheading">${e(pair.shift())}</h3><p>${e(pair.join(' → '))}</p></section>`:`<p class="guide-statement">${e(part.heading)}</p>`;}
    return `<section class="guide-fragment">${part.heading?`<h3 class="prose-subheading">${phraseLabel(part.heading.replace(/^🔗 /,'').replace(/:$/,''))}</h3>`:''}${rich(part.body,{emphasis:false})}</section>`;
  }).join('').replace(/하단\s*\[\s*⭐?\s*출력 가이던스\s*\]/g,'<a class="guide-reference" href="#guide/7/elyn">출력 가이던스</a>');}
  function settingTable(raw,level=3){const [heading,...rows]=raw.trim().split('\n');return `<section class="guide-fragment"><h${level} class="prose-subheading">${e(heading)}</h${level}><table class="guide-table"><tbody>${rows.filter(Boolean).map(line=>{const match=line.replace(/^· /,'').match(/^([^:]+):\s*(.*)$/);return match?`<tr><th scope="row">${e(match[1])}</th><td>${e(match[2])}</td></tr>`:`<tr><td colspan="2">${e(line)}</td></tr>`;}).join('')}</tbody></table></section>`;}
  function modelCards(raw){const [, ...rows]=raw.split('\n');const cards=[];rows.filter(Boolean).forEach(line=>{if(line.startsWith('↳ ')){cards.at(-1)?.notes.push(line.slice(2));return;}const split=line.indexOf(':');cards.push({name:line.slice(0,split).replace(/^· /,''),value:line.slice(split+1).trim(),notes:[]});});return `<div class="guide-model-grid">${cards.map(card=>`<section class="guide-model"><h3>${e(card.name)}</h3><div class="prose">${rich(card.value,{emphasis:false})}${card.notes.map(note=>`<p class="subnote">${e(note)}</p>`).join('')}</div></section>`).join('')}</div>`;}
  function missingGuide(){return `<div class="guide-empty"><p>빈스의 해당 안내는 아직 등록되지 않았습니다.</p></div>`;}
  function platformBody(item,platform){
    if(platform==='nody'){
      if(item.index===3)return rich(guideData.nody.budget.join('\n'),{emphasis:false})+`<p><a href="#guide/5">추천 설정값 보기 →</a></p>`;
      if(item.index===4)return guideParts(item.parts.map(part=>({...part,body:part.body.replaceAll('https://rentry.co/rp-handoff-note','https://rentry.co/rp-handoff-note-nody')})));
      if(item.index===5)return `<section class="guide-setting-group"><h3 class="guide-setting-path">채팅방 설정 → 대화</h3>`+guideData.nody.settings.slice(0,6).map((block,i)=>settingTable(block,4)+(i===0?`<p class="subnote">${e(guideData.nody.notes[0])}</p>`:'')).join('')+`</section><section class="guide-setting-group"><h3 class="guide-setting-path">채팅방 설정 → 기억</h3>`+guideData.nody.settings.slice(6).map(block=>settingTable(block,4)).join('')+guideData.nody.notes.slice(1).map(note=>`<p class="subnote">${e(note)}</p>`).join('')+'</section>';
      if(item.index===6)return settingTable(guideData.nody.models[0])+modelCards(guideData.nody.models[1])+settingTable(guideData.nody.models[2]);
      if(item.index===7)return `<p class="guide-setting-path">채팅방 설정 → 대화 → 출력 가이던스</p>`+rich(guideData.nody.guidanceIntro,{emphasis:false})+guideData.guidance.slice(0,3).map((part,i)=>copyBlock((i===2?'(선택) ':'')+part.heading,part.body)).join('');
      if(item.index===8)return `<p class="guide-setting-path">채팅방 설정 → 기억 → 장기기억 설정 → 요약 방식</p><p class="subnote">모든 캐릭터에 공통으로 쓰는 문구입니다. 다음 요약부터 적용됩니다.</p>`+copyBlock('공통 요약 방식',guideData.nody.memory);
      return missingGuide();
    }
    if(item.index===5){const models=guides[6].parts;return guideParts(item.parts)+guideParts(models.filter(part=>['공통 설정','추론 조절'].includes(part.heading)))+settingTable('모델별 추론값\n'+models.find(part=>part.heading==='모델별 특징 · 개별 추론').body.split('\n').filter(line=>line.startsWith('· ')).join('\n'))+guideParts(models.filter(part=>part.heading==='참고'));}
    if(item.index===6){const modelPart=item.parts.find(part=>part.heading==='모델별 특징 · 개별 추론');const models=modelPart.body.split(/(?=^· )/m).filter(Boolean).map(raw=>{const [first,...notes]=raw.trim().split('\n');return first.split(':')[0]+': '+notes.map(note=>note.replace(/^↳ /,'')).join('\n↳ ');}).join('\n');return guideParts(item.parts.filter(part=>part.heading==='운용'))+modelCards('모델별 특징\n'+models)+`<p><a href="#guide/5">공통 설정·모델별 추론값 보기 →</a></p>`;}
    if(item.index===7)return guideParts(item.parts.filter(part=>!part.heading))+guideData.guidance.map((part,i)=>copyBlock(part.heading+(i===3?' (선택 사항)':''),part.body)).join('');
    if(item.index===8)return `<p class="guide-setting-path">${e(item.text.slice(0,item.text.indexOf('Use only supplied evidence.')).trim())}</p>`+copyBlock('추가 요약 지침',guideData.memory);
    if(item.index===9)return `<p>채팅창에 직접 입력하거나 상태창 하단 버튼으로 사용.</p>${commandRows(data.commands)}`;
    if(item.index===10)return item.parts.map(part=>part.body.startsWith('<VStatus')?copyBlock(part.heading,part.body.trim()):guideParts([part])).join('');
    return guideParts(item.parts);
  }
  function guideBody(){
    const item=guides[state.guide];
    const platform=state.guidePlatforms[state.guide];
    const tabs=item.common?'':`<div class="guide-platforms" role="tablist" aria-label="${e(guideName(item))} 플랫폼">${['elyn','nody'].map(value=>`<button type="button" role="tab" id="guide-platform-${value}" data-guide-platform="${value}" aria-controls="guide-platform-body" aria-selected="${platform===value}">${value.toUpperCase()}</button>`).join('')}</div>`;
    const body=item.index===2?`<ol class="guide-play-list">${item.parts.map(part=>`<li>${e(part.heading)}</li>`).join('')}</ol>`:item.common?guideParts(item.parts):platform?platformBody(item,platform):'<p class="guide-empty">ELYN 또는 NODY를 선택하세요.</p>';
    return `<div class="guide-article-head"><h2 id="guide-title" class="guide-title" tabindex="-1">${phraseLabel(guideName(item))}</h2>${tabs}</div><div id="guide-content-scroll" class="guide-content-scroll" tabindex="0"><div id="guide-platform-body" ${item.common?'':`role="tabpanel"${platform?` aria-labelledby="guide-platform-${platform}"`:''}`} class="prose guide-prose">${body}</div>${item.index===6?'<aside class="guide-notes"><p>3.7 / 3.8 Flash 중단 시 → 모델 교체 후 복귀하시면 됩니다.</p></aside>':item.index===7?'<aside class="guide-notes"><p>출력 가이던스는 과잉 검열을 줄입니다.</p></aside>':item.title.includes('에셋')?'<aside class="guide-notes"><p>에셋은 비정기 추가됩니다.</p></aside>':''}</div>`;
  }
  function renderGuide(){return `<div class="guide-layout"><aside class="guide-sidebar"><h1 id="page-title" tabindex="-1">이용 가이드</h1><button class="guide-menu-toggle" type="button" aria-expanded="false" aria-controls="guide-menu">항목 선택 <span aria-hidden="true">⌄</span></button><nav id="guide-menu" aria-label="가이드 항목">${guideData.groups.map(group=>`<div class="guide-menu-group"><h2>${phraseLabel(group.title)}</h2>${group.items.map(i=>`<button type="button" data-guide="${i}" ${i===state.guide?'aria-current="true"':''}>${phraseLabel(guideName(guides[i]))}</button>`).join('')}</div>`).join('')}</nav></aside>
    <div class="guide-main"><div class="guide-banner">${img('harlem-street','아파트 건물의 소방계단','',true)}</div><div class="guide-article" id="guide-article">${guideBody()}</div></div></div>`;}
  function renderPlaylist(){const first=data.tracks[0];const [artist,...song]=first.label.split(' - ');return `<section class="playlist-hero">${img('radio-window','할렘 아파트 창가의 오래된 카세트 데크','scene-background',true)}<div class="playlist-hero-inner content-width"><div class="playlist-heading"><h1 id="page-title" tabindex="-1">빈스의<br><span class="stroke-underline">플레이리스트</span></h1></div><div class="featured-track"><h2>${e(song.join(' - '))}</h2><p>${e(artist)}</p><a class="action action-outline" href="${e(first.url)}" target="_blank" rel="noopener noreferrer">${phraseLabel('YouTube에서 듣기')} ${arrow}</a></div></div></section>
    <div class="playlist-page content-width"><aside class="playlist-decoration">${img('hero-night','불 켜진 창문과 검은 소방계단')}<p>Playlist</p></aside><ol class="track-list">${data.tracks.map((track,i)=>`<li><a href="${e(track.url)}" target="_blank" rel="noopener noreferrer" aria-label="${e(track.label)} · YouTube에서 듣기"><span class="track-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="track-name">${e(track.label).replace(' - ',' — ')}</span>${arrow}</a></li>`).join('')}</ol></div>`;}
  const renderers={home:renderHome,profile:renderProfile,world:renderWorld,openings:renderOpenings,guide:renderGuide,playlist:renderPlaylist};
  const routeNames={home:'홈',profile:'프로필',world:'세계관',openings:'도입부',guide:'이용 가이드',playlist:'플레이리스트'};
  let preserveWorldViewport=false;
  function renderRoute({focus=false}={}){
    const [route,sub,detail]=location.hash.slice(1).split('/');
    const retainedWorld=state.route==='world' && route==='world' && document.getElementById('world-body');
    const previousScroll=scroll.scrollTop;
    state.route=renderers[route]?route:'home';
    if(state.route==='world' && sub==='people' && /^\d+$/.test(detail??''))state.npc=Math.min(data.npcs.length-1,Number(detail));
    if(state.route==='world')state.world=['harlem','apartment','truck','people'].includes(sub)?sub:'harlem';
    if(retainedWorld){
      retainedWorld.innerHTML=worldBody();
      document.querySelectorAll('.world-tabs a').forEach(link=>{if(link.hash===`#world/${state.world}`)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
      if(state.world==='apartment')updateApartment();
      scroll.scrollTop=preserveWorldViewport?previousScroll:0;
      preserveWorldViewport=false;
      if(state.world==='people' && /^\d+$/.test(detail??''))requestAnimationFrame(()=>document.getElementById(`npc-${detail}`)?.scrollIntoView({block:'start'}));
      if(focus)document.getElementById('page-title')?.focus({preventScroll:true});
      return;
    }
    preserveWorldViewport=false;
    if(state.route==='guide' && sub!==undefined)state.guide=Math.max(0,Math.min(guides.length-1,Number(sub)||0));
    if(state.route==='guide' && ['elyn','nody'].includes(detail))state.guidePlatforms[state.guide]=detail;
    main.innerHTML=renderers[state.route]();
    main.dataset.route=state.route;
    scroll.dataset.route=state.route;
    document.title=`${routeNames[state.route]} · 빈스 크라우더`;
    document.querySelectorAll('[data-route]').forEach(link=>{if(link.dataset.route===state.route)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    scroll.scrollTop=0;
    closeOther();
    if(state.route==='profile')updateProfileTabs();
    if(state.route==='world' && state.world==='apartment')updateApartment();
    if(state.route==='world' && state.world==='people' && /^\d+$/.test(detail??''))requestAnimationFrame(()=>document.getElementById(`npc-${detail}`)?.scrollIntoView({block:'start'}));
    if(state.route==='guide' && ['elyn','nody'].includes(detail))requestAnimationFrame(()=>{
      const heading=document.getElementById('guide-title');
      scroll.scrollTop+=heading.getBoundingClientRect().top-scroll.getBoundingClientRect().top-12;
      document.getElementById('guide-content-scroll').scrollTop=0;
      heading.focus({preventScroll:true});
    });
    else if(focus)document.getElementById('page-title')?.focus({preventScroll:true});
  }
  function updateProfileTabs(){document.querySelectorAll('[data-profile]').forEach(button=>{const active=button.dataset.profile===state.profile;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});document.getElementById('profile-panel')?.setAttribute('aria-labelledby',`profile-tab-${state.profile}`);}
  function chooseProfile(value){const y=scroll.scrollTop;state.profile=value;document.getElementById('profile-panel').innerHTML=profileBody();updateProfileTabs();scroll.scrollTop=y;}
  function chooseGuide(index){
    const y=scroll.scrollTop;state.guide=index;document.getElementById('guide-article').innerHTML=guideBody();document.querySelectorAll('[data-guide]').forEach(button=>{if(Number(button.dataset.guide)===index)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
    const menu=document.getElementById('guide-menu');menu?.classList.remove('is-open');document.querySelector('.guide-menu-toggle')?.setAttribute('aria-expanded','false');
    scroll.scrollTop=y;
  }
  function chooseGuidePlatform(platform){
    const body=document.getElementById('guide-platform-body');
    const y=scroll.scrollTop;
    state.guidePlatforms[state.guide]=platform;
    body.innerHTML=platformBody(guides[state.guide],platform);
    body.setAttribute('aria-labelledby',`guide-platform-${platform}`);
    document.querySelectorAll('[data-guide-platform]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.guidePlatform===platform)));
    scroll.scrollTop=y;
  }
  let noticeTimer;
  function notify(message){const node=document.getElementById('notice');node.textContent=message;node.classList.add('visible');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>node.classList.remove('visible'),2600);}
  async function copy(text,button){try{await navigator.clipboard.writeText(text);notify('복사했습니다.');button?.classList.add('copied');setTimeout(()=>button?.classList.remove('copied'),1200);}catch{const field=document.createElement('textarea');field.value=text;field.className='copy-fallback';document.body.append(field);field.select();let ok=false;try{ok=document.execCommand('copy');}catch{}field.remove();button?.focus({preventScroll:true});notify(ok?'복사했습니다.':'복사할 수 없습니다. 본문을 선택해 복사해 주세요.');}}
  function closeOther(){document.getElementById('other-menu').hidden=true;document.getElementById('other-toggle').setAttribute('aria-expanded','false');}
  function updateApartment(){const scene=document.getElementById('apartment-scene');if(!scene)return;scene.classList.toggle('show-home',state.apartmentView==='home');scene.classList.toggle('view-plan',state.apartmentView==='plan');scene.classList.toggle('is-pinned',state.apartmentPinned);document.querySelectorAll('[data-apartment]').forEach(button=>{const value=button.dataset.apartment;const active=value===state.apartmentView;button.setAttribute('aria-pressed',String(active));button.classList.toggle('is-selected',active);button.classList.toggle('action-outline',!active);});scene.querySelector('.apartment-hit').setAttribute('aria-pressed',String(state.apartmentPinned));scene.querySelector('.apartment-hit').setAttribute('aria-label',state.apartmentPinned?'벽과 가구 고정 해제':'벽과 가구를 올린 상태로 고정');}
  document.addEventListener('click',event=>{
    const toggle=event.target.closest('#other-toggle');if(toggle){const opening=toggle.getAttribute('aria-expanded')!=='true';document.getElementById('other-menu').hidden=!opening;toggle.setAttribute('aria-expanded',String(opening));return;}
    if(!event.target.closest('.other-characters'))closeOther();
    const profile=event.target.closest('[data-profile]');if(profile){chooseProfile(profile.dataset.profile);return;}
    const npc=event.target.closest('[data-npc]');if(npc){chooseNPC(Number(npc.dataset.npc));return;}
    const guide=event.target.closest('[data-guide]');if(guide){chooseGuide(Number(guide.dataset.guide));return;}
    const copyButton=event.target.closest('[data-copy]');if(copyButton){copy(copyButton.dataset.copy,copyButton);return;}
    const platform=event.target.closest('[data-guide-platform]');if(platform){chooseGuidePlatform(platform.dataset.guidePlatform);return;}
    const menu=event.target.closest('.guide-menu-toggle');if(menu){const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));document.getElementById('guide-menu').classList.toggle('is-open',expanded);return;}
    const apartment=event.target.closest('[data-apartment],.apartment-hit');if(apartment){const value=apartment.dataset.apartment;if(!value){state.apartmentPinned=!state.apartmentPinned;if(state.apartmentPinned)state.apartmentView='home';}else{state.apartmentView=value;state.apartmentPinned=false;}updateApartment();return;}
    const place=event.target.closest('[data-place]');if(place){const content=place.dataset.place==='deli'?['델리','동네 델리에서는 커피를 사고 외상값을 따집니다.','새미가 밀린 외상값을 요구하면 돈 얘기로 번지기도 합니다.']:['빨래방','난방이 고장 나면 관리인을 기다리고, 빨래방에서는 세탁이 끝날 때까지 시간을 죽입니다.'];document.getElementById('place-detail').innerHTML=`<h2 class="section-heading"><span>${content[0]}</span></h2><div class="prose">${content.slice(1).map(s=>`<p>${s}</p>`).join('')}</div><div class="actions vertical">${buttonLink('이웃 보기','#world/people',true)}${buttonLink('아파트 보기','#world/apartment')}</div>`;document.querySelectorAll('[data-place]').forEach(b=>b.setAttribute('aria-pressed',String(b===place)));return;}
    const internal=event.target.closest('a[href^="#"]');if(internal&&internal.hash!=='#page-title'){
      preserveWorldViewport=Boolean(internal.closest('.world-tabs'));
      if(preserveWorldViewport){event.preventDefault();if(internal.hash!==location.hash)history.pushState(null,'',internal.hash);renderRoute();return;}
      if(internal.hash===location.hash){event.preventDefault();renderRoute({focus:true});}return;
    }
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){const wasOpen=!document.getElementById('other-menu').hidden;closeOther();if(wasOpen)document.getElementById('other-toggle').focus();}
    const tab=event.target.closest('[data-profile]');if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const values=['nature','voice','taste'];let index=values.indexOf(state.profile);index=event.key==='Home'?0:event.key==='End'?2:(index+(event.key==='ArrowRight'?1:2))%3;chooseProfile(values[index]);document.getElementById(`profile-tab-${values[index]}`).focus();}
  });
  window.addEventListener('hashchange',()=>renderRoute({focus:true}));
  renderRoute();
})();
