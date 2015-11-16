# dragand-subtitle-plugin
Open Source library to get availables subtitles from famous externals apis

## Goals :

### Get Series subtitles
```javascript

  import DragandSubtitles from 'dragand-subtitle-plugin';

  DragandSubtitles.getSerieSubtitles({
    imdbid       : 123445,
    filepath     : "/a/specific/path/to/movie",
    release_group: "LOL",
    episode      : 1,
    season       : 2,
    title        : "Games Of Thrones",
    apis         : ["open-subtitle", "addicted"], // False --> all apis
    languages    : ["fr", "uk"] // || false all availables languages
  })
  .then( subs => {
    res.send(subs);
  });

```

### Get Movies subtitles
```javascript

  import DragandSubtitles from 'dragand-subtitle-plugin';

  DragandSubtitles.getMovieSubtitles({
    imdbid       : 123445,
    filepath     : "/a/specific/path/to/movie",
    title        : "Inception",
    apis         : ["open-subtitle", "addicted"], // False --> all apis
    languages    : ["fr", "uk"] // || false all availables languages
    type         : ["srt"] // || false
    stopOnFind        : true // || stop the request when a subtitle is find
  })
  .then( subs => {
    res.send(subs);
  });

```

### Return json

```javascript
  [
    {
      api: 'open-subtitles',
      subtitles: [
        {
          language: "fr",
          zip: "http://www.something.com/sub.zip",
          srt: "http://www.something.com/sub.srt"
        }
      ]
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

  DragandSubtitles.apis('open-subtitles') -->   // { name: "open-subtitles", etc...}

```
