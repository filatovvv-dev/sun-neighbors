// Stars within 15 light-years of the Sun
// Data based on RECONS, Gaia DR3, and Hipparcos catalogs
// Coordinates: RA in degrees, Dec in degrees
// Distance in light-years
// Radius in solar radii
// Colors based on Harre & Heller (2021) spectral type color mapping

export interface StarData {
  id: string;
  name: string;
  nameRu?: string;
  gj?: string;
  spectralType: string;
  distanceLy: number;
  ra: number; // degrees
  dec: number; // degrees
  radiusSolar: number;
  luminositySolar?: number;
  colorHex: string;
  description?: string;
  descriptionRu?: string;
  system?: string; // which system this star belongs to
}

// Helper function to get spectral class color (Harre & Heller 2021 based)
export function getSpectralColor(spectralType: string): string {
  const mainClass = spectralType.charAt(0).toUpperCase();
  const colorMap: Record<string, string> = {
    'O': '#9bb0ff',
    'B': '#aabfff',
    'A': '#cad7ff',
    'F': '#f8f7ff',
    'G': '#fff4ea',
    'K': '#ffd2a1',
    'M': '#ffb56b',
  };
  return colorMap[mainClass] || '#ffffff';
}

// Convert RA/Dec/distance to Cartesian coordinates
// RA in degrees, Dec in degrees, distance in light-years
export function raDecToCartesian(ra: number, dec: number, distance: number): [number, number, number] {
  const raRad = (ra * Math.PI) / 180;
  const decRad = (dec * Math.PI) / 180;
  const x = distance * Math.cos(decRad) * Math.cos(raRad);
  const y = distance * Math.cos(decRad) * Math.sin(raRad);
  const z = distance * Math.sin(decRad);
  return [x, y, z];
}

