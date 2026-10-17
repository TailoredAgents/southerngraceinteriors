import type {
  Collection,
  DesignService,
  JournalEntry,
  PortfolioProject,
  Product,
  SiteSettings,
} from "@/app/types/domain";

const v = (id: string, value: string, color?: string) => ({ id, name: "Finish", value, color });

export const products: Product[] = [
  {
    id: "p01", slug: "beaufort-linen-sofa", name: "Beaufort Linen Sofa", subtitle: "Easy elegance, generously proportioned", description: "A relaxed, tailored sofa with deep comfort, graceful arms, and a quietly refined profile designed to anchor the room without overwhelming it.", price: 429500, category: "Sofas", collection: "living", tags: ["linen", "upholstery", "neutral"], images: ["/images/beaufort-sofa-v2.webp", "/images/living-soft.jpg"], dimensions: '96" W × 40" D × 34" H', materials: "Performance linen blend, kiln-dried hardwood frame, feather-blend cushions", fulfillment: "FREIGHT", variants: [v("oat", "Oatmeal", "#d8cebd"), v("moss", "Soft Moss", "#9a9c86"), v("pearl", "Pearl", "#eee9df")], featured: true, related: ["p02", "p05", "p13"],
  },
  {
    id: "p02", slug: "harbour-club-chair", name: "Harbour Club Chair", subtitle: "Sculptural comfort in a smaller silhouette", description: "A low, embracing chair with rounded lines and a warm tactile weave. Beautiful from every angle and especially suited to a reading corner.", price: 189500, category: "Accent Chairs", collection: "living", tags: ["chair", "bouclé", "sculptural"], images: ["/images/harbour-chair-v2.webp", "/images/reading-corner.jpg"], dimensions: '34" W × 36" D × 31" H', materials: "Textured upholstery, hardwood frame, high-resiliency foam", fulfillment: "FREIGHT", variants: [v("sand", "Sand", "#c7b8a0"), v("walnut", "Walnut", "#715846")], featured: true, newArrival: true, related: ["p01", "p06", "p17"],
  },
  {
    id: "p03", slug: "ashby-cane-chair", name: "Ashby Cane Chair", subtitle: "An airy study in natural texture", description: "A modern heirloom chair pairing a softly curved timber frame with woven cane and a tailored seat cushion.", price: 147500, category: "Accent Chairs", collection: "living", tags: ["cane", "chair", "wood"], images: ["/images/ashby-chair-v2.webp", "/images/room-warm.jpg"], dimensions: '29" W × 31" D × 33" H', materials: "White oak, handwoven cane, linen-blend cushion", fulfillment: "FREIGHT", variants: [v("oak", "Natural Oak", "#b49570"), v("smoked", "Smoked Oak", "#715846")], related: ["p05", "p12", "p15"],
  },
  {
    id: "p04", slug: "calhoun-dining-table", name: "Calhoun Dining Table", subtitle: "A gracious table for everyday gathering", description: "Substantial without feeling heavy, the Calhoun balances a warm wood top with a gently architectural pedestal base.", price: 389500, category: "Dining Tables", collection: "dining", tags: ["dining", "walnut", "pedestal"], images: ["/images/calhoun-table-v2.webp", "/images/dining-minimal.jpg"], dimensions: '84" W × 40" D × 30" H', materials: "Solid oak and oak veneer", fulfillment: "QUOTE_REQUIRED", variants: [v("pecan", "Warm Pecan", "#8b674b"), v("natural", "Natural Oak", "#b99972")], featured: true, related: ["p05", "p11", "p18"],
  },
  {
    id: "p05", slug: "savannah-dining-chair", name: "Savannah Dining Chair", subtitle: "Tailored lines, lingering comfort", description: "A refined dining chair with a supportive curved back and crisp linen upholstery, designed for long dinners and unhurried conversation.", price: 89500, category: "Dining Chairs", collection: "dining", tags: ["dining", "upholstery", "chair"], images: ["/images/savannah-chair-v2.webp", "/images/dining-classic.jpg"], dimensions: '21" W × 24" D × 35" H', materials: "Oak, linen blend, performance foam", fulfillment: "FREIGHT", variants: [v("linen", "Natural Linen", "#ded2c0"), v("sage", "Sage", "#8e947d")], related: ["p04", "p11", "p18"],
  },
  {
    id: "p06", slug: "ellis-round-coffee-table", name: "Ellis Round Coffee Table", subtitle: "Soft geometry in honed stone", description: "A quietly dramatic coffee table with a rounded limestone top and a warm wood base. Natural variation makes every piece distinctive.", price: 219500, category: "Coffee Tables", collection: "living", tags: ["stone", "table", "round"], images: ["/images/ellis-coffee-table-v2.webp", "/images/hero-living.jpg"], dimensions: '44" Dia × 16" H', materials: "Honed limestone, walnut veneer", fulfillment: "FREIGHT", variants: [v("limestone", "Limestone & Walnut", "#b8aa93"), v("travertine", "Travertine & Oak", "#cbbba0")], featured: true, related: ["p01", "p02", "p14"],
  },
  {
    id: "p07", slug: "charleston-sideboard", name: "Charleston Sideboard", subtitle: "Architectural storage with a collected soul", description: "Fluted doors and restrained brass details bring depth to a versatile cabinet made for dining rooms, entries, and generous living spaces.", price: 329500, category: "Cabinets", collection: "dining", tags: ["storage", "cabinet", "wood"], images: ["/images/charleston-sideboard-v2.webp", "/images/dining-walnut.jpg"], dimensions: '72" W × 19" D × 32" H', materials: "Oak veneer, antiqued brass hardware", fulfillment: "LOCAL_DELIVERY", variants: [v("walnut", "Warm Walnut", "#6f513c"), v("ebonized", "Ebonized Oak", "#332d28")], related: ["p04", "p12", "p20"],
  },
  {
    id: "p08", slug: "magnolia-upholstered-bed", name: "Magnolia Upholstered Bed", subtitle: "A serene frame for restorative rooms", description: "A softly tailored bed with a tall, gently curved headboard and fully upholstered rails. Its calm proportions invite layers of linen and quiet color.", price: 349500, category: "Beds", collection: "bedroom", tags: ["bed", "linen", "upholstery"], images: ["/images/magnolia-bed-v2.webp", "/images/bedroom-airy.jpg"], dimensions: 'Queen: 67" W × 88" D × 58" H', materials: "Performance linen, hardwood frame", fulfillment: "FREIGHT", variants: [v("flax", "Flax", "#cabbab"), v("ivory", "Warm Ivory", "#e8e1d5")], featured: true, related: ["p09", "p10", "p16"],
  },
  {
    id: "p09", slug: "camellia-nightstand", name: "Camellia Nightstand", subtitle: "Small-scale craftsmanship, considered storage", description: "A graceful bedside table with softly rounded corners, a roomy drawer, and an open shelf for favorite books.", price: 119500, category: "Nightstands", collection: "bedroom", tags: ["bedroom", "storage", "wood"], images: ["/images/camellia-nightstand-v2.webp", "/images/bedroom-serene.jpg"], dimensions: '28" W × 19" D × 27" H', materials: "White oak veneer, solid oak, aged brass", fulfillment: "FREIGHT", variants: [v("natural", "Natural Oak", "#b79a76"), v("walnut", "Walnut", "#72533f")], related: ["p08", "p10", "p19"],
  },
  {
    id: "p10", slug: "heirloom-wool-rug", name: "Heirloom Wool Rug", subtitle: "A softened motif with quiet depth", description: "Hand-finished in a tonal pattern inspired by antique textiles, this wool rug grounds a room with subtle movement and warmth.", price: 169500, category: "Rugs", collection: "finishing-touches", tags: ["rug", "wool", "textile"], images: ["/images/heirloom-rug-v2.webp", "/images/living-soft.jpg"], dimensions: "Available in 6′ × 9′, 8′ × 10′, and 9′ × 12′", materials: "100% hand-tufted wool", fulfillment: "FREIGHT", variants: [v("sage", "Weathered Sage", "#8f927b"), v("sand", "Antique Sand", "#c6b79f")], featured: true, related: ["p01", "p08", "p15"],
  },
  {
    id: "p11", slug: "mercer-pendant", name: "Mercer Pendant", subtitle: "A warm pool of light above the table", description: "A softly burnished pendant with a linen diffuser that casts an intimate, flattering glow.", price: 98500, category: "Ceiling Lighting", collection: "lighting", tags: ["lighting", "pendant", "brass"], images: ["/images/mercer-pendant-v2.webp", "/images/dining-walnut.jpg"], dimensions: '24" Dia × 18" H; adjustable drop', materials: "Aged brass, linen diffuser", fulfillment: "PARCEL", variants: [v("brass", "Aged Brass", "#9d7b50"), v("bronze", "Oil-Rubbed Bronze", "#4b4036")], related: ["p04", "p12", "p18"],
  },
  {
    id: "p12", slug: "alden-table-lamp", name: "Alden Table Lamp", subtitle: "A sculptural glow for collected rooms", description: "A hand-finished ceramic base and generous linen shade give the Alden an artisanal presence on consoles, desks, and bedside tables.", price: 64500, category: "Table Lamps", collection: "lighting", tags: ["lighting", "ceramic", "lamp"], images: ["/images/alden-lamp-v2.webp", "/images/desk-lamp.jpg"], dimensions: '18" Dia × 29" H', materials: "Glazed ceramic, linen shade, antiqued brass", fulfillment: "PARCEL", variants: [v("chalk", "Chalk", "#ddd6c8"), v("umber", "Umber", "#755a48")], featured: true, related: ["p09", "p13", "p17"],
  },
  {
    id: "p13", slug: "briar-floor-lamp", name: "Briar Floor Lamp", subtitle: "Slim, graceful, and beautifully balanced", description: "A refined floor lamp with a slender stem and softly tapered shade, designed to disappear into a room while making the light feel intentional.", price: 89500, category: "Floor Lamps", collection: "lighting", tags: ["lighting", "floor lamp", "brass"], images: ["/images/briar-floor-lamp-v2.webp", "/images/room-warm.jpg"], dimensions: '18" Dia × 61" H', materials: "Antiqued brass, linen shade", fulfillment: "PARCEL", variants: [v("brass", "Antiqued Brass", "#98764e"), v("bronze", "Warm Bronze", "#635044")], related: ["p02", "p12", "p17"],
  },
  {
    id: "p14", slug: "addison-stone-bowl", name: "Addison Stone Bowl", subtitle: "An organic centerpiece with sculptural weight", description: "Carved from natural stone with a matte finish, this low bowl is striking on its own or filled with seasonal branches and fruit.", price: 28500, category: "Decor", collection: "finishing-touches", tags: ["bowl", "stone", "decor"], images: ["/images/addison-bowl-v2.webp", "/images/vase-pair.jpg"], dimensions: '18" Dia × 6" H', materials: "Natural limestone", fulfillment: "PARCEL", variants: [v("cream", "Cream Stone", "#c8bca8"), v("charcoal", "Charcoal Stone", "#525049")], related: ["p06", "p15", "p20"],
  },
  {
    id: "p15", slug: "garden-gate-cushion", name: "Garden Gate Cushion", subtitle: "Painterly pattern, tailored finish", description: "A soft botanical motif with a linen texture, finished with self-piping and a generous feather-down insert.", price: 19500, category: "Pillows", collection: "finishing-touches", tags: ["pillow", "textile", "pattern"], images: ["/images/garden-cushion-v2.webp", "/images/living-soft.jpg"], dimensions: '22" × 22"', materials: "Printed linen blend, feather-down insert", fulfillment: "PARCEL", variants: [v("sage", "Sage", "#969b82"), v("clay", "Soft Clay", "#b28b75")], newArrival: true, related: ["p01", "p10", "p17"],
  },
  {
    id: "p16", slug: "palmetto-linen-throw", name: "Palmetto Linen Throw", subtitle: "Lightweight layers for every season", description: "Washed linen with a relaxed hand and hand-knotted fringe, made for the end of a bed or the arm of a favorite chair.", price: 24500, category: "Textiles", collection: "bedroom", tags: ["throw", "linen", "textile"], images: ["/images/palmetto-throw-v2.webp", "/images/rug-woven.jpg"], dimensions: '55" × 78"', materials: "100% washed linen", fulfillment: "PARCEL", variants: [v("flax", "Flax", "#c5b7a3"), v("sage", "Faded Sage", "#929781"), v("ivory", "Ivory", "#e8e3da")], related: ["p08", "p10", "p15"],
  },
  {
    id: "p17", slug: "river-reed-vase", name: "River Reed Vase", subtitle: "Hand-touched character in every curve", description: "A tall ceramic vessel with a softly irregular silhouette and quiet glaze, beautiful with branches or left unadorned.", price: 22500, category: "Decor", collection: "finishing-touches", tags: ["vase", "ceramic", "decor"], images: ["/images/river-vase-v2.webp", "/images/vase-dried.jpg"], dimensions: '9" Dia × 17" H', materials: "Hand-finished ceramic", fulfillment: "PARCEL", variants: [v("chalk", "Chalk", "#d9d3c7"), v("moss", "Moss", "#858b76")], featured: true, related: ["p12", "p14", "p20"],
  },
  {
    id: "p18", slug: "gathering-candleholders", name: "Gathering Candleholders", subtitle: "A warm rhythm of aged brass", description: "Three slender candleholders in graduated heights, designed to bring an intimate glow to dining tables and mantels.", price: 16500, category: "Decor", collection: "dining", tags: ["candleholder", "brass", "tabletop"], images: ["/images/gathering-candleholders-v2.webp", "/images/dining-minimal.jpg"], dimensions: 'Set of three; 10", 13", and 16" H', materials: "Cast brass with aged finish", fulfillment: "PARCEL", variants: [v("brass", "Aged Brass", "#98764e")], related: ["p04", "p11", "p17"],
  },
  {
    id: "p19", slug: "lowcountry-landscape", name: "Lowcountry Landscape", subtitle: "Quiet atmosphere, painterly horizon", description: "A contemplative giclée print in softened earth tones, floated within a slim wood frame.", price: 52500, category: "Art", collection: "finishing-touches", tags: ["art", "landscape", "framed"], images: ["/images/lowcountry-art-v2.webp", "/images/bedroom-serene.jpg"], dimensions: '32" W × 42" H framed', materials: "Archival giclée print, oak frame, acrylic glazing", fulfillment: "PARCEL", variants: [v("oak", "Natural Oak", "#b2936f"), v("walnut", "Walnut", "#6f503b")], related: ["p08", "p09", "p20"],
  },
  {
    id: "p20", slug: "wren-arched-mirror", name: "Wren Arched Mirror", subtitle: "A graceful reflection with subtle patina", description: "An elongated arch and slender hand-finished frame bring height, light, and an easy sense of history to the room.", price: 79500, category: "Mirrors", collection: "finishing-touches", tags: ["mirror", "brass", "wall"], images: ["/images/wren-mirror-v2.webp", "/images/mirror-green.jpg"], dimensions: '30" W × 48" H × 1.5" D', materials: "Metal frame, mirror glass", fulfillment: "FREIGHT", variants: [v("brass", "Soft Brass", "#967850"), v("black", "Blackened Iron", "#35322f")], featured: true, related: ["p07", "p14", "p19"],
  },
  {
    id: "p21", slug: "veranda-console", name: "Veranda Console", subtitle: "An elegant landing place", description: "A slim console with rounded edges and a subtly textured finish, proportioned for entries, halls, and the back of a sofa.", price: 179500, category: "Consoles", collection: "living", tags: ["console", "wood", "entry"], images: ["/images/veranda-console-v2.webp", "/images/reading-corner.jpg"], dimensions: '58" W × 15" D × 31" H', materials: "Oak veneer, solid oak", fulfillment: "FREIGHT", variants: [v("natural", "Natural Oak", "#b0926f"), v("walnut", "Warm Walnut", "#70523e")], related: ["p03", "p12", "p20"],
  },
];

