import { get } from "node:https";
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

/** Fetch a provider status page body over plain node:https. */
export function fetchStatusPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(body));
    }).on("error", reject);
  });
}
