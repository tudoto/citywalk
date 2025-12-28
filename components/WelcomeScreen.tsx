import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  isLoading: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6">
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-[2rem] shadow-2xl mb-8 animate-fade-in-up">
        <Navigation size={64} className="text-white drop-shadow-md" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-center tracking-tight">CityWalk 智行</h1>
      <p className="text-lg text-blue-100 text-center mb-12 max-w-xs">
        结合社媒大数据，发现城市热门打卡地与隐秘角落，定制你的专属漫步路线。
      </p>

      <button
        onClick={onStart}
        disabled={isLoading}
        className="group relative w-full max-w-sm bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading ? (
            '正在定位...'
          ) : (
            <>
              <MapPin size={20} />
              开始探索
            </>
          )}
        </span>
      </button>
      
      <p className="mt-6 text-xs text-blue-200 opacity-60">
        需要获取您的地理位置权限以规划路线
      </p>
    </div>
  );
};