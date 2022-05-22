// const clientV1 = require("./twitterClientV1");
// const clientV2 = require("./twitterClientV2");
import { clientV1 } from "./twitterClientV1.js";
import { clientV2 } from "./twitterClientV2.js";
import { uploaderClient } from "./uploaderClientV1.js";
import { ETwitterStreamEvent } from "twitter-api-v2";
import { dataTitle } from "./apodImage.js";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config({ path: "./config.env" });

const imageData = fs.readFileSync(
	"E:/Programming/webdev/apod_bot_twitter/images/photo.jpg"
);

async function checkNreplyStreams() {
	// to set the tracking rules

	const rules = await clientV2.v2.streamRules();
	if (rules.data?.length) {
		await clientV2.v2.updateStreamRules({
			delete: { ids: rules.data.map((rule) => rule.id) },
		});
	}

	await clientV2.v2.updateStreamRules({
		add: [{ value: "apod" }],
	});

	const stream = await clientV2.v2.searchStream({
		"tweet.fields": ["referenced_tweets", "author_id"],
		expansions: ["referenced_tweets.id"],
	});

	// console.log(stream);
	// Enable auto reconnect
	// to start the streaming
	stream.autoReconnect = true;

	stream.on(ETwitterStreamEvent.Data, async (tweet) => {
		//Ignore RTs or self-sent tweets
		console.log(tweet.data.text);
		// console.log(dataUrl, dataTitle);

		const isARt =
			tweet.data.referenced_tweets?.some(
				(tweet) => tweet.type === "retweeted"
			) ?? false;
		if (isARt || tweet.data.author_id === clientV2.id_str) {
			return;
		}

		uploaderClient.post(
			"media/upload",
			{ media: imageData },
			function (error, media, response) {
				if (error) {
					console.log(error);
				} else {
					clientV1.v1.reply(
						`Enjoy today's astronomy picture of the day. Title- ${dataTitle}`,
						tweet.data.id,
						{
							media_ids: media.media_id_string,
						}
					);
				}
			}
		);
	});
}

checkNreplyStreams();
