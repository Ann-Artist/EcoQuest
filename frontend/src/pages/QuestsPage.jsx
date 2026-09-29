import React, { useEffect, useState } from 'react';
import QuestCard from '../components/QuestCard';
import { questApi } from '../services/questApi';
import { Swords, ShieldCheck, RefreshCw } from 'lucide-react';
import '../styles/index.css';

export default function QuestsPage({ userId }) {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuests();
  }, [userId]);

  const loadQuests = async () => {
    try {
      setLoading(true);
      const res = await questApi.getAllQuests(userId);
      setQuests(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load quests');
    } finally {
      setLoading(false);
    }
  };

  const categoryGroups = [
    { title: '🚲 Mobility', keys: ['public_transport', 'cycling'] },
    { title: '⚡ Energy & Resources', keys: ['electricity', 'plant_care'] },
    { title: '♻️ Waste & Circular Habits', keys: ['waste_segregation', 'responsible_disposal', 'ewaste_responsibility', 'reduce_single_use_plastic', 'reduce_food_waste', 'reuse_instead_replace'] },
    { title: '✨ Clean & Community Actions', keys: ['clean_sanitize_area', 'community_cleanliness'] }
  ];

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-600)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Swords size={18} /> Mission Catalog
        </div>
        <h1 style={{ fontSize: '1.8rem', color: '#0f172a' }}>EcoQuest Catalog & Quests</h1>
        <p style={{ fontSize: '0.92rem', color: '#64748b', marginTop: '0.25rem' }}>
          Real-world sustainable actions verified through evidence, EcoXP rewards, level progression, and badges.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <span className="pill-badge pill-blue animate-spin" style={{ padding: '0.75rem 1.5rem' }}>
            Loading game quests...
          </span>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem' }}>
          <p>{error}</p>
          <button className="btn-emerald" style={{ marginTop: '1rem' }} onClick={loadQuests}>
            Retry
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {categoryGroups.map((group) => {
            const groupQuests = quests.filter((q) => group.keys.includes(q.quest_key));
            if (groupQuests.length === 0) return null;
            return (
              <div key={group.title}>
                <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                  {group.title}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {groupQuests.map((quest) => (
                    <QuestCard key={quest.id} quest={quest} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
