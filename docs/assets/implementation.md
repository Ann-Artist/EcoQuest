# EcoQuest — Detailed Implementation Plan

**Gamified Personal Carbon Footprint AI**
Architecture · Data Model · API Design · Module Plan · Timeline · UI Direction

Prototype Scope: Pune-focused responsive web application
*Measure · Play · Compete · Reduce*

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Scope & Objectives](#2-project-scope--objectives)
3. [System Architecture](#3-system-architecture)
4. [Database Design](#4-database-design)
5. [API Design](#5-api-design)
6. [Module-by-Module Implementation Plan](#6-module-by-module-implementation-plan)
7. [Core User Journey & System Loop](#7-core-user-journey--system-loop)
8. [Verification & Anti-Cheat (EcoGuard) Flow](#8-verification--anti-cheat-ecoguard-flow)
9. [Gamification Logic](#9-gamification-logic)
10. [AI Personalization Approach](#10-ai-personalization-approach)
11. [Technology Stack](#11-technology-stack)
12. [Implementation Timeline](#12-implementation-timeline)
13. [Suggested Team Roles](#13-suggested-team-roles)
14. [Testing Strategy](#14-testing-strategy)
15. [Deployment Plan](#15-deployment-plan)
16. [Risks & Mitigations](#16-risks--mitigations)
17. [Future Scope (Beyond Prototype)](#17-future-scope-beyond-prototype)
18. [UI Theme Suggestions](#18-ui-theme-suggestions)
19. [Summary](#19-summary)

---

## 1. Executive Summary

EcoQuest is an AI-powered, gamified web platform that converts a user's real-world lifestyle into a personalized sustainability game. Instead of behaving like a one-time carbon calculator, it establishes a continuous loop: **Register → Personalize → Calculate → Analyze → Recommend → Challenge → Verify → Reward → Compete → Re-personalize → Repeat**.

This document translates the project's functional specification and technology stack into an actionable, build-ready implementation plan. It defines the system architecture, data model, API surface, module-by-module build plan, verification and anti-cheat logic, gamification mechanics, a phased delivery timeline, and a set of distinct UI theme directions the team can use as visual references for prototyping.

> **Prototype boundary:** a Pune-focused, responsive web application. Native mobile apps, geographic expansion, an Eco Marketplace, and real government/partner reward integrations are explicitly out of scope for the MVP and are captured as future scope in Section 17.

### 1.1 Core Loop

Measure → Understand → Get Personalized Challenges → Complete → Verify → Earn EcoXP → Level Up → Compete → Reduce → Repeat

### 1.2 What This Plan Covers

- System architecture and how the frontend, backend, AI layer, and Supabase platform interact.
- A relational data model covering users, carbon data, challenges, verification, gamification, and rewards.
- A REST API surface mapped to each functional module.
- An 11-module build plan (Auth through Admin) with scope, tasks, and dependencies.
- Verification levels and the EcoGuard anti-cheat flow.
- Gamification mechanics: EcoXP, levels, streaks, badges.
- A realistic, phased ~19-week delivery timeline (compressible for a hackathon sprint).
- Testing, deployment, and risk mitigation approach.
- Distinct, ready-to-prototype UI theme directions with palettes, type systems, and layout structures.

---

## 2. Project Scope & Objectives

### 2.1 Problem Statement

Generic carbon calculators follow a shallow pattern: enter information, calculate CO2, show a result, give generic recommendations. Users check once and rarely return, so awareness rarely converts into sustained behavior change.

### 2.2 Objective

Use AI and gamification to motivate users toward continuous, verifiable, sustainable lifestyle choices and to measure the resulting estimated environmental impact — combining ClimateTech, AI, Gamification, and Social Competition into a single retention loop.

### 2.3 Target Users

| Segment | Primary Motivators | Design Implication |
|---|---|---|
| Children / Teens | Simple achievement-oriented tasks (lights off, plastic avoidance, plant care) | Simplified UI, larger touch targets, badge-forward feedback |
| Gen Z / Young Adults | Leaderboards, streaks, friend challenges, social sharing | Competitive dashboard, shareable achievement cards |
| Adults | Transportation, electricity, waste, food, shopping categories | Data-dense dashboard, category breakdowns |
| Older Users | Waste segregation, tree care, community activity, energy conservation | Higher-contrast, low-clutter, larger type |

*Age group is one personalization input, not an access restriction — all users can attempt any relevant challenge.*

### 2.4 In-Scope for the Prototype (MVP)

- Responsive web app (Next.js + React), Supabase Auth-based signup/login.
- Eco profile: age group, Pune location, lifestyle questionnaire.
- Carbon calculator across transport, electricity, food, shopping, waste.
- AI-driven hotspot analysis, Green Persona assignment, and recommendations.
- Daily/weekly challenge engine with EcoXP, levels, badges, streaks.
- Self-report, photo-proof (AI-assisted), and one GPS-based verification flow.
- Pune/friends leaderboard and shareable achievement cards.
- CO2 impact dashboard and AI weekly report.
- Reward Campaign Simulation (eligibility logic, no real payouts).
- Basic admin dashboard for challenges, verification queue, and rewards.

### 2.5 Out-of-Scope (Future Work)

- Native Android/iOS apps.
- Geographic expansion beyond Pune.
- Eco Marketplace and real government/partner reward integrations.
- Always-on background GPS / automatic vehicle tracking.
- Wearable/health integrations and large institutional dashboards.

---

## 3. System Architecture

EcoQuest follows a layered architecture: a Next.js/React frontend calls a FastAPI backend over REST/JSON; the backend hosts the Carbon Engine, AI Personalization Engine, Game Engine, Verification Service, and EcoGuard anti-cheat engine; and Supabase provides PostgreSQL, Auth, and Storage. Maps/GPS and an LLM API are consumed as external services.

![EcoQuest System Architecture](assets/architecture.png)
*Figure 1 — EcoQuest System Architecture*

### 3.1 Layer Responsibilities

| Layer | Responsibility |
|---|---|
| Frontend (Next.js + React + Tailwind + Framer Motion) | Onboarding, dashboard, challenge UI, verification uploads, leaderboard, animations for XP/level/badge events |
| Backend API (FastAPI) | Auth-guarded REST endpoints; orchestrates carbon calc, AI, game logic, and verification |
| Carbon Engine (Python) | Deterministic emission-factor calculations across 5 categories |
| AI Personalization Engine (Scikit-learn + LLM API) | Hotspot detection, persona assignment, challenge recommendation, natural-language reports |
| Verification Service (OpenCV/YOLO + GPS rules) | Validates proof submissions per verification level |
| EcoGuard | Flags duplicate/suspicious submissions and abnormal activity for review |
| Supabase (PostgreSQL + Auth + Storage) | System of record for users, activities, XP, badges, rankings; auth; proof image storage |
| External Services (Maps/GPS API, LLM API) | Route/location verification and generative personalization text |

### 3.2 Design Principles

- **Stateless API layer** — all game/user state persisted in PostgreSQL, enabling horizontal scaling of FastAPI workers.
- **Separation of estimated CO2 impact from EcoXP** — game progression and environmental estimates are tracked independently, never conflated.
- **AI as a recommender, not an oracle** — the AI selects from controlled challenge/content options rather than inventing arbitrary environmental claims.
- **Verification proportional to risk** — low-stakes actions stay low-friction (self-report); high-value actions require proof.

---

## 4. Database Design

The prototype uses Supabase PostgreSQL. The core entities mirror the functional spec's module boundaries: identity, carbon data, challenges/verification, and gamification/rewards.

![Entity Relationship Diagram](assets/er_diagram.png)
*Figure 2 — Simplified Entity Relationship Diagram*

### 4.1 Core Tables

| Table | Purpose |
|---|---|
| Users | Identity record linked to Supabase Auth |
| Profiles | Age group, Pune location, sustainability interests, current persona |
| Carbon_Activities | Raw lifestyle-assessment inputs by category |
| Carbon_Results | Calculated footprint snapshots over time (kg CO2e/month) |
| Challenges | Challenge catalog: category, difficulty, XP value, verification type |
| Challenge_Completions | Per-user attempt/status record (Active, Completed, Expired, Rejected) |
| Proof_Submissions | Image URL / GPS coordinates / timestamp / AI verdict per completion |
| XP_Transactions | Append-only ledger of EcoXP awards (source, amount, timestamp) |
| Levels | Level thresholds and titles (Eco Seedling → Planet Champion) |
| Badges / User_Badges | Badge catalog and per-user unlock records |
| Streaks | Current streak, best streak, last-activity date per user |
| Leaderboards | Materialized ranking per scope (friends, Pune, college, age group) |
| Reward_Campaigns | Campaign rules: XP/streak/verified-action thresholds, eligibility window |

### 4.2 Key Data Rules

- XP_Transactions is append-only and is the source of truth for a user's total EcoXP (sum of amounts) — never store a mutable running total as the only record.
- Carbon_Results keeps historical snapshots so "before/after" comparisons (e.g., 182 kg → 160 kg CO2e) and the Impact Dashboard can be computed without recalculating history.
- Proof_Submissions stores the AI verdict and confidence separately from the final human/system decision, so EcoGuard and admin review remain auditable.
- Leaderboards can be a materialized view refreshed on a schedule (e.g., every few minutes) rather than computed live, to keep read latency low.

---

## 5. API Design

The FastAPI backend exposes a versioned REST surface (`/api/v1`). Below is the core endpoint set derived directly from the functional spec, grouped by module.

### 5.1 Core Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/auth/signup`, `/auth/login` | POST | Handled via Supabase Auth (frontend SDK); backend validates JWT on protected routes |
| `/profile/onboarding` | POST | Submit age group, Pune location, interests |
| `/lifestyle/assessment` | POST | Submit transport/electricity/food/shopping/waste inputs |
| `/calculate-carbon` | POST | Run Carbon Engine, return category breakdown + total kg CO2e |
| `/ai/analysis` | GET | Return hotspot priorities (HIGH/MEDIUM/LOW) and persona |
| `/challenges` | GET | List personalized available/active/completed challenges |
| `/challenge/accept` | POST | Move a challenge from Available → Active |
| `/challenge/complete` | POST | Mark a challenge complete (self-report or trigger proof flow) |
| `/verify-proof` | POST | Upload photo/GPS proof; returns Approved / Needs Review / Rejected |
| `/challenge/cant-do` | POST | Submit a reason (too difficult, no time, etc.); AI returns an alternative |
| `/user/progress` | GET | EcoXP, level, streak, badges summary |
| `/leaderboard` | GET | Ranked list by scope (friends, Pune, college, age group, weekly/monthly) |
| `/impact/dashboard` | GET | Footprint history, estimated CO2 avoided, category improvements |
| `/reports/weekly` | GET | AI-generated weekly sustainability summary |
| `/rewards/eligibility` | GET | Current campaign eligibility status |
| `/admin/challenges` | POST/PUT/DELETE | Create, edit, activate/deactivate challenges |
| `/admin/verification-queue` | GET/POST | Review flagged or pending proof submissions |
| `/admin/reward-campaigns` | POST | Create/manage reward campaigns |

### 5.2 API Conventions

- JWT bearer auth (Supabase-issued) on all routes except public landing content.
- Consistent envelope: `{ data, error, meta }` on every response for predictable frontend handling.
- Idempotent challenge-completion calls — resubmitting the same `completion_id` should not double-award XP.
- Rate limiting on `/verify-proof` and `/challenge/complete` to support EcoGuard's abnormal-activity detection.

---

## 6. Module-by-Module Implementation Plan

The build is organized into eleven modules matching the functional specification. Each can be assigned to a sub-team and built largely in parallel once the Foundation phase (auth, schema, design system) is complete.

### 6.1 Authentication

Signup, login, session management, and basic profile record creation via Supabase Auth.

- **Key build tasks:** Configure Supabase Auth (email + optional OAuth) · JWT validation middleware in FastAPI · Protected route guards in Next.js
- **Primary tech:** Supabase Auth, Next.js middleware, FastAPI dependency injection

### 6.2 Eco Onboarding

First-time flow that collects username, age group, Pune location, and sustainability interests before any challenge appears.

- **Key build tasks:** Multi-step onboarding UI · Age-group-aware copy/presentation branching · Persist to Profiles table
- **Primary tech:** Next.js form flow, Supabase PostgreSQL

### 6.3 Carbon Calculator

Lifestyle assessment across transportation, electricity, food, shopping, and waste, feeding the Python Carbon Engine.

- **Key build tasks:** Build category-wise question sets · Implement `Carbon Emission = Activity Amount x Emission Factor` · Return breakdown + biggest-opportunity category
- **Primary tech:** FastAPI, Python, NumPy/Pandas, Carbon_Activities & Carbon_Results tables

### 6.4 AI Analysis & Green Persona

Analyzes profile, footprint, hotspots, history, and interests to assign HIGH/MEDIUM/LOW priority areas and a persona (Eco Beginner → Planet Champion).

- **Key build tasks:** Rule-based hotspot scoring as v1 baseline · Scikit-learn segmentation model as v2 enhancement · LLM API call for natural-language rationale, constrained to validated data
- **Primary tech:** Python, Scikit-learn, LLM API

### 6.5 Challenge Engine

Generates and manages daily, weekly, monthly, and seasonal challenges tailored to each user's hotspots.

- **Key build tasks:** Challenge catalog CRUD (admin-authored) · Personalization/selection logic · Accept → Active → Complete state machine · "Can't Do This" alternate-challenge flow
- **Primary tech:** FastAPI, Challenges & Challenge_Completions tables

### 6.6 Verification (Self-report / Photo / GPS)

Three verification levels matched to challenge risk, including AI image checks and route/location analysis.

- **Key build tasks:** Photo upload to Supabase Storage · OpenCV/YOLO relevance + duplicate checks · GPS start/end-trip capture and route validation · Approved / Needs Review / Rejected outcome handling
- **Primary tech:** OpenCV/YOLO, Maps/GPS API, Supabase Storage

### 6.7 Gamification (EcoXP, Levels, Badges, Streaks)

The core progression system: XP awards, level-ups, badge unlocks, and streak tracking with adaptive difficulty.

- **Key build tasks:** XP_Transactions ledger + level-threshold engine · Badge-condition evaluation on each completion · Streak calculation with configurable recovery rules · Adaptive difficulty tiers (Beginner/Intermediate/Advanced)
- **Primary tech:** FastAPI, PostgreSQL, Framer Motion/GSAP for reward animations

### 6.8 Social (Leaderboards & Sharing)

Friends, Pune, college, and age-group leaderboards plus shareable achievement cards.

- **Key build tasks:** Materialized leaderboard view + scheduled refresh · Rank-change notifications · Shareable achievement-card image generation
- **Primary tech:** PostgreSQL, Recharts/Chart.js

### 6.9 Impact (CO2 Dashboard & AI Weekly Report)

Tracks environmental impact alongside game progress and generates a personalized weekly summary.

- **Key build tasks:** Before/after footprint comparison views · Category-level improvement charts · LLM-generated weekly report constrained to real completion/XP data
- **Primary tech:** Recharts/Chart.js, LLM API

### 6.10 Rewards

Reward Campaign Simulation: monthly/quarterly/yearly eligibility based on configurable thresholds.

- **Key build tasks:** Campaign rule engine (XP + streak + verified-action thresholds) · Eligibility status endpoint · Admin campaign authoring UI
- **Primary tech:** FastAPI, Reward_Campaigns table

### 6.11 Admin Dashboard

Operational console for content, verification, and rewards management.

- **Key build tasks:** Challenge CRUD with XP/difficulty/verification-type config · Verification & EcoGuard review queue · Reward campaign authoring · Pune-level participation analytics
- **Primary tech:** Next.js admin routes, role-gated FastAPI endpoints

---

## 7. Core User Journey & System Loop

The functional spec's end-to-end loop maps directly to the module boundaries above. This is the reference flow to validate against during integration testing and the hackathon demo.

![Complete User Journey / System Loop](assets/user_loop.png)
*Figure 3 — Complete User Journey / System Loop*

---

## 8. Verification & Anti-Cheat (EcoGuard) Flow

Verification effort scales with challenge risk. Every path — self-reported, GPS/route, or photo proof — passes through EcoGuard before a final Approved/Rejected outcome, and flagged cases route to an admin review queue rather than an automatic ban.

![Verification & EcoGuard Anti-Cheat Flow](assets/verification_flow.png)
*Figure 4 — Verification & EcoGuard Anti-Cheat Flow*

### 8.1 Verification Levels

| Level | Used For | Mechanism |
|---|---|---|
| 1 — Self-Reported | Low-risk actions (e.g., switching off unused lights) | User confirmation only |
| 2 — Smart Verification | Medium-risk actions with available signals | GPS, route info, timestamp, optional ticket/QR |
| 3 — Proof Required | High-value actions (e.g., tree planting) | Photo + location + timestamp, AI-checked |

### 8.2 EcoGuard Signals

- Duplicate image detection across a user's submission history.
- Suspicious timestamp patterns (e.g., dozens of submissions in minutes after a normal 1-2/day pace).
- Location inconsistencies between claimed activity and GPS/photo metadata.
- Repeated or near-identical proof submissions.

> **Outcome policy:** rejected proof yields 0 XP and a failed challenge, not an immediate ban; repeated suspicious activity can trigger account-level restrictions, escalated through admin review.

---

## 9. Gamification Logic

### 9.1 EcoXP Values (Configurable by Admin)

| Action Type | Example XP |
|---|---|
| Simple challenge | +30 XP |
| Recycling challenge | +50 XP |
| Public transport challenge | +100 XP |
| Tree-care challenge | +100 XP |
| Community cleanup | +150 XP |
| Weekly challenge | +200 XP |

### 9.2 Level Progression

| Level | Title |
|---|---|
| 1 | Eco Seedling |
| 2 | Green Sprout |
| 3 | Eco Explorer |
| 4 | Eco Guardian |
| 5 | Eco Warrior |
| 6 | Planet Champion |

*Example: 1,000 XP crosses the Level 4 (Eco Guardian) threshold, unlocking new challenge types, higher difficulty tiers, and additional badge opportunities.*

### 9.3 Streaks & Adaptive Difficulty

- Streaks increment on consecutive days with at least one completed/verified challenge (e.g., a 5-Day or 12-Day Eco Streak).
- An optional recovery rule (e.g., one grace day per week) can be configured to avoid punishing minor lapses.
- Difficulty adapts with level: Beginner (lights, segregation, plastic reduction) → Intermediate (multi-trip/multi-day challenges) → Advanced (30-day goals, multiple verified activities).

### 9.4 Badges (Examples)

- Green Commuter — low-carbon transportation challenges.
- Waste Warrior — waste-related challenges.
- Tree Guardian — plant/tree activities.
- Streak Master — long sustainability streak.
- Eco Champion — high EcoXP level.

---

## 10. AI Personalization Approach

### 10.1 Inputs

User profile, age group, lifestyle assessment, calculated footprint, high-emission categories, challenge/completion history, difficulty preference, and stated interests.

### 10.2 Recommendation Logic (Example Rules)

- High transportation emissions → Green Commute: public transport, walking, or cycling for 3 trips.
- High electricity emissions → Power Saver: reduce unnecessary electricity usage for 5 consecutive days.
- High waste emissions → Waste Warrior: properly segregate household waste for 7 days.

### 10.3 Recommended Build Approach

- **V1 (prototype):** deterministic rule-based hotspot scoring (highest-emission category = HIGH priority) — fast to build, fully explainable, ideal for a hackathon demo.
- **V2:** Scikit-learn based user segmentation/clustering to refine persona assignment and challenge ranking as usage data accumulates.
- **LLM API layer:** used only for natural-language framing (weekly reports, tips, challenge descriptions) on top of validated structured data — not for inventing emission figures or unverified claims.

### 10.4 Re-personalization

The AI Weekly Report and re-personalization step compare previous vs. new behavior, challenge performance, and skipped/failed challenges. Example: once transportation improves and electricity becomes the new hotspot, future challenges shift accordingly.

---

## 11. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js + React | Main responsive web application |
| UI / Styling | Tailwind CSS | Responsive, modern interface |
| Gamification UI | Framer Motion / GSAP | XP animations, level-ups, badges, streak interactions |
| Backend API | FastAPI + Python | Carbon, challenges, users, XP, leaderboards, rewards |
| Database | Supabase PostgreSQL | Users, activities, carbon data, XP, badges, rankings |
| Authentication | Supabase Auth | Secure signup/login |
| AI / ML | Python + Scikit-learn + LLM API | Personalization, recommendations, challenge generation |
| Carbon Engine | Python | Estimated CO2 calculations |
| Proof Verification | OpenCV / Vision Model (YOLO) | Analyze proof images |
| Location / GPS | Maps API | Location-based verification |
| Charts | Recharts / Chart.js | Progress and impact visualization |
| Storage | Supabase Storage | Proof image storage |
| Cloud / Deployment | Vercel + Render/Railway | Frontend and backend deployment |
| Version Control | Git + GitHub | Collaboration and source control |

---

## 12. Implementation Timeline

An indicative ~19-week plan for a small team building the full MVP. For a hackathon, compress to a 3-7 day sprint by cutting each phase to its highest-impact slice (see Section 12.2).

![Indicative Implementation Timeline](assets/timeline.png)
*Figure 5 — Indicative Implementation Timeline*

### 12.1 Phase Breakdown

| Phase | Duration | Key Deliverables |
|---|---|---|
| 1. Foundation & Setup | 2 wks | Repo, CI/CD, Supabase project, auth, base schema, Tailwind design system |
| 2. Onboarding & Carbon Engine | 3 wks | Eco profile, lifestyle survey, carbon calculator, footprint result screen |
| 3. AI Personalization & Persona | 2.5 wks | Hotspot scoring, persona logic, LLM-generated rationale |
| 4. Challenge & Gamification Engine | 3 wks | Challenge catalog, accept/complete flow, EcoXP, levels, badges, streaks |
| 5. Verification & EcoGuard | 3 wks | Photo/GPS proof upload, CV checks, anti-cheat rules, review queue |
| 6. Social, Impact & Rewards | 2.5 wks | Leaderboards, sharing cards, CO2 dashboard, weekly report, reward simulation |
| 7. Admin Dashboard | 1.5 wks | Challenge/verification/reward management console |
| 8. QA, Polish & Demo Prep | 2 wks | Cross-device testing, animation polish, seeded demo data, pitch flow |

### 12.2 Hackathon-Compressed Track (Optional)

- **Day 1:** Auth, onboarding, carbon calculator with hardcoded emission factors.
- **Day 2:** Rule-based AI hotspot + persona, challenge catalog (seeded), accept/complete flow.
- **Day 3:** EcoXP/levels/badges/streaks, self-report + one photo-proof verification path.
- **Day 4:** Leaderboard, CO2 dashboard, weekly report (can be templated, not fully generative).
- **Day 5:** Reward simulation, minimal admin view, polish, and demo script (Gen Z Pune-student scenario).

---

## 13. Suggested Team Roles

For a small team (hackathon or early-stage build), roles can be split as follows; several can be combined for teams smaller than five.

| Role | Owns |
|---|---|
| Frontend Engineer | Next.js/React app, Tailwind design system, Framer Motion interactions |
| Backend Engineer | FastAPI services, API contracts, auth middleware, Supabase schema |
| AI/ML Engineer | Carbon engine logic, hotspot/persona model, LLM prompt design, CV verification |
| Product / UX | Flow design, copy, onboarding, UI theme selection and consistency |
| QA / Demo Lead | Cross-device testing, seeded demo data, pitch/demo script |

---

## 14. Testing Strategy

### 14.1 Test Layers

- Unit tests: carbon calculation formulas, XP/level threshold logic, badge-condition evaluation.
- Integration tests: challenge accept → complete → verify → XP award pipeline; auth-guarded endpoints.
- AI/verification tests: fixed sample image set for CV relevance checks; rule-based hotspot outputs against known lifestyle inputs.
- EcoGuard tests: simulate duplicate submissions and rapid-fire activity to confirm flagging thresholds trigger correctly.
- End-to-end tests: full onboarding → challenge → reward loop on the primary demo persona.
- Manual QA: cross-device/responsive checks (mobile-first, since most Pune users will be on phones).

### 14.2 Data & Environments

- Seeded demo dataset: 1-2 sample users at different levels/personas for reliable, repeatable demos.
- Separate Supabase projects (or schemas) for development, staging, and demo.

---

## 15. Deployment Plan

| Component | Platform | Notes |
|---|---|---|
| Frontend (Next.js) | Vercel | Preview deployments per PR; production on main branch |
| Backend (FastAPI) | Render or Railway | Containerized deployment; environment secrets for Supabase/LLM keys |
| Database / Auth / Storage | Supabase | Managed PostgreSQL, Auth, and Storage buckets for proof images |
| Version Control / CI | GitHub + GitHub Actions | Lint/test on PR; auto-deploy on merge to main |

*Recommended safeguards: environment-scoped API keys, row-level security (RLS) policies in Supabase scoping each user to their own rows, and signed URLs for proof image access.*

---

## 16. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Users game the XP system | EcoGuard anti-cheat checks; risk-proportional verification; ledger-based (not editable) XP transactions |
| AI recommendations feel generic or inaccurate | Start with explainable rule-based hotspot logic; use LLM only for phrasing, not for facts/figures |
| Carbon estimates mistaken for precise measurement | Clearly label all figures as estimates; document the emission-factor methodology used |
| Photo verification is unreliable at prototype stage | Keep CV checks as an assist (relevance/duplicate detection), not a sole gate; allow admin override |
| Scope creep beyond MVP | Enforce the Section 2.5 out-of-scope list; track future-scope requests separately |
| Low day-2 retention | Streaks, weekly reports, and re-personalization are prioritized early, not left to the end |

---

## 17. Future Scope (Beyond Prototype)

- Native Android and iOS applications.
- Geographic expansion: Pune → other cities → states → nationwide, with location-specific emission factors.
- Eco Marketplace for partner rewards and benefits.
- Real government/municipal reward-program integrations.
- Automatic background vehicle/mobility tracking.
- Wearable and health-app integrations (steps, cycling, fitness data).
- Institutional dashboards for colleges and companies at scale.
- Broader partner ecosystem: CSR organizations, brands, and sustainability partners.

---

## 18. UI Theme Suggestions

Four distinct, ready-to-prototype theme directions are proposed below. Each targets a different emotional register while staying within the same information architecture (onboarding → dashboard → challenges → verification → leaderboard → reports), so screens can be mixed, tested with users, or blended. Use these as a starting reference for Figma/UI sample templates.

![Palette Reference Across All Four Themes](assets/swatches.png)
*Figure 6 — Palette Reference Across All Four Themes*

### 18.1 Living Forest — Organic & Grounded

**Mood:** Calm, trustworthy, nature-documentary. Feels like a national-park guide crossed with a habit tracker.
**Best fit:** Adults and older users who want the app to feel calm, credible, and low-pressure.

**Palette:** Deep forest `#0F3D2E`, canopy green `#1F6E43`, sage `#8FD19E`, warm sand `#F4E9D8`, clay accent `#D98E3B`

**Typography**
- Headings: a warm humanist serif or serif-adjacent display face (e.g., Fraunces / Source Serif) for a natural, editorial feel.
- Body/UI: a clean grotesque sans (e.g., Inter / General Sans) for legibility.

**Layout & Structure**
- Soft, organic card shapes (large border-radius, occasional blob/leaf-shaped SVG backgrounds behind hero stats).
- Illustration-forward: line-art icons of leaves, transit, water drops, waste bins per category.
- Dashboard uses a single large "canopy" hero card (persona + footprint) above a 2-column grid of category cards.

**Signature Screens to Prototype**
- Onboarding: full-bleed illustrated Pune skyline with a warm welcome card.
- Carbon result screen: a circular "canopy ring" chart with category petals.
- Weekly report: a letter-style card styled like a nature journal entry.

### 18.2 Neo Eco Arcade — Bold & Competitive

**Mood:** High-energy, gamer-app-adjacent (Duolingo/Discord energy). Feels like leveling up in a game, not filling out a form.
**Best fit:** Gen Z / young adults who respond to leaderboards, streaks, and social sharing.

**Palette:** Near-black base `#0D0F1A`, electric violet `#7C3AED`, mint-teal `#22D3A5`, hot pink `#FF3E8E`, XP-gold `#FFD23F`

**Typography**
- Headings: a bold, rounded geometric sans (e.g., Space Grotesk / Baloo 2) for a playful, game-HUD feel.
- Body/UI: a tidy grotesque sans (e.g., Inter) kept small and high-contrast on dark surfaces.

**Layout & Structure**
- Dark-mode-first UI with neon accent glows on progress bars, XP counters, and badge unlocks.
- Persistent bottom XP/streak bar (like a game HUD) visible across all screens.
- Challenge cards styled like "quest cards" with difficulty chips and animated XP-reward badges.

**Signature Screens to Prototype**
- Level-up screen: full-screen celebratory animation moment (confetti/particle burst, Framer Motion).
- Leaderboard: rank-change "battle pass" style list with avatar rings colored by persona.
- Achievement share card: dark card with neon stat callouts, ready for Instagram-story export.

### 18.3 Solar Minimal — Clean & Data-Forward

**Mood:** Airy, confident, dashboard-first — closer to a fintech or health app than a game.
**Best fit:** Adults and data-oriented users, and strong as the admin dashboard's base theme.

**Palette:** Off-white `#FAFAF5`, mist green `#EAF4EC`, primary green `#3E8E5A`, near-black text `#2B2B2B`, sun accent `#F2A65A`

**Typography**
- Headings: a modern grotesque with tight tracking (e.g., Söhne / Neue Montreal / General Sans Medium).
- Body/UI: same family at regular weight for a tight, consistent system — minimal font pairing.

**Layout & Structure**
- Generous white space, thin 1px borders instead of heavy shadows, small-radius cards.
- Data-dense dashboard: sparkline trends, category bars, and a prominent before/after CO2e comparison.
- Minimal iconography (stroke icons only, no illustration), numbers do the storytelling.

**Signature Screens to Prototype**
- Impact dashboard: multi-panel grid (footprint trend, category breakdown, leaderboard snippet, streak).
- Admin verification queue: compact table-first layout with inline approve/reject actions.
- Settings/profile: simple form layout with clear section dividers.

### 18.4 Terracotta Pune — Local & Community-Rooted

**Mood:** Warm, earthy, place-proud — visually ties the product to Pune/Deccan textures (terracotta roofs, banyan greens, monsoon light) rather than generic "eco-green".
**Best fit:** Positioning the product's Pune-first identity front and center — strong for pitch decks and demo day.

**Palette:** Deep terracotta-brown `#3B2416`, brick red `#C1502E`, turmeric gold `#E8A24A`, banyan green `#7C9C6B`, cream `#F2E4D0`

**Typography**
- Headings: a warm slab serif (e.g., Fraunces / Zilla Slab) for a locally crafted, signage-like feel.
- Body/UI: a friendly humanist sans (e.g., Work Sans) for warmth without sacrificing readability.

**Layout & Structure**
- Card headers use a subtle terracotta-tile texture or dotted pattern motif, echoing local craft.
- Category icons rendered in a warm duotone (brick + gold) rather than flat green.
- Leaderboard framed as a "Pune Wall of Champions" with location chips (area/ward) next to usernames.

**Signature Screens to Prototype**
- Landing page: hero framed around a stylized Pune skyline/banyan-tree motif with the tagline.
- Persona reveal: badge-style medallion card in terracotta/gold echoing local award aesthetics.
- Community leaderboard: ward/area-based grouping alongside friends and college scopes.

### 18.5 How to Use These as Templates

- Keep the same component inventory (hero stat card, category card, quest card, badge medallion, leaderboard row, report card) across themes — only palette, type, and card geometry change. This makes A/B testing themes fast.
- Prototype the same 4 screens per theme first: Onboarding, Dashboard, Challenge Detail, Achievement Share Card — these carry the most visual identity per app.
- Pick one theme as the base for the Admin Dashboard regardless of the consumer-facing choice — Solar Minimal's data-density suits admin tooling best.
- All four palettes maintain WCAG-AA contrast for primary text on their base surface; verify contrast again once final illustrations/photography are added.

---

## 19. Summary

EcoQuest measures a user's estimated carbon footprint, uses AI to understand lifestyle and personalize sustainability challenges, verifies real-world actions through self-reporting, photos, or GPS, rewards success with EcoXP, levels, badges, and streaks, creates social competition through leaderboards, tracks estimated environmental impact, and continuously adapts future challenges to behavior. This plan sequences that system into buildable modules, a realistic timeline, and a set of distinct UI directions ready for prototyping.

**EcoQuest — Measure. Play. Compete. Reduce.**
