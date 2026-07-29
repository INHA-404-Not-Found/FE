const DEFAULT_IMAGE = require("../assets/defaultPostImg.png");

// 도메인은 .env 혹은 상수로 관리
const BASE_URL = "https://lost-inha.kro.kr";

/** 단일/배열/객체/로컬 모두 안전하게 Image source로 변환 */
export function toImageSource(input: unknown) {
  if (!input) return DEFAULT_IMAGE;

  // require() 결과는 number
  if (typeof input === "number") return input;

  // { uri: "..." } 형태
  if (typeof input === "object" && input && "uri" in (input as any)) {
    const uri = (input as any).uri as string;
    return { uri: absolutize(uri) };
  }

  // 배열이면 첫 번째만 사용
  if (Array.isArray(input)) {
    return toImageSource(input[0] ?? null);
  }

  // 문자열(URL/상대경로)
  if (typeof input === "string") {
    return { uri: absolutize(input) };
  }

  return DEFAULT_IMAGE;
}

/** 여러 장을 RN Image 배열용으로 변환 (갤러리/FlatList 등) */
export function toImageSources(list: unknown): Array<{ uri: string } | number> {
  if (!Array.isArray(list)) return [toImageSource(list)];
  return list.map((v) => toImageSource(v));
}

/** 상대경로를 절대 URL로, 공백/한글 파일명은 인코딩 */
function absolutize(p: string) {
  if (!p) return "";
  const trimmed = p.trim();
  if (trimmed.startsWith("http")) return trimmed;

  // /uploads/.. 처럼 오면 BASE_URL 붙이고 파일명 인코딩
  // (한글/공백 안전)
  try {
    const url = new URL(trimmed, BASE_URL);
    // 경로 마지막 세그먼트만 인코딩
    const parts = url.pathname.split("/");
    const last = parts.pop()!;
    parts.push(encodeURIComponent(last));
    url.pathname = parts.join("/");
    return url.toString();
  } catch {
    return `${BASE_URL}${trimmed}`;
  }
}

export { DEFAULT_IMAGE };
