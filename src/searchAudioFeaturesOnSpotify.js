const fetch = require("node-fetch");
// const { OAuthToken } = require("../secret");

// const headers = {
//     "Content-Type": "application/json" ,
//     "Authorization": `Bearer ${OAuthToken}`
// };

const pitchToKey = {
	0: "C",
	1: "C♯/D♭",
	2: "D",
	3: "D♯/E♭",
	4: "E",
	5: "F",
	6: "F♯/G♭",
	7: "G",
	8: "G♯/A♭",
	9: "A",
	10: "A♯/B♭",
	11: "B",
	"-1": false
};

const toMode = {
	0: "minor",
	1: "major",
	"-1": false
};


// async function getAudioFeatures(id) {
//     try {
//         // docs: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
//         const audioFeaturesEndpoint = `https://api.spotify.com/v1/audio-features/${id}`;
//         const res = await fetch(audioFeaturesEndpoint, {method: "GET", headers: headers});
//         const json = await res.json();
//         if(json.error) {throw Error(json.error.message)};
//         const key = pitchToKey[json["key"]];
//         const mode = toMode[json["mode"]];
//         return {
//             key: key, 
//             mode: mode, 
//             string: `${key} ${mode}`,
//             loudness: json["loudness"],
//             danceability: json["danceability"],
//             energy: json["energy"],
//             speechiness: json["speechiness"],
//             acousticness: json["acousticness"],
//             instrumentalness: json["instrumentalness"],
//             liveness: json["liveness"],
//             valence: json["valence"],
//             tempo: json["tempo"],
//             uri: json["uri"],
//             duration_ms: json["duration_ms"]
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function searchSpotify(query, offset=0, limit=5, type="track") {
//     try {
//         // docs: https://developer.spotify.com/documentation/web-api/reference/search/search/
//         let result = [];
//         const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}&offset=${offset}`;
//         const res = await fetch(searchEndpoint, {method: "GET", headers: headers});
//         const json = await res.json();
//         if(!json.tracks) {throw Error(json.error.message)};
//         const tracks = json["tracks"]["items"];
//         for(const track of tracks) {
//             const albumTitle = track.album.name;
//             const title = track.name;
//             const id = track.id;
//             const audioFeatures = await getAudioFeatures(id);
//             // console.log("track:", track);
//             result.push({
//                 album: albumTitle, 
//                 title: title, 
//                 id: id, 
//                 audioFeatures: audioFeatures, 
//                 href: track.href, 
//                 uri: track.uri, 
//                 popularity: `${track.popularity}/100`
//             });
//         }
//         return result;
//     } catch (error) {
//         console.error(error);
//     }
// }

class SpotifyTrackInfo {
	constructor(OAuthToken) {
		this.OAuthToken = OAuthToken;
		this.headers = {
			"Content-Type": "application/json" ,
			"Authorization": `Bearer ${this.OAuthToken}`
		};
	}
	async getAudioFeatures(id) {
		try {
			// docs: https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
			const audioFeaturesEndpoint = `https://api.spotify.com/v1/audio-features/${id}`;
			const res = await fetch(audioFeaturesEndpoint, {method: "GET", headers: this.headers});
			const json = await res.json();
			if(json.error) {throw Error(json.error.message);}
			const key = pitchToKey[json["key"]];
			const mode = toMode[json["mode"]];
			return {
				key: key, 
				mode: mode, 
				string: `${key} ${mode}`,
				loudness: json["loudness"],
				danceability: json["danceability"],
				energy: json["energy"],
				speechiness: json["speechiness"],
				acousticness: json["acousticness"],
				instrumentalness: json["instrumentalness"],
				liveness: json["liveness"],
				valence: json["valence"],
				tempo: json["tempo"],
				uri: json["uri"],
				duration_ms: json["duration_ms"]
			};
		} catch (error) {
			console.log(error);
		}
	}
    
	async searchSpotify(query, offset=0, limit=5, type="track") {
		try {
			// docs: https://developer.spotify.com/documentation/web-api/reference/search/search/
			let result = [];
			const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}&offset=${offset}`;
			const res = await fetch(searchEndpoint, {method: "GET", headers: this.headers});
			const json = await res.json();
			if(!json.tracks) {throw Error(json.error.message);}
			const tracks = json["tracks"]["items"];
			for(const track of tracks) {
				const albumTitle = track.album.name;
				const title = track.name;
				const id = track.id;
				const audioFeatures = await this.getAudioFeatures(id);
				result.push({
					album: albumTitle, 
					title: title, 
					id: id, 
					audioFeatures: audioFeatures, 
					href: track.href, 
					uri: track.uri, 
					popularity: `${track.popularity}/100`
				});
			}
			return result;
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = {
	// searchSpotify,
	SpotifyTrackInfo
};