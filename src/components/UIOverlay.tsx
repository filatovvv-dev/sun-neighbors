import { Language, translations } from '../i18n/translations';
import { stars } from '../data/starsData';

interface UIOverlayProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const spectralClasses = [
  { class: 'O', color: '#9bb0ff', label: 'O (Blue)' },
  { class: 'B', color: '#aabfff', label: 'B (Blue-white)' },
  { class: 'A', color: '#cad7ff', label: 'A (White)' },
  { class: 'F', color: '#f8f7ff', label: 'F (Yellow-white)' },
  { class: 'G', color: '#fff4ea', label: 'G (Yellow)' },
  { class: 'K', color: '#ffd2a1', label: 'K (Orange)' },
  { class: 'M', color: '#ffb56b', label: 'M (Red-orange)' },
];

export default function UIOverlay({ lang, onLangChange }: UIOverlayProps) {
  const t = translations[lang];
  const nonSunStars = stars.filter(s => s.id !== 'sun');

  return (
    <>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <div className="flex items-start justify-between">
          <div className="pointer-events-auto">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-gray-400 mt-1">{t.subtitle}</p>
          </div>
          <div className="pointer-events-auto">
            <button
              onClick={() => onLangChange(lang === 'en' ? 'ru' : 'en')}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              {lang === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
            </button>
          </div>
        </div>
      </div>

      {/* Left panel - Info */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3 max-w-xs pointer-events-auto">
          <p className="text-xs text-gray-400 mb-2">
            {t.totalStars}: <span className="text-white font-bold">{nonSunStars.length}</span>
          </p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>🖱️ {t.rotate}</p>
            <p>🔍 {t.zoom}</p>
            <p>👆 {t.clickStar}</p>
          </div>
        </div>
      </div>

      {/* Right panel - Spectral legend */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3 pointer-events-auto">
          <p className="text-xs text-gray-400 mb-2 font-medium">{t.spectralLegend}</p>
          <div className="flex gap-1.5">
            {spectralClasses.map((sc) => (
              <div key={sc.class} className="flex flex-col items-center" title={sc.label}>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: sc.color,
                    boxShadow: `0 0 4px ${sc.color}`,
                  }}
                />
                <span className="text-[10px] text-gray-400 mt-0.5">{sc.class}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:block">
        <p className="text-[10px] text-gray-500 text-center">
          {t.dataSources}
          <br />
          {t.footer}
        </p>
      </div>
    </>
  );
}
