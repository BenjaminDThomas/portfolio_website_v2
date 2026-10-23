/*
 * Portfolio content data.
 * Projects and experience are rendered from these objects by main.js,
 * so new entries can be added here without touching the markup.
 *
 * Date fields use ISO strings ("YYYY-MM" or "YYYY-MM-DD"); end: null means "Present".
 * dateStatus:
 *   "confirmed"    - dates supplied and confirmed by Benjamin
 *   "repo-history" - derived from GitHub commit history, awaiting confirmation
 * Optional fields (links, caseStudy, projectTech, note, etc.) can be omitted;
 * empty sections and buttons are never rendered.
 */
(function () {
  "use strict";

  var CATEGORY_LABELS = {
    ux: "UX/UI & Web Design",
    product: "Product & SaaS",
    data: "Data & Analytics"
  };

  var projects = [
    {
      id: "new-portfolio",
      highlights: ["Custom desktop and mobile designs in Figma", "Route-based navigation through the portfolio", "Accessible tabs, menus and focus states"],
      title: "Outdoor-Inspired Digital Portfolio",
      shortTitle: "Personal Portfolio",
      categories: ["ux"],
      tags: ["UX/UI Design", "Web Design", "Front-End", "Personal Project"],
      start: "2026-10",
      end: null,
      dateStatus: "confirmed",
      featured: true,
      short:
        "A redesign of my UX/UI portfolio that presents my work, experience and process as a journey along mountain-bike routes.",
      summary: [
        "A complete redesign of my previous UX/UI portfolio. I wanted a site that shows my commercial experience and broader digital skills more clearly, with a visual identity that is distinctive without making ordinary navigation harder.",
        "The design uses an outdoor journey concept: mountain-bike scenery, wooden route signs, route-based navigation and interactive project and experience selectors, across custom desktop and mobile layouts."
      ],
      image: {
        src: "images/projects/new_portfolio_homepage.webp",
        width: 1200,
        height: 677,
        alt: "Homepage of the new portfolio: a mountain-bike trail at sunset with the name Benjamin Thomas, a Choose Your Route signpost and four route cards."
      },
      features: [
        "Custom responsive desktop and mobile designs, created in Figma",
        "Route-based navigation with a progress trail across the five sections",
        "Data-driven project and experience selectors that update without page reloads",
        "Accessible tabs, menus and focus states, with reduced-motion support",
        "Performance-conscious WebP imagery that loads as each section approaches"
      ],
      contribution: [
        "Designed every desktop and mobile layout, user flow and interface component in Figma.",
        "Planned the information architecture, so projects and work experience sit in separate, clearly signposted routes.",
        "Directed the implementation with Claude, then reviewed the build for visual inconsistencies, navigation friction and accessibility issues, and specified the fixes."
      ],
      outcomes: [
        "In progress: the Figma designs are complete and the responsive build is being reviewed before deployment."
      ],
      skills: [
        "Figma", "UX/UI Design", "Responsive Design", "Information Architecture", "User Flows",
        "Interaction Design", "Visual Design", "Accessibility", "HTML5", "CSS3", "JavaScript",
        "GitHub", "Performance Optimisation", "AI-Assisted Development", "Usability Evaluation"
      ],
      links: [
        { type: "figma", label: "View desktop and mobile designs in Figma", short: "Figma designs", url: "https://www.figma.com/design/yaJDr1e0mG4Io1rFrKDbYn/portfolio_website?t=5j9ABvlvpvwgjMWF-1" },
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/portfolio_website_v2" }
      ],
      caseStudy: {
        title: "Design evolution",
        intro:
          "This site is the second version of my portfolio. The original established a research-led UX/UI foundation with detailed case studies; this redesign builds on it rather than replacing it.",
        sections: [
          {
            heading: "What the redesign improves",
            items: [
              "Consistency of layout, typography and components between pages",
              "Navigation and information architecture, with separate Projects and Experience routes",
              "Visibility of my commercial Shopify and Movement to Work experience",
              "Cross-device layouts designed specifically for mobile, not just scaled down",
              "Presentation of a wider range of projects, including analytics work",
              "A single, cohesive visual identity"
            ]
          }
        ],
        note: "No comparative testing between the two versions has been carried out yet, so no measured improvement is claimed.",
        compare: [
          { type: "live", label: "Previous portfolio (live)", url: "https://my-portfolio-platform.netlify.app/" },
          { type: "github", label: "Previous portfolio repository", url: "https://github.com/BenjaminDThomas/ux-ui-frontend_portfolio_website" }
        ]
      }
    },

    {
      id: "digital-native",
      highlights: ["Ten-sheet Tableau workbook and executive dashboard", "Cleaned incomplete launch-year records first", "Time-series forecast presented as an estimate"],
      layout: "analytics",
      title: "Digital Native: Global Games Sales Executive Dashboard",
      shortTitle: "Digital Native",
      categories: ["data"],
      tags: ["Data Analytics", "Business Intelligence", "Data Visualisation"],
      start: "2026-06-16",
      end: "2026-06-23",
      dateStatus: "confirmed",
      featured: true,
      role: "Data Analyst (project role)",
      short:
        "A ten-sheet Tableau workbook and executive dashboard that answers defined business questions about global video game sales.",
      summary: [
        "I designed and built a ten-sheet Tableau analysis workbook from a Kaggle video game sales dataset, then consolidated the findings into a single KPI-led executive dashboard.",
        "Before analysis I removed incomplete launch-year records so missing data would not distort the time-series reporting. The dashboard uses Digital Native's lime-green, dark-brown and neutral-grey visual identity throughout."
      ],
      image: {
        src: "images/projects/digital_native_executive_dashboard.webp",
        width: 1200,
        height: 457,
        alt: "Digital Native executive dashboard in Tableau showing KPI tiles for top genre, total sales and top platform, with regional sales bars, annual sales and genre trend charts and a sales forecast."
      },
      questions: [
        "How have global sales changed by release year?",
        "Which platforms perform best?",
        "How much does each region contribute to total sales?",
        "Which genres have grown in popularity over time?",
        "What does a time-series forecast suggest for next year?"
      ],
      findings: [
        "PlayStation 2 leads the platform rankings in the analysed dataset.",
        "The Americas contribute roughly 49% of regional sales.",
        "Action, Sports and Shooter releases show the clearest growth over time, with Action ranking highest by revenue.",
        "Forecasts come from Tableau's time-series model and are estimates, not guaranteed outcomes."
      ],
      features: [
        "Sales by release year",
        "Platform performance rankings",
        "Regional sales contribution",
        "Genre popularity over time",
        "Time-series forecasting",
        "Executive KPI summary"
      ],
      contribution: [
        "Defined the analysis around the business questions and planned the ten sheets.",
        "Cleaned and prepared the dataset, excluding incomplete launch-year records.",
        "Built every visualisation and the consolidated executive dashboard in Tableau.",
        "Applied the client's brand colours for a consistent, stakeholder-ready presentation."
      ],
      outcomes: [
        "Decision-makers can see the headline KPIs, trends and forecast on one dashboard instead of across ten separate sheets."
      ],
      skills: [
        "Tableau", "Business Intelligence", "Data Cleaning", "Data Preparation", "Data Visualisation",
        "Time-Series Analysis", "Forecasting", "KPI Development", "Trend Analysis", "Excel",
        "Data Storytelling", "Dashboard Design"
      ],
      links: [
        { type: "tableau", label: "View Executive Dashboard", url: "https://prod-uk-a.online.tableau.com/t/benthoma0s03-8ce94940a6/views/DigitalNativeGamesAnalysis_17822499063400/ExecutiveDashboard", note: "Tableau Cloud, may ask you to sign in" },
        { type: "tableau", label: "View Full Workbook", short: "Full workbook", url: "https://prod-uk-a.online.tableau.com/#/site/benthoma0s03-8ce94940a6/workbooks/3430696?:origin=card_share_link", note: "Tableau Cloud, may ask you to sign in" },
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/Digital-Native-Global-Games-Sales-Executive-Dashboard" }
      ]
    },

    {
      id: "data-analyst-portfolio",
      highlights: ["Data-focused case studies for analyst roles", "Interactive technical skill cards", "Lightweight HTML, CSS and JavaScript on Netlify"],
      title: "Data Analyst Interactive Portfolio",
      shortTitle: "Data Analyst Portfolio",
      categories: ["data", "ux"],
      tags: ["Data & Analytics", "Web Design", "Front-End"],
      start: "2026-06-16",
      end: "2026-08-20",
      dateStatus: "repo-history",
      featured: false,
      short:
        "A recruiter-friendly portfolio that presents my analytical skills and data-focused case studies.",
      summary: [
        "A responsive portfolio built to present my analytical skills, commercial experience and data-focused case studies in a clear format for analyst recruiters.",
        "It brings together case studies covering data cleaning, KPI reporting, business intelligence, website performance analysis and user-journey evaluation, using interactive skill cards and dedicated case-study sections. The site presents analysis; it does not run live data pipelines."
      ],
      image: {
        src: "images/projects/data_analyst_portfolio_hero.webp",
        width: 1200,
        height: 572,
        alt: "Data analyst portfolio homepage with the name Benjamin Thomas on a dark navy background and summary tiles below."
      },
      features: [
        "Interactive technical skill cards",
        "Data-focused case studies, including the Digital Native dashboard",
        "Structured experience, education and certification sections",
        "Responsive layout with accessible navigation",
        "Lightweight HTML, CSS and JavaScript"
      ],
      contribution: [
        "Planned the content structure and wrote the case studies.",
        "Designed the layout and interactions, and reviewed the build for usability, including hamburger menu and navigation improvements.",
        "Deployed and maintain the site on Netlify."
      ],
      skills: [
        "Data Visualisation", "Data Quality", "KPI Reporting", "Website Analytics",
        "Information Architecture", "Responsive Web Design", "HTML5", "CSS3", "JavaScript",
        "Git", "GitHub", "Netlify", "Dashboard Presentation", "Excel", "Tableau"
      ],
      links: [
        { type: "live", label: "Live Website", short: "Live site", url: "https://data-analyst-website-portfolio.netlify.app/" },
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/Data_Analyst_Website_Portfolio" }
      ]
    },

    {
      id: "getfitnessmode",
      highlights: ["Workout logging and personal-record dashboards", "Nutrition tracking with barcode scanning", "Mobile-first, responsive interaction design"],
      title: "GetFitnessMode: Fitness and Training Platform",
      shortTitle: "GetFitnessMode",
      categories: ["product", "ux", "data"],
      tags: ["Web Development", "UX/UI", "SaaS", "Data & Analytics"],
      start: "2026-05",
      end: null,
      dateStatus: "confirmed",
      featured: true,
      short:
        "A browser-based training platform for logging workouts, tracking progress and exploring personal fitness data.",
      summary: [
        "An interactive fitness platform that helps lifters record workouts, follow their progress and explore their training through structured dashboards, without installing an app.",
        "It brings together workout logging, personal records, body statistics, nutrition tracking and a points-based community leaderboard, in a mobile-first interface."
      ],
      image: {
        src: "images/projects/gym_fitness_hero.webp",
        width: 1200,
        height: 555,
        alt: "GetFitnessMode homepage with the headline No Excuses. Only Iron. beside a photo of an athlete and a column of training dashboard cards."
      },
      features: [
        "Workout logging with set, rep and history tracking",
        "Personal-record detection and exercise dashboards",
        "Nutrition and macro tracking, including food barcode scanning",
        "Points-based leaderboard and community board",
        "Mobile-first, responsive interaction design"
      ],
      note:
        "The live site also describes Supabase data storage and Stripe-based subscription plans. These are listed as part of the product's scope, not as verified production features.",
      contribution: [
        "Product and UX/UI design: user flows, dashboard layouts and responsive interfaces.",
        "AI-assisted implementation with tools including GitHub Copilot, directing the build and checking each feature works as intended.",
        "Usability checks and interaction refinement, such as consolidating inconsistent navigation across pages.",
        "Ongoing analytics work: mapping user interactions and events to prepare for feature-adoption and funnel analysis."
      ],
      skills: [
        "Product Design", "UX/UI Design", "Responsive Interfaces", "SaaS Product Design",
        "Dashboard Design", "JavaScript", "Front-End Analytics", "Vercel", "GitHub Copilot",
        "User Flow Evaluation", "Interactive Prototyping", "Performance Testing"
      ],
      links: [
        { type: "live", label: "Live Website", short: "Live site", url: "https://getfitnessmode.vercel.app/" }
      ]
    },

    {
      id: "digital-museum",
      highlights: ["Accessibility and contrast checks across every page", "Refactored pages to remove inline CSS and JavaScript", "Collaborative UX research and Figma design"],
      title: "Digital Museum of Tomorrow",
      shortTitle: "Digital Museum",
      categories: ["product", "ux"],
      tags: ["Collaborative Project", "Web Application", "UX/UI", "AI Integration"],
      start: "2026-03-20",
      end: "2026-04-29",
      dateStatus: "repo-history",
      featured: false,
      collaborative: "University group project, four members",
      short:
        "A team-built web app for exploring Victoria and Albert Museum collection content with locally hosted AI services.",
      summary: [
        "A collaborative web application for exploring V&A collection content. The team explored chatbot conversations, artefact recommendations, generative imagery and image-based discovery, all running on local AI services rather than paid APIs.",
        "The group worked with a Scrumban approach, using Trello for tasks, GitHub for version control and regular team check-ins. The app runs locally with Docker, so there is no public live site."
      ],
      image: {
        src: "images/projects/digital_musuem_of_tommorow_hero.webp",
        width: 1200,
        height: 664,
        alt: "Digital Museum of Tomorrow homepage with the heading Explore the Collection. Differently. on a dark background."
      },
      features: [
        "Conversational exploration of the collection",
        "Artefact recommendations and image-based discovery",
        "Generative image functionality",
        "Containerised deployment with CPU and NVIDIA GPU configurations"
      ],
      contribution: [
        "Carried out accessibility and visual interface checks, including WCAG contrast checks across every page.",
        "Identified and corrected interface design issues.",
        "Refactored existing pages for clarity and maintainability, replacing inline CSS and JavaScript with shared classes and scripts.",
        "Corrected HTML labels and semantic text, and removed redundant code.",
        "Took part in the team's UX research, ideation, personas, empathy maps, journey mapping, Figma design and debugging."
      ],
      skills: [
        "Accessibility Testing", "UX/UI Evaluation", "Semantic HTML", "HTML/CSS Refactoring",
        "Code Optimisation", "Quality Assurance", "Interface Design", "Figma",
        "Collaborative UX Research", "GitHub", "Teamwork", "Agile/Scrumban", "Trello"
      ],
      projectTech: [
        "Docker", "Docker Compose", "FastAPI", "Ollama", "Phi-3 Mini", "Stable Diffusion",
        "HTML", "CSS", "JavaScript"
      ],
      links: [
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/digital-museum-of-tomorrow" },
        { type: "figma", label: "View desktop wireframes in Figma", short: "Wireframes", url: "https://www.figma.com/design/YuBwoheheK8qQfJLAcWwav/Digital-Museum-of-Tomorrow?node-id=0-1&t=AgTT51MfQBwUsmda-1" },
        { type: "figma", label: "Explore desktop high-fidelity prototype in Figma", short: "Hi-fi prototype", url: "https://www.figma.com/design/YuBwoheheK8qQfJLAcWwav/Digital-Museum-of-Tomorrow?node-id=1-3&t=AgTT51MfQBwUsmda-1" }
      ]
    },

    {
      id: "previous-portfolio",
      highlights: ["Shaped by real graduate UX/UI job specifications", "Recruiter persona, wireframes and Figma prototypes", "Accessibility and Lighthouse testing"],
      compact: true,
      title: "UX/UI and Front-End Portfolio: Original Version",
      shortTitle: "Previous Portfolio",
      categories: ["ux"],
      tags: ["UX/UI Design", "Front-End", "Personal Project"],
      start: "2026-03-16",
      end: "2026-04-02",
      dateStatus: "repo-history",
      featured: false,
      short:
        "The predecessor to this site: a research-led portfolio shaped by real graduate and junior UX/UI job specifications.",
      summary: [
        "My first UX/UI portfolio, built to communicate my user-centred design process and front-end ability to recruiters.",
        "I reviewed real graduate and junior UX/UI job specifications, identified the skills employers asked for most, and used a recruiter persona to decide what each page needed to show. This site is the next step in that progression."
      ],
      image: {
        src: "images/projects/portfolio_website_ux-ui.webp",
        width: 1200,
        height: 570,
        alt: "Previous portfolio homepage with the headline Design with people first. Build with code second. beside a dark gym photograph."
      },
      features: [
        "Job-specification research and a recruiter-focused persona",
        "Crazy 8s layout exploration and low-fidelity wireframes",
        "High-fidelity Figma prototypes",
        "Research and implementation evidence organised into case studies",
        "Accessibility, responsiveness and Lighthouse testing"
      ],
      contribution: [
        "Solo project: research, design and front-end build.",
        "Tested colour contrast with WebAIM and evaluated performance, accessibility and SEO with Google Lighthouse."
      ],
      outcomes: [
        "Its research-led foundation carried directly into the new portfolio, which adds a cohesive visual identity, better cross-device design, wider project coverage and more visible commercial experience."
      ],
      skills: [
        "UX/UI Design", "Information Architecture", "Responsive Web Design", "Semantic HTML",
        "CSS3", "JavaScript", "Figma", "GitHub", "Accessibility Evaluation", "Google Lighthouse",
        "Usability Testing"
      ],
      links: [
        { type: "live", label: "Live Website", short: "Live site", url: "https://my-portfolio-platform.netlify.app/" },
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/ux-ui-frontend_portfolio_website" },
        { type: "figma", label: "View low-fidelity wireframes in Figma", short: "Wireframes", url: "https://www.figma.com/design/WezEtp53kDGov130Txesm0/website_portfolio?node-id=0-1&t=DtmTvRIYssJ22Kzx-1" },
        { type: "figma", label: "Explore high-fidelity prototype in Figma", short: "Hi-fi prototype", url: "https://www.figma.com/design/WezEtp53kDGov130Txesm0/website_portfolio?node-id=7-2&t=DtmTvRIYssJ22Kzx-1" }
      ]
    },

    {
      id: "22-club",
      highlights: ["UX audit, competitor research and personas", "Each design change traced to an audit finding", "Lighthouse, WebAIM contrast checks and WebP images"],
      title: "22 Club: UX Redesign and Website Performance Optimisation",
      shortTitle: "22 Club Redesign",
      categories: ["ux", "data"],
      tags: ["UX/UI Design", "Web Design", "Website Optimisation", "Analytics"],
      start: "2025-10",
      end: "2026-05",
      dateStatus: "confirmed",
      featured: true,
      short:
        "A research-led redesign of a local snooker and leisure venue website, focused on navigation, readability and mobile use.",
      summary: [
        "I evaluated the existing website of a local snooker and leisure venue, then redesigned it to make key information such as facilities, membership and location easier to find on any device.",
        "Findings from the audit, competitor research and personas went into sketches, wireframes and Figma prototypes, and then into a working responsive website."
      ],
      image: {
        src: "images/projects/22_club_hero.webp",
        width: 1200,
        height: 571,
        alt: "Redesigned club homepage with a large heading over a green-tinted photo of snooker tables."
      },
      features: [
        "UX audit of the existing website",
        "Competitor analysis and user personas",
        "Crazy 8s sketches, wireframes and Figma prototypes",
        "Responsive HTML, CSS and JavaScript build",
        "Lighthouse audits, contrast checks and WebP image optimisation"
      ],
      contribution: [
        "Solo project covering research, design, development and testing.",
        "Turned each problem found in the audit into a specific design change (see the case study).",
        "Ran Lighthouse audits on desktop and mobile at three stages of development and acted on the results."
      ],
      outcomes: [
        "A live, responsive redesign with clearer navigation, left-aligned readable content and reorganised facilities and membership information.",
        "Contrast checks with WebAIM on the navigation, hero and body text combinations used."
      ],
      skills: [
        "UX Auditing", "Heuristic Evaluation", "Competitor Research", "Persona Development",
        "Crazy 8s", "Figma", "Information Architecture", "Wireframing", "Prototyping",
        "Responsive Web Design", "Google Lighthouse", "Accessibility Evaluation", "WebAIM",
        "HTML5", "CSS3", "JavaScript", "GitHub", "Image Optimisation"
      ],
      links: [
        { type: "live", label: "Live Website", short: "Live site", url: "https://22clubnewdesign.netlify.app/" },
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/22_club_redesign" },
        { type: "figma", label: "View desktop wireframes in Figma", short: "Wireframes", url: "https://www.figma.com/design/glhj2YweI8jbUk3nFyGhC7/22-Club?node-id=248-104&t=F8IYb4R05q5RPixR-1" },
        { type: "figma", label: "Explore high-fidelity prototype in Figma", short: "Hi-fi prototype", url: "https://www.figma.com/design/glhj2YweI8jbUk3nFyGhC7/22-Club?node-id=2-2&t=F8IYb4R05q5RPixR-1" }
      ],
      caseStudy: {
        title: "Research and testing",
        intro: "Each change in the redesign traces back to a problem found in the original site.",
        pairs: [
          { problem: "Navigation text had insufficient contrast", solution: "Clearer, higher-contrast navigation" },
          { problem: "Mobile navigation did not respond well on small screens", solution: "Better mobile navigation behaviour" },
          { problem: "Large amounts of centre-aligned text", solution: "Left-aligned content with improved spacing" },
          { problem: "Inconsistent information hierarchy", solution: "More coherent typography and information hierarchy" },
          { problem: "Facilities information was disorganised", solution: "Reorganised facilities and membership information" }
        ],
        sections: [
          {
            heading: "Other issues identified",
            items: [
              "Missing or incomplete content",
              "Limited context around the location information"
            ]
          },
          {
            heading: "Methods",
            items: [
              "Existing website analysis and competitor research",
              "User personas",
              "Crazy 8s sketching",
              "Figma wireframes and prototypes",
              "Google Lighthouse audits on desktop and mobile",
              "WebAIM colour contrast checks",
              "Iterative development"
            ]
          }
        ],
        note: "No analytics were available for the original site, so no change in bounce rate or conversions is claimed."
      }
    },

    {
      id: "student-magazine",
      highlights: ["Qualtrics survey, personas and journey mapping", "Think-aloud and SUS testing with five participants", "Responsive build packaged with Docker"],
      title: "Student Magazine: End-to-End UX/UI Design",
      shortTitle: "Student Magazine",
      categories: ["ux"],
      tags: ["UX Research", "UX/UI Design", "Web Design", "Development"],
      start: "2025-10",
      end: "2026-05",
      dateStatus: "confirmed",
      featured: true,
      short:
        "A digital student magazine designed through a full user-centred process, testing whether expressive, print-inspired design can stay usable and accessible.",
      summary: [
        "The project asked whether a visually expressive, print-inspired digital magazine could keep strong usability, accessibility and technical performance.",
        "I combined questionnaire research and desk research with personas, journey maps and prototypes, then tested the design with users and refined it before building the final responsive site."
      ],
      image: {
        src: "images/projects/magazine_hero.webp",
        width: 1200,
        height: 571,
        alt: "Student magazine homepage with the headline News, events and opportunities made for students, by students over a photo of students walking on campus."
      },
      features: [
        "Qualtrics questionnaire and mixed-methods research",
        "Personas, empathy map and user journey map",
        "High-fidelity Figma prototypes for desktop and mobile",
        "Think-aloud testing and System Usability Scale evaluation",
        "Responsive build, packaged with Docker"
      ],
      note:
        "Articles load from JSON data. Sign-in, registration and saved articles are simulated in the browser; there is no live back end.",
      contribution: [
        "Solo project covering research, design, testing and development.",
        "Designed every desktop and mobile screen in Figma, from low-fidelity wireframes to high-fidelity prototypes.",
        "Planned and ran the usability testing and analysed the results.",
        "Built the site in HTML, CSS and JavaScript with AI assistance from GitHub Copilot and Claude, documented in an AI provenance log."
      ],
      outcomes: [
        "Feedback led to clearer navigation labels, stronger content hierarchy and better discoverability.",
        "Production CSS was consolidated into one bundled stylesheet to reduce HTTP requests."
      ],
      skills: [
        "UX Research", "Qualtrics", "User-Centred Design", "Figma", "Wireframing", "Prototyping",
        "Think-Aloud Testing", "A/B Testing", "Microsoft Clarity", "Heatmap Analysis",
        "System Usability Scale", "Heuristic Evaluation", "Usability Testing", "Accessibility",
        "Google Lighthouse", "Responsive Web Design", "HTML5", "CSS3", "JavaScript",
        "CSS Optimisation", "Docker", "GitHub"
      ],
      links: [
        { type: "live", label: "Live Website", short: "Live site", url: "https://studentmagazinecasestudy.netlify.app/" },
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/student-magazine-ux-case-study" },
        { type: "figma", label: "View interactive prototype in Figma", short: "Interactive prototype", url: "https://www.figma.com/design/wAVoDFku2YJxavlYW1HhhO/Low-Fidelity-Student-Magazine-Prototype?node-id=1428-14487&t=MBDzi7obobybFdzf-1" }
      ],
      caseStudy: {
        title: "Research and testing",
        intro: "Research shaped the structure; testing shaped the details.",
        sections: [
          {
            heading: "Research and design",
            items: [
              "Mixed-methods and desk research",
              "Qualtrics questionnaire",
              "Comparative website analysis",
              "First-year and third-year student personas, empathy map and journey map",
              "UML and interaction-flow planning",
              "Low-fidelity wireframes and high-fidelity Figma prototypes"
            ]
          },
          {
            heading: "Testing and evaluation",
            items: [
              "Think-aloud usability testing with five participants",
              "System Usability Scale questionnaire with five participants",
              "A/B comparison of visual and interaction patterns",
              "Microsoft Clarity heatmaps and interaction tracking",
              "Heuristic evaluation",
              "Google Lighthouse audits, accessibility and contrast checks",
              "Cross-browser testing in Chrome, Firefox and Microsoft Edge"
            ]
          },
          {
            heading: "What testing showed",
            items: [
              "Participants preferred clearer calls to action, stacked content cards, balanced hero imagery and mobile-friendly navigation.",
              "Interaction data showed attention concentrating on the navigation, article cards, category filters and prominent actions.",
              "These findings informed changes to navigation labels, content hierarchy, accessibility and discoverability."
            ]
          }
        ]
      }
    }
  ];

  var experience = [
    {
      id: "movement-to-work",
      highlights: [
        "Researched user needs, competitors and existing guidance",
        "Designed desktop and mobile wireframes and Figma prototypes",
        "Directed the AI-assisted build with Claude and reviewed every page",
        "Ran task-based usability tests and reviewed Microsoft Clarity recordings",
        "Refined the questionnaire, CV and interview practice journeys"
      ],
      shortTitle: "Movement to Work",
      categories: ["product"],
      organisation: "Movement to Work, Skelmersdale Jobcentre",
      displayName: "Movement to Work",
      role: "UX/UI Designer & Front-End Developer (AI-assisted implementation)",
      start: "2026-08",
      end: null,
      expectedEnd: "2026-11",
      type: "Project-based experience",
      context:
        "A project requested for use by Skelmersdale Jobcentre. It is not an official GOV.UK service.",
      image: {
        src: "images/projects/movement_to_work_hero.webp",
        width: 1200,
        height: 570,
        alt: "Movement to Work website homepage with the heading Movement to Work, a photo of a young jobseeker and cards listing what the programme offers."
      },
      overview: [
        "I designed and directed the development of a responsive employability-support platform that helps young people aged 18 to 30 understand Movement to Work, build confidence and find practical next steps towards employment.",
        "The project covers the full UX process, from research and information architecture through wireframing, interaction design, user testing and iteration. I designed the interfaces in Figma, used Claude to implement the functionality, and evaluated the result for navigation issues, usability friction and accessibility concerns."
      ],
      features: [
        { title: "Programme guidance", text: "What Movement to Work is, who it supports, the two-week structure and how to express interest through a Jobcentre Work Coach." },
        { title: "Questionnaires", text: "Interactive questions about skills, strengths, confidence and working preferences, building a profile of possible next steps." },
        { title: "CV import and review", text: "Upload a PDF or DOCX CV and get structured suggestions. Processing is local and rule-based; no external AI service is used." },
        { title: "Interview practice", text: "Mock interview questions with preparation tools, feedback and guidance." },
        { title: "Privacy-conscious by design", text: "CV files are read on the device and not uploaded. Questionnaire and interview answers are stored only in the user's browser." }
      ],
      goal: "Create an accessible, engaging and understandable platform that helps users explore employability support and identify useful next steps.",
      users: "Young adults seeking support with employability, confidence and practical workplace skills, and the Jobcentre staff supporting them.",
      outcome: "A functioning, responsive platform with interactive guidance and practical employability activities, refined through usability evaluation and iterative testing.",
      responsibilities: [
        "Investigated user needs and why employability-support information can be hard to understand.",
        "Conducted desk research, a UX evaluation of existing information and competitor analysis.",
        "Created a persona, empathy map and user journey map.",
        "Developed the information architecture and user flows.",
        "Designed desktop and mobile wireframes and high-fidelity Figma prototypes.",
        "Designed accessible, responsive interface components and interactive experiences.",
        "Directed the AI-assisted implementation using Claude.",
        "Reviewed implemented pages and interactions, identifying navigation problems, dead clicks and inconsistent behaviour.",
        "Refined the questionnaire, CV and interview practice journeys.",
        "Ran task-based usability testing and reviewed Microsoft Clarity recordings and heatmaps.",
        "Carried out responsive testing and accessibility checks, iterating on the findings."
      ],
      skillGroups: [
        {
          heading: "Design, research and evaluation",
          items: [
            "UX Research", "User-Centred Design", "Information Architecture", "User Flows",
            "User Personas", "Empathy Mapping", "Competitor Analysis", "Figma", "Wireframing",
            "Prototyping", "Interaction Design", "Accessibility", "WCAG Principles",
            "Responsive Design", "Usability Testing", "Microsoft Clarity", "Heuristic Evaluation",
            "Quality Assurance", "Stakeholder Communication", "Iterative Design", "Problem Solving"
          ]
        },
        {
          heading: "Implementation (AI-assisted)",
          items: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub", "Cloudflare", "AI-Assisted Development", "Claude"]
        }
      ],
      links: [
        { type: "live", label: "Live Website", short: "Live site", url: "https://movement-to-work.movement-to-work.workers.dev/frontend/" },
        { type: "github", label: "GitHub Repository", short: "GitHub", url: "https://github.com/BenjaminDThomas/movement-to-work-jobcentre-platform" },
        { type: "research", label: "View UX research and discovery in Figma", short: "UX research", url: "https://www.figma.com/design/A5by1471o8vS8N9O4QIIg9/Movement-To-Work-Case-Study?node-id=2018-2&t=RfxwJVPy1Sl5FyWF-1" },
        { type: "figma", label: "View wireframes in Figma", short: "Wireframes", url: "https://www.figma.com/design/A5by1471o8vS8N9O4QIIg9/Movement-To-Work-Case-Study?node-id=1-11&t=RfxwJVPy1Sl5FyWF-1" },
        { type: "figma", label: "Explore high-fidelity prototype in Figma", short: "Hi-fi prototype", url: "https://www.figma.com/design/A5by1471o8vS8N9O4QIIg9/Movement-To-Work-Case-Study?node-id=2720-3030&t=y3kMrump4k5EVIL5-1" }
      ]
    },

    {
      id: "ergometric",
      highlights: [
        "Designed and maintained more than 20 Shopify pages",
        "Built and edited product listings and product information",
        "Produced Figma wireframes and responsive layouts",
        "Evaluated shopping and checkout journeys for friction",
        "Applied on-page SEO and accessibility principles"
      ],
      shortTitle: "Ergometric",
      organisation: "Ergometric",
      displayName: "Ergometric",
      role: "E-commerce Web Designer",
      location: "Remote",
      hours: "Part-time",
      start: "2024-02",
      end: "2025-09",
      type: "Employment · Shopify",
      overview: [
        "I designed, managed and improved Ergometric's Shopify store, focusing on responsive layouts, product presentation, navigation, accessibility and on-page SEO.",
        "I worked directly with a key business stakeholder to turn commercial requirements into practical website improvements, exploring layouts and wireframes in Figma and refining them through feedback and reviews of the customer journey."
      ],
      goal: "Create an accessible, well-structured online store that communicates product information effectively and supports a clear shopping journey.",
      users: "Online shoppers browsing products, comparing information and completing purchases.",
      outcome: "Delivered and maintained Shopify pages and features while improving site organisation, responsive presentation and customer-journey clarity.",
      responsibilities: [
        "Designed and maintained Shopify website pages, creating more than 20 e-commerce pages.",
        "Built and edited product listings and product information.",
        "Designed responsive layouts for desktop and mobile.",
        "Produced wireframes and prototypes in Figma.",
        "Improved site navigation and content structure.",
        "Evaluated shopping and checkout journeys to identify friction.",
        "Applied on-page SEO principles, refining content and metadata where appropriate.",
        "Considered accessibility and WCAG guidelines in page design.",
        "Integrated Elfsight widgets, including opening-hours functionality.",
        "Communicated directly with the business stakeholder and made iterative improvements from feedback.",
        "Kept the experience consistent across pages and devices."
      ],
      skillGroups: [
        {
          heading: "Skills and tools",
          items: [
            "Shopify", "E-commerce Web Design", "Figma", "Responsive Design", "UX/UI Design",
            "Wireframing", "Prototyping", "Product Listings", "Information Architecture",
            "Website Navigation", "Customer Journey Evaluation", "On-Page SEO",
            "Website Optimisation", "Accessibility", "WCAG Principles", "Content Management",
            "Elfsight", "Stakeholder Communication", "Quality Assurance", "Attention to Detail"
          ]
        }
      ],
      links: []
    },

    {
      id: "garswood",
      highlights: [
        "Assisted with inspections and fault identification",
        "Supported repairs and routine maintenance",
        "Managed tasks across several vehicles at once",
        "Communicated with customers and colleagues"
      ],
      shortTitle: "Garswood Vehicle Solutions",
      organisation: "Garswood Vehicle Solutions",
      displayName: "Garswood Vehicle Solutions",
      role: "Automotive Mechanic, Summer Placement",
      location: "Garswood, Wigan",
      hours: "Part-time",
      start: "2021-06",
      end: "2021-09",
      type: "Summer placement",
      overview: [
        "A summer placement supporting vehicle diagnostics, servicing and repair work in a busy practical workshop.",
        "It is not digital work, but it is where I learned to investigate faults methodically, prioritise several jobs at once and explain technical issues to customers. I use the same habits when testing and debugging websites."
      ],
      goal: "Support efficient vehicle servicing and repairs while maintaining technical accuracy and safe working practices.",
      users: "Workshop customers needing vehicle servicing, diagnosis and repair support.",
      outcome: "Practical experience in a time-sensitive technical environment, developing diagnostic thinking, responsibility and communication skills.",
      responsibilities: [
        "Assisted with vehicle inspections and fault identification.",
        "Diagnosed and investigated mechanical issues.",
        "Supported repairs and routine maintenance.",
        "Followed workplace procedures and safety requirements.",
        "Organised tools and kept an effective workspace.",
        "Communicated with customers and colleagues.",
        "Managed tasks across several vehicles and repair activities."
      ],
      skillGroups: [
        {
          heading: "Transferable skills",
          items: [
            "Technical Troubleshooting", "Fault Diagnosis", "Problem Solving", "Quality Assurance",
            "Time Management", "Task Prioritisation", "Customer Communication",
            "Attention to Detail", "Teamwork", "Workplace Safety", "Technical Accuracy"
          ]
        }
      ],
      links: []
    }
  ];

  /* Workflow: eight stages along one route, grouped into three phases.
     practice: { label, target: "project:<id>" | "experience:<id>" } for in-site links,
               { label, url } for external links. */
  var workflow = [
    {
      n: 1, phase: "Understand", title: "Discover", short: "Discover", icon: "search",
      summary: "Agree what the project is for, who it serves and what success looks like before designing anything.",
      approach: "I start with the person who asked for the work: their goals, the audience, constraints and deadlines. I write these into a short brief so later decisions can be checked against it.",
      tools: ["Project brief", "Stakeholder conversations", "Requirements list", "Success criteria"],
      practice: [
        { kind: "View the project brief", label: "Movement to Work brief on GitHub", url: "https://github.com/BenjaminDThomas/movement-to-work-jobcentre-platform/tree/main/01-project-brief", icon: "b-github" },
        { kind: "View role", label: "Movement to Work", target: "experience:movement-to-work" }
      ]
    },
    {
      n: 2, phase: "Understand", title: "Research", short: "Research", icon: "doc",
      summary: "Learn how people behave, what already exists and where the real problems are.",
      approach: "I combine desk research and competitor reviews with direct input from users, such as questionnaires, then audit any existing site for usability and accessibility issues.",
      tools: ["Desk research", "Competitor analysis", "Qualtrics", "Google Forms", "UX audits", "Lighthouse"],
      practice: [
        { kind: "View UX research in Figma", label: "Movement to Work research", url: "https://www.figma.com/design/A5by1471o8vS8N9O4QIIg9/Movement-To-Work-Case-Study?node-id=2018-2&t=RfxwJVPy1Sl5FyWF-1", icon: "b-figma-color" },
        { kind: "View project", label: "Student Magazine survey", target: "project:student-magazine" }
      ]
    },
    {
      n: 3, phase: "Understand", title: "Define", short: "Define", icon: "target",
      summary: "Turn findings into a clear problem, the people it affects and what the solution must do.",
      approach: "I turn research into personas, empathy maps and journey maps, then use them to set the information architecture and the main user flows.",
      tools: ["Personas", "Empathy maps", "Journey maps", "Information architecture", "User flows"],
      practice: [
        { kind: "View project", label: "Student Magazine personas", target: "project:student-magazine" },
        { kind: "View role", label: "Movement to Work persona and journey map", target: "experience:movement-to-work" }
      ]
    },
    {
      n: 4, phase: "Create", title: "Ideate", short: "Ideate", icon: "bulb",
      summary: "Explore several possible solutions quickly before committing to one.",
      approach: "I sketch fast, often with Crazy 8s, to get several layouts on paper, then compare them against the brief and the user needs before choosing a direction.",
      tools: ["Crazy 8s", "Paper sketching", "Layout exploration", "Concept comparison"],
      practice: [
        { kind: "View sketches on GitHub", label: "22 Club Crazy 8s sketches", url: "https://github.com/BenjaminDThomas/22_club_redesign/tree/main/design/sketches", icon: "b-github" },
        { kind: "View project", label: "22 Club redesign", target: "project:22-club" }
      ]
    },
    {
      n: 5, phase: "Create", title: "Design", short: "Design", icon: "pencil",
      summary: "Shape the chosen idea into accessible, responsive and interactive designs.",
      approach: "I move from low-fidelity wireframes to high-fidelity Figma prototypes for desktop and mobile, checking contrast, hierarchy and interaction states as I go.",
      tools: ["Figma", "Wireframes", "High-fidelity prototypes", "Design components", "WebAIM contrast checks"],
      practice: [
        { kind: "Explore high-fidelity prototype", label: "Movement to Work prototype", url: "https://www.figma.com/design/A5by1471o8vS8N9O4QIIg9/Movement-To-Work-Case-Study?node-id=2720-3030&t=y3kMrump4k5EVIL5-1", icon: "b-figma-color" },
        { kind: "View designs in Figma", label: "This portfolio", url: "https://www.figma.com/design/yaJDr1e0mG4Io1rFrKDbYn/portfolio_website?t=5j9ABvlvpvwgjMWF-1", icon: "b-figma-color" }
      ]
    },
    {
      n: 6, phase: "Create", title: "Test", short: "Test", icon: "users",
      summary: "Watch real people use the design and decide what needs to change.",
      approach: "I run task-based and think-aloud sessions, look at where people hesitate or get lost, and back that up with heatmaps and questionnaires before iterating.",
      tools: ["Think-aloud testing", "Task-based testing", "System Usability Scale", "Microsoft Clarity", "A/B comparison"],
      practice: [
        { kind: "View project", label: "Student Magazine testing", target: "project:student-magazine" },
        { kind: "View testing on GitHub", label: "Movement to Work usability tests", url: "https://github.com/BenjaminDThomas/movement-to-work-jobcentre-platform/tree/main/12-user-testing", icon: "b-github" }
      ]
    },
    {
      n: 7, phase: "Deliver", title: "Build", short: "Build", icon: "code",
      summary: "Turn the validated design into a working, responsive website.",
      approach: "On recent projects I direct Claude to implement my Figma designs, then review every page against the design and specify fixes. Earlier projects I built directly in HTML, CSS and JavaScript.",
      tools: ["HTML", "CSS", "JavaScript", "Claude", "GitHub Copilot", "Git and GitHub"],
      practice: [
        { kind: "View code on GitHub", label: "Movement to Work platform", url: "https://github.com/BenjaminDThomas/movement-to-work-jobcentre-platform", icon: "b-github" },
        { kind: "View role", label: "Movement to Work", target: "experience:movement-to-work" }
      ]
    },
    {
      n: 8, phase: "Deliver", title: "Launch & improve", short: "Launch", icon: "flag", final: true,
      summary: "Release the site, then keep checking how it performs and what people need next.",
      approach: "Before launch I test across devices and check links, performance and accessibility. After launch I review Lighthouse audits, Clarity recordings and feedback, and keep refining.",
      tools: ["Netlify", "Vercel", "Cloudflare", "Google Lighthouse", "Microsoft Clarity", "WebAIM"],
      practice: [
        { kind: "Visit live site", label: "Movement to Work", url: "https://movement-to-work.movement-to-work.workers.dev/frontend/", icon: "play" },
        { kind: "View project", label: "22 Club Lighthouse audits", target: "project:22-club" },
        { kind: "View project", label: "Digital Native dashboard", target: "project:digital-native" }
      ]
    }
  ];

  /* About: short intro, three strengths and three skill tabs (six skills each). */
  var about = {
    intro: "I'm a UX/UI designer with a background in web design, e-commerce and digital analytics. I enjoy creating accessible, intuitive digital experiences that combine thoughtful design with practical problem-solving.",
    more: [
      "My work brings together user research, responsive interface design, usability testing and data-informed evaluation. I've worked on commercial Shopify websites and developed projects ranging from employability platforms to interactive dashboards.",
      "I particularly enjoy taking ideas from early research and Figma concepts through to functioning experiences, evaluating the results and refining the parts that could work better."
    ],
    strengths: [
      { icon: "users", title: "User-centred", text: "Research, usability testing and accessible design" },
      { icon: "code", title: "Practical builder", text: "From Figma concepts to working, responsive websites" },
      { icon: "chart-up", title: "Data-informed", text: "Lighthouse, Clarity and Tableau to guide decisions" }
    ]
  };

  var keySkillTabs = [
    { key: "design", label: "Design", icon: "pencil", skills: [
      { name: "Figma", icon: "b-figma" }, { name: "UX Research", icon: "search" }, { name: "Usability Testing", icon: "users" },
      { name: "Wireframing", icon: "panel" }, { name: "Prototyping", icon: "map" }, { name: "Accessibility", icon: "eye" },
      { name: "User Journey Mapping", icon: "route" }, { name: "Competitor Analysis", icon: "target" }, { name: "Information Architecture", icon: "list" }
    ] },
    { key: "build", label: "Build", icon: "code", skills: [
      { name: "HTML5", icon: "b-html5" }, { name: "CSS3", icon: "b-css3" }, { name: "JavaScript", icon: "b-javascript" },
      { name: "Shopify", icon: "b-shopify" }, { name: "GitHub", icon: "b-github" }, { name: "Netlify", icon: "b-netlify" },
      { name: "Responsive Development", icon: "play" }, { name: "API Integration", icon: "gear" }, { name: "Git Version Control", icon: "code" }
    ] },
    { key: "analyse", label: "Analyse", icon: "bars", skills: [
      { name: "Tableau", icon: "b-tableau" }, { name: "Excel", icon: "table" }, { name: "Lighthouse", icon: "b-lighthouse" },
      { name: "Data Visualisation", icon: "chart-up" }, { name: "Google Analytics", icon: "b-googleanalytics" }, { name: "On-Page SEO", icon: "search" },
      { name: "Data Cleaning", icon: "filter" }, { name: "Quantitative Analysis", icon: "bars" }, { name: "Qualitative Analysis", icon: "doc-lines" }
    ] }
  ];

  var skillGroups = [
    {
      heading: "UX/UI & Research",
      items: ["Figma", "UX Research", "Wireframing", "High-Fidelity Prototyping", "User Flows", "Information Architecture", "Personas", "Empathy Maps", "User Journey Mapping", "Competitor Analysis", "Heuristic Evaluation", "Usability Testing", "Think-Aloud Testing", "Qualtrics", "Responsive Design", "Accessibility / WCAG"]
    },
    {
      heading: "Web Design & Development",
      items: ["HTML5", "CSS3", "JavaScript", "Shopify", "Git Version Control", "GitHub", "Responsive Development", "API Integration", "Front-End Quality Assurance", "Responsive Layouts", "Interactive Interfaces", "Netlify", "Vercel", "Cloudflare", "AI-Assisted Development"]
    },
    {
      heading: "Analytics & Optimisation",
      items: ["Tableau", "Excel", "Data Cleaning", "Quantitative Analysis", "Qualitative Analysis", "KPI Reporting", "Data Visualisation", "Google Analytics", "Microsoft Clarity", "Google Lighthouse", "WebAIM", "Core Web Vitals", "On-Page SEO", "Performance Analysis", "User Behaviour Analysis"]
    },
    {
      heading: "Foundational familiarity",
      items: ["Python fundamentals", "SQL fundamentals", "Docker", "Power BI exposure"]
    }
  ];

  window.PORTFOLIO = {
    categoryLabels: CATEGORY_LABELS,
    projects: projects,
    experience: experience,
    workflow: workflow,
    about: about,
    keySkillTabs: keySkillTabs,
    skillGroups: skillGroups
  };
})();
