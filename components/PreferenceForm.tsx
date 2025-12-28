import React, { useState } from 'react';
import { Coffee, Camera, Landmark, Music, ArrowRight, Clock } from 'lucide-react';
import { UserPreferences } from '../types';

interface PreferenceFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit, isLoading }) => {
  const [theme, setTheme] = useState('网红打卡');
  const [duration, setDuration] = useState('适中 (1-2小时)');

  const themes = [
    { id: '网红打卡', icon: Camera, label: '网红打卡' },
    { id: '咖啡闲逛', icon: Coffee, label: '咖啡闲逛' },
    { id: '人文历史', icon: Landmark, label: '人文历史' },
    { id: '夜游探索', icon: Music, label: '夜游探索' },
  ];

  const durations = ['短途 (< 1小时)', '适中 (1-2小时)', '深度 (3小时+)'];

  const handleSubmit = () => {
    onSubmit({ theme, duration });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6 pt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">规划路线</h2>
      <p className="text-gray-500 mb-8">今天想体验什么样的 City Walk？</p>

      <div className="space-y-6 flex-1">
        {/* Theme Selection */}
        <section>
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 block">漫步风格</label>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                  theme === t.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-[1.02]'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
              >
                <t.icon size={24} className="mb-2" />
                <span className="font-medium text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Duration Selection */}
        <section>
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 block">预计时长</label>
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                  duration === d ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Clock size={16} className={duration === d ? 'text-blue-600' : 'text-gray-400'} />
                {d}
              </button>
            ))}
          </div>
        </section>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-black text-white py-4 rounded-2xl font-semibold shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2 mt-4"
      >
        {isLoading ? (
          <span className="animate-pulse">正在生成路线...</span>
        ) : (
          <>
            生成路线 <ArrowRight size={20} />
          </>
        )}
      </button>
    </div>
  );
};