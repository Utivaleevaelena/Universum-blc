import type { Locale } from './routes';

// Source: 03-build-kits/block-01-hero/content.json (v01). Strings are copied
// verbatim. Draft statuses are kept visible and are not publication-approved.
export interface HeroContent {
  status: 'draft_from_approved_visual' | 'working_translation_native_review_required';
  nav: { howItWorks: string; whatWeCoordinate: string; experience: string };
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
  /** Accessibility-only labels; not part of content.json (see RESULT.md). */
  a11y: { mainNav: string; languageNav: string };
}

export const content: Record<Locale, HeroContent> = {
  en: {
    status: 'draft_from_approved_visual',
    nav: {
      howItWorks: 'How it works',
      whatWeCoordinate: 'What we coordinate',
      experience: 'Experience',
    },
    eyebrow: 'COMPLEX INTERNATIONAL LOGISTICS',
    title: 'One coordinated route for complex cargo.',
    body: 'We help shape the route, select suitable transport modes and coordinate carriers, permits and customs support.',
    primaryCta: 'Discuss your shipment',
    secondaryCta: 'See how it works',
    trustLine: 'Your personal manager reviews every enquiry · Response within one business day',
    a11y: { mainNav: 'Main navigation', languageNav: 'Language' },
  },
  pl: {
    status: 'working_translation_native_review_required',
    nav: {
      howItWorks: 'Jak działamy',
      whatWeCoordinate: 'Co koordynujemy',
      experience: 'Doświadczenie',
    },
    eyebrow: 'ZŁOŻONA LOGISTYKA MIĘDZYNARODOWA',
    title: 'Jedna skoordynowana trasa dla wymagających ładunków.',
    body: 'Pomagamy opracować trasę, dobrać odpowiednie środki transportu oraz koordynujemy przewoźników, pozwolenia i obsługę celną.',
    primaryCta: 'Omów swoją przesyłkę',
    secondaryCta: 'Zobacz, jak działamy',
    trustLine:
      'Osobisty menedżer analizuje każde zapytanie · Odpowiadamy w ciągu jednego dnia roboczego',
    a11y: { mainNav: 'Nawigacja główna', languageNav: 'Język' },
  },
};

// ───────── Block 02 — Qualifier ─────────
// Source: 03-build-kits/block-02-qualifier/content.json (v01). Strings are copied
// verbatim; EN is the source of meaning, PL is a working translation that still
// needs native review before publication.
export const qualifierScenarioIds = [
  'unusual-dimensions',
  'sensitive-cargo',
  'complex-route',
  'coordination',
  'permits-customs',
] as const;
export type QualifierScenarioId = (typeof qualifierScenarioIds)[number];

export interface QualifierContent {
  status: 'draft_from_approved_visual' | 'working_translation_native_review_required';
  title: string;
  body: string;
  /** Exactly five scenarios, in the approved order. */
  scenarios: readonly [
    QualifierScenario,
    QualifierScenario,
    QualifierScenario,
    QualifierScenario,
    QualifierScenario,
  ];
}

export interface QualifierScenario {
  id: QualifierScenarioId;
  label: string;
}

export const qualifierContent: Record<Locale, QualifierContent> = {
  en: {
    status: 'draft_from_approved_visual',
    title: 'When standard transport is not enough',
    body: 'You do not need a complete transport plan to start the conversation.',
    scenarios: [
      { id: 'unusual-dimensions', label: 'Unusual dimensions or weight' },
      { id: 'sensitive-cargo', label: 'High-value or technically sensitive cargo' },
      { id: 'complex-route', label: 'A route that is not straightforward' },
      { id: 'coordination', label: 'Several parties to coordinate' },
      { id: 'permits-customs', label: 'Permits or customs context' },
    ],
  },
  pl: {
    status: 'working_translation_native_review_required',
    title: 'Gdy standardowy transport nie wystarcza',
    body: 'Nie potrzebujesz kompletnego planu transportu, aby rozpocząć rozmowę.',
    scenarios: [
      { id: 'unusual-dimensions', label: 'Nietypowe wymiary lub masa' },
      { id: 'sensitive-cargo', label: 'Ładunek o wysokiej wartości lub wrażliwy technicznie' },
      { id: 'complex-route', label: 'Trasa, która nie jest oczywista' },
      { id: 'coordination', label: 'Wiele stron do skoordynowania' },
      { id: 'permits-customs', label: 'Pozwolenia lub kontekst celny' },
    ],
  },
};

