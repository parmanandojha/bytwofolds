// Single source of truth for site copy. Change words here, not in components.

export const site = {
  name: "ByTwoFolds",
  // The one primary domain. Canonicals, og:url, sitemap and schema all use it.
  url: "https://bytwofolds.co.in",
  // TODO: confirm real inbox before launch
  email: "hello@bytwofolds.co.in",
  title: "ByTwoFolds | Website Design and Meta Ads Studio in Delhi",
  description:
    "Delhi-based studio designing and building websites for hospitality, interiors, education and professional services, with AI reading scripts and Meta ads.",
  short: "Website design, development and Meta ads studio in Delhi",
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Questions", href: "/#questions" },
];

export const hero = {
  title: "Before they trust you, they judge your website.",
  body: "Somebody is looking you up right now. They are on your site, alone, deciding whether you are the real thing. We design and build websites that win that moment, then run the ads that fill it.",
  cta: "Start a project",
};

export const position = {
  label: "Why a credible website matters",
  title: "AI made it easy to have a website. It made it harder to be believed.",
  body: "ByTwoFolds is a Delhi-based studio building websites for hospitality, interiors, education and professional-services businesses in India and abroad. We build the site people check before they buy, embed scripts that help AI understand your business, and pay attention to what happens after the click.",
};

export const figures = [
  { value: 50, suffix: "", decimals: 0, unit: "ms", label: "To form a first impression of a page", source: "Lindgaard et al., 2006" },
  { value: 46, suffix: "%", decimals: 0, unit: "design", label: "Of credibility comments were about how a site looks", source: "Stanford, 2002" },
  { value: 53, suffix: "%", decimals: 0, unit: "3s", label: "Of mobile visits are abandoned past this load time", source: "Google, 2016" },
  { value: 8.4, suffix: "%", decimals: 1, unit: "0.1s", label: "More retail conversions from being this much faster", source: "Deloitte, 2020" },
];

export const stack = ["Next.js", "React", "Three.js", "GSAP", "Meta Ads", "Analytics", "Search Console", "Schema.org"];

