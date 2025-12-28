import React from 'react';
import { WalkRoute } from '../types';
import { MapPin, Navigation, Share2, Star } from 'lucide-react';

interface RoutePreviewProps {
  route: WalkRoute;
  onStartNavigation: () => void;
  onBack: () => void;
}

export const RoutePreview: React.FC<RoutePreviewProps> = ({ route, onStartNavigation, onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      {/* Header Image Area (Abstract) */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-b-[2.5rem] shadow-xl relative shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-2">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {route.vibe}
          </div>
          <h2 className="text-2xl font-bold leading-tight max-w-[80%]">{route.title}</h2>
          <p className="text-white/80 text-sm mt-1">{route.totalDistanceKm} • {route.totalTimeMinutes} 分钟</p>
        </div>
        <button onClick={onBack} className="absolute top-4 left-4 bg-white/20 p-2 rounded-full backdrop-blur-md text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>

      {/* Timeline List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200"></div>

          {route.stops.map((stop, index) => (
            <div key={stop.id} className="relative mb-8 last:mb-0 pl-12 group">
              {/* Dot */}
              <div className="absolute left-0 top-1 w-10 h-10 bg-white rounded-full border-2 border-blue-100 flex items-center justify-center shadow-sm z-10 font-bold text-gray-400 text-sm group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                {index + 1}
              </div>
              
              {/* Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{stop.name}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{stop.tags[0]}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{stop.description}</p>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-xl border border-pink-100">
                  <div className="flex items-start gap-2">
                    <Share2 size={14} className="text-pink-500 mt-1 shrink-0" />
                    <p className="text-xs text-pink-700 font-medium">
                      <span className="block font-bold text-pink-800 mb-0.5">打卡攻略:</span>
                      {stop.socialMediaTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
        <button
          onClick={onStartNavigation}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
        >
          <Navigation size={24} />
          开始导航
        </button>
      </div>
    </div>
  );
};