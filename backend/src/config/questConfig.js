/**
 * Central Quest Parameters Configuration
 * Defines reward formulas, cooldowns, AI similarity thresholds, and verification factors for the 4 permanent quests.
 */
module.exports = {
  public_transport: {
    quest_key: 'public_transport',
    name: 'Public Transport',
    description: 'Replace private motorized travel with buses, trains, or metro.',
    category: 'transport',
    xp_per_km: 4,             // EcoXP earned per verified kilometer traveled
    min_xp: 15,                // Minimum guaranteed reward for completed transit trip
    verification_threshold: 0.75, // Haversine / proof geo & timestamp validation threshold
    ai_confidence_threshold: 0.70, // AI confidence score required for transport context
    cooldownHours: 1           // Cooldown before starting next transit quest
  },

  cycling: {
    quest_key: 'cycling',
    name: 'Cycling Quest',
    description: 'Ride a bicycle for commuting or daily travel instead of a motor vehicle.',
    category: 'transport',
    xp_per_km: 10,            // EcoXP earned per verified cycling kilometer
    ai_similarity_threshold: 0.75, // Bicycle similarity score required for VERIFIED
    cooldownHours: 2           // Cooldown hours between cycling submissions
  },

  electricity: {
    quest_key: 'electricity',
    name: 'Electricity Saver',
    description: 'Upload your monthly electricity bill to verify low energy consumption or savings.',
    category: 'energy',
    base_rewards: {
      low_usage: 50,       // < 150 kWh
      medium_usage: 30,    // 150 - 300 kWh
      high_usage: 15       // > 300 kWh
    },
    reduction_bonus_per_percent: 1.5, // Extra XP for percentage reduction vs previous month
    ai_confidence_threshold: 0.70,   // AI confidence score required for electricity bill verification
    cooldownHours: 720     // Monthly billing period (~30 days)
  },

  plant_care: {
    quest_key: 'plant_care',
    name: 'Plant Care',
    description: 'Water, plant, or maintain real-world trees, gardens, or houseplants.',
    category: 'nature',
    fixed_xp: 25,          // Fixed reward for plant care activity
    ai_confidence_threshold: 0.70, // AI confidence score required for plant care action
    cooldownHours: 24      // Configurable cooldown window (24 hours default)
  },

  // Q05 — Waste Segregation
  waste_segregation: {
    quest_key: 'waste_segregation',
    name: 'Waste Segregation',
    description: 'Separate everyday waste into appropriate wet, dry, or recyclable streams.',
    category: 'waste',
    fixed_xp: 35,
    ai_confidence_threshold: 0.70,
    cooldownHours: 24
  },

  // Q06 — Responsible Waste Disposal
  responsible_disposal: {
    quest_key: 'responsible_disposal',
    name: 'Responsible Waste Disposal',
    description: 'Take an eligible waste item to an appropriate disposal or recycling channel.',
    category: 'waste',
    fixed_xp: 40,
    ai_confidence_threshold: 0.70,
    cooldownHours: 1
  },

  // Q07 — E-Waste Responsibility
  ewaste_responsibility: {
    quest_key: 'ewaste_responsibility',
    name: 'E-Waste Responsibility',
    description: 'Hand over eligible electronic waste to an authorized recycling collection channel.',
    category: 'waste',
    fixed_xp: 60,
    ai_confidence_threshold: 0.70,
    cooldownHours: 168
  },

  // Q08 — Clean & Sanitize a Shared Area
  clean_sanitize_area: {
    quest_key: 'clean_sanitize_area',
    name: 'Clean & Sanitize Area',
    description: 'Clean a permitted small shared area and complete a safe sanitization step.',
    category: 'cleanliness',
    fixed_xp: 30,
    ai_confidence_threshold: 0.70,
    cooldownHours: 24
  },

  // Q09 — Reduce Single-Use Plastic
  reduce_single_use_plastic: {
    quest_key: 'reduce_single_use_plastic',
    name: 'Reduce Single-Use Plastic',
    description: 'Complete a real-world plastic-reduction action using a reusable alternative.',
    category: 'waste',
    fixed_xp: 25,
    ai_confidence_threshold: 0.70,
    cooldownHours: 24
  },

  // Q10 — Reduce Food Waste
  reduce_food_waste: {
    quest_key: 'reduce_food_waste',
    name: 'Reduce Food Waste',
    description: 'Complete a practical action that prevents avoidable food waste.',
    category: 'waste',
    fixed_xp: 25,
    ai_confidence_threshold: 0.70,
    cooldownHours: 24
  },

  // Q11 — Reuse Instead of Replace
  reuse_instead_replace: {
    quest_key: 'reuse_instead_replace',
    name: 'Reuse Instead of Replace',
    description: 'Reuse, repair, repurpose, or continue using an existing item instead of buying new.',
    category: 'waste',
    fixed_xp: 35,
    ai_confidence_threshold: 0.70,
    cooldownHours: 24
  },

  // Q12 — Community Cleanliness Quest
  community_cleanliness: {
    quest_key: 'community_cleanliness',
    name: 'Community Cleanliness Quest',
    description: 'Participate in a permitted cleanliness activity in a shared or community area.',
    category: 'cleanliness',
    fixed_xp: 50,
    ai_confidence_threshold: 0.70,
    cooldownHours: 168
  }
};
