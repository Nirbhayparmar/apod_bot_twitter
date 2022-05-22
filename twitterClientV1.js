// const { TwitterApi } = require("twitter-api-v2");
// const dotenv = require("dotenv");
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const clientV1 = new TwitterApi({
	appKey: process.env.TWITTER_CONSUMER_KEY,
	appSecret: process.env.TWITTER_CONSUMER_SECRET,
	// Following access tokens are not required if you are
	// at part 1 of user-auth process (ask for a request token)
	// or if you want a app-only client (see below)
	accessToken: process.env.TWITTER_ACCESS_KEY,
	accessSecret: process.env.TWITTER_ACCESS_SECRET,
});
export { clientV1 };
