import axios from "axios";
import { OSTinybird } from "@openstatus/tinybird";
import { Redis } from "@openstatus/upstash";

import { env } from "@/env";

/**
 * Shared singleton instances for external services.
 * Using singletons prevents memory leaks from creating multiple instances
 * and ensures proper connection pooling.
 */

// Tinybird client singleton
export const tb = new OSTinybird({
  token: env.TINY_BIRD_API_KEY,
  baseUrl: env.TINYBIRD_URL,
  noop: env.TINYBIRD_NOOP,
});

// Redis client singleton
export const redis = Redis.fromEnv();

/** Fetch a third-party provider's public status page (used for external incident detection). */
export async function fetchProviderStatus(url: string) {
  const res = await axios.get(url);
  return res.data;
}