export type Service = {
  slug: string;
  name: string;
  icon: "facets" | "grid" | "loop" | "target" | "signal";
  headline: string;
  answer: string;
  story: string;
  includes: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "website-design",
    name: "Website Design",
    icon: "facets",
    headline: "Look like the company you already are.",
    answer:
      "Website design at ByTwoFolds covers positioning, copy, page structure, interface and motion, so a first-time visitor understands what you do and believes you can do it.",
    story:
      "You have spent years getting good at this. Then a stranger gives your homepage a glance and decides you are small, or old, or just like the other three tabs they have open. That is not fair. It is also fixable.",
    includes: [
      { title: "Positioning and copy", body: "We find the one thing you should be chosen for and write it the way you would say it out loud." },
      { title: "Page architecture", body: "Every page gets one question to answer and one thing to ask for." },
      { title: "Interface and motion", body: "A visual system that could not belong to anybody else, down to how it moves." },
    ],
    faq: [
      { q: "Do you write the copy as well?", a: "Yes. Words and design are made together, because people judge both at the same time." },
      { q: "Can you redesign without losing our Google rankings?", a: "Yes. We map every existing URL, keep what ranks, redirect what moves and check Search Console after launch." },
    ],
  },
  {
    slug: "website-development",
    name: "Website Development",
    icon: "grid",
    headline: "Fast enough that nobody notices.",
    answer:
      "ByTwoFolds develops websites in Next.js and Tailwind, with GSAP and Three.js where motion helps. Sites are built for speed, accessibility, search engines and easy editing.",
    story:
      "A slow page feels like a person who takes too long to answer. You start to wonder what is wrong. Nobody writes to complain about it. They just leave with a slightly worse opinion of you.",
    includes: [
      { title: "Built in code", body: "Next.js front ends with no theme underneath and nothing you do not need." },
      { title: "Editable by you", body: "A content system your team can use without calling us to fix a comma." },
      { title: "Checked before launch", body: "Real phones, slow networks, keyboards and screen readers." },
    ],
    faq: [
      { q: "Which technology do you use?", a: "Next.js and React, styled with Tailwind, with GSAP, Anime.js and Three.js for motion where it earns its place." },
      { q: "Do we own the code?", a: "Yes. The repository, the content and the accounts are in your name." },
    ],
  },
  {
    slug: "ai-reading-scripts",
    name: "AI Reading Scripts",
    icon: "signal",
    headline: "Help AI know your business.",
    answer:
      "AI reading scripts are pieces of structured information ByTwoFolds embeds in your website. They tell AI assistants and search engines who you are, what you offer, where you work and who you help, so there is something accurate to read when anyone searches.",
    story:
      "Someone asked an AI who they should hire, and it answered with three names. You were good enough to be one of them. Your website just never told it, in a form it could read.",
    includes: [
      { title: "Embedded business facts", body: "Structured scripts on your pages that state your name, services, location, projects and answers." },
      { title: "A guide for AI", body: "A plain-text file, called llms.txt, that sums up your business and points to the pages that matter." },
      { title: "Open doors", body: "Crawling settings, a sitemap and clear page structure, so the AI readers you welcome can get in." },
    ],
    faq: [
      { q: "What is an AI reading script?", a: "It is structured data, usually JSON-LD, placed in the code of your website. Visitors do not see it. Search engines and AI systems can read it to understand your business." },
      { q: "Can you add AI reading scripts to my existing website?", a: "Usually, yes. If we can reach the site's code or its header settings, we can embed the scripts without redesigning it." },
      { q: "Can you guarantee we appear in ChatGPT?", a: "No, and nobody can. Each AI chooses its own sources. We make sure the facts about you are clear, consistent and easy to read, which is the part you control." },
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    icon: "target",
    headline: "Stop paying for people to leave.",
    answer:
      "ByTwoFolds plans, makes and manages Meta ads on Facebook and Instagram, and designs the landing pages behind them, so the promise in the ad is kept on the page.",
    story:
      "You can feel it when the ad account works and the phone stays quiet. The clicks were real people. They were interested. Then they arrived, and something on the page told them to turn around.",
    includes: [
      { title: "Campaigns and creative", body: "Facebook and Instagram campaigns, including retargeting, written and designed by the people who know your site." },
      { title: "Matched landing pages", body: "One page per promise, so nobody lands and wonders if they are in the right place." },
      { title: "Plain reporting", body: "What you spent, what it brought in and what we are changing next." },
    ],
    faq: [
      { q: "Which ad platforms do you run?", a: "We run Meta ads only, which means Facebook and Instagram. Keeping to one platform lets us know it well." },
      { q: "Who owns the ad account?", a: "You do. The account, its data and its history stay with you." },
    ],
  },
  {
    slug: "website-care",
    name: "Website Care",
    icon: "loop",
    headline: "A website that keeps up with you.",
    answer:
      "Website care is an ongoing service in which ByTwoFolds keeps your pages, proof and prices current, fixes what breaks and keeps your AI reading scripts in step with every change.",
    story:
      "Your best work happened last month and your website has not heard about it. It still introduces you as who you were. Every day it stays that way, it tells people, and the AI they ask, the wrong story.",
    includes: [
      { title: "Regular reviews", body: "We read the site the way a customer would and list what is stale, broken or no longer true." },
      { title: "Updates you approve", body: "We prepare each change, you approve it and then it goes live." },
      { title: "Scripts kept in step", body: "When a page changes, the facts AI reads change with it." },
    ],
    faq: [
      { q: "Will anything change without us knowing?", a: "No. You approve each update before it goes live." },
      { q: "Can you update a site you did not build?", a: "Usually, yes. We start with a review of how it is built and tell you plainly if a rebuild would cost you less." },
    ],
  },
];

export const sea = {
  label: "How AI search changes website visits",
  body: "A site can be made in a minute now. So everyone made one, and they all look alike. The question is no longer whether you have a website. It is whether anyone can feel there are people behind it.",
  stats: [
    { value: "15%", unit: "without AI summary", label: "of Google search visits without an AI summary included a click on a result" },
    { value: "8%", unit: "with AI summary", label: "when an AI summary appeared. The visit you do get matters more." },
  ],
  source: "Source: Pew Research Center, July 2025. Browsing by 900 US adults in March 2025.",
  sourceUrl: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/",
};

export const costs = [
  { title: "Judged in Silence", body: "Nobody emails to say your website put them off. They close the tab and buy from someone else. You never learn their name." },
  { title: "Read by Machines", body: "AI assistants read your site before many people do. If it cannot tell what you do, you are left out of the answer." },
  { title: "Old Before You Notice", body: "Your prices, your people and your best work have changed. If the site has not, it is describing a company that no longer exists." },
  { title: "Paid For Twice", body: "Ads cannot rescue a weak page. They only send more people to it, and you pay for each one who turns around." },
];

