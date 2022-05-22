import twitter from "twitter";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const uploaderClient = new twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});
export { uploaderClient };
