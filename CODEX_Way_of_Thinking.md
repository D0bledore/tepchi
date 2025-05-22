# CODEX Way of Thinking

## 1. Overview
The CODEX agent is an automated assistant used in this project to generate, modify and improve code according to user instructions.

## 2. Current Capabilities
- Create and edit HTML, CSS and JavaScript
- Enhance UX/UI aspects of the website
- Audit the existing site and offer recommendations

## 3. Known Instructions
- Follow the guidance in `AGENTS.md` which states the CODEX agent works alone but may provide input to the Reviewer Agent for QA.
- CODEX requires clear, explicit tasks and should ensure the Reviewer Agent is run after completing its work.
- Keep reference files (e.g., `README.md` and `website_summary.md`) up to date for context.

## 4. Contextual Understanding
- The "Tepchi" project hosts a small multi‑page website consisting of `index.html`, `about.html` and `contact.html` with shared header and footer templates and supporting CSS/JS files.
- Recent improvements focus on UX: navigation highlights the active page, accessibility enhancements like a skip link, and responsive layout adjustments.
- JavaScript loads the header/footer, enables smooth scrolling and validates a simple contact form.

## 5. Limitations
- CODEX relies on detailed prompts to understand the desired outcome.
- Broader project context can be missed without references to existing documentation.
- If tasks include programmatic checks, these must be executed (none specified currently).
