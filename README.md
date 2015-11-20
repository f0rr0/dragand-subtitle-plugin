# dragand-subtitle-plugin
Open Source library to get subtitles from famous externals apis like OpenSubtitles, Addic7ed, Yify subtitles or Podnapisi.

## Getting Started

### Import
```javascript

  import {DragandSubtitles} from 'dragand-subtitle-plugin';

  /* Initialisation */
  let DS = DragandSubtitles();

```

### Get Series subtitles
```javascript

  /** Example
  * Serie
  * Get subtitles from all apis
  * Get french and english UK
  */
  DS.getSerieSubtitles({
    imdbId      : 'tt3749900',
    filePath    : '/Users/<YOU_USER>/Desktop/gotham.209.hdtv-lol\[ettv\].mp4',
    fileName    : 'gotham.209.hdtv-lol[ettv].mp4',
    title       : 'Gotham',
    languages   : ["fr", "en"],
    episode     : 9,
    season      : 2,
    releaseGroup: 'lol'
  })
  .then( subs => {
    res.send(subs);
  });

```

### Get Movies subtitles
```javascript

  /** Example
  * Movie
  * Get subtitles from OpenSubtitles and addic7ed only
  * Get only french
  */
  DS.getMovieSubtitles({
    imdbid       : "tt1375666",
    filepath     : "YOUR_FILE_PATH",
    title        : "Inception",
    apis         : ["open-subtitle", "addict7ed"]
    languages    : ["fr"]
  })
  .then( subs => {
    res.send(subs);
  });

```

### Return json

All returned subtitles looks like that
```javascript
{
  en:
    [
      {
        type: 'srt',
        language: 'en',
        url: 'http://dl.opensubtitles.org/en/download/filead/src-api/vrf-19ec0c5f/sid-tu1tu3mi30l5si6vonfa6pnrk1/1954966725.srt',
        api: 'open-subtitles'
      },
      {
        type: 'srt',
        language: 'en',
        url: 'http://addic7ed.com/updated/1/106170/0',
        api: 'addic7ed'
      },
      {
        type: 'srt',
        language: 'en',
        url: 'http://addic7ed.com/updated/1/106170/1',
        api: 'addic7ed'
      }
    ],
  fr:
    [
      {
        type: 'srt',
        language: 'fr',
        url: 'http://dl.opensubtitles.org/en/download/filead/src-api/vrf-19ed0c62/sid-tu1tu3mi30l5si6vonfa6pnrk1/1954967439.srt',
        api: 'open-subtitles'
      },
      {
        type: 'srt',
        language: 'fr',
        url: 'http://addic7ed.com/updated/8/106170/0',
        api: 'addic7ed'
      }
    ]
}

```

### External Apis

  - #### Open subtitles
    - Types: Movies & Series
    - Parameters:
      - Serie: [ 'languages', 'imdbId', 'fileName', 'filePath', 'season', 'episode' ]
      - Movie: [ 'languages', 'imdbId', 'fileName', 'filePath' ]

  - #### Addic7ed
    - Types: Series
    - Parameters:
      - Serie: [ 'languages', 'title', 'episode', 'season', 'releaseGroup' ]

  - #### Yify subtitles
    - Types: Movies
    - Parameters:
      - Movie: ['languages', 'imdbId']

  - #### Podnapisi
    - Types: Movies & Series
    - Parameters:
      - Serie: ['languages', 'title', 'episode', 'season']
      - Movie: ['languages', 'title']

### API


```javascript

  DS.getSeriesSubtitles() -->  // promise;

```

```javascript

  DS.getMoviesSubtitles() -->  // promise;

```

Get all apis names
```javascript

  DS.apis() -->  // [];

```

Get all infos about a specific api
```javascript

  DS.api('open-subtitles') -->   // {}

```

```javascript

  DS.credits() -->   // List all contributors

```

# Next version

- Get all languages for a subtitles
- Resolve until one finished
- New apis

# Contribute

Be sure to test all your modifications.

```shell
$ git clone https://github.com/DragAndWatch/dragand-subtitle-plugin.git
$ cd dragand-subtitle-plugin

<!-- Build Dist -->
$ npm run build

<!-- Test -->
$ npm test

```
