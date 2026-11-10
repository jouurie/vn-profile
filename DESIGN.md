# Vince character site — binding corrections

This file records the user's current accepted constraints for this site. Existing generated mockups are visual history, not authority to override these requirements.

## Canvas and responsive layout

- **2026-11-11 revision (supersedes the 770px cap):** the entire visible site is at most **1100 CSS pixels wide**, including header, footer, navigation, guide shell and illustrated content. The platform shows the page in a frame limited to 1100px, so that width is the wide baseline. On narrower screens it fits the available width. Center the site at wider viewport sizes. The rules live in `refresh.css`, loaded after `styles.css`.
- Compose for the actual site/container width (`@container vince`). Two-column arrangements and the larger type scale apply only from a 960px container; below that the single-column 770px-era composition stays.
- Reflow images, text, tabs and controls together. Keep complete copy, readable text sizes, semantic order, full touch targets and the existing illustrative identity. Check 320px, 390px, 770px, 1100px and a viewport wider than the site.
- Type scale (narrow → wide): body 14 → 16px, note 12 → 13px, section heading (h2) 19 → 23px, sub heading (h3) 15.5 → 17.5px, article/person title 22 → 28px. Section headings are ink with the brick slash and rule; sub headings are brick with a short mustard underline.

## Text is part of the design

- Design the text itself, not only its surrounding illustration or background. Use coherent print-like title/nameplates, semantic label/value alignment, selected inline emphasis or underlines, group separators and explicit subordinate-note indentation.
- Keep main headings, subsection headings, prose, labels/values and notes visibly distinct. Use the accepted ink, brick, mustard and paper roles purposefully; do not repeat the same red title treatment at every level.
- Preserve original wording, facts, order and exact copy payloads. Emphasis changes markup only and must not insert decorative labels into copied text.
- Preserve the Harlem subculture character-page identity, local font families and palette. Reject a bare modern documentation look, indiscriminate rectangles, repeated oversized filled bands, and blanket font shrinking.

## Existing behavior remains binding

- Twelve guide items correspond to WW, grouped as 시작 전 설정 → 플레이 방법 → 명령어·상태창 → 복원·이전. Platform-dependent items keep ELYN/NODY branches; common content stays common. Do not invent missing Vince-specific NODY data.
- Search remains removed. Short command literals have no COPY. Each independent long guidance, memory or example block has its own exact-body COPY.
- At a fixed viewport, selecting another guide item/platform cannot change the outer frame, rail, background extent, title anchor or body starting boundary. Short content cannot cut off the dark rail. Readable content scrolls within its assigned region without accumulated blank space.
- Keep the roster at ten or fewer. The current accepted seven are Delmar, Otis, Mrs Fowler, Delgado, Sammy, Wyatt Rhodes and Wade Rhodes. Retain the Rhodes brothers as outside industry contacts; including them does not include their surrounding cast. Preserve the five original author-fill portrait slots and the two brothers' verified portraits. No visitor upload controls.
- Keep one apartment stage with alternative states, not duplicated side-by-side views.

## Proposal status

The wide A/B boards in `.artifacts/reports/20261104-vince-revised-proposals` were rejected as implementation baselines by the subsequent 770px/text-design correction. Preserve them as history. Do not ask to approve or implement those boards again.
