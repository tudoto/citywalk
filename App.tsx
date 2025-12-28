import React, { useState, useEffect } from 'react';
import { AppState, Coordinates, UserPreferences, WalkRoute } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PreferenceForm } from './components/PreferenceForm';
import { RoutePreview } from './components/RoutePreview';
import { NavigationMode } from './components/NavigationMode';
import { generateCityWalkRoute } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [route, setRoute] = useState<WalkRoute | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStart = () => {
    setIsLoading(true);
    setErrorMsg(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
          setAppState(AppState.PREFERENCES);
        },
        (error) => {
          console.error("Geo error:", error);
          setIsLoading(false);
          alert("我们需要获取您的位置以规划附近的路线！请允许定位权限。");
        }
      );
    } else {
      setIsLoading(false);
      alert("您的浏览器不支持地理定位功能。");
    }
  };

  const handlePreferenceSubmit = async (prefs: UserPreferences) => {
    if (!userLocation) return;
    
    setIsLoading(true);
    try {
      const generatedRoute = await generateCityWalkRoute(userLocation, prefs);
      setRoute(generatedRoute);
      setIsLoading(false);
      setAppState(AppState.ROUTE_PREVIEW);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setErrorMsg("生成路线失败，请重试。");
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.WELCOME:
        return <WelcomeScreen onStart={handleStart} isLoading={isLoading} />;
        
      case AppState.PREFERENCES:
        return <PreferenceForm onSubmit={handlePreferenceSubmit} isLoading={isLoading} />;
        
      case AppState.ROUTE_PREVIEW:
        if (!route) return null;
        return (
          <RoutePreview 
            route={route} 
            onStartNavigation={() => setAppState(AppState.NAVIGATION)} 
            onBack={() => setAppState(AppState.PREFERENCES)}
          />
        );
        
      case AppState.NAVIGATION:
        if (!route) return null;
        return (
          <NavigationMode 
            route={route} 
            onEndNavigation={() => {
              setRoute(null);
              setAppState(AppState.WELCOME);
            }} 
          />
        );
        
      default:
        return <div>Error State</div>;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      {renderContent()}
      
      {errorMsg && (
        <div className="absolute top-4 left-4 right-4 bg-red-500 text-white p-3 rounded-xl shadow-lg text-sm text-center animate-bounce z-50">
          {errorMsg}
          <button onClick={() => setErrorMsg(null)} className="ml-2 font-bold underline">关闭</button>
        </div>
      )}
    </div>
  );
};

export default App;