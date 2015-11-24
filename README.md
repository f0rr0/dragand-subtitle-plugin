# dragand-subtitle-plugin
Open Source library to get subtitles from famous externals apis like OpenSubtitles, Addic7ed, Yify subtitles or Podnapisi.

We use it on the Dragand Application download at http://www.dragand.watch

## Getting Started

### Import
  - ES6

    ```javascript

      import {DragandSubtitles} from 'dragand-subtitle-plugin';

      /* Initialisation */
      let DS = DragandSubtitles();

    ```

  - ES5

    ```javascript

      var DS = require('dragand-subtitle-plugin').DragandSubtitles();

    ```

### Get Series/Movies informations
```javascript

  /** Example
  *
  * Get file informations
  *
  * @param {string} fileName
  * @param {string} TheMovieDbKey (https://www.themoviedb.org/)
  */
  DS.getInformations('scorpion.210.hdtv-lol[ettv].mp4', TheMovieDbKey)
  .then( data => {
    res.send(data);
  });

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

All file informations looks like that

```javascript
{
  file : {
    type         : 'episode',
    container    : 'mp4',
    season       : 2,
    releaseGroup : 'lol[ettv]',
    episodeNumber: 10,
    mimetype     : 'video/mp4',
    series       : 'scorpion',
    format       : 'HDTV'
  },
  media : {
    title        : 'Scorpion',
    years        : 2014,
    poster       : 'http://image.tmdb.org/t/p/original/tIViOJS2eoDmktDEx29gXr3Ebhe.jpg',
    largePoster  : 'http://image.tmdb.org/t/p/original/k8rwHWaLm32pVZjdUHZgTK5hE5w.jpg',
    overview     : 'Based on a true story, Scorpion is a high-octane drama about eccentric genius Walter O’Brien and his team of brilliant misfits who comprise the last line of defense against complex, high-tech threats of the modern age. As Homeland Security’s new think tank, O’Brien’s “Scorpion” team includes Toby Curtis, an expert behaviorist who can read anyone; Happy Quinn, a mechanical prodigy; and Sylvester Dodd, a statistics guru.',
    imdbId       : 'tt3514324'
  }
}

```

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
