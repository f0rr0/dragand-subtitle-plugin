# dragand-subtitle-plugin
Open Source library to get availables subtitles from famous externals apis

# How to dev with use
```shell
$ git clone https://github.com/DragAndWatch/dragand-subtitle-plugin.git
$ cd dragand-subtitle-plugin

<!-- Test -->
$ npm test

<!-- Build Dist -->
$ npm run build
```


## Goals :

### Getting Started

```javascript

  import DragandSubtitles from 'dragand-subtitle-plugin';

  // Initialisation and exclude some apis
  DragandSubtitles({
    exclude: ["open-subtitles", "addicted"]
  });

```

### Get Series subtitles
```javascript

  DragandSubtitles.getSerieSubtitles({
    imdbid       : 123445,
    filepath     : "filepath",
    release_group: "LOL",
    episode      : 1,
    season       : 2,
    title        : "Games Of Thrones",
    apis         : ["open-subtitle", "addict7d"], // False --> all apis
    languages    : ["fr", "uk"] // || false all available languages
  })
  .then( subs => {
    res.send(subs);
  });

```

### Get Movies subtitles
```javascript

  DragandSubtitles.getMovieSubtitles({
    imdbid       : 123445,
    filepath     : "filepath",
    title        : "Inception",
    apis         : ["open-subtitle", "addict7d"], // False --> all apis
    languages    : ["fr", "uk"] // || false all available languages
    type         : ["srt"] // || false
    stopOnFind   : true // || stop the request when a subtitle is find
  })
  .then( subs => {
    res.send(subs);
  });

```

### Return json

```javascript
  [     
    {
      language: "fr",
      type: "srt",
      url: "http://www.something.com/sub.srt",
      api: 'open-subtitles',
    }
  ]
```

### Ideas Methods

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
