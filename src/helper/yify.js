/**
 * Export yify helper
 */
export class yifyHelper {

  /* Map language */
  static languageMapping(language) {

    const mapping = {
      'albanian'     : 'sq',
      'arabic'       : 'ar',
      'bengali'      : 'bn',
      'bulgarian'    : 'bg',
      'bosnian'      : 'bs',
      'chinese'      : 'zh',
      'croatian'     : 'hr',
      'czech'        : 'cs',
      'danish'       : 'da',
      'dutch'        : 'nl',
      'english'      : 'en',
      'estonian'     : 'et',
      'farsi-persian': 'fa',
      'finnish'      : 'fi',
      'french'       : 'fr',
      'german'       : 'de',
      'greek'        : 'el',
      'hebrew'       : 'he',
      'hungarian'    : 'hu',
      'indonesian'   : 'id',
      'italian'      : 'it',
      'japanese'     : 'ja',
      'korean'       : 'ko',
      'lithuanian'   : 'lt',
      'macedonian'   : 'mk',
      'malay'        : 'ms',
      'norwegian'    : 'no',
      'polish'       : 'pl',
      'portuguese'   : 'pt',
      'romanian'     : 'ro',
      'russian'      : 'ru',
      'serbian'      : 'sr',
      'slovenian'    : 'sl',
      'spanish'      : 'es',
      'swedish'      : 'sv',
      'thai'         : 'th',
      'turkish'      : 'tr',
      'urdu'         : 'ur',
      'ukrainian'    : 'uk',
      'vietnamese'   : 'vi'
    };

    for(let key in mapping) {
      if(mapping[key] === language) {
        return key;
      }
    }

  }

}
