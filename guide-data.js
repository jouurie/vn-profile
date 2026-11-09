/* Platform-general NODY text from WW/guide.js: 200–230. No Rhodes memory,
   runtime schema, command mapping or character recovery URL is imported. */
(() => {
  'use strict';
  const nody = {
  memory: "Write Korean long-term memory within 300 characters. First identify the latest supported facts: who did or knows what, each condition and the action it limits, corrections, refusals and pending choices. Then compress them with the central stated emotional/relationship change. In every clause name the person explicitly when people differ. A later correction replaces the earlier claim: state the corrected fact, not merely that a misunderstanding was cleared. Retain consequential corrections and unresolved conditions before routine hospitality or scenery. Keep proposals, conditional intentions, confirmed agreements and completed actions distinct. Preserve uncertainty and negation. Do not join unrelated facts with an invented cause. For user feelings, follow the user's own words: relief need not mean trust; discomfort need not mean distrust or recovery. Omit unsupported motives. Merge repeats and omit minor details, dialogue and known background. Use the latest confirmed time and place.\nFill this template in Korean; output only these three lines:\n[시간: ... | 장소: ...]\n감정: ...\n사건: ...",
  "budget": [
    "로어북은 키워드가 나올 때만 꺼내 쓰는 설정입니다.",
    "로어북 예산은 한 번의 답변에 가져올 수 있는 로어북 내용의 글자수 한도이며, 캐시 금액이 아닙니다.",
    "내용이 예산 한도로 잘리지 않도록 최대로 설정하는 것을 권장합니다. 예산을 늘리면 더 많은 설정을 담는 대신 매 턴 캐시 사용량도 늘 수 있습니다."
  ],
  "settings": [
    "답변\n출력량: 길게\n최대 출력량: 6,000토큰\n응답 품질: 높음\n로어북 예산: 50,000자\n출력 속도: 즉시",
    "추천 답변 문체\n지문 표기: 안 씀\n인칭: 3인칭\n시제: 과거",
    "문체\n지문 별표 쓰기: 끔",
    "출력 가이던스\n역할극 유지: 적용\n관계 진행: 적용\n분량 · 리듬: 선택 적용",
    "AI 연기 방식\n이야기 전개: 차분하게 또는 적극적으로\n캐릭터 태도: 중립 또는 거칠게",
    "기타\n상태창 표시: 켬",
    "대화 기억 범위\n최근 대화: 5턴",
    "장기기억 설정\n요약 주기: 5턴\n요약 글자수: 6,000자\n자동으로 요약하기: 켬"
  ],
  "notes": [
    "높음은 답변이 느려지고 캐시 사용량이 늘 수 있습니다.",
    "1턴은 내 말과 캐릭터 답변 한 쌍입니다. 최근 대화는 원문으로 기억할 범위이고, 요약 주기는 장기기억을 갱신할 간격입니다. 원문 비용을 줄이려면 최근 대화부터 조절하세요.",
    "요약 주기가 짧을수록 장기기억을 더 자주 갱신합니다. 요약 글자수는 6,000자로 시작하세요. 대화가 길어져 기억할 내용이 많아지면 요약 글자수를 늘리세요."
  ],
  "models": [
    "운용\n가성비: Gemini 3.7 Flash / Gemini 3.8 Flash ↔ GLM 5.3\n일반: Gemini 3.7 Flash / Gemini 3.8 Flash ↔ Gemini 4 Argon / Gemini 2.5 Pro / Gemini 3.1 Pro / 별도 선택: GPT-6.1 Sol (용도: SFW)\n고가: Claude Opus 5.5 ↔ Gemini 4 Argon / 별도 선택: GPT-5.6 Sol · GPT-6.1 Sol (용도: SFW)\nNSFW: Gemini 3.7 Flash / Gemini 3.8 Flash / Gemini 4 Argon / Gemini 2.5 Pro / Gemini 3.1 Pro ↔ GLM 5.3 / Claude Opus 5.5",
    "모델별 특징\nGemini 3.7 Flash / Gemini 3.8 Flash: 대사가 자연스럽고 진행이 능동적입니다. 3.7 Flash는 다소 긍정적이고, 3.8 Flash는 다소 부정적인 경향이 있습니다.\nGemini 3 Flash: 비용이 낮은 선택지입니다. 3.7 Flash · 3.8 Flash의 전개가 한쪽으로 치우칠 때 사용하세요.\nGLM 5.3: Opus와 비슷한 감정선을 더 가볍게 이어 갑니다.\nDeepSeek Flash: 저렴한 축이라 긴 대화의 비용 부담이 적습니다. 상태창 출력이 잘 되지 않습니다.\nKimi 3: 차분하고 정돈된 문장을 씁니다. 답변이 길고 느린 편이라 실제 비용이 커질 수 있습니다.\nGemini 2.5 Pro: 캐릭터 해석은 안정적이며 소유욕 · 집착이 강해질 수 있습니다.\nGemini 3.1 Pro: NSFW로 빠르게 기울고 상황을 야릇하게 몰아가는 경향이 있습니다.\nGemini 4 Argon: 생생한 인물별 상호작용과 풍부한 동작 · 감각 묘사에 강합니다.\nClaude Opus: Claude Opus 4.6: 순애 · 감정선 복원에 강합니다.\n↳ Claude Opus 4.7: 지침을 충실히 따르며, 4.6보다 적극적으로 전개하는 편입니다.\n↳ Claude Opus 4.8: 정돈된 문장과 자연스러운 장면 확장에 강합니다.\n↳ Claude Opus 5: 캐릭터성과 관계를 유지하며 능동적으로 진행합니다.\n↳ Claude Opus 5.5: 능동적인 진행과 4.6에 가까운 감정선이 장점입니다.\nGPT-5.6 Sol: 밀도 있는 서술과 능동적인 진행이 특징입니다. 여러 인물의 대화 · 복잡한 관계에 강합니다.\n↳ 용도: SFW\nGPT-6.1 Sol: 능동적인 진행과 여러 인물의 티키타카 · 관계 전개에 강합니다.\n↳ 용도: SFW",
    "참고\n최소 2개 모델을 번갈아 사용해 말투, 전개의 치우침을 줄이세요.\n표현과 전개가 반복되면 → 모델을 교체하세요."
  ],
  "guidanceIntro": "진행을 안정시키려면 아래 기본 가이던스 2개를 추가하세요. 분량과 리듬도 조절하려면 선택 가이던스를 함께 추가하세요.\n각 제목은 '규칙 이름'에, 그 아래 영어 본문은 '내용' 칸에 입력하세요.\n분량·리듬은 더 긴 답변과 일정한 문단 구성을 원할 때만 추가하는 선택 가이던스입니다."
};
  const groups = [
    {title:'시작 전 설정',items:[3,5,6,7,8]},
    {title:'플레이 방법',items:[0,1,2]},
    {title:'명령어·상태창',items:[9,10]},
    {title:'복원·이전',items:[4,11]}
  ];
  const divide = text => {
    const starts=[0,...[...text.matchAll(/^▸ /gm)].map(match=>match.index)].filter((value,index,all)=>!index||value!==all[index-1]);
    return starts.map((start,index)=>{
      const raw=text.slice(start,starts[index+1]??text.length).trim();
      const end=raw.indexOf('\n'),marked=raw.startsWith('▸ ');
      return {heading:marked?raw.slice(2,end<0?undefined:end):'',body:marked?(end<0?'':raw.slice(end+1)):raw};
    });
  };
  const build = content => {
    const items=content.sections.slice(6,18).map((item,index)=>({...item,index,common:index<3,parts:divide(item.text)}));
    if(items.length!==12)throw Error('Expected 12 Vince guide items');
    const guidance=items[7].parts.filter(part=>part.heading).map(part=>({heading:part.heading,body:part.body.trim().replace(/\n+\(선택 사항\)$/, '')}));
    const memoryOffset=items[8].text.indexOf('Use only supplied evidence.');
    return {items,groups,nody,guidance,memory:items[8].text.slice(memoryOffset).trim(),divide};
  };
  window.VinceGuideData={build};
})();
