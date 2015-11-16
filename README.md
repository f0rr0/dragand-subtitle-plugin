# dragand-subtitle-plugin
Open Source library to get availables subtitles from famous externals apis

## Goals :

### Get Series subtitles
```javascript

  import DragandSubtitles from 'dragand-subtitle-plugin';

  DragandSubtitles.getSerieSubtitles({
    imdbid       : 123445,
    release_group: "LOL",
    episode      : 1,
    season       : 2,
    title        : "Games Of Thrones",
    apis         : ["open-subtitle", "addicted"], // False --> all apis
    languages    : ["fr", "arabe"] // || false all availables languages
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
    title        : "Inception",
    apis         : ["open-subtitle", "addicted"], // False --> all apis
    languages    : ["fr", "arabe"] // || false all availables languages
  })
  .then( subs => {
    res.send(subs);
  });

```