export const collections: Collection[] = [
  { slug: "living", name: "Living", description: "Comfortable foundations and artful accents for the rooms where life unfolds.", image: "/images/room-living-v2.webp", accent: "#837565" },
  { slug: "dining", name: "Dining", description: "Made for lingering dinners, everyday rituals, and generous hospitality.", image: "/images/room-dining-v2.webp", accent: "#735842" },
  { slug: "bedroom", name: "Bedroom", description: "Serene layers and quiet silhouettes for your most restorative space.", image: "/images/room-bedroom-v2.webp", accent: "#969b82" },
  { slug: "lighting", name: "Lighting", description: "Sculptural forms and warm illumination that shape the mood of a room.", image: "/images/room-lighting-v2.webp", accent: "#8c765e" },
  { slug: "finishing-touches", name: "Finishing Touches", description: "Collected objects, textiles, and art that make a home feel deeply personal.", image: "/images/room-finishing-v2.webp", accent: "#888b73" },
];

export const services: DesignService[] = [
  { slug: "full-service", title: "Full-Service Interior Design", shortDescription: "A considered home, shaped from first idea to final placement.", description: "A comprehensive design partnership for new homes, renovations, and complete-room transformations. The experience can encompass spatial planning, furnishing, finishes, lighting, sourcing, and installation.", includes: ["Design direction and space planning", "Furniture, lighting, and finish selections", "Sourcing, procurement, and installation guidance"] },
  { slug: "room-refresh", title: "Room Refresh & Styling", shortDescription: "A focused transformation for a room that needs clarity and character.", description: "A streamlined engagement for spaces with good bones that need a thoughtful eye, better flow, and a more cohesive final layer.", includes: ["Room assessment and visual direction", "Furnishing and styling plan", "Curated shopping recommendations"] },
  { slug: "selection", title: "Furniture & Finish Selection", shortDescription: "Confident choices for the pieces and materials that carry the room.", description: "Targeted support for choosing furnishings, lighting, textiles, paint, hardware, and other defining details—without the overwhelm.", includes: ["Personalized sourcing brief", "Coordinated finish palette", "Prioritized purchase plan"] },
];

