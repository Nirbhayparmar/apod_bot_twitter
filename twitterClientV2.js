// const { TwitterApi } = require("twitter-api-v2");
// const dotenv = require("dotenv");
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const clientV2 = new TwitterApi(process.env.TwITTER_BEARER_TOKEN);
export { clientV2 };