// ───────── Block 03 — Route Mechanism ─────────
// Source: 03-build-kits/block-03-route-mechanism/content.json (v01). Strings are
// copied verbatim; EN is the source of meaning, PL is a working translation that
// still needs native review before publication.
export const routeMechanismStageIds = [
  'task-context',
  'constraints-timing',
  'route-logic',
  'modes-parties-formalities',
  'agreed-next-step',
] as const;
export type RouteMechanismStageId = (typeof routeMechanismStageIds)[number];

export interface RouteMechanismStage {
  id: RouteMechanismStageId;
  label: string;
}

export interface RouteMechanismContent {
  status: 'draft_from_approved_visual' | 'working_translation_native_review_required';
  title: string;
  body: string;
  /** Exactly five stages, in the approved order. */
  stages: readonly [
    RouteMechanismStage,
    RouteMechanismStage,
    RouteMechanismStage,
    RouteMechanismStage,
    RouteMechanismStage,
  ];
}

export const routeMechanismContent: Record<Locale, RouteMechanismContent> = {
  en: {
    status: 'draft_from_approved_visual',
    title: 'From context to a working route',
    body: 'We turn available context into route logic and an agreed next step — not an instant quote.',
    stages: [
      { id: 'task-context', label: 'Task context' },
      { id: 'constraints-timing', label: 'Constraints & timing' },
      { id: 'route-logic', label: 'Route logic' },
      { id: 'modes-parties-formalities', label: 'Modes, parties & formalities' },
      { id: 'agreed-next-step', label: 'Agreed next step' },
    ],
  },
  pl: {
    status: 'working_translation_native_review_required',
    title: 'Od kontekstu do roboczego planu trasy',
    body: 'Przekładamy dostępny kontekst na logikę trasy i uzgodniony kolejny krok — nie na natychmiastową wycenę.',
    stages: [
      { id: 'task-context', label: 'Kontekst zadania' },
      { id: 'constraints-timing', label: 'Ograniczenia i terminy' },
      { id: 'route-logic', label: 'Logika trasy' },
      { id: 'modes-parties-formalities', label: 'Środki transportu, strony i formalności' },
      { id: 'agreed-next-step', label: 'Uzgodniony kolejny krok' },
    ],
  },
};

// ───────── Block 04 — Coordination Scope ─────────
// Source: 03-build-kits/block-04-coordination-scope/content.json (v01). Strings are
// copied verbatim; EN is the source of meaning, PL is a working translation that
// still needs native review before publication.
export const coordinationScopeWorkstreamIds = [
  'route-logic',
  'suitable-modes',
  'carrier-party-coordination',
  'permits-customs-support',
] as const;
export type CoordinationScopeWorkstreamId = (typeof coordinationScopeWorkstreamIds)[number];

export interface CoordinationScopeWorkstream {
  id: CoordinationScopeWorkstreamId;
  label: string;
  description: string;
}

export interface CoordinationScopeContent {
  status: 'draft_from_approved_visual' | 'working_translation_native_review_required';
  title: string;
  body: string;
  scopeNote: string;
  /** Exactly four workstreams, in the approved order. */
  workstreams: readonly [
    CoordinationScopeWorkstream,
    CoordinationScopeWorkstream,
    CoordinationScopeWorkstream,
    CoordinationScopeWorkstream,
  ];
}

