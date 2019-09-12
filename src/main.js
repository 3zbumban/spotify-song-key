const { SpotifyTrackInfo } = require("./searchAudioFeaturesOnSpotify");
const { OAuthToken } = require("../secret");

(async() => {
	console.log(await new SpotifyTrackInfo(OAuthToken).searchSpotify("phil collins"));
})();