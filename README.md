# 🌱 EcoQuest — AI-Powered Gamified Sustainability Platform

> **Play Green. Live Clean.**

EcoQuest is an AI-powered gamified sustainability platform that turns real-world environmental actions into personalized and verified quests. Users complete sustainable activities, submit proof, earn EcoXP, unlock levels and badges, maintain streaks, compete on leaderboards, and track their environmental impact.

---

## 📌 SIH Problem Statement

### SIH26212 — Clean & Green Technology

**"Student Innovation-Solutions could be in the form of waste segregation, disposal, and improve sanitization system."**

The problem focuses on improving waste segregation, disposal, cleanliness, and sanitization through innovative solutions.

EcoQuest addresses this by combining environmental action with AI personalization and gamification, encouraging users to consistently perform sustainable activities rather than only receiving awareness or recommendations.

---

## 💡 Our Solution

EcoQuest converts sustainable behaviour into an interactive game:

**Lifestyle Data → Carbon Footprint → AI Personalization → Personalized Eco-Quest → Real-World Action → Proof Submission → Verification → EcoXP + Badge + Streak → Level / Leaderboard / Impact → Next Quest**

The platform covers a range of sustainable actions including mobility, energy conservation, plant care, waste management, cleanliness, responsible disposal, plastic reduction, food waste reduction, and reuse.

---

## 🎯 Key Features

- Deterministic Carbon Footprint Calculation
- AI-Powered Personalization
- Personalized and Verified Eco-Quests
- EcoXP, Levels and Progression
- Streaks and Badges
- Leaderboards and Friendly Competition
- Environmental Impact Tracking
- Photo and Context-Based Activity Verification
- Repeatable Real-World Sustainability Actions

---

## ♻️ Eco-Quest System

EcoQuest provides a unified quest system covering different areas of sustainable living:

- **Q01 — Public Transport**
- **Q02 — Cycling**
- **Q03 — Electricity Saver**
- **Q04 — Plant Care**
- **Q05 — Waste Segregation**
- **Q06 — Responsible Waste Disposal**
- **Q07 — E-Waste Responsibility**
- **Q08 — Clean & Sanitize a Shared Area**
- **Q09 — Reduce Single-Use Plastic**
- **Q10 — Reduce Food Waste**
- **Q11 — Reuse Instead of Replace**
- **Q12 — Community Cleanliness**

Each quest follows the same core system of action, evidence submission, verification, reward, and progression.

---

## 🛡️ Activity Verification

Applicable quests require evidence before EcoXP is awarded.

**Proof → Time / Context / Location Checks → AI-Assisted Evidence Analysis → Rule-Based Verification → Verified → EcoXP**

Where required, two time-separated proofs are used to improve verification reliability.

The backend remains authoritative for verification, rewards, cooldowns, and duplicate protection. AI assists with evidence analysis but cannot override the defined backend rules.

---

## 🤖 AI & Carbon Calculation

AI and carbon calculation are separate layers.

### Carbon Calculation

**Activity Data × Emission Factor → Estimated CO₂e**

Carbon values are calculated using deterministic formulas and emission factors.

#### 🔬 Deterministic Carbon Formulas

- **Transport**: `(daily_distance_km × travel_days_per_week × 4.33) × transport_factor`
- **Electricity**: `(monthly_bill / 8.0 / household_size) × 0.82 kg CO2e/kWh`
- **Food**: `daily_factor (vegetarian: 0.9, mixed: 1.6, non_vegetarian: 2.5) × 30 days`
- **Shopping**: `minimal: 20, moderate: 60, frequent: 120 kg CO2e/month`
- **Waste**: `segregated: 5, partially_segregated: 15, unsegregated: 30 kg CO2e/month`

### AI Layer

AI is used for:

- Emission hotspot identification
- Personalized recommendations
- Personalized quest selection
- Quest adaptation
- Eco persona generation
- Progress and weekly summaries
- AI-assisted proof relevance checking

AI does not directly determine carbon values or override reward rules.

---

## 🏗️ Technical Architecture

**React + Vite → Node.js + Express → Carbon / AI / Verification Services → SQLite → EcoXP / Levels / Badges / Streaks / Impact**

The system follows a service-based backend structure where carbon calculation, quests, submissions, verification, progression, rewards, and impact tracking are handled as separate services.

---

## 🔄 How EcoQuest Works

1. User enters lifestyle information.
2. The system calculates the user's estimated carbon footprint.
3. AI identifies important impact areas and personalizes recommendations.
4. The user receives suitable Eco-Quests.
5. The user performs a real-world sustainable action.
6. Evidence is submitted through the platform.
7. The verification system checks the evidence using defined rules and AI-assisted analysis where applicable.
8. Verified actions earn EcoXP and can update streaks, badges, levels, and impact.
9. Progress appears on the dashboard and leaderboard.
10. The system continues recommending suitable quests to encourage repeated sustainable behaviour.

---

## 📊 Gamification & Progression

EcoQuest uses game mechanics to make sustainable behaviour more engaging:

- **EcoXP** for verified actions
- **Levels** for progression
- **Streaks** for consistency
- **Badges** for achievements
- **Leaderboards** for friendly competition
- **Impact tracking** to show environmental contribution
- **Personalized quests** to keep actions relevant

### Core Loop

**Measure → Personalize → Act → Verify → Reward → Repeat**

---

## 📁 Repository Structure

```text
EcoQuest/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── database/
│   │   ├── services/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── uploads/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 How to Run

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Security & Integrity

- API keys and secrets must remain on the backend.
- `.env` files must not be committed to Git.
- EcoXP is awarded only after applicable verification.
- Duplicate submissions cannot generate duplicate rewards.
- Backend rules remain authoritative over AI-generated outputs.

---

## 🌱 Core Innovation

EcoQuest combines:

**Carbon Footprint + AI Personalization + Real-World Environmental Actions + Verification + Gamification**

Instead of only telling users about sustainability, EcoQuest turns sustainable behaviour into a measurable, personalized, verified, and repeatable experience.

---

## 👥 Team DroneAcharya

| Role | Member |
|------|--------|
| Team Leader | Anusha Randive |
| Team Member | Bhumika Andure |
| Team Member | Atharv Yadav |
| Team Member | Ritesh Survase |
| Team Member | Jay Wankhade |
| Team Member | Ayushi Tabhane |