export const coordinationScopeContent: Record<Locale, CoordinationScopeContent> = {
  en: {
    status: 'draft_from_approved_visual',
    title: 'What Universum coordinates',
    body: 'Four workstreams. One coordinated route.',
    scopeNote:
      'We coordinate the route and work with suitable carriers and parties. Transport modes are selected for the task, not presented as Universum-owned assets.',
    workstreams: [
      {
        id: 'route-logic',
        label: 'Route logic',
        description: 'Shape a workable route around the cargo, constraints and timing.',
      },
      {
        id: 'suitable-modes',
        label: 'Suitable transport modes',
        description: 'Identify transport modes that fit the route without implying an owned fleet.',
      },
      {
        id: 'carrier-party-coordination',
        label: 'Carrier & party coordination',
        description: 'Align carriers, involved parties and handoff points around one plan.',
      },
      {
        id: 'permits-customs-support',
        label: 'Permits & customs support',
        description: 'Coordinate the permit and customs context connected with the route.',
      },
    ],
  },
  pl: {
    status: 'working_translation_native_review_required',
    title: 'Co koordynuje Universum',
    body: 'Cztery obszary działań. Jedna skoordynowana trasa.',
    scopeNote:
      'Koordynujemy trasę i współpracujemy z odpowiednimi przewoźnikami oraz stronami. Środki transportu są dobierane do zadania, a nie przedstawiane jako własne zasoby Universum.',
    workstreams: [
      {
        id: 'route-logic',
        label: 'Logika trasy',
        description:
          'Opracowanie roboczej logiki trasy z uwzględnieniem ładunku, ograniczeń i terminów.',
      },
      {
        id: 'suitable-modes',
        label: 'Odpowiednie środki transportu',
        description: 'Dobór środków transportu odpowiednich do trasy — bez sugerowania własnej floty.',
      },
      {
        id: 'carrier-party-coordination',
        label: 'Koordynacja przewoźników i stron',
        description:
          'Koordynacja przewoźników, uczestników i punktów przekazania w ramach jednego planu.',
      },
      {
        id: 'permits-customs-support',
        label: 'Wsparcie w zakresie pozwoleń i odprawy celnej',
        description:
          'Koordynacyjne wsparcie w obszarze pozwoleń i odprawy celnej związanych z trasą.',
      },
    ],
  },
};

// ───────── Block 05 — Human Anchor (vlad-experience) ─────────
// Source: 03-build-kits/block-05-vlad-experience/content.json v01.

export const vladExperienceProofIds = [
  'maritime-port',
  'international-coordination',
  'enquiry-clarification',
] as const;
export type VladExperienceProofId = (typeof vladExperienceProofIds)[number];

export interface VladExperienceProof {
  id: VladExperienceProofId;
  label: string;
}

export interface VladExperienceContent {
  status: 'draft_from_approved_visual' | 'working_translation_native_review_required';
  eyebrow: string;
  title: string;
  name: string;
  role: string;
  /** Exactly three proofs, in the approved order. */
  proofs: readonly [VladExperienceProof, VladExperienceProof, VladExperienceProof];
  transitionLabel: string;
  portraitAlt: string;
}

export const vladExperienceContent: Record<Locale, VladExperienceContent> = {
  en: {
    status: 'draft_from_approved_visual',
    eyebrow: 'Experience behind the conversation',
    title: 'Complex routes still need one accountable person.',
    name: 'Vladislav Slobodenyuk',
    role: 'Logistics manager',
    proofs: [
      { id: 'maritime-port', label: 'Maritime and port operations background' },
      { id: 'international-coordination', label: 'International, multi-party coordination' },
      { id: 'enquiry-clarification', label: 'Enquiry review and clarification' },
    ],
    transitionLabel: 'See what happens after you send the context',
    portraitAlt: 'Portrait of Vladislav Slobodenyuk, logistics manager.',
  },
  pl: {
    status: 'working_translation_native_review_required',
    eyebrow: 'Doświadczenie po drugiej stronie rozmowy',
    title: 'Złożone trasy nadal potrzebują jednej odpowiedzialnej osoby.',
    name: 'Vladislav Slobodenyuk',
    role: 'Menedżer ds. logistyki',
    proofs: [
      { id: 'maritime-port', label: 'Doświadczenie w operacjach morskich i portowych' },
      { id: 'international-coordination', label: 'Międzynarodowa koordynacja wielu stron' },
      { id: 'enquiry-clarification', label: 'Analiza zapytania i doprecyzowanie szczegółów' },
    ],
    transitionLabel: 'Zobacz, co wydarzy się po przesłaniu kontekstu',
    portraitAlt: 'Portret Vladislava Slobodenyuka, menedżera ds. logistyki.',
  },
};
