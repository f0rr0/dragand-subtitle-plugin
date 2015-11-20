import request from 'request';
import parser from 'xml2json';
import Q from 'q';

/**
 * Export Addic7ed helper
 */
export class podnapisiHelper {

  static getSubs(options, counter, cb, subs = []){

    /* Exit Point */
    if(counter < 0) {
      return cb(subs);
    }

    let requestUrl;
    const language = options.languages[counter];

    if(options.type == 'serie'){
      requestUrl = `http://www.podnapisi.net/subtitles/search/old?sL=${language}&sK=${options.title}&sTS=${options.season}&sTE=${options.episode}&sXML=1`;
    } else {
      requestUrl = `http://www.podnapisi.net/subtitles/search/old?sL=${language}&sK=${options.title}&sXML=1`;
    }

    request(requestUrl, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        body = JSON.parse(parser.toJson(body));
        if(body.results.pagination.results > 0){
          body.results.subtitle.forEach((sub) => {
            subs.push(sub);
          });
        }
      }

      this.getSubs(options, counter - 1, cb, subs);
    });

  }

}
