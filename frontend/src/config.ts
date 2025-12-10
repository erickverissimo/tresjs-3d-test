function getBaseApiUrl(value: string) {
  if (value !== null && value !== undefined) {
    return `${value}api`;
  } else {
    return undefined;
  }
}

export const BASE_API_URL = getBaseApiUrl(import.meta.env.VITE_BASE_API_URL);
export const VIDEO_STREAM_API_URL = getBaseApiUrl(
  import.meta.env.VITE_VIDEO_STREAM_API_URL,
);
export const LOCALHOST_SITE_URL = import.meta.env.VITE_BASE_SITE_URL;
export const PROD_SITE_URL = import.meta.env.VITE_PROD_URL;
export const SOCKET_URL = import.meta.env.VITE_BASE_API_URL;
export const BUILD_VERSION = import.meta.env.VITE_BUILD_VERSION;
export const BUILD_DATE = import.meta.env.VITE_BUILD_DATE;
