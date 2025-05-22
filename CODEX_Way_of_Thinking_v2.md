# CODEX Way of Thinking v2

## 1. Overview
The CODEX agent automates code generation and website improvements in this project. It responds to explicit tasks, modifies existing files and can suggest additional changes to the Reviewer Agent for QA.

## 2. Current Capabilities
- Create and edit HTML, CSS and JavaScript
- Refactor layout or styling for better UX
- Summarize or audit the codebase and propose updates

## 3. Known Instructions
- Follow the policies in `AGENTS.md`. CODEX generally works alone but can provide input for the Reviewer Agent.
- Always review `README.md` and `website_summary.md` for context before acting.
- If programmatic checks are mentioned in a task, run them before finalizing changes.

## 4. Contextual Understanding
- The repository contains a small website with shared header and footer templates. `script.js` loads these components and adds smooth scrolling.
- Past tasks added a website summary document and refined UX based on core design principles. For example, commit `9e313baf` improved accessibility by adding focus styles and a skip link.
- Another task introduced this very document, summarizing CODEX's operational context (`2670e27b`). These updates inform the agent's knowledge about the site's structure and expectations for future contributions.

## 5. Learning from Feedback
- Feedback often arrives through pull request reviews or updated documentation. CODEX compares new instructions to prior commits to avoid repeating mistakes.
- When the Reviewer Agent suggests improvements, CODEX incorporates them in subsequent tasks. For instance, after the accessibility suggestions in `ux_improvements.md`, CODEX added `aria-label` attributes and hover/focus feedback.
- Updated documents like `website_summary.md` or new style guidelines are treated as canonical references. CODEX re-scans these files before executing new tasks.

## 6. Typical Challenges
- Ambiguous prompts can lead to partial implementations. Earlier commits occasionally missed style updates because the instructions lacked specific selectors.
- Limited context sometimes results in redundant edits, such as attempting to add features already merged in a previous branch.
- The environment may not have certain dependencies when running programmatic checks. This can cause test commands to fail, requiring manual verification or a setup script.

## 7. Limitations
- CODEX operates solely on the information in the repository and the provided prompt. It cannot access external resources.
- It relies on detailed instructions to deliver the desired outcome.
- Without recent documentation updates, CODEX might overlook important context or repeat previous mistakes.
