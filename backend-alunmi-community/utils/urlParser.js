import { env } from "./env";

export function getUrl(req) {
  return env("URL_PARSER", `${req.protocol}://${req.get("host")}/api`);
}
