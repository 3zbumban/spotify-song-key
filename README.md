# spotify-song-key

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> search for songs and get thier audio-features

## Install

```sh
npm i
```

## Usage

```js
class SpotifyTrackInfo {
    constructor(OAuthToken) {
            async getAudioFeatures(id) {
                    ...
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

                    async searchSpotify(query, offset = 0, limit = 5, type = "track") {
                            ...
                                return [{
                                    album: albumTitle,
                                    title: title,
                                    id: id,
                                    audioFeatures: audioFeatures,
                                    href: track.href,
                                    uri: track.uri,
                                    popularity: `${track.popularity}/100`
                                }, {
                                    ...
                                }, ...];

                            }
                            ...
                    };
```

## Author

**3zbumban**

* Github: [@3zbumban](https://github.com/3zbumban)

## Show your support

Give a ⭐️ if this project helped you!
