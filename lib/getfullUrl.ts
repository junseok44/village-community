export function getfullUrl(url: string) {
  let apiUrl: string;
  if (process.env.NODE_ENV === "development") {
    apiUrl = `http://localhost:3000/${url}`;
  } else {
    apiUrl = `https://example.com/${url}`;
  }
  return apiUrl;
}