export const work = {
  label: "Recent website design projects",
  title: "This is the part where you judge us.",
};

export type Project = {
  slug: string; name: string; url: string; discipline: string; sector: string; place: string; color: string;
  headline: string; summary: string;
  story: { title: string; body: string }[];
  built: string[];
  alt: { hero: string; a: string; b: string; phone: string };
};

// Images live in public/work as {slug}-hero, -a, -b and -phone.webp
export const projects: Project[] = [
  {
    slug: "dandelion-by-the-hills",
    name: "Dandelion by the Hills",
    url: "https://dandelionbythehill.vercel.app/",
    discipline: "Website design and development",
    sector: "Hospitality",
    place: "Lakhwar, Uttarakhand",
    color: "#17261f",
    headline: "A hill stay you can feel before you arrive.",
    summary: "Dandelion by the Hills is a restored 1906 cottage with 14 rooms above the Yamuna. The website sets the pace of a stay there: slow, warm and made for families.",
    story: [
      { title: "What a guest needs to feel", body: "Nobody books a family holiday from a list of amenities. They imagine the morning first. So the site opens on the valley at dusk and tells you to slow down." },
      { title: "What we made", body: "A glowing dandelion opens as you scroll and lets its seeds go, carrying you through arriving, unwinding and gathering. Rooms, food and stories follow at the same unhurried pace." },
      { title: "How it helps", body: "Common questions are answered on the page, and an on-site assistant called Arya helps plan a stay. Rates and dates are still confirmed personally by the team." },
    ],
    built: ["Art direction", "Scroll story", "Interactive dandelion", "Guest assistant", "Enquiry flow", "Search content"],
    alt: { hero: "Homepage with mountains at dusk and the line Slow down, come home to the hills", a: "A glowing dandelion beside the line What if a weekend felt like summer holidays", b: "Four photo cards showing moments from a stay", phone: "Homepage on a phone" },
  },
  {
    slug: "gk-intriors",
    name: "GK Intriors",
    url: "https://gkinteriors.vercel.app/",
    discipline: "Website design and development",
    sector: "Interiors and architecture",
    place: "New Delhi",
    color: "#3c443f",
    headline: "A studio that lets the rooms speak first.",
    summary: "GK Intriors plans, designs and builds homes in New Delhi. The website is as quiet as the rooms, with large images, plenty of space and one clear next step.",
    story: [
      { title: "What a homeowner needs to feel", body: "Handing someone the keys to your home takes trust. Before price, people want to know whether you will listen to how they live." },
      { title: "What we made", body: "A calm, light layout where photography does the persuading. Two disciplines, interiors and architecture, sit side by side so a visitor sees one team doing the whole job." },
      { title: "How it helps", body: "Every path leads to a short consultation. An on-site assistant called Mini answers first questions for people who are not ready to call." },
    ],
    built: ["Visual direction", "Service structure", "Project gallery", "Site assistant", "Consultation flow", "Responsive build"],
    alt: { hero: "Homepage with a softly lit room and the studio introduction", a: "Interiors and architecture services shown as image panels", b: "Approach section with two statements and a photograph", phone: "Homepage on a phone" },
  },
  {
    slug: "bn-public-school",
    name: "B N Public School",
    url: "https://bnpublic.vercel.app/",
    discipline: "Website design and development",
    sector: "Education",
    place: "Gorakhpur",
    color: "#680a10",
    headline: "A school parents can walk through from home.",
    summary: "B N Public School is a CBSE-affiliated school in Gorakhpur, open since 2011. The website gives parents the facts they need and a sense of the place their child would spend the day.",
    story: [
      { title: "What a parent needs to feel", body: "Choosing a school is a decision about safety before it is one about marks. Parents look for real classrooms, real faces and straight answers." },
      { title: "What we made", body: "A warm identity built from the school's own maroon, with large campus photography, a virtual tour and clear sections for each stage from Pre-Primary to Class XII." },
      { title: "How it helps", body: "Notices, admissions, documents and the academic calendar are easy to find, and an on-site assistant answers questions about admissions and school life." },
    ],
    built: ["Visual direction", "Information architecture", "Virtual tour", "Notices and downloads", "Admission inquiry", "School assistant"],
    alt: { hero: "Homepage with the school gate and the line Shaping bright futures begins here", a: "Virtual tour and campus facilities", b: "School emblem with key facts around it", phone: "Homepage on a phone" },
  },
  {
    slug: "neo-ambience-academy",
    name: "Neo Ambience Academy",
    url: "https://neo-ambience-academy.vercel.app/",
    discipline: "Website design and development",
    sector: "Education",
    place: "Gorakhpur",
    color: "#0b4a9c",
    headline: "A school that introduces itself through its children.",
    summary: "Neo Ambience Academy is a CBSE-affiliated school in Gorakhpur, teaching from Nursery to Class XII. The website opens on its students in full costume, so a parent meets the school before reading a word about it.",
    story: [
      { title: "What a parent needs to feel", body: "Every school says it cares. A parent wants to see it: the faces, the festivals, the playground on sports day. Only then do the dates and documents matter." },
      { title: "What we made", body: "Bright blue and yellow, real photographs at full size and a line that draws itself across the page from first steps to Class XII, with each stage of school marked along the way." },
      { title: "How it helps", body: "Admission is set out in four steps with minimum ages and documents listed. Parents’ questions are answered on the page, and an on-site assistant helps them ask more or book a visit." },
    ],
    built: ["Visual direction", "Admission guide", "School life gallery", "Learning path animation", "Parent questions", "School assistant"],
    alt: { hero: "Homepage with students in festival costume and the school name in yellow", a: "School life section with four photographs", b: "A line marking each stage from Pre-Primary to Senior Secondary", phone: "Homepage on a phone" },
  },
  {
    slug: "212-tax",
    name: "212 Tax",
    url: "https://212-tax-six.vercel.app/",
    discipline: "Website design and development",
    sector: "Tax and accounting",
    place: "New York",
    color: "#2a2c2e",
    headline: "Tax advice that looks as sure as it sounds.",
    summary: "212 Tax & Accounting Services is a Manhattan practice of CPAs and tax attorneys. The website replaces the usual fog around tax with scale, contrast and plain words.",
    story: [
      { title: "What a client needs to feel", body: "People look for a tax expert when they are worried. They need to feel that somebody competent is already in the room." },
      { title: "What we made", body: "A bold, mostly black and white identity that puts the name at full size and people behind it. Services are a simple list that comes alive under the cursor." },
      { title: "How it helps", body: "The site explains the work in four steps, answers the hard questions in the open and offers a quote, a call or an on-site tax assistant at every turn." },
    ],
    built: ["Visual direction", "Service structure", "Interactive service list", "Quote flow", "Tax assistant", "Articles and questions"],
    alt: { hero: "Homepage with the name 212TAX at full width over a team photograph", a: "Approach section with four key figures", b: "Featured client story", phone: "Homepage on a phone" },
  },
];