export const stars: StarData[] = [
  // === Alpha Centauri System ===
  {
    id: "alpha_centauri_a",
    name: "Alpha Centauri A (Rigil Kentaurus)",
    nameRu: "Альфа Центавра A (Ригиль Кентавр)",
    gj: "GJ 559A",
    spectralType: "G2V",
    distanceLy: 4.37,
    ra: 219.90,
    dec: -60.83,
    radiusSolar: 1.223,
    luminositySolar: 1.519,
    colorHex: "#fff4ea",
    system: "alpha_centauri",
    description: "The brightest star in the Alpha Centauri system, very similar to our Sun but slightly larger and brighter.",
    descriptionRu: "Самая яркая звезда в системе Альфа Центавра, очень похожа на наше Солнце, но немного больше и ярче."
  },
  {
    id: "alpha_centauri_b",
    name: "Alpha Centauri B (Toliman)",
    nameRu: "Альфа Центавра B (Толиман)",
    gj: "GJ 559B",
    spectralType: "K1V",
    distanceLy: 4.37,
    ra: 219.90,
    dec: -60.83,
    radiusSolar: 0.859,
    luminositySolar: 0.500,
    colorHex: "#ffd2a1",
    system: "alpha_centauri",
    description: "An orange dwarf star orbiting Alpha Centauri A in a binary pair.",
    descriptionRu: "Оранжевый карлик, обращающийся вокруг Альфы Центавра A в двойной системе."
  },
  {
    id: "proxima_centauri",
    name: "Proxima Centauri",
    nameRu: "Проксима Центавра",
    gj: "GJ 551",
    spectralType: "M5.5Ve",
    distanceLy: 4.24,
    ra: 217.43,
    dec: -62.68,
    radiusSolar: 0.154,
    luminositySolar: 0.0017,
    colorHex: "#ffb56b",
    system: "alpha_centauri",
    description: "The closest star to the Sun. A red dwarf with at least two known exoplanets, including Proxima b in the habitable zone.",
    descriptionRu: "Ближайшая звезда к Солнцу. Красный карлик с как минимум двумя известными экзопланетами, включая Проксиму b в обитаемой зоне."
  },
  // === Barnard's Star ===
  {
    id: "barnards_star",
    name: "Barnard's Star",
    nameRu: "Звезда Барнарда",
    gj: "GJ 699",
    spectralType: "M4Ve",
    distanceLy: 5.96,
    ra: 269.45,
    dec: 4.69,
    radiusSolar: 0.196,
    luminositySolar: 0.0035,
    colorHex: "#ffb56b",
    description: "One of the closest stars to the Sun. A red dwarf with high proper motion. A candidate super-Earth (Barnard's Star b) has been proposed.",
    descriptionRu: "Одна из ближайших звёзд к Солнцу. Красный карлик с высоким собственным движением. Предложена кандидатура суперземли (Звезда Барнарда b)."
  },
  // === Wolf 359 ===
  {
    id: "wolf_359",
    name: "Wolf 359",
    nameRu: "Вольф 359",
    gj: "GJ 406",
    spectralType: "M6.5V",
    distanceLy: 7.86,
    ra: 164.12,
    dec: 7.01,
    radiusSolar: 0.094,
    luminositySolar: 0.001,
    colorHex: "#ffb56b",
    description: "One of the least luminous stars known. A very faint red dwarf that is a flare star.",
    descriptionRu: "Одна из наименее светящихся известных звёзд. Очень тусклый красный карлик — вспыхивающая звезда."
  },
  // === Lalande 21185 ===
  {
    id: "lalande_21185",
    name: "Lalande 21185",
    nameRu: "Лаланд 21185",
    gj: "GJ 411",
    spectralType: "M2V",
    distanceLy: 8.29,
    ra: 165.83,
    dec: 35.97,
    radiusSolar: 0.393,
    luminositySolar: 0.021,
    colorHex: "#ffb56b",
    description: "A relatively bright red dwarf. One of the closest stars visible to the naked eye under excellent conditions.",
    descriptionRu: "Относительно яркий красный карлик. Одна из ближайших звёзд, видимых невооружённым глазом при отличных условиях."
  },
  // === Sirius System ===
  {
    id: "sirius_a",
    name: "Sirius A",
    nameRu: "Сириус A",
    gj: "GJ 244A",
    spectralType: "A1V",
    distanceLy: 8.60,
    ra: 101.29,
    dec: -16.72,
    radiusSolar: 1.711,
    luminositySolar: 25.4,
    colorHex: "#cad7ff",
    system: "sirius",
    description: "The brightest star in the night sky. A main-sequence star about twice as massive as the Sun.",
    descriptionRu: "Самая яркая звезда ночного неба. Звезда главной последовательности, примерно вдвое массивнее Солнца."
  },
  {
    id: "sirius_b",
    name: "Sirius B",
    nameRu: "Сириус B",
    gj: "GJ 244B",
    spectralType: "DA2",
    distanceLy: 8.60,
    ra: 101.29,
    dec: -16.72,
    radiusSolar: 0.0084,
    luminositySolar: 0.056,
    colorHex: "#cad7ff",
    system: "sirius",
    description: "A white dwarf companion to Sirius A. One of the most massive white dwarfs known, with a mass close to the Sun's compressed into an Earth-sized volume.",
    descriptionRu: "Белый карлик — спутник Сириуса A. Один из самых массивных известных белых карликов, с массой, близкой к солнечной, сжатой в объём размером с Землю."
  },
  // === Luyten 726-8 (BL Cet / UV Cet) ===
  {
    id: "bl_cet",
    name: "BL Ceti (Luyten 726-8 A)",
    nameRu: "BL Кита (Лойтен 726-8 A)",
    gj: "GJ 65A",
    spectralType: "M5.5Ve",
    distanceLy: 8.73,
    ra: 32.79,
    dec: 17.96,
    radiusSolar: 0.11,
    luminositySolar: 0.0003,
    colorHex: "#ffb56b",
    system: "luyten_726_8",
    description: "A red dwarf flare star, part of a binary system with UV Ceti.",
    descriptionRu: "Красный карлик — вспыхивающая звезда, часть двойной системы с UV Кита."
  },
  {
    id: "uv_cet",
    name: "UV Ceti (Luyten 726-8 B)",
    nameRu: "UV Кита (Лойтен 726-8 B)",
    gj: "GJ 65B",
    spectralType: "M6Ve",
    distanceLy: 8.73,
    ra: 32.79,
    dec: 17.96,
    radiusSolar: 0.10,
    luminositySolar: 0.0002,
    colorHex: "#ffb56b",
    system: "luyten_726_8",
    description: "The prototype flare star. Exhibits dramatic increases in brightness during flare events.",
    descriptionRu: "Прототип вспыхивающих звёзд. Демонстрирует резкое увеличение яркости во время вспышек."
  },
  // === Ross 154 ===
  {
    id: "ross_154",
    name: "Ross 154",
    nameRu: "Росс 154",
    gj: "GJ 433",
    spectralType: "M3.5Ve",
    distanceLy: 9.69,
    ra: 283.09,
    dec: -23.84,
    radiusSolar: 0.24,
    luminositySolar: 0.0043,
    colorHex: "#ffb56b",
    description: "A flare star in the constellation Sagittarius. One of the most active red dwarfs known.",
    descriptionRu: "Вспыхивающая звезда в созвездии Стрельца. Один из самых активных известных красных карликов."
  },
  // === Ross 248 ===
  {
    id: "ross_248",
    name: "Ross 248",
    nameRu: "Росс 248",
    gj: "GJ 447",
    spectralType: "M5.5Ve",
    distanceLy: 10.32,
    ra: 354.07,
    dec: 44.18,
    radiusSolar: 0.17,
    luminositySolar: 0.0014,
    colorHex: "#ffb56b",
    description: "A red dwarf that will become the closest star to the Sun in about 40,000 years.",
    descriptionRu: "Красный карлик, который станет ближайшей звездой к Солнцу примерно через 40 000 лет."
  },
  // === Epsilon Eridani ===
  {
    id: "epsilon_eridani",
    name: "Epsilon Eridani",
    nameRu: "Эпсилон Эридана",
    gj: "GJ 144",
    spectralType: "K2V",
    distanceLy: 10.48,
    ra: 53.23,
    dec: -9.46,
    radiusSolar: 0.735,
    luminositySolar: 0.34,
    colorHex: "#ffd2a1",
    description: "A young star with a confirmed exoplanet (Epsilon Eridani b) and a debris disk. Often featured in science fiction.",
    descriptionRu: "Молодая звезда с подтверждённой экзопланетой (Эпсилон Эридана b) и диском из обломков. Часто фигурирует в научной фантастике."
  },
  // === Lacaille 9352 ===
  {
    id: "lacaille_9352",
    name: "Lacaille 9352",
    nameRu: "Лакайль 9352",
    gj: "GJ 887",
    spectralType: "M1.5Ve",
    distanceLy: 10.74,
    ra: 350.93,
    dec: -35.85,
    radiusSolar: 0.47,
    luminositySolar: 0.027,
    colorHex: "#ffb56b",
    description: "The brightest red dwarf in the sky. Has at least two super-Earth exoplanets.",
    descriptionRu: "Самый яркий красный карлик на небе. Имеет как минимум две экзопланеты — суперземли."
  },
  // === Ross 128 ===
  {
    id: "ross_128",
    name: "Ross 128",
    nameRu: "Росс 128",
    gj: "GJ 447",
    spectralType: "M4Vn",
    distanceLy: 11.01,
    ra: 176.94,
    dec: 0.80,
    radiusSolar: 0.20,
    luminositySolar: 0.0036,
    colorHex: "#ffb56b",
    description: "A relatively quiet red dwarf. Hosts Ross 128 b, a temperate Earth-mass exoplanet in the habitable zone.",
    descriptionRu: "Относительно спокойный красный карлик. Имеет Росс 128 b — умеренную экзопланету земной массы в обитаемой зоне."
  },
  // === EZ Aquarii ===
  {
    id: "ez_aqr_a",
    name: "EZ Aquarii A",
    nameRu: "EZ Водолея A",
    gj: "GJ 866A",
    spectralType: "M5V",
    distanceLy: 11.27,
    ra: 335.82,
    dec: -15.72,
    radiusSolar: 0.15,
    luminositySolar: 0.001,
    colorHex: "#ffb56b",
    system: "ez_aquarii",
    description: "A triple red dwarf system. EZ Aquarii A is a flare star.",
    descriptionRu: "Тройная система красных карликов. EZ Водолея A — вспыхивающая звезда."
  },
  {
    id: "ez_aqr_b",
    name: "EZ Aquarii B",
    nameRu: "EZ Водолея B",
    gj: "GJ 866B",
    spectralType: "M5V",
    distanceLy: 11.27,
    ra: 335.82,
    dec: -15.72,
    radiusSolar: 0.13,
    luminositySolar: 0.0008,
    colorHex: "#ffb56b",
    system: "ez_aquarii",
    description: "Second component of the EZ Aquarii triple system.",
    descriptionRu: "Второй компонент тройной системы EZ Водолея."
  },
  {
    id: "ez_aqr_c",
    name: "EZ Aquarii C",
    nameRu: "EZ Водолея C",
    gj: "GJ 866C",
    spectralType: "M5.5V",
    distanceLy: 11.27,
    ra: 335.82,
    dec: -15.72,
    radiusSolar: 0.12,
    luminositySolar: 0.0006,
    colorHex: "#ffb56b",
    system: "ez_aquarii",
    description: "Third and faintest component of the EZ Aquarii triple system.",
    descriptionRu: "Третий и самый тусклый компонент тройной системы EZ Водолея."
  },
  // === Procyon System ===
  {
    id: "procyon_a",
    name: "Procyon A",
    nameRu: "Процион A",
    gj: "GJ 280A",
    spectralType: "F5IV-V",
    distanceLy: 11.46,
    ra: 114.83,
    dec: 5.22,
    radiusSolar: 2.048,
    luminositySolar: 6.93,
    colorHex: "#f8f7ff",
    system: "procyon",
    description: "The brightest star in Canis Minor. A subgiant evolving off the main sequence.",
    descriptionRu: "Самая яркая звезда Малого Пса. Субгигант, сходящий с главной последовательности."
  },
  {
    id: "procyon_b",
    name: "Procyon B",
    nameRu: "Процион B",
    gj: "GJ 280B",
    spectralType: "DQZ",
    distanceLy: 11.46,
    ra: 114.83,
    dec: 5.22,
    radiusSolar: 0.0096,
    luminositySolar: 0.00055,
    colorHex: "#f8f7ff",
    system: "procyon",
    description: "A white dwarf companion to Procyon A.",
    descriptionRu: "Белый карлик — спутник Проциона A."
  },
  // === 61 Cygni ===
  {
    id: "61_cyg_a",
    name: "61 Cygni A",
    nameRu: "61 Лебедя A",
    gj: "GJ 824A",
    spectralType: "K5V",
    distanceLy: 11.41,
    ra: 316.73,
    dec: 38.75,
    radiusSolar: 0.665,
    luminositySolar: 0.153,
    colorHex: "#ffd2a1",
    system: "61_cygni",
    description: "The first star to have its distance measured via parallax (by Bessel in 1838). A binary system of orange dwarfs.",
    descriptionRu: "Первая звезда, расстояние до которой было измерено методом параллакса (Бессель, 1838). Двойная система оранжевых карликов."
  },
  {
    id: "61_cyg_b",
    name: "61 Cygni B",
    nameRu: "61 Лебедя B",
    gj: "GJ 824B",
    spectralType: "K7V",
    distanceLy: 11.41,
    ra: 316.73,
    dec: 38.75,
    radiusSolar: 0.595,
    luminositySolar: 0.085,
    colorHex: "#ffd2a1",
    system: "61_cygni",
    description: "The secondary star of the 61 Cygni binary system.",
    descriptionRu: "Вторая звезда двойной системы 61 Лебедя."
  },
  // === Struve 2398 ===
  {
    id: "struve_2398_a",
    name: "Struve 2398 A",
    nameRu: "Струве 2398 A",
    gj: "GJ 725A",
    spectralType: "M3V",
    distanceLy: 11.52,
    ra: 289.04,
    dec: 68.22,
    radiusSolar: 0.30,
    luminositySolar: 0.0082,
    colorHex: "#ffb56b",
    system: "struve_2398",
    description: "A binary red dwarf system. Both components are flare stars.",
    descriptionRu: "Двойная система красных карликов. Оба компонента — вспыхивающие звёзды."
  },
  {
    id: "struve_2398_b",
    name: "Struve 2398 B",
    nameRu: "Струве 2398 B",
    gj: "GJ 725B",
    spectralType: "M3.5V",
    distanceLy: 11.52,
    ra: 289.04,
    dec: 68.22,
    radiusSolar: 0.27,
    luminositySolar: 0.0055,
    colorHex: "#ffb56b",
    system: "struve_2398",
    description: "The secondary component of the Struve 2398 binary system.",
    descriptionRu: "Второй компонент двойной системы Струве 2398."
  },
  // === Groombridge 34 ===
  {
    id: "groombridge_34_a",
    name: "Groombridge 34 A",
    nameRu: "Грумбридж 34 A",
    gj: "GJ 15A",
    spectralType: "M1.5V",
    distanceLy: 11.62,
    ra: 22.07,
    dec: 49.32,
    radiusSolar: 0.40,
    luminositySolar: 0.017,
    colorHex: "#ffb56b",
    system: "groombridge_34",
    description: "A binary red dwarf system. Groombridge 34 A has at least one exoplanet candidate.",
    descriptionRu: "Двойная система красных карликов. Грумбридж 34 A имеет как минимум один кандидат в экзопланеты."
  },
  {
    id: "groombridge_34_b",
    name: "Groombridge 34 B",
    nameRu: "Грумбридж 34 B",
    gj: "GJ 15B",
    spectralType: "M3.5V",
    distanceLy: 11.62,
    ra: 22.07,
    dec: 49.32,
    radiusSolar: 0.27,
    luminositySolar: 0.0053,
    colorHex: "#ffb56b",
    system: "groombridge_34",
    description: "The secondary component of the Groombridge 34 binary system.",
    descriptionRu: "Второй компонент двойной системы Грумбридж 34."
  },
  // === Epsilon Indi ===
  {
    id: "epsilon_indi",
    name: "Epsilon Indi",
    nameRu: "Эпсилон Индейца",
    gj: "GJ 845",
    spectralType: "K5V",
    distanceLy: 11.87,
    ra: 330.96,
    dec: -56.79,
    radiusSolar: 0.71,
    luminositySolar: 0.22,
    colorHex: "#ffd2a1",
    description: "A star with a brown dwarf binary companion (Epsilon Indi Ba/Bb). One of the closest known brown dwarf systems.",
    descriptionRu: "Звезда с компаньоном — коричневым карликом (Эпсилон Индейца Ba/Bb). Одна из ближайших известных систем с коричневыми карликами."
  },
  // === DX Cancri ===
  {
    id: "dx_cnc",
    name: "DX Cancri",
    nameRu: "DX Рака",
    gj: "GJ 270",
    spectralType: "M6.5V",
    distanceLy: 11.83,
    ra: 128.39,
    dec: 19.65,
    radiusSolar: 0.10,
    luminositySolar: 0.0006,
    colorHex: "#ffb56b",
    description: "A very faint red dwarf and an active flare star.",
    descriptionRu: "Очень тусклый красный карлик и активная вспыхивающая звезда."
  },
  // === Tau Ceti ===
  {
    id: "tau_ceti",
    name: "Tau Ceti",
    nameRu: "Тау Кита",
    gj: "GJ 83.2",
    spectralType: "G8V",
    distanceLy: 11.91,
    ra: 39.85,
    dec: -15.94,
    radiusSolar: 0.935,
    luminositySolar: 0.52,
    colorHex: "#fff4ea",
    description: "A Sun-like star with a large debris disk. Multiple exoplanet candidates have been proposed.",
    descriptionRu: "Звезда, похожая на Солнце, с большим диском из обломков. Предложены кандидаты нескольких экзопланет."
  },
  // === YZ Ceti ===
  {
    id: "yz_ceti",
    name: "YZ Ceti",
    nameRu: "YZ Кита",
    gj: "GJ 54",
    spectralType: "M4.5V",
    distanceLy: 12.13,
    ra: 17.36,
    dec: -16.88,
    radiusSolar: 0.13,
    luminositySolar: 0.0014,
    colorHex: "#ffb56b",
    description: "A red dwarf with at least three rocky exoplanets, all very close to the star.",
    descriptionRu: "Красный карлик с как минимум тремя каменистыми экзопланетами, все очень близко к звезде."
  },
  // === Luyten's Star (GJ 273) ===
  {
    id: "luytens_star",
    name: "Luyten's Star (GJ 273)",
    nameRu: "Звезда Лойтена (GJ 273)",
    gj: "GJ 273",
    spectralType: "M3.5V",
    distanceLy: 12.36,
    ra: 118.22,
    dec: 5.24,
    radiusSolar: 0.293,
    luminositySolar: 0.0096,
    colorHex: "#ffb56b",
    description: "A red dwarf with two confirmed exoplanets, including one in the habitable zone.",
    descriptionRu: "Красный карлик с двумя подтверждёнными экзопланетами, включая одну в обитаемой зоне."
  },
  // === Teegarden's Star ===
  {
    id: "teegardens_star",
    name: "Teegarden's Star",
    nameRu: "Звезда Тигардена",
    gj: "GJ 4334",
    spectralType: "M7V",
    distanceLy: 12.52,
    ra: 43.07,
    dec: 16.87,
    radiusSolar: 0.10,
    luminositySolar: 0.0007,
    colorHex: "#ffb56b",
    description: "A very old, quiet red dwarf with two Earth-mass planets in the habitable zone.",
    descriptionRu: "Очень старый, спокойный красный карлик с двумя планетами земной массы в обитаемой зоне."
  },
  // === SCR 1845-6357 ===
  {
    id: "scr_1845",
    name: "SCR 1845-6357",
    nameRu: "SCR 1845-6357",
    gj: "GJ 9404",
    spectralType: "M8.5V",
    distanceLy: 12.57,
    ra: 276.53,
    dec: -63.57,
    radiusSolar: 0.09,
    luminositySolar: 0.0004,
    colorHex: "#ffb56b",
    description: "A very cool red dwarf with a brown dwarf companion (T6 spectral type).",
    descriptionRu: "Очень холодный красный карлик с компаньоном — коричневым карликом (спектральный класс T6)."
  },
  // === Kapteyn's Star ===
  {
    id: "kapteyns_star",
    name: "Kapteyn's Star",
    nameRu: "Звезда Каптейна",
    gj: "GJ 191",
    spectralType: "sdM1",
    distanceLy: 12.76,
    ra: 79.10,
    dec: -44.53,
    radiusSolar: 0.29,
    luminositySolar: 0.013,
    colorHex: "#ffb56b",
    description: "A metal-poor subdwarf with a high proper motion. The second highest proper motion of any known star.",
    descriptionRu: "Субкарлик с низким содержанием металлов и высоким собственным движением. Второе по величине собственное движение среди известных звёзд."
  },
  // === GJ 1061 ===
  {
    id: "gj_1061",
    name: "GJ 1061",
    nameRu: "GJ 1061",
    gj: "GJ 1061",
    spectralType: "M5.5V",
    distanceLy: 12.99,
    ra: 55.35,
    dec: -44.33,
    radiusSolar: 0.12,
    luminositySolar: 0.001,
    colorHex: "#ffb56b",
    description: "A red dwarf with three confirmed exoplanets, two of which are near the habitable zone.",
    descriptionRu: "Красный карлик с тремя подтверждёнными экзопланетами, две из которых находятся вблизи обитаемой зоны."
  },
  // === GJ 436 ===
  {
    id: "gj_436",
    name: "GJ 436",
    nameRu: "GJ 436",
    gj: "GJ 436",
    spectralType: "M2.5V",
    distanceLy: 13.04,
    ra: 174.17,
    dec: 26.69,
    radiusSolar: 0.44,
    luminositySolar: 0.023,
    colorHex: "#ffb56b",
    description: "A red dwarf with a known 'hot Neptune' exoplanet (GJ 436 b) that has a detectable atmosphere.",
    descriptionRu: "Красный карлик с известной экзопланетой типа «горячий нептун» (GJ 436 b), имеющей обнаружимую атмосферу."
  },
  // === LHS 292 ===
  {
    id: "lhs_292",
    name: "LHS 292",
    nameRu: "LHS 292",
    gj: "GJ 2048",
    spectralType: "M4V",
    distanceLy: 13.07,
    ra: 147.46,
    dec: -60.45,
    radiusSolar: 0.22,
    luminositySolar: 0.004,
    colorHex: "#ffb56b",
    description: "A red dwarf in the constellation Volans.",
    descriptionRu: "Красный карлик в созвездии Летучей Рыбы."
  },
  // === GJ 1005 ===
  {
    id: "gj_1005_a",
    name: "GJ 1005 A",
    nameRu: "GJ 1005 A",
    gj: "GJ 1005A",
    spectralType: "M5V",
    distanceLy: 13.12,
    ra: 21.07,
    dec: -7.54,
    radiusSolar: 0.14,
    luminositySolar: 0.001,
    colorHex: "#ffb56b",
    system: "gj_1005",
    description: "A binary red dwarf system.",
    descriptionRu: "Двойная система красных карликов."
  },
  {
    id: "gj_1005_b",
    name: "GJ 1005 B",
    nameRu: "GJ 1005 B",
    gj: "GJ 1005B",
    spectralType: "M5V",
    distanceLy: 13.12,
    ra: 21.07,
    dec: -7.54,
    radiusSolar: 0.13,
    luminositySolar: 0.0008,
    colorHex: "#ffb56b",
    system: "gj_1005",
    description: "The secondary component of the GJ 1005 binary system.",
    descriptionRu: "Второй компонент двойной системы GJ 1005."
  },
  // === GJ 1245 ===
  {
    id: "gj_1245_a",
    name: "GJ 1245 A",
    nameRu: "GJ 1245 A",
    gj: "GJ 1245A",
    spectralType: "M5.5V",
    distanceLy: 14.55,
    ra: 292.63,
    dec: 54.53,
    radiusSolar: 0.14,
    luminositySolar: 0.001,
    colorHex: "#ffb56b",
    system: "gj_1245",
    description: "A triple red dwarf system.",
    descriptionRu: "Тройная система красных карликов."
  },
  {
    id: "gj_1245_b",
    name: "GJ 1245 B",
    nameRu: "GJ 1245 B",
    gj: "GJ 1245B",
    spectralType: "M5.5V",
    distanceLy: 14.55,
    ra: 292.63,
    dec: 54.53,
    radiusSolar: 0.13,
    luminositySolar: 0.0008,
    colorHex: "#ffb56b",
    system: "gj_1245",
    description: "Second component of the GJ 1245 triple system.",
    descriptionRu: "Второй компонент тройной системы GJ 1245."
  },
  {
    id: "gj_1245_c",
    name: "GJ 1245 C",
    nameRu: "GJ 1245 C",
    gj: "GJ 1245C",
    spectralType: "M6V",
    distanceLy: 14.55,
    ra: 292.63,
    dec: 54.53,
    radiusSolar: 0.11,
    luminositySolar: 0.0005,
    colorHex: "#ffb56b",
    system: "gj_1245",
    description: "Third component of the GJ 1245 triple system.",
    descriptionRu: "Третий компонент тройной системы GJ 1245."
  },
  // === Wolf 424 ===
  {
    id: "wolf_424_a",
    name: "Wolf 424 A",
    nameRu: "Вольф 424 A",
    gj: "GJ 509A",
    spectralType: "M4.5V",
    distanceLy: 14.32,
    ra: 207.86,
    dec: -10.55,
    radiusSolar: 0.19,
    luminositySolar: 0.002,
    colorHex: "#ffb56b",
    system: "wolf_424",
    description: "A binary red dwarf system. Both components are flare stars.",
    descriptionRu: "Двойная система красных карликов. Оба компонента — вспыхивающие звёзды."
  },
  {
    id: "wolf_424_b",
    name: "Wolf 424 B",
    nameRu: "Вольф 424 B",
    gj: "GJ 509B",
    spectralType: "M4.5V",
    distanceLy: 14.32,
    ra: 207.86,
    dec: -10.55,
    radiusSolar: 0.18,
    luminositySolar: 0.0018,
    colorHex: "#ffb56b",
    system: "wolf_424",
    description: "The secondary component of the Wolf 424 binary system.",
    descriptionRu: "Второй компонент двойной системы Вольф 424."
  },
  // === GJ 687 ===
  {
    id: "gj_687",
    name: "GJ 687",
    nameRu: "GJ 687",
    gj: "GJ 687",
    spectralType: "M3V",
    distanceLy: 14.78,
    ra: 263.47,
    dec: 68.50,
    radiusSolar: 0.30,
    luminositySolar: 0.01,
    colorHex: "#ffb56b",
    description: "A red dwarf with a confirmed super-Earth exoplanet in the habitable zone.",
    descriptionRu: "Красный карлик с подтверждённой экзопланетой — суперземлёй в обитаемой зоне."
  },
  // === GJ 674 ===
  {
    id: "gj_674",
    name: "GJ 674",
    nameRu: "GJ 674",
    gj: "GJ 674",
    spectralType: "M3V",
    distanceLy: 14.81,
    ra: 261.42,
    dec: -47.80,
    radiusSolar: 0.35,
    luminositySolar: 0.012,
    colorHex: "#ffb56b",
    description: "A red dwarf with a known Neptune-mass exoplanet.",
    descriptionRu: "Красный карлик с известной экзопланетой массой с Нептун."
  },
  // === LHS 337 ===
  {
    id: "lhs_337",
    name: "LHS 337",
    nameRu: "LHS 337",
    gj: "GJ 3877",
    spectralType: "M4V",
    distanceLy: 14.13,
    ra: 176.44,
    dec: -37.04,
    radiusSolar: 0.18,
    luminositySolar: 0.002,
    colorHex: "#ffb56b",
    description: "A red dwarf with at least two super-Earth exoplanets.",
    descriptionRu: "Красный карлик с как минимум двумя экзопланетами — суперземлями."
  },
  // === GJ 1151 ===
  {
    id: "gj_1151",
    name: "GJ 1151",
    nameRu: "GJ 1151",
    gj: "GJ 1151",
    spectralType: "M4.5V",
    distanceLy: 14.05,
    ra: 167.10,
    dec: 74.83,
    radiusSolar: 0.18,
    luminositySolar: 0.002,
    colorHex: "#ffb56b",
    description: "A red dwarf with radio emissions suggesting the presence of an exoplanet with a magnetic field.",
    descriptionRu: "Красный карлик с радиоизлучением, предполагающим наличие экзопланеты с магнитным полем."
  },
  // === GJ 1286 ===
  {
    id: "gj_1286",
    name: "GJ 1286",
    nameRu: "GJ 1286",
    gj: "GJ 1286",
    spectralType: "M3.5V",
    distanceLy: 14.81,
    ra: 329.23,
    dec: 59.67,
    radiusSolar: 0.28,
    luminositySolar: 0.007,
    colorHex: "#ffb56b",
    description: "A red dwarf with a candidate exoplanet.",
    descriptionRu: "Красный карлик с кандидатом в экзопланеты."
  },
  // === GJ 2066 ===
  {
    id: "gj_2066",
    name: "GJ 2066",
    nameRu: "GJ 2066",
    gj: "GJ 2066",
    spectralType: "M3V",
    distanceLy: 14.32,
    ra: 101.57,
    dec: -27.38,
    radiusSolar: 0.32,
    luminositySolar: 0.01,
    colorHex: "#ffb56b",
    description: "A red dwarf in the constellation Columba.",
    descriptionRu: "Красный карлик в созвездии Голубя."
  },
  // === LP 731-58 ===
  {
    id: "lp_731_58",
    name: "LP 731-58",
    nameRu: "LP 731-58",
    gj: "GJ 3877",
    spectralType: "M5V",
    distanceLy: 14.22,
    ra: 217.38,
    dec: -39.87,
    radiusSolar: 0.15,
    luminositySolar: 0.001,
    colorHex: "#ffb56b",
    description: "A faint red dwarf star.",
    descriptionRu: "Тусклая звезда — красный карлик."
  },
  // === GJ 1154 ===
  {
    id: "gj_1154",
    name: "GJ 1154",
    nameRu: "GJ 1154",
    gj: "GJ 1154",
    spectralType: "M1V",
    distanceLy: 14.43,
    ra: 225.53,
    dec: 72.50,
    radiusSolar: 0.45,
    luminositySolar: 0.025,
    colorHex: "#ffb56b",
    description: "A relatively bright red dwarf.",
    descriptionRu: "Относительно яркий красный карлик."
  },
  // === GJ 673 ===
  {
    id: "gj_673",
    name: "GJ 673",
    nameRu: "GJ 673",
    gj: "GJ 673",
    spectralType: "K7V",
    distanceLy: 14.78,
    ra: 262.68,
    dec: 15.47,
    radiusSolar: 0.60,
    luminositySolar: 0.11,
    colorHex: "#ffd2a1",
    description: "An orange dwarf star with a debris disk.",
    descriptionRu: "Оранжевый карлик с диском из обломков."
  },
  // === GJ 686 ===
  {
    id: "gj_686",
    name: "GJ 686",
    nameRu: "GJ 686",
    gj: "GJ 686",
    spectralType: "M2.5V",
    distanceLy: 14.62,
    ra: 266.54,
    dec: 4.73,
    radiusSolar: 0.39,
    luminositySolar: 0.018,
    colorHex: "#ffb56b",
    description: "A red dwarf with a confirmed super-Earth exoplanet.",
    descriptionRu: "Красный карлик с подтверждённой экзопланетой — суперземлёй."
  },
  // === GJ 2048 (LHS 2397a area) ===
  {
    id: "lhs_2397a",
    name: "LHS 2397a",
    nameRu: "LHS 2397a",
    gj: "GJ 3368",
    spectralType: "M5V",
    distanceLy: 14.17,
    ra: 159.20,
    dec: -14.48,
    radiusSolar: 0.15,
    luminositySolar: 0.001,
    colorHex: "#ffb56b",
    description: "A faint red dwarf.",
    descriptionRu: "Тусклый красный карлик."
  },
  // === Sun (reference point) ===
  {
    id: "sun",
    name: "Sun",
    nameRu: "Солнце",
    spectralType: "G2V",
    distanceLy: 0,
    ra: 0,
    dec: 0,
    radiusSolar: 1.0,
    luminositySolar: 1.0,
    colorHex: "#fff4ea",
    description: "Our home star. A G-type main-sequence star (yellow dwarf).",
    descriptionRu: "Наша домашняя звезда. Звезда главной последовательности G-типа (жёлтый карлик)."
  },
];

// Sun data for special rendering
export const sunData = stars.find(s => s.id === 'sun')!;
