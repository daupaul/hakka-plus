// 圖片來源 helpers — POC 使用 Picsum 隨機圖（種子化保持穩定）與 DiceBear 頭像。
// 上線正式版會替換為實際劇照與 R2 上傳資產。

export const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const portrait = (seed: string, w = 800, h = 1100) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const square = (seed: string, size = 800) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${size}/${size}`;

export const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&backgroundColor=00ff94,006b3f,ffa94d`;