export const flow = {
  label: "Our website design and growth process",
  title: "One website, two folds.",
  nodes: ["Start", "Go live", "Keep going"],
  steps: [
    { name: "Fold One: Build", body: "We listen, write, design and develop. You see real pages early and approve each stage before the next." },
    { name: "Fold Two: Grow", body: "We run the ads, watch what visitors do and keep the site and its AI reading scripts current." },
  ],
};

export const faqs = [
  { q: "What does ByTwoFolds do?", a: "ByTwoFolds designs and develops websites, embeds scripts that help AI understand the business, and runs Meta ads on Facebook and Instagram. One team looks after the ad, the page and everything between them." },
  { q: "Where is ByTwoFolds based, and who do you work with?", a: "ByTwoFolds is based in Delhi, India. We build websites for hospitality, interiors, education and professional-services businesses in India and abroad." },
  { q: "Why does a website matter if people use AI to search?", a: "Because AI assistants build their answers from websites, and people still check yours before they pay. AI reading scripts give the assistant accurate facts, and the page gives the buyer a reason to believe them." },
  { q: "Do people really judge a business by its website?", a: "Yes. In a Stanford study of 2,684 people, 46.1% of comments about a site's credibility concerned how it looked. Other research found first impressions of a page form in about 50 milliseconds." },
  { q: "What does it mean to embed AI reading scripts?", a: "We place structured facts about your business in the code of your website. Visitors do not see them, but search engines and AI assistants can read them to learn what you do, where and for whom." },
  { q: "How often should a website be updated?", a: "Review it every month, and change it whenever your offer, proof or prices change. Our care service finds outdated pages, prepares the fix and waits for your approval." },
  { q: "Should I fix my website before running ads?", a: "Usually, yes. Ads send more people to whatever is already there. We check the page first, fix what would lose the sale, then begin to spend." },
];

