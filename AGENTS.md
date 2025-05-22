# Project Automation Agents

## Overview
This document describes the automated agents utilized in this project.

## CODEX Agent
**Purpose:**  
Generate, modify, and improve code based on user instructions.

**Capabilities:**  
- HTML, CSS, JavaScript generation  
- UX/UI improvements  
- Website audit and recommendations

**Limitations:**  
- Requires clear, explicit instructions  
- Limited understanding of broader context without detailed references

**Interactions:**  
Typically works alone but can provide input to the Reviewer Agent for QA.

## Reviewer Agent
**Purpose:**  
Quality assurance and coherence checks for code and UX.

**Capabilities:**  
- Consistency checking  
- Accessibility and responsiveness testing  
- Provides detailed feedback for improvements

**Limitations:**  
- Doesn't automatically fix errors; provides recommendations only.

**Interactions:**  
Works in coordination with CODEX to verify and recommend improvements.

## Usage Instructions
Invoke CODEX via structured tasks provided in markdown format. After CODEX completes its task, run the Reviewer Agent to verify quality and coherence.

## Maintenance and Troubleshooting
Update tasks regularly for clarity. Ensure context files (`README.md`, `website_summary.md`) are current for optimal agent performance. For troubleshooting, refer to the agent logs or restart agents if unexpected behavior occurs.
