// Utility to handle Google Drive and other image URLs
export function getDisplayImageUrl(url: string) {
  if (!url) return "/placeholder.svg";
  if (url.includes("drive.google.com")) {
    const fileIdMatch = url.match(/\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
  }
  return url;
}
