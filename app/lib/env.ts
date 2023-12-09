import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  API_PEXELS_KEY: str(),
});

export default env;
