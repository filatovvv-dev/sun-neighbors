export type Language = 'en' | 'ru';

export interface Translations {
  title: string;
  subtitle: string;
  language: string;
  spectralType: string;
  distance: string;
  radius: string;
  luminosity: string;
  lightYears: string;
  solarRadii: string;
  solarLuminosity: string;
  close: string;
  totalStars: string;
  controls: string;
  rotate: string;
  zoom: string;
  clickStar: string;
  spectralLegend: string;
  dataSources: string;
  footer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: "The Immediate Neighborhood",
    subtitle: "Stars within 15 light-years of the Sun",
    language: "English",
    spectralType: "Spectral Type",
    distance: "Distance",
    radius: "Radius",
    luminosity: "Luminosity",
    lightYears: "light-years",
    solarRadii: "R☉",
    solarLuminosity: "L☉",
    close: "Close",
    totalStars: "Stars displayed",
    controls: "Controls",
    rotate: "Rotate: drag mouse / touch",
    zoom: "Zoom: scroll wheel / pinch",
    clickStar: "Click a star for details",
    spectralLegend: "Spectral Classes",
    dataSources: "Data sources: RECONS, Gaia DR3, Hipparcos",
    footer: "Colors based on Harre & Heller (2021). Star sizes are qualitatively scaled.",
  },
  ru: {
    title: "Ближайшие окрестности",
    subtitle: "Звёзды в радиусе 15 световых лет от Солнца",
    language: "Русский",
    spectralType: "Спектральный класс",
    distance: "Расстояние",
    radius: "Радиус",
    luminosity: "Светимость",
    lightYears: "св. лет",
    solarRadii: "R☉",
    solarLuminosity: "L☉",
    close: "Закрыть",
    totalStars: "Отображено звёзд",
    controls: "Управление",
    rotate: "Вращение: перетаскивание мыши / касание",
    zoom: "Масштаб: колесо мыши / жест «пинч»",
    clickStar: "Нажмите на звезду для подробностей",
    spectralLegend: "Спектральные классы",
    dataSources: "Источники данных: RECONS, Gaia DR3, Hipparcos",
    footer: "Цвета по Harre & Heller (2021). Размеры звёзд — качественная шкала.",
  }
};
