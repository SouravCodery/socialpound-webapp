import { SupportedMediaTypes } from "@/models/types/media.types";

export const Constants = {
  MIN_MEDIA_SIZE: 1024, //1KB
  MAX_MEDIA_SIZE: 5 * 1024 * 1024, //5MB
  CDN_BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL,
  SUPPORTED_MEDIA_TYPES: [
    "image/jpg",
    "image/jpeg",
    "image/png",
  ] as SupportedMediaTypes[],
  MAX_IMAGE_ASPECT_RATIO: 3,
  MIN_IMAGE_ASPECT_RATIO: 1 / 3,
} as const;
