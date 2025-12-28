import React, { useState } from 'react';
import { WalkRoute, WalkStop } from '../types';
import { ArrowRight, CheckCircle, ExternalLink, Map, Navigation, X } from 'lucide-react';

interface NavigationModeProps {
  route: WalkRoute;
  onEndNavigation: () => void;
}

export const NavigationMode: React.FC<NavigationModeProps> = ({ route, onEndNavigation }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const currentStop: WalkStop | undefined = route.stops[currentStepIndex];
  const isFinished = currentStepIndex >= route.stops.length;

  const handleNextStop = () => {
    if (currentStepIndex < route.stops.length) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const openMaps = (lat: number, lng: number) => {
    // Universal scheme that usually works on mobile to open preferred map app
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-500 text-white p-8 text-center animate-fade-in">
        <div className="bg-white/20 p-6 rounded-full mb-6 backdrop-blur-md">
          <CheckCircle size={64} />
        </div>
        <h2 className="text-4xl font-bold mb-4">抵达终点！</h2>
        <p className="text-xl opacity-90 mb-8">路线已完成，希望你拍到了满意的照片！</p>
        <button 
          onClick={onEndNavigation}
          className="bg-white text-green-600 font-bold py-3 px-8 rounded-full shadow-lg"
        >
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Visual Map Simulation Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Simulated Path Line */}
          <path d="M 50 100 Q 150 300 300 500" stroke="white" strokeWidth="4" fill="none" strokeDasharray="10,10" />
        </svg>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex justify-between items-center p-6 pt-12 bg-gradient-to-b from-black/50 to-transparent">
        <div>
          <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">当前站点</p>
          <p className="text-xl font-bold">{currentStepIndex + 1} / {route.stops.length}</p>
        </div>
        <button 
          onClick={onEndNavigation}
          className="bg-white/10 p-2 rounded-full backdrop-blur-md active:bg-red-500/50 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Center Visual */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-6">
        <div className="w-64 h-64 rounded-full border-4 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.5)] bg-gray-800 flex items-center justify-center mb-8 relative">
           {/* Radar Ping Animation */}
           <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
           <Map size={64} className="text-blue-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">{currentStop.name}</h2>
        <p className="text-gray-400 text-center max-w-xs">{currentStop.description}</p>
      </div>

      {/* Bottom Card */}
      <div className="relative z-10 bg-white text-gray-900 rounded-t-[2.5rem] p-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
                 <ExternalLink size={20} />
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-gray-400 uppercase">攻略</span>
                 <span className="font-semibold text-sm max-w-[200px] truncate">{currentStop.socialMediaTip}</span>
              </div>
           </div>
           <div className="text-right">
              <span className="block text-2xl font-bold font-mono">~{currentStop.estimatedTimeMinutes}</span>
              <span className="text-xs text-gray-500">分钟停留</span>
           </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3">
           <button 
             onClick={() => openMaps(currentStop.coordinates.latitude, currentStop.coordinates.longitude)}
             className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-colors"
           >
             <Navigation size={20} />
             打开地图
           </button>
           
           <button 
             onClick={handleNextStop}
             className="bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform flex items-center"
           >
             下一站 <ArrowRight size={20} className="ml-2" />
           </button>
        </div>
      </div>
    </div>
  );
};