# Benjamin Thomas | UX/UI Portfolio

**UX/UI Design · Front-End Development · Data Analytics**

A responsive personal portfolio themed around cycling and the outdoors. Each section of the site is a stop on a trail: visitors choose a route, move between stops, and finish at the contact page.

**Live site:** [benjamin-thomas-portfolio-website.netlify.app](https://benjamin-thomas-portfolio-website.netlify.app/)

## What's on the site

| Route | What it shows |
| --- | --- |
| Home (Trailhead) | Introduction and a "Choose your route" menu |
| 01 Projects | Eight projects, filterable by UX/UI & Web Design, Product & SaaS, and Data & Analytics, each with a summary card and a full case study |
| 02 Experience | Movement to Work, Ergometric and Garswood Vehicle Solutions, with job title, dates, location, highlights and skills |
| 03 About | Background, education, key skills and interests |
| 04 Workflow | An eight-stage process (Discover to Launch), with real examples from my work at each stage |
| Contact (The finish) | Email, LinkedIn, GitHub and phone, with one-click copy for email and phone |

### Projects

- Outdoor-Inspired Digital Portfolio (this site)
- Digital Native: Global Games Sales Executive Dashboard
- Data Analyst Interactive Portfolio
- GetFitnessMode: Fitness and Training Platform
- Digital Museum of Tomorrow (collaborative)
- UX/UI and Front-End Portfolio: Original Version
- 22 Club: UX Redesign and Website Performance Optimisation
- Student Magazine: End-to-End UX/UI Design

## How it works

- **One route at a time.** Each section opens on its own rather than as one long page. Routes have their own links (for example `#/projects/22-club` or `#/projects/22-club/case`), so shared links, the browser Back button and refreshing all work.
- **Trail navigation.** On desktop, a trail-style navbar shows where you are, and a fixed bar at the bottom keeps Previous stop and Next stop in the same place on every page. On mobile, a menu and a miniature trail bar do the same job.
- **Explorers.** Projects and Experience use a timeline of wooden signs and a summary card with Previous and Next buttons that loop at either end. Full case studies open in a panel that closes with Back, Escape or the close button.
- **No framework.** Plain HTML, CSS and JavaScript, with no build step or dependencies.

## Structure

```
index.html         Page markup: header, routes, navigation bars, case-study panel
css/styles.css     All styles, including responsive layouts and reduced-motion rules
js/data.js         Content: projects, experience, workflow, about and skills
js/main.js         Routing, navigation, explorers, case studies, workflow, copy actions
fonts/             Self-hosted Carter One, Caveat Brush and Inter (SIL Open Font License)
images/bg/         Scene backgrounds, sized per screen: desktop, tablet and phone
images/projects/   Project screenshots, with smaller -640 versions for phones
images/ui/         Signs, brush strokes, paper notes and icons
```

To update content, edit `js/data.js`. Projects, roles and workflow stages are all generated from it.

## How it was built

- **Designed in Figma.** Desktop and mobile layouts, the visual direction and the components were designed first in Figma.
- **Developed with AI assistance.** The front end was built with AI assistance (Claude) under my direction. I set the requirements, reviewed the output, tested it and made the design decisions throughout.
- **Tested** with Google Lighthouse, an automated browser test suite (Playwright) and manual checks at phone, tablet and desktop sizes.

## Accessibility and performance

- Semantic HTML, a skip link, visible focus states and full keyboard support, including arrow keys in tabs, lists and the workflow trail
- Clear accessible names for every control, plus live announcements when content changes or details are copied
- Touch targets of at least 44px, and reduced-motion support that keeps short fades but removes sliding and parallax
- Responsive WebP images sized for each screen, lazy-loaded where they're off screen, and self-hosted, subset fonts

**Lighthouse (October 2026):**

| | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 99 | 100 | 100 | 100 |
| Mobile | 87–88 | 100 | 100 | 100 |

Mobile figures are from Lighthouse's simulated slow-phone test with text compression enabled, as Netlify serves the site.

## Deployment

<<<<<<< Updated upstream
Presents my work and practical experience, including:

- Movement to Work — UX/UI Designer & Front-End Developer
- Ergometric — Ecommerce Web Designer
- Garswood Vehicle Solutions — Automotive Mechanic Summer Placement

Each entry focuses on responsibilities, tools, transferable skills and contributions.

### About Me — Behind the Journey

Introduces my background in Web Design, Development & Analytics, alongside my interests, technical capabilities and approach to creating useful digital experiences.

### Workflow — From Research to Results

A visual overview of my approach to digital projects, organised into eight adaptable stages, each selectable on an interactive trail:

1. **Discover** — Understand the brief, goals, stakeholders and requirements.
2. **Research** — Explore user needs, existing solutions and opportunities.
3. **Define** — Translate findings into clear problems, requirements and priorities.
4. **Ideate** — Explore concepts, sketches and possible solutions.
5. **Design** — Create wireframes, prototypes and accessible interfaces.
6. **Test** — Evaluate usability, gather feedback and refine solutions.
7. **Build** — Implement responsive interfaces and functionality.
8. **Launch & improve** — Deploy, run final checks, then review performance and feedback for further improvements.

The process is flexible and adapts to each project's requirements rather than following a rigid sequence.

### Contact — The Next Opportunity

Provides contact options through LinkedIn, GitHub, email and telephone, supporting professional connections, employment opportunities and collaborations.

## UX Research & Design Process

### Research and Discovery

Research from my earlier portfolio development informed the direction of the new website, including:

- Competitor and portfolio inspiration research
- Consideration of recruiter needs and expectations
- Review of content hierarchy and project presentation
- Evaluation of navigation and responsive layout patterns

### Wireframing and Prototyping

Figma was used to explore layouts and develop high-fidelity interface designs for desktop and mobile.

The designs focus on consistent typography, clear hierarchy, interactive navigation and a coherent visual identity.

### Visual Design

The visual direction is inspired by outdoor exploration and incorporates:

- Mountain and woodland environments
- Wooden trail signs and directional navigation
- Handwritten and brush-style typography
- Lime-green interaction highlights
- Torn-paper cards and illustrated details
- Journey and route-inspired visual elements

These elements help establish a consistent identity across the website.

### Responsive Design

Desktop and mobile layouts were considered separately to maintain visual clarity and usability.

The mobile experience includes a custom expandable navigation menu, optimised content arrangements and touch-friendly interactions.

## Technologies & Tools

**Design and Research**
- Figma
- UX Research
- Competitor Analysis
- Wireframing
- Interactive Prototyping
- Responsive UI Design

**Development**
- HTML5
- CSS3
- JavaScript
- Git and GitHub

**Testing and Evaluation**
- Usability Evaluation
- Responsive Testing
- Accessibility Review
- Google Lighthouse

**Deployment**
- Netlify

## Accessibility & Usability

The portfolio is designed with accessibility and usability in mind, including consideration of:

- Readable text and sufficient colour contrast
- Clear navigation and content hierarchy
- Keyboard accessibility and focus indicators
- Responsive layouts and touch targets
- Semantic HTML
- Optimised images and page performance
- Reduced-motion preferences for animations

These areas form part of ongoing quality assurance and refinement.

## Project Outcome

The portfolio brings together my UX/UI design, development, research and analytical experience within a single creative experience.

It demonstrates my ability to combine visual storytelling with structured problem-solving, while presenting professional work and technical capabilities in a way that is approachable and easy to explore.

The project also builds upon lessons from my previous portfolio, with a stronger emphasis on distinctive visual design, interactive navigation, responsive layouts and clear communication.

## Future Improvements

- Refine animations and transitions across devices.
- Conduct further task-based usability testing.
- Improve accessibility and keyboard interactions.
- Continue performance and image optimisation.
- Expand selected projects into detailed case studies.
- Update project content as new work is completed.
- Review user feedback and analytics to guide improvements.

## Live Website

[View My Portfolio](https://benjamin-thomas-portfolio-website.netlify.app/)
=======
Hosted on Netlify as a static site. No build command is needed: publish the repository root.
>>>>>>> Stashed changes

## Author

**Benjamin Thomas**, UX/UI Designer and Front-End Developer, Lancashire, UK

<<<<<<< Updated upstream
UX/UI Designer | Front-End Developer | Data Analytics

[GitHub](https://github.com/BenjaminDThomas)

*Designed as a journey through my work, experience and creative development.*
=======
[LinkedIn](https://www.linkedin.com/in/benjamin-david-thomas/) · [GitHub](https://github.com/BenjaminDThomas)
>>>>>>> Stashed changes
