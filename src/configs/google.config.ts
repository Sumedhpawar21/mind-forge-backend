import { OAuth2Client } from "google-auth-library";
import { envConfig } from "./env.config.js";

export const googleClient = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);