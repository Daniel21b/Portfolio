# Project Context: Personal Portfolio & Resume Site

## Core Guidelines
- **Role**: Senior Frontend Engineer & UX Designer
- **Tone**: Professional, Modern, "Data-Forward"
- **Safety Rule**: Never break existing responsiveness. When introducing new UI components (like cards), ensure they degrade gracefully on mobile.

## Tech Stack & Architecture
- **Framework**: [Insert your framework here, e.g., React, Next.js, Vue, or HTML/SCSS]
- **Styling**: [Insert styling method, e.g., Tailwind CSS, CSS Modules, Styled Components]
- **State Management**: minimal/local state preferred for UI interactions.

## Design Philosophy (No Vibes Allowed)
- **Visuals**: "Clean, Modern, Interactive but Reserved."
- **Motion**: Use micro-interactions (hover states, slight scaling) rather than flashy animations.
- **Typography**: Clean sans-serif headers, readable serif or sans-serif body.

---

## Active Tasks & Implementation Plans

### 1. Update Experience Section (Content Swap)
* **Target**: The "Experience" or "Work History" component.
* **Action**: Locate the entry for "ICATT Consulting" (or where the Snowflake description resides).
* **Change**: Replace the existing Snowflake description with the following text EXACTLY:
    > "Engineered a dimensional data model in AWS Redshift Serverless optimized for Power BI ingestion, cutting the revenue reporting cycle from 5 days to 2 days."
* **Constraint**: Do not alter the surrounding container or date formatting.

### 2. Modernize "About Me" (UX Upgrade)
* **Problem**: Current summary is static and dull.
* **Solution**: Implement a "Progressive Disclosure" or "Highlight" design.
* **Design Pattern**:
    * Use a **Typewriter Effect** for the opening hook OR a **highlight-on-hover** interaction for key terms (e.g., "Data Engineer," "University of Maryland").
    * **Container**: Use a subtle glassmorphism background or a clean border with a refined shadow (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`).
* **Constraint**: Ensure text remains selectable and readable. Avoid layout shifts.

### 3. Transform "Skills & Technologies" (UI Overhaul)
* **Problem**: Currently a static list. Needs separation and interactivity.
* **Solution**: **3D Flip Cards** or **Hover-Reveal Grid**.
* **Implementation Specs**:
    * **Layout**: CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))`).
    * **Card Front**: Icon + Technology Name (e.g., Python, AWS, SQL).
    * **Card Back (Hover/Flip)**: Proficiency level or a brief usage context (e.g., "Used in Invoice Pipeline").
    * **Interaction**: CSS `transform: rotateY(180deg)` for flip, or `transform: translateY(-5px)` for simple lift.
* **Constraint**: If using Flip Cards, ensure the "Back" face is hidden by default (`backface-visibility: hidden`).

---

## Coding Standards
1.  **Component Isolation**: Create new components (e.g., `SkillCard.js`, `AboutSection.js`) rather than editing a monolithic file.
2.  **CSS Safety**: Use scoped classes or specific selectors. Do not change global `body` or `h1-h6` styles unless explicitly instructed.
3.  **Mobile First**: Verify that the new Skills Grid collapses to a single or double column on screens < 768px.