import { useState, useCallback } from 'react';
import StarScene from './components/StarScene';
import StarPopup from './components/StarPopup';
import UIOverlay from './components/UIOverlay';
import { StarData } from './data/starsData';
import { Language } from './i18n/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null);

  const handleStarClick = useCallback((star: StarData | null) => {
    setSelectedStar(star);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedStar(null);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#0a0a1a]">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <StarScene
          lang={lang}
          onStarClick={handleStarClick}
          selectedStar={selectedStar}
        />
      </div>

      {/* UI Overlay */}
      <UIOverlay lang={lang} onLangChange={setLang} />

      {/* Star Info Popup */}
      {selectedStar && (
        <StarPopup
          star={selectedStar}
          lang={lang}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