export const about = {
  title: "We care about the moment nobody sees.",
  intro:
    "It happens late at night, or between meetings. Someone who needs exactly what you do finds your website. They look for a few seconds. They feel something. Then they stay, or they go.",
  body: [
    "No one from your company is in the room. You cannot explain the awards, the late nights or the customers who love you. The website has to carry all of it, on its own, to a stranger who is already tired.",
    "Now AI is in the room too. People ask it who to trust, and it describes you to them from whatever it has read. If your website gave it little to read, it guesses or leaves you out. An unfinished sentence on your website becomes the way you are introduced.",
    "We started ByTwoFolds for that moment. One fold is the making: words, design and code. The other is the keeping: care, ads and attention, long after launch day. A site needs both, and they should come from the same hands.",
  ],
  beliefs: [
    { title: "Say the true thing", body: "No borrowed statistics, no inflated results. If we cannot source it, it does not go on your page." },
    { title: "Clear to people and to AI", body: "What a visitor sees and what an AI reads should be the same truth, said plainly in both places." },
    { title: "Yours to keep", body: "Your code, your content, your ad accounts, your data. If we part ways, you lose nothing." },
  ],
};

/* ---------- Process page ---------- */

export const processPage = {
  title: "You will always know what happens next.",
  intro: "Most people who come to us have been through a website project that went quiet, ran long or ended in something they were embarrassed to share. So here is every stage, what you get from it and what we need from you.",
  folds: [
    {
      name: "Fold One: Build",
      summary: "From the first conversation to a site you are proud to send people to.",
      stages: [
        { name: "Listen", body: "We talk to you, read your reviews and visit your site the way a tired stranger would. We write down what they believe about you when they leave.", get: "A short written diagnosis and the one message your site should carry.", need: "An honest conversation, and access to your current site and analytics if you have them." },
        { name: "Write", body: "Words come before pictures. We plan the pages, decide the question each one answers and write the copy in your voice, so design has something true to hold.", get: "A sitemap and full page copy you can read and correct.", need: "Corrections. You know your customers better than we do." },
        { name: "Design", body: "We design the first screen first, because that is where the judging happens. When it feels like you, we carry it through every page, on desktop, tablet and phone.", get: "Real page designs at three screen sizes, not a mood board.", need: "One person who can say yes." },
        { name: "Develop", body: "We build in code, add motion where it helps and test on real phones, slow connections, keyboards and screen readers. AI reading scripts go in from the beginning.", get: "A private link where you can watch the site take shape.", need: "Final images, legal text and access to your domain." },
        { name: "Go live", body: "We redirect old addresses, check forms, set up measurement and launch. Then we stay close while real visitors arrive, and fix what they find.", get: "Your live site, the code, the accounts and a walkthrough for your team.", need: "Your approval. Nothing launches without it." },
      ],
    },
    {
      name: "Fold Two: Grow",
      summary: "From launch day to the site that keeps earning its place.",
      stages: [
        { name: "Invite", body: "We start ads on Facebook and Instagram, each pointing to a page that keeps the promise the ad made. We begin small and learn before spending more.", get: "Campaigns, creative and landing pages, in accounts you own.", need: "A budget you are comfortable testing with." },
        { name: "Notice", body: "We look at where visitors slow down, what they search for and where they give up. Then we ask AI assistants about you and note what they get right and wrong.", get: "A plain report: what happened, what it cost and what we think.", need: "What you hear on calls. Numbers never tell the whole story." },
        { name: "Renew", body: "We find the stale, broken or unclear pages and prepare the fix. You approve it, and the page and its AI reading scripts are updated together. Then we begin again.", get: "A site that describes the company you are today, to people and to AI.", need: "News. New work, new prices, new people." },
      ],
    },
  ],
  promises: [
    { title: "No surprises in scope", body: "The work is written down and agreed before we begin. If something new comes up, we tell you what it changes before we do it." },
    { title: "You see it early", body: "You look at real pages while they are still easy to change, never one big reveal at the end." },
    { title: "Stop at any fold", body: "Fold two is not a condition of fold one. Take the website and go, or bring us a site somebody else built." },
  ],
  faq: [
    { q: "How long does a website take?", a: "It depends on the number of pages, how ready the content is and how quickly decisions are made. We give you dates for every stage after the first conversation, before you commit." },
    { q: "How much of my time will you need?", a: "Most in the first two stages, where we need your knowledge, and then at each approval. Having one decision maker keeps it light." },
    { q: "What if I do not like the design?", a: "You will see the first screen before anything else is designed. If it does not feel like you, we change direction there, while it is still simple to do." },
    { q: "What happens after launch?", a: "You own everything and can run it yourself. If you want us to stay, fold two covers Meta ads, measurement and regular updates." },
  ],
};

