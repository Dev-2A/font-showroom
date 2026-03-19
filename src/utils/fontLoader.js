const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
const BASE_URL = "https://www.googleapis.com/webfonts/v1/webfonts";

/**
 * Google Fonts API에서 폰트 목록을 가져온다.
 * @param {string} sort - 정렬 기준 (popularity, trending, alpha, date, style)
 * @returns {Promise<Array>} 폰트 목록
 */
export async function fetchFontList(sort = "popularity") {
  const url = `${BASE_URL}?key=${API_KEY}&sort=${sort}&subset=korean`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google Fonts API 오류: ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * 폰트를 <head>에 동적으로 로드한다.
 * @param {string} family - 폰트 패밀리명
 * @param {string[]} variants - 로드할 굵기 목록 (예: ['400', '700'])
 */
export function loadFont(family, variants = ["400"]) {
  const id = `font-${family.replace(/\s+/g, "-")}`;

  // 이미 로드된 폰트는 스킵
  if (document.getElementById(id)) return;

  const weights = variants.join(";");
  const encodedFamily = encodeURIComponent(family);
  const href = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${weights}&display=swap`;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

/**
 * 폰트 객체에서 사용 가능한 weight 목록을 숫자 배열로 반환한다.
 * @params {object} font - Google Fonts API 폰트 객체
 * @returns {number[]} 사용 가능한 weight 목록
 */
export function getAvailableWeights(font) {
  if (!font?.variants) return [400];

  const weights = font.variants
    .map((v) => {
      if (v === "regular") return 400;
      if (v === "italic") return null;
      const num = parseInt(v, 10);
      return isNaN(num) ? null : num;
    })
    .filter((w) => w !== null);

  return [...new Set(weights)].sort((a, b) => a - b);
}
