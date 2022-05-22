import fetch from "node-fetch";
import dotenv from "dotenv";
// import pkg from "image-downloader";
// const { downloader } = pkg;
import images from "image-downloader";
dotenv.config({ path: "./config.env" });
let dataUrl, dataTitle;
let APIKEY = process.env.NASA_APIKEY;
let url = "https://api.nasa.gov/planetary/apod?api_key=";
function fetchTodaysData() {
	let result = fetch(`${url}${APIKEY}`)
		.then((response) => response.json())
		.then((data) => {
			useData(data);
		});
	return result;
}
function useData(data) {
	dataUrl = data.url;
	dataTitle = data.title;
	let options = {
		url: dataUrl,
		dest: "E:/Programming/webdev/apod_bot_twitter/images/photo.jpg", // will be saved to ./images/photo.jpg
	};

	images
		.image(options)
		.then(({ filename }) => {
			console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
		})
		.catch((err) => console.error(err));
}

fetchTodaysData();
export { dataUrl, dataTitle };
