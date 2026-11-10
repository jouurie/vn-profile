# 새 그림 자리 (빈스)

그림이 아직 없는 칸 목록입니다. 화면에는 지금 머리글자와 짧은 설명 글이 대신 들어가 있습니다.
그림 파일을 `assets/` 에 넣고 `content.js` 맨 아래의 `npc.image` 에 `src` 를 채우면 설명 글은 저절로 사라집니다.

## 공통 화풍 (모든 프롬프트 앞에 붙이기)

> 1990s New York graphic-novel illustration, flat cel shading with bold ink outlines, warm autumn palette of brick red, mustard yellow, cream and near-black ink, late-afternoon low sunlight, subtle halftone grain. Same art style as the existing Vince Crowder portrait. No text, no watermark, no logo.

- 크기: 832×1216 (세로, 기존 로즈 형제 초상과 같은 비율)
- 구도: 반신상, 얼굴이 위에서 25% 근처에 오게. 목록의 작은 원형 썸네일은 이 얼굴 위치를 잘라 씁니다.
- 얼굴 위치가 다르면 `faceX` · `faceY` · `scale` 값만 고치면 됩니다.

## 주변 인물 초상 다섯 칸

| 칸 | 파일 이름(권장) | 화면에 적힌 설명 | 프롬프트 |
|---|---|---|---|
| 델마 헤이스 | `assets/npc-delmar.webp` | 뒤로 넘긴 짙은 금발, 녹색 눈. 말끔한 셔츠 차림의 마른 남자가 중고품 상자에 기대선 반신상. | Half-body portrait of a lean 33-year-old man with slicked-back dark blond hair and green eyes, neat pressed shirt with rolled cuffs, leaning on stacked second-hand goods crates in a dim storage unit, easy confident half-smile of a small-time broker. |
| 오티스 브라운 | `assets/npc-otis.webp` | 소매를 걷은 작업복, 귀 뒤에 꽂은 연필. 공구함을 든 아파트 관리인의 반신상. | Half-body portrait of a middle-aged Black apartment superintendent in a work shirt with sleeves rolled up, a pencil tucked behind his ear, holding a dented metal toolbox, standing by a cast-iron radiator in a Harlem tenement hallway, tired appraising look. |
| 에벌린 파울러 | `assets/npc-fowler.webp` | 단정한 은빛 머리. 체인을 건 문틈으로 복도를 내다보는 노부인의 반신상. | Half-body portrait of an elderly woman with neatly set silver hair and a cardigan, looking out through a door held on its security chain, hallway light falling across half her face, sharp attentive eyes, a small wristwatch visible. |
| 라파엘 델가도 | `assets/npc-delgado.webp` | 다림질한 황갈색 코트, 손에 든 면담 카드. 문 앞에 선 보호관찰관의 반신상. | Half-body portrait of a calm Latino probation officer in his forties wearing a pressed tan overcoat over a shirt and tie, holding a small stack of index cards, standing at an apartment doorway, patient unreadable expression. |
| 새미 해리스 | `assets/npc-sammy.webp` | 기름 묻은 앞치마. 델리 계산대 뒤에서 커피를 내미는 가게 주인의 반신상. | Half-body portrait of a stocky deli owner in a grease-stained apron behind a cluttered counter, sliding a paper cup of coffee forward, cash register and handwritten tab notes behind him, dry amused look. |

원문에 없는 생김새(인종 · 나이대 등)는 그림을 뽑기 좋게 채운 제안입니다. 설정과 다르면 그 부분만 고쳐 쓰세요.

## 있으면 좋은 그림 (지금은 다른 그림을 같이 쓰는 자리)

넓은 판(1100px)으로 넓어지면서 같은 그림이 여러 화면에 되풀이되는 것이 더 눈에 띕니다. 전용 그림을 만들면 `app.js` 의 해당 `img('…')` 이름만 바꾸면 됩니다.

| 자리 | 지금 쓰는 그림 | 권장 크기 | 프롬프트 |
|---|---|---|---|
| 도입부 머리 띠 | `hero-night` (홈과 같음) | 2200×520 | Wide banner: three closed apartment doors along a Harlem tenement hallway at night, one door slightly ajar with warm light spilling out, worn checkerboard floor, deep shadows on the left third for a title. |
| 프로필 › 버릇 아래 그림 | `hall-door` (홈 · 주변 인물과 같음) | 1200×420 | Close view of a stair landing: a worn leather jacket hung over the banister, a crumpled court envelope sticking out of the inside pocket, a ring of keys on the step. |
| 이용 가이드 머리 띠 | `harlem-street` 를 가늘게 자른 것 | 2200×380 | Wide rooftop-level strip of Harlem brownstone cornices and water towers under autumn leaves, plenty of clear sky on the right. |
