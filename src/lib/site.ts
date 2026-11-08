// ============================================================================
// CreatVate Solutions — single source of truth for business details & content.
// Edit this file to update the whole site, sitemap and structured data.
// Items marked TODO need the firm's real details before launch.
// ============================================================================

export const siteConfig = {
  name: "CreatVate Solutions",
  legalName: "CreatVate Solutions Consultancy",
  shortName: "CreatVate",
  tagline: "Creating value through innovation",
  description:
    "CreatVate Solutions is a consultancy built on four pillars: Digital Growth (social media management), AI Automation, Training & Capacity Building, and Custom Software Development. We help organisations grow and work smarter.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.creatvatesolutions.com").replace(/\/$/, ""),
  locale: "en_US",
  foundingYear: "2024", // TODO: confirm
  contact: {
    email: "info@creatvatesolutions.com", // TODO
    phone: "+263 78 403 0449",
    whatsapp: "263784030449",
    address: {
      street: "123 Business Avenue", // TODO
      city: "Your City", // TODO
      region: "",
      postalCode: "",
      country: "Zimbabwe", // TODO: confirm full address
    },
    hours: "Mon – Fri, 8:00 – 17:00",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/creatvate-solutions", // TODO
    facebook: "",
    instagram: "",
    x: "",
  },
  keywords: [
    "social media management",
    "social media marketing agency",
    "digital growth agency",
    "AI automation agency",
    "business process automation",
    "workflow automation",
    "AI solutions for business",
    "custom software development",
    "business software development",
    "corporate training",
    "capacity building",
    "AI training for staff",
    "consultancy firm",
    "CreatVate Solutions",
  ],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  icon: IconName;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  offerings: { title: string; text: string }[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
};

export type IconName = "megaphone" | "bot" | "graduation" | "code";