/* ---------- Service page detail ---------- */

export type ServiceDetail = {
  signs: string[];
  steps: { title: string; body: string }[];
  receive: string[];
  ai: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "website-design": {
    signs: [
      "You apologise before sharing your link.",
      "People say your work is far better than your website.",
      "Your site could have a competitor's logo on it and nobody would notice.",
      "You are asked questions your homepage should have answered.",
    ],
    steps: [
      { title: "See it as a stranger", body: "We visit your site and your competitors' sites the way a buyer does, then note the moment doubt arrives." },
      { title: "Find the one message", body: "We agree on what you should be remembered for and cut whatever competes with it." },
      { title: "Design the first fold", body: "The first screen gets its own stage, because it decides whether the rest is seen." },
      { title: "Carry it through", body: "We extend it into a full system of pages, components, type, color and motion." },
    ],
    receive: ["Sitemap and page plan", "Full website copy", "Designs for desktop, tablet and mobile", "Component and style library", "Motion direction", "Accessibility notes for development"],
    ai: "A page that is clear to a tired visitor is usually clear to an AI. We plan each page around one question and answer it plainly, so there is a solid fact to embed and repeat.",
  },
  "website-development": {
    signs: [
      "Your pages take long enough to load that you notice.",
      "Simple edits need a developer, or a prayer.",
      "It looks fine on your laptop and broken on your customer's phone.",
      "Plugins keep breaking each other.",
    ],
    steps: [
      { title: "Plan the build", body: "We choose the simplest setup that meets your needs and explain it in plain language." },
      { title: "Build in the open", body: "You get a private link early and can watch each page arrive." },
      { title: "Test like a visitor", body: "Phones, tablets, slow networks, keyboard only and screen readers." },
      { title: "Launch with care", body: "Redirects, forms, measurement and search checks are done before anyone is invited." },
    ],
    receive: ["Production website in Next.js", "4, 8 and 12 column responsive grid", "Content editing your team can use", "Technical SEO and structured data", "Analytics and form connections", "Code, accounts and a handover session"],
    ai: "We build AI reading scripts into the code from the first page. They draw on the same content your visitors see, so your business is described the same way to people and to AI.",
  },
  "ai-reading-scripts": {
    signs: [
      "AI assistants name your competitors and leave you out.",
      "They mention you, but get the facts wrong.",
      "Your website looks good and says little that AI can read.",
      "It takes three pages to learn what you do.",
    ],
    steps: [
      { title: "Ask what buyers ask", body: "We put real buying questions to AI assistants and note who they name and what they say about you." },
      { title: "Gather the facts", body: "We agree on the true details: services, places, people, projects, questions and answers." },
      { title: "Embed the scripts", body: "We add structured data to each page, publish an llms.txt guide and check crawling settings." },
      { title: "Test and recheck", body: "We validate every script, then ask the same questions again over time and report what changed." },
    ],
    receive: ["AI answer review for your key questions", "Business facts sheet", "Organization, service and FAQ scripts", "Article, project or product scripts where they fit", "llms.txt, sitemap and crawling settings", "Validation and follow-up checks"],
    ai: "An AI assistant cannot visit your office or shake your hand. It knows what it can read. The scripts give it the facts in your words, so it depends less on guesses when someone asks about you.",
  },
  "meta-ads": {
    signs: [
      "You get clicks, but not conversations.",
      "Every ad leads to your homepage.",
      "You cannot say what one new customer costs you.",
      "Your reports are long and you still do not know what to do.",
    ],
    steps: [
      { title: "Check the page first", body: "We fix what would lose the sale before paying to bring anybody to it." },
      { title: "Choose where to appear", body: "We choose the audiences, formats and placements on Facebook and Instagram that suit your buyers." },
      { title: "Make the promise", body: "We write and design the ads, then build a landing page that keeps each promise." },
      { title: "Test, learn, adjust", body: "We start small, move budget to what works and tell you what did not." },
    ],
    receive: ["Account and tracking review", "Campaign plan with budget split", "Ad copy and creative", "Matched landing pages", "Conversion tracking", "Regular reports in plain language"],
    ai: "Many people see an ad, then look you up before they buy. They may ask an AI about you. Reading scripts on your site help the answer match the promise they just saw.",
  },
  "website-care": {
    signs: [
      "Your latest news is from a year you would rather forget.",
      "Prices, people or services on the site are wrong.",
      "You keep a list of changes nobody has time to make.",
      "AI assistants repeat old details about you.",
    ],
    steps: [
      { title: "Read everything", body: "We go through every page and list what is stale, broken, unclear or contradictory." },
      { title: "Put it in order", body: "We sort the list by what is most likely to cost you trust." },
      { title: "Prepare and approve", body: "We make the changes ready to see, and you say yes or correct them." },
      { title: "Publish everywhere", body: "The page and its AI reading scripts go live together, so they always agree." },
    ],
    receive: ["A full review of the current site", "Page updates ready to approve", "Broken link and form checks", "AI reading scripts kept current", "Speed and security upkeep", "A record of everything that changed"],
    ai: "If your page says one thing and your scripts say another, an AI has to choose. We change both at the same time, so there is only one version of the truth to find.",
  },
};

