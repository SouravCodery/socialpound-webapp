const cookieCache: Record<string, string> = {};

export const getClientSideCookie = ({ name }: { name: string }) => {
  if (typeof window === "undefined") {
    return null;
  }

  const cookieInCache = cookieCache[name];
  if (cookieInCache) {
    return cookieInCache;
  }

  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      cookieCache[name] = decodeURIComponent(cookieValue);

      return cookieCache[name];
    }
  }

  return null;
};
