# dragand-subtitle-plugin
Open Source library to get availables subtitles from famous externals apis for

## Getting Started

### Import
```javascript

  import DragandSubtitles from 'dragand-subtitle-plugin';

  // Initialisation and exclude some apis
  DragandSubtitles({
    /* You can specify some apis you exclude */
    exclude: ["open-subtitles", "addicted"]
  });

```

### Get Series subtitles
```javascript

  /** Example
  * Serie
  * Getting subtitles from OpenSubtitles and addict7d
  * Get them on french and english UK
  */
  DragandSubtitles.getSerieSubtitles({
    imdbid       : "tt0898266",
    filepath     : "YOUR_FILE_PATH",
    release_group: "LOL",
    episode      : 1,
    season       : 1,
    title        : "The Big Bang Theory",
    apis         : ["open-subtitle", "addict7d"]
    languages    : ["fr", "uk"]
  })
  .then( subs => {
    res.send(subs);
  });

```

### Get Movies subtitles
```javascript

  /** Example
  * Movie
  * Getting subtitles from OpenSubtitles and addict7d
  * Get them with all available languages
  */
  DragandSubtitles.getMovieSubtitles({
    imdbid       : "tt1375666",
    filepath     : "YOUR_FILE_PATH",
    title        : "Inception",
    apis         : ["open-subtitle", "addict7d"]
  })
  .then( subs => {
    res.send(subs);
  });

```

### Return json

All returned subtitles looks like that
```javascript
  [     
    {
      language: "fr",
      type: "srt",
      url: "http://www.something.com/sub.srt",
      api: 'open-subtitles'
    }
  ]
```

### API

Get all availables apis
```javascript

  DragandSubtitles.apis() -->  // ["open-subtitles", "addicted"];

```

Get all infos about a specific api
```javascript

  DragandSubtitles.api('open-subtitles') -->   // { name: "open-subtitles", etc...}

```

```javascript

  DragandSubtitles.credits() -->   // List all contributors from package.json

```


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
