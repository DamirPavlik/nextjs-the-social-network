import { dirname } from "path";
import { fileURLToPath } from "url";

export const SITE_URL = "http://localhost:3000/";
export const DIR_NAME = dirname(fileURLToPath(import.meta.url));