// The four pillars of CreatVate Solutions.
export const services: Service[] = [
  {
    slug: "digital-growth-social-media-management",
    title: "Digital Growth",
    short:
      "Social media management that grows your audience, builds your brand and turns followers into customers.",
    image: "/images/social-media.jpg",
    icon: "megaphone",
    metaTitle: "Digital Growth: Social Media Management Services",
    metaDescription:
      "Professional social media management: strategy, content creation, scheduling, community management, paid social ads and monthly analytics to grow your business online.",
    intro:
      "Your customers are on social media every day. We manage your social presence from start to finish, so your brand shows up consistently, engages the right people and generates real enquiries while you focus on running the business.",
    offerings: [
      { title: "Social media strategy", text: "A clear plan for your platforms, audience, content pillars, posting rhythm and goals." },
      { title: "Content creation & scheduling", text: "On-brand graphics, short-form video, captions and a content calendar, published on time every time." },
      { title: "Community management", text: "We respond to comments and messages promptly so your audience feels heard and leads aren't missed." },
      { title: "Paid social advertising", text: "Targeted Facebook, Instagram, LinkedIn and TikTok ad campaigns optimised for leads and sales." },
      { title: "Analytics & reporting", text: "Monthly reports on reach, engagement, followers and leads, with clear recommendations." },
      { title: "Profile setup & optimisation", text: "Professional, search-friendly profiles across every platform that matters to your business." },
    ],
    outcomes: ["A consistent, professional brand online", "A growing, engaged audience", "More enquiries from social media", "Clear monthly results you can measure"],
    faqs: [
      { q: "Which social media platforms do you manage?", a: "We manage Facebook, Instagram, LinkedIn, TikTok, X and YouTube. We recommend the platforms where your customers actually spend time." },
      { q: "Do you create the content as well?", a: "Yes. Our team handles strategy, design, video, copywriting and scheduling. You approve the content calendar and we take care of the rest." },
      { q: "How soon will we see results?", a: "Engagement usually improves within the first month. Steady audience and lead growth builds over 3 to 6 months of consistent activity." },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    short:
      "We learn how your business works, then use AI to automate your workflows so your team works faster and smarter.",
    image: "/images/ai-automation.jpg",
    icon: "bot",
    metaTitle: "AI Automation Agency: Business Workflow Automation",
    metaDescription:
      "AI automation for businesses: we map your workflows, then automate repetitive tasks with AI agents, chatbots and integrations to save time, cut costs and reduce errors.",
    intro:
      "Every business has hours lost to repetitive, manual work. We start by understanding your company: your people, processes, tools and pain points. Then we design and build AI-powered automations that remove that busywork, so your team works better.",
    offerings: [
      { title: "Business & workflow discovery", text: "We gather your company details and map how work flows today, so we can see exactly where time and money are lost." },
      { title: "Workflow automation", text: "Automate approvals, data entry, invoicing, reporting, follow-ups and hand-offs between your tools." },
      { title: "AI assistants & chatbots", text: "AI agents that answer customers 24/7, qualify leads, book appointments and support your staff." },
      { title: "Document & data processing", text: "AI that reads, extracts and organises information from emails, forms, invoices and PDFs." },
      { title: "Systems integration", text: "Connect your CRM, accounting, email, WhatsApp and spreadsheets so information flows automatically." },
      { title: "Monitoring & optimisation", text: "We track performance, fine-tune your automations and expand them as your business grows." },
    ],
    outcomes: ["Hours saved every week", "Fewer manual errors", "Faster response to customers", "Lower operating costs"],
    faqs: [
      { q: "How does your AI automation process work?", a: "First we collect details about your company and map your current workflows. Then we identify the tasks with the biggest time savings, build and test the automations, train your team, and keep improving them over time." },
      { q: "Do we need technical skills to use the automations?", a: "No. We build automations that fit into the tools you already use, and we train your team so everyone is comfortable from day one." },
      { q: "Is our business data safe?", a: "Yes. Data protection is central to how we work. We use secure, reputable platforms, limit access to what each automation needs, and follow privacy best practice." },
    ],
  },
  {
    slug: "training-capacity-building",
    title: "Training & Capacity Building",
    short:
      "Practical training programmes that equip your people with digital, AI and leadership skills for the future.",
    image: "/images/workshop.jpg",
    icon: "graduation",
    metaTitle: "Corporate Training & Capacity Building Programmes",
    metaDescription:
      "Corporate training and capacity building: AI and digital skills, social media, leadership development, entrepreneurship and customised staff training workshops.",
    intro:
      "Technology only delivers value when people know how to use it. Our hands-on programmes build the skills, confidence and mindset your team needs to adopt new tools, perform better and keep innovating.",
    offerings: [
      { title: "AI & digital skills", text: "Practical training in AI tools, productivity software and working smarter with technology." },
      { title: "Social media & digital marketing", text: "Equip your in-house team to plan, create and manage effective digital content." },
      { title: "Leadership & management", text: "Programmes that develop confident, effective leaders at every level." },
      { title: "Entrepreneurship & SME support", text: "Business skills bootcamps for entrepreneurs and growing businesses." },
      { title: "Customised workshops", text: "Tailored, in-house training designed around your goals, systems and team." },
    ],
    outcomes: ["A more capable, confident workforce", "Faster adoption of new technology", "Higher productivity", "A culture of innovation"],
    faqs: [
      { q: "Do you offer in-person and online training?", a: "Yes. We deliver in-person, virtual and blended programmes." },
      { q: "Can training be customised for our organisation?", a: "Absolutely. We assess your team's needs and design training around your goals, tools and industry." },
      { q: "Do participants receive certificates?", a: "Participants receive a certificate of completion for every programme." },
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    short:
      "Bespoke software, web apps and systems built around exactly how your business works.",
    image: "/images/software-dev.jpg",
    icon: "code",
    metaTitle: "Custom Software Development Company",
    metaDescription:
      "Custom software development: business management systems, web and mobile applications, portals, dashboards and integrations, built to fit your workflows.",
    intro:
      "Off-the-shelf software rarely fits perfectly. We design and build custom software around your processes, so your tools work the way your business does and can grow with you.",
    offerings: [
      { title: "Business management systems", text: "Custom CRM, ERP, inventory, HR and booking systems tailored to your operations." },
      { title: "Web applications & portals", text: "Secure client portals, staff dashboards and online platforms." },
      { title: "Mobile applications", text: "Android and iOS apps for your customers or your team in the field." },
      { title: "Websites & e-commerce", text: "Fast, mobile-friendly, SEO-ready websites and online stores." },
      { title: "APIs & integrations", text: "Connect your new software with the tools and systems you already use." },
      { title: "Support & maintenance", text: "Hosting, security updates, backups and continuous improvement." },
    ],
    outcomes: ["Software that fits how you work", "Less time lost to workarounds", "Secure, scalable systems", "Ongoing support you can rely on"],
    faqs: [
      { q: "How long does it take to build custom software?", a: "It depends on scope. A focused tool can take 4 to 8 weeks, while larger systems are delivered in phases with regular demos so you see progress early." },
      { q: "Who owns the software once it's built?", a: "You do. On completion and final payment, you own the code and everything we build for you." },
      { q: "Do you provide support after launch?", a: "Yes. We offer support and maintenance plans covering updates, security, backups and new features." },
    ],
  },
];

export const industries = [
  { name: "Small & Medium Enterprises", text: "Practical growth and automation support for ambitious SMEs and start-ups.", image: "/images/office.jpg" },
  { name: "Financial Services", text: "Automated processes, custom systems and compliance-ready workflows.", image: "/images/ind-finance.jpg" },
  { name: "Retail & E-commerce", text: "Social media growth, online stores and automated customer service.", image: "/images/ind-retail.jpg" },
  { name: "NGOs & Development", text: "Capacity building, reporting automation and digital outreach.", image: "/images/collaboration.jpg" },
  { name: "Public Sector", text: "Digitisation, staff training and better service delivery.", image: "/images/meeting.jpg" },
  { name: "Agriculture & Agribusiness", text: "Digital tools, market reach and business systems.", image: "/images/ind-agriculture.jpg" },
  { name: "Healthcare", text: "Patient communication, scheduling automation and custom systems.", image: "/images/ind-healthcare.jpg" },
  { name: "Education", text: "Digital learning, administrative automation and staff training.", image: "/images/ind-education.jpg" },
];

export const processSteps = [
  { title: "Discover", text: "We gather your company details and learn how your business, people and workflows operate today." },
  { title: "Design", text: "We design a tailored plan covering growth, automation, software and training, with clear goals." },
  { title: "Deliver", text: "We build, launch and train your team, keeping you informed at every milestone." },
  { title: "Grow", text: "We measure results, optimise and support your continued success." },
];

export const whyUs = [
  { title: "Four pillars, one partner", text: "Social media growth, AI automation, custom software and training from a single team." },
  { title: "We learn your business first", text: "Every solution starts with understanding your company, workflows and goals." },
  { title: "Results-focused", text: "Clear KPIs and transparent reporting so you always see the value." },
  { title: "People + technology", text: "We don't just build tools. We train your team to get the most from them." },
];

// TODO: replace with real figures before launch
export const stats = [
  { value: "4", label: "Core pillars" },
  { value: "100%", label: "Client-focused delivery" },
  { value: "24h", label: "Response time" },
  { value: "360°", label: "End-to-end solutions" },
];

// TODO: replace with real client testimonials (with permission)
export const testimonials = [
  { quote: "Since CreatVate took over our social media, our engagement and enquiries have grown every month. Professional and consistent.", name: "Client Name", role: "Managing Director, SME" },
  { quote: "They studied how we work, then automated processes that used to take us days. The training made adoption easy for our staff.", name: "Client Name", role: "Operations Manager" },
  { quote: "The custom system they built fits our business perfectly. No more spreadsheets and workarounds.", name: "Client Name", role: "Founder, Retail Brand" },
];

// Brands we've worked with (real clients)
export const clients = [
  { name: "TheGrillGarden", service: "Social Media Management" },
  { name: "Focus Research Consultancy", service: "Digital Growth & AI Automation" },
];

// How we charge
export const billing = {
  model: "Project-based",
  note: "We're a project-based consultancy. You're charged per project, and billing begins only when your project starts, never before.",
};

// Upcoming training events (TODO: confirm dates & venues)
// Upcoming training events (TODO: confirm details).
// registerUrl: paste the link from your event tool (e.g. Luma, Google Forms, Eventbrite).
// Leave it as "" and the button falls back to the contact page until you add a link.
export const trainingEvents = [
  {
    title: "AI Tools for Business Workshop",
    date: "2026-12-03",
    format: "Online (Live)",
    location: "Zoom",
    blurb: "A hands-on session on using AI to automate everyday business tasks and save hours each week.",
    tag: "Limited seats",
    registerUrl: "", // e.g. "https://lu.ma/your-event"
  },
  {
    title: "Social Media Growth Masterclass",
    date: "2026-12-12",
    format: "In-person",
    location: "Harare, Zimbabwe",
    blurb: "Learn to plan, create and schedule content that grows your audience and turns followers into customers.",
    tag: "",
    registerUrl: "",
  },
  {
    title: "Digital Skills Bootcamp",
    date: "2027-01-20",
    format: "Hybrid",
    location: "Harare & Online",
    blurb: "A practical two-day bootcamp covering digital marketing, data and the fundamentals of AI for your team.",
    tag: "2 days",
    registerUrl: "",
  },
];

export const homeFaqs = [
  { q: "What does CreatVate Solutions do?", a: "CreatVate Solutions is a consultancy built on four pillars: Digital Growth (social media management), AI Automation, Training & Capacity Building, and Custom Software Development." },
  { q: "How does your AI automation service work?", a: "We start by gathering details about your company and mapping your workflows. Then we automate repetitive tasks with AI and integrations so your team can focus on higher-value work." },
  { q: "What size of businesses do you work with?", a: "We work with start-ups, SMEs, NGOs, public sector bodies and large enterprises. Our solutions scale to fit your needs and budget." },
  { q: "How do I get started?", a: "Book a free consultation through our contact page. We'll discuss your goals, then send a tailored proposal with clear deliverables and pricing." },
  { q: "How does pricing and billing work?", a: "We're a project-based consultancy. You're charged per project, and billing starts when the project begins, never before. Pricing depends on scope, and you always receive a clear, transparent quote before any work starts." },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/join", label: "Join us" },
  { href: "/contact", label: "Contact" },
];

// ---- Join us (become a client / partner) ----
export const joinReasons = [
  { title: "One partner for everything", text: "Social media, AI automation, software and training under one roof, so nothing falls through the cracks.", icon: "spark" as const },
  { title: "We learn your business first", text: "Every engagement starts by understanding how you work and what success looks like for you.", icon: "strategy" as const },
  { title: "Transparent pricing", text: "Clear quotes and no surprises. You always know what you're paying for before we begin.", icon: "check" as const },
  { title: "Results you can measure", text: "Defined KPIs and honest reporting, so you see the value we create every month.", icon: "chart" as const },
];

export const joinPlans = [
  {
    name: "Starter",
    tagline: "For small businesses finding their feet online.",
    features: ["Social media management", "Brand & profile setup", "Monthly reporting", "Email & WhatsApp support"],
    cta: "Start small",
    featured: false,
  },
  {
    name: "Growth",
    tagline: "For businesses ready to scale with automation.",
    features: ["Everything in Starter", "AI workflow automation", "Custom tools & integrations", "Paid campaigns", "Priority support"],
    cta: "Grow with us",
    featured: true,
  },
  {
    name: "Partner",
    tagline: "A full digital team for ambitious organisations.",
    features: ["Everything in Growth", "Custom software development", "Team training & capacity building", "Dedicated account lead", "Quarterly strategy reviews"],
    cta: "Let's partner",
    featured: false,
  },
];