export const startingPoints = [
  { need: "People visit, but do not get in touch.", start: "website-design", why: "The page is being seen and not believed." },
  { need: "The site is slow, fragile or hard to edit.", start: "website-development", why: "Trust is leaking before anyone reads a word." },
  { need: "The site was good once.", start: "website-care", why: "It may need attention, not replacing." },
  { need: "The site works, but too few people see it.", start: "meta-ads", why: "You are ready to invite the right people." },
  { need: "AI assistants never mention us.", start: "ai-reading-scripts", why: "Your site needs facts AI can read." },
];

/* ---------- About page detail ---------- */

export const aboutMore = {
  nameTitle: "Why two folds",
  name: [
    "The fold is an old newspaper word. Whatever sat above the crease had to earn the sale by itself, because that was all a passer-by could see. The first screen of a website does the same work today.",
    "A single sheet of paper is weak. Fold it, and it can stand on its own. A website is much the same. Design without care goes out of date, and ads without a good page lose money. Put the two together and the thing holds.",
  ],
  moment: {
    title: "What happens in that quiet minute",
    items: [
      { title: "They feel", body: "Before reading, they sense whether you are careful or careless, current or forgotten. They could not tell you why." },
      { title: "They look for themselves", body: "They scan for a sign that you understand somebody like them. If all they find is you talking about you, they drift." },
      { title: "They look for a reason to doubt", body: "An old date, a broken image, a claim with nothing behind it. One is often enough." },
      { title: "They decide", body: "Not to buy, yet. Only whether you deserve another minute. Everything else depends on that." },
    ],
  },
  fitTitle: "Who we work best with",
  fit: [
    "You are good at what you do, and your website does not show it.",
    "You care how people feel when they meet your company.",
    "You want one team to answer for the site and the ads.",
    "You would rather hear the truth early.",
  ],
  notFitTitle: "Who we are not right for",
  notFit: [
    "You want a finished site by tomorrow.",
    "You want numbers promised before anybody has looked.",
    "You want it to look exactly like a competitor.",
    "You want reviews or results made up. We will not.",
  ],
  aiTitle: "How AI gets to know your business",
  ai: [
    { title: "It reads what you publish", body: "When someone asks an AI about you, its answer depends on what it has been able to read. A beautiful page with few clear facts gives it little to work with." },
    { title: "We embed the facts", body: "We place reading scripts in your website that state who you are, what you do, where you work and what you have made." },
    { title: "People and AI see one story", body: "The scripts repeat what is on the page. Nothing is claimed there that a visitor could not check." },
    { title: "Nobody can promise a mention", body: "Each AI chooses its own answer. We make sure that when it looks for you, the truth is easy to find." },
  ],
};