export const projects: PortfolioProject[] = [
  { slug: "garden-room", title: "The Garden Room", subtitle: "An inspiration study in softened greens and layered natural texture", description: "A concept for an airy gathering room where tailored upholstery, warm woods, and garden tones create an atmosphere that feels collected rather than decorated.", image: "/images/portfolio-garden-v2.webp", gallery: ["/images/living-soft.jpg", "/images/reading-corner.jpg", "/images/vase-pair.jpg"], palette: ["#f1eadf", "#969b82", "#76614c", "#292c27"] },
  { slug: "quiet-retreat", title: "A Quiet Retreat", subtitle: "An inspiration study for a calm and tactile primary suite", description: "A restrained bedroom concept shaped by soft plaster tones, washed linen, subtle pattern, and the warmth of natural oak.", image: "/images/portfolio-retreat-v2.webp", gallery: ["/images/bedroom-airy.jpg", "/images/mirror-green.jpg", "/images/vase-dried.jpg"], palette: ["#ede7dc", "#c8b9a5", "#a2a18e", "#66584b"] },
  { slug: "gracious-table", title: "The Gracious Table", subtitle: "An inspiration study for modern Southern hospitality", description: "A dining concept balancing sculptural lighting and clean silhouettes with the familiarity of warm wood, aged brass, and tactile linens.", image: "/images/portfolio-table-v2.webp", gallery: ["/images/dining-minimal.jpg", "/images/dining-classic.jpg", "/images/desk-lamp.jpg"], palette: ["#f4efe6", "#b29572", "#76614c", "#36342e"] },
];

