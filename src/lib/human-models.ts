import type { HumanModel, HumanModelLook, ModelAttributes } from "@/types/human-model";

const KEIRA_PHOTOS = [
  "/models/keira/01-front.png",
  "/models/keira/02-three-quarter.png",
  "/models/keira/03-editorial.png",
  "/models/keira/04-profile.png",
  "/models/keira/05-closeup.png",
];

const KEIRA_ATTRIBUTES: ModelAttributes = {
  heightEstimate: "5'11\" (180 cm)",
  bodyType: "Lean athletic",
  build: "Tall, lean athletic frame with narrow shoulders, long neck, and elongated silhouette",
  proportions: "5'11\" proportions — long limbs, balanced torso-to-leg ratio, runway-length leg line",
  faceShape: "Oval to heart-shaped with high cheekbones and a refined, defined jawline",
  skinTone: "Fair, luminous complexion with a dewy natural finish and even undertones",
  hair: "Long vibrant copper-red/auburn hair, voluminous soft waves, parted slightly off-center, past shoulders with warm golden highlights",
  eyes: "Light blue-green (seafoam/hazel), almond-shaped, bright and expressive",
  eyebrows: "Well-defined, natural arch, medium fullness",
  nose: "Straight, slender, refined bridge",
  lips: "Full, natural soft pink/nude finish",
  jawline: "Defined and sharp, elegant profile line",
  makeup: "Natural no-makeup makeup — luminous skin, subtle definition, soft nude lip, minimal eye enhancement",
  distinguishingFeatures:
    "Copper-red hair as signature feature; clear luminous skin; striking light eyes; delicate gold ring on right hand in profile shots; confident direct gaze",
  poseStyle:
    "Effortless confidence, relaxed elegance, modern traveler energy — candid hand-to-hair gestures, three-quarter turns, direct editorial eye contact",
  overallStyle:
    "Luxury redhead supermodel — Vogue editorial, quiet luxury, European sophistication, sporty chic to sophisticated sexy range",
  appearanceSummary:
    "Keira is a luxury redheaded supermodel with a 5'11\" lean athletic build, copper-red wavy hair, light blue-green eyes, fair luminous skin, and refined oval-heart face. She reads ultra-realistic in white luxury studio light with soft natural daylight — effortless confidence, relaxed elegance, and modern traveler energy.",
  campaignTags: [
    "SUPERMODEL: KEIRA",
    "LUXURY_REDHEADED_SUPERMODEL",
    "5'11\" LEAN ATHLETIC BUILD",
    "VOGUE_EDITORIAL",
    "WHITE_LUXURY_STUDIO",
    "SOFT_NATURAL_DAYLIGHT",
    "ULTRA_REALISTIC",
    "SOFT_TAUPE_MONOTONE_WINDOWPANE_PLAID",
  ],
  lookVariations: [
    {
      name: "Sporty Chic",
      description:
        "Hybrid utility travel jacket with concealed zipper front, adjustable waist, subtle tonal plaid performance woven, matching straight-leg travel pant, luxury white designer sneakers.",
    },
    {
      name: "Sophisticated Sexy",
      description:
        "Soft-shoulder blazer with stretch knit side panels, tonal windowpane plaid, elongated silhouette, matching slim travel pant, refined luxury flats.",
    },
    {
      name: "Ultra Modern Comfort",
      description:
        "Minimal trucker-inspired jacket with clean lines, tonal plaid technical fabric, matching slightly flared travel pant, luxury designer sneakers.",
    },
  ],
  designLanguage:
    "Quiet luxury, European sophistication, modern travel wear, comfortable and put together, fluid movement, engineered fit, subtle plaid, tone-on-tone texture, lightweight technical stretch fabric, clean architectural lines, luxury restraint.",
  stylingNotes:
    "Natural makeup, luminous skin, effortless confidence, relaxed elegance, modern traveler energy.",
  photographyDirection:
    "Vogue editorial in white luxury studio, soft natural daylight, ultra-realistic, shallow depth of field, catalog-ready full-body and portrait references.",
  analyzedAt: "2026-06-23T00:00:00.000Z",
};

