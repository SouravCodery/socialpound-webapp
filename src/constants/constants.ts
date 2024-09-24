import { SupportedMediaTypes } from "@/models/types/media.types";

export const Constants = {
  CDN_BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

  MIN_MEDIA_SIZE: 1024, //1KB
  MAX_MEDIA_SIZE: 5 * 1024 * 1024, //5MB
  SUPPORTED_MEDIA_TYPES: [
    "image/jpg",
    "image/jpeg",
    "image/png",
  ] as SupportedMediaTypes[],
  MAX_IMAGE_ASPECT_RATIO: 3,
  MIN_IMAGE_ASPECT_RATIO: 1 / 3,
  SOCIAL_POUND_USER_DP: "static/images/socialpound_user.png",
} as const;