export const journal: JournalEntry[] = [
  { slug: "rooms-that-feel-collected", title: "How to Create a Room That Feels Collected", excerpt: "The most memorable rooms unfold slowly. Here is how to build depth without creating clutter.", category: "Design Notes", date: "October 8, 2026", image: "/images/journal-collected-v2.webp", readTime: "6 min read", paragraphs: ["A collected room rarely begins with a matching set. It grows from a clear point of view, then welcomes pieces with different ages, textures, and stories. The result feels natural because every choice supports the same emotional direction without repeating itself.", "Begin with one grounding element: a generous sofa, a worn wood table, or a rug with a softened pattern. This becomes the room’s visual center. Around it, vary silhouette and material. A crisp linen chair beside a dark wood table creates the gentle tension that gives a room life.", "Restraint is part of the process. Leave breathing room around the pieces that matter. Repeat a color quietly rather than everywhere, and give each surface one deliberate composition instead of many small objects.", "Most importantly, allow the room to change with you. The best interiors make space for a newly found painting, a stack of well-loved books, or flowers cut from the garden. Completion is not the goal; belonging is."] },
  { slug: "the-right-white", title: "Finding the Right White", excerpt: "A practical guide to undertones, natural light, and choosing a white that belongs in your home.", category: "Materials", date: "September 18, 2026", image: "/images/journal-white-v2.webp", readTime: "5 min read", paragraphs: ["White is never simply white. In one room it can feel luminous and calm; in another, stark or unexpectedly yellow. The difference is usually the conversation between undertone and light.", "Study your room throughout the day before choosing. Northern light often benefits from a warmer white, while strong southern exposure can carry a more neutral shade. Always sample broadly and observe the paint beside flooring, textiles, and fixed finishes.", "A harmonious white does not call attention to itself. It quietly makes the architecture, art, and furnishings feel more intentional."] },
  { slug: "lighting-in-layers", title: "The Art of Lighting in Layers", excerpt: "Why beautiful rooms rely on pools of light—not one fixture doing all the work.", category: "The Edit", date: "August 27, 2026", image: "/images/journal-lighting-v2.webp", readTime: "4 min read", paragraphs: ["Lighting shapes how a room feels long before we notice the fixtures themselves. The most inviting spaces combine ambient, task, and accent light at several heights.", "Start with practical illumination, then soften it. Table lamps bring intimacy, picture lights add quiet focus, and shaded sconces make evening light flattering. Dimmers give the room flexibility as the day changes.", "Choose fewer fixtures with presence and let their glow overlap. A room should feel gently illuminated, never uniformly bright."] },
  { slug: "a-more-gracious-entry", title: "Five Details for a More Gracious Entry", excerpt: "Small gestures that make arriving home feel composed, warm, and distinctly yours.", category: "At Home", date: "July 30, 2026", image: "/images/journal-entry-v2.webp", readTime: "3 min read", paragraphs: ["An entry is a transition, not merely a pass-through. A well-proportioned table, a place to set keys, a warm lamp, and something living are often all it needs.", "Use a mirror to borrow light and create depth. Add one object with personality—an old bowl, a sculptural branch, a small painting—then resist filling every inch.", "The final measure is practical ease. When beauty and usefulness meet, even the smallest entry begins to feel generous."] },
];

export const settings: SiteSettings = {
  brandName: "Southern Grace Interiors",
  tagline: "Beautiful spaces. A life well lived.",
  commerceProvider: "demo",
  contentProvider: "demo",
  inquiryProvider: "disabled",
  checkoutProvider: "disabled",
};

export const productBySlug = (slug: string) => products.find((product) => product.slug === slug);
export const collectionBySlug = (slug: string) => collections.find((collection) => collection.slug === slug);