export const DEFAULT_HUMAN_MODELS: HumanModel[] = [
  {
    id: "keira",
    name: "Keira",
    look: "editorial",
    height: "5'11\"",
    bio: "Luxury redhead supermodel — AI-profiled from real reference photos for Vogue-level product and travel-wear campaigns.",
    tags: [
      "Luxury redhead",
      "Vogue editorial",
      "Quiet luxury",
      "Sporty chic",
      "Travel wear",
      "AI profiled",
    ],
    photos: KEIRA_PHOTOS,
    attributes: KEIRA_ATTRIBUTES,
  },
  {
    id: "jordan-ellis",
    name: "Jordan Ellis",
    look: "commercial",
    height: "6'1\"",
    bio: "Commercial catalog specialist for apparel, footwear, and lifestyle brands.",
    tags: ["Commercial", "Apparel", "Catalog"],
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
    ],
    attributes: {
      heightEstimate: "6'1\" (185 cm)",
      bodyType: "Athletic mesomorph",
      build: "Broad shoulders, toned arms, straight posture",
      proportions: "Long torso, strong jawline, proportional limbs",
      faceShape: "Square-oval",
      skinTone: "Medium tan",
      hair: "Short dark brown, textured crop",
      eyes: "Hazel brown",
      distinguishingFeatures: "Clean-shaven, defined brow ridge",
      poseStyle: "Direct catalog stance, approachable commercial energy",
      overallStyle: "Commercial catalog and lifestyle apparel",
      appearanceSummary:
        "Jordan reads approachable and athletic — ideal for apparel, footwear, and everyday product storytelling.",
      analyzedAt: "2026-06-23T00:00:00.000Z",
    },
  },
  {
    id: "sofia-marquez",
    name: "Sofia Marquez",
    look: "lifestyle",
    height: "5'7\"",
    bio: "Natural lifestyle looks for social campaigns and everyday product storytelling.",
    tags: ["Lifestyle", "Social", "Warm tones"],
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop",
    ],
    attributes: {
      heightEstimate: "5'7\" (170 cm)",
      bodyType: "Average slender",
      build: "Soft curves, natural posture",
      proportions: "Balanced proportions, warm open expression",
      faceShape: "Round-oval",
      skinTone: "Light olive with warm undertones",
      hair: "Chestnut brown, long and wavy",
      eyes: "Green-hazel",
      distinguishingFeatures: "Warm smile, light natural makeup look",
      poseStyle: "Casual lifestyle movement, candid energy",
      overallStyle: "Relatable lifestyle and social-first campaigns",
      appearanceSummary:
        "Sofia feels natural and relatable — perfect for lifestyle scenes and social-first product content.",
      analyzedAt: "2026-06-23T00:00:00.000Z",
    },
  },
  {
    id: "amir-hassan",
    name: "Amir Hassan",
    look: "studio",
    height: "6'0\"",
    bio: "Clean studio framing for tech, accessories, and minimalist product lines.",
    tags: ["Studio", "Minimal", "Tech"],
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop",
    ],
    attributes: {
      heightEstimate: "6'0\" (183 cm)",
      bodyType: "Lean",
      build: "Slim build, sharp lines",
      proportions: "Long limbs, narrow hips, upright posture",
      faceShape: "Angular oval",
      skinTone: "Medium brown",
      hair: "Black, short fade",
      eyes: "Dark brown",
      distinguishingFeatures: "Well-groomed beard stubble, strong cheek structure",
      poseStyle: "Minimal neutral poses, hands visible for product hold",
      overallStyle: "Studio minimalism for tech and accessories",
      appearanceSummary:
        "Amir suits clean studio compositions — sharp features and minimal styling for tech and accessory products.",
      analyzedAt: "2026-06-23T00:00:00.000Z",
    },
  },
  {
    id: "elena-voss",
    name: "Elena Voss",
    look: "athletic",
    height: "5'9\"",
    bio: "Athletic and activewear shoots with dynamic poses and energetic compositions.",
    tags: ["Athletic", "Activewear", "Dynamic"],
    photos: [
      "https://images.unsplash.com/photo-1544717297-fa95b872ee83?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    ],
    attributes: {
      heightEstimate: "5'9\" (175 cm)",
      bodyType: "Athletic",
      build: "Toned arms and legs, strong core",
      proportions: "Dynamic stance-friendly proportions, broad shoulders",
      faceShape: "Heart-shaped",
      skinTone: "Fair with rosy undertones",
      hair: "Blonde, high ponytail or pulled back",
      eyes: "Blue-grey",
      distinguishingFeatures: "Athletic glow, defined jaw",
      poseStyle: "Dynamic movement, mid-action energy",
      overallStyle: "Activewear and performance product campaigns",
      appearanceSummary:
        "Elena brings athletic energy and dynamic posing — built for activewear and performance product lines.",
      analyzedAt: "2026-06-23T00:00:00.000Z",
    },
  },
  {
    id: "liam-okonkwo",
    name: "Liam Okonkwo",
    look: "editorial",
    height: "6'2\"",
    bio: "High-fashion editorial energy for luxury launches and hero campaign imagery.",
    tags: ["Editorial", "Luxury", "Campaign"],
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1521119989659-a585eee76032?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&h=800&fit=crop",
    ],
    attributes: {
      heightEstimate: "6'2\" (188 cm)",
      bodyType: "Tall ectomorph",
      build: "Long limbs, narrow waist, runway proportions",
      proportions: "Extended leg line, elongated silhouette",
      faceShape: "Long oval",
      skinTone: "Deep brown",
      hair: "Black, short textured top",
      eyes: "Dark brown",
      distinguishingFeatures: "Strong bone structure, editorial intensity",
      poseStyle: "High-fashion editorial angles, dramatic stillness",
      overallStyle: "Luxury launches and hero campaign imagery",
      appearanceSummary:
        "Liam has runway proportions and editorial intensity — suited for luxury hero shots and campaign key visuals.",
      analyzedAt: "2026-06-23T00:00:00.000Z",
    },
  },
];

/** @deprecated Use DEFAULT_HUMAN_MODELS or useHumanModels().models */
export const HUMAN_MODELS = DEFAULT_HUMAN_MODELS;

export const HUMAN_MODEL_LOOKS: { value: HumanModelLook | "all"; label: string }[] = [
  { value: "all", label: "All looks" },
  { value: "studio", label: "Studio" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "editorial", label: "Editorial" },
  { value: "athletic", label: "Athletic" },
  { value: "commercial", label: "Commercial" },
];

export function getHumanModelById(id: string, models = DEFAULT_HUMAN_MODELS): HumanModel | undefined {
  return models.find((model) => model.id === id);
}
