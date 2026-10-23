import { StarData } from '../data/starsData';
import { Language, translations } from '../i18n/translations';

interface StarPopupProps {
  star: StarData;
  lang: Language;
  onClose: () => void;
}

export default function StarPopup({ star, lang, onClose }: StarPopupProps) {
  const t = translations[lang];
  const displayName = lang === 'ru' && star.nameRu ? star.nameRu : star.name;
  const description = lang === 'ru' && star.descriptionRu ? star.descriptionRu : star.description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700"
          aria-label={t.close}
        >
          ✕
        </button>

        {/* Star color indicator */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-6 h-6 rounded-full shadow-lg"
            style={{
              backgroundColor: star.colorHex,
              boxShadow: `0 0 12px ${star.colorHex}`,
            }}
          />
          <h2 className="text-xl font-bold text-white">{displayName}</h2>
        </div>

        {/* Info grid */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
            <span className="text-gray-400 text-sm">{t.spectralType}</span>
            <span className="text-white font-mono font-medium">{star.spectralType}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
            <span className="text-gray-400 text-sm">{t.distance}</span>
            <span className="text-white font-mono font-medium">
              {star.distanceLy.toFixed(2)} {t.lightYears}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
            <span className="text-gray-400 text-sm">{t.radius}</span>
            <span className="text-white font-mono font-medium">
              {star.radiusSolar.toFixed(3)} {t.solarRadii}
            </span>
          </div>

          {star.luminositySolar !== undefined && (
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-400 text-sm">{t.luminosity}</span>
              <span className="text-white font-mono font-medium">
                {star.luminositySolar < 0.01
                  ? star.luminositySolar.toExponential(2)
                  : star.luminositySolar.toFixed(3)}{' '}
                {t.solarLuminosity}
              </span>
            </div>
          )}

          {star.gj && (
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-400 text-sm">Catalog</span>
              <span className="text-white font-mono font-medium">{star.gj}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-300 text-sm leading-relaxed mt-4">{description}</p>
        )}
      </div>
    </div>
  );
}
