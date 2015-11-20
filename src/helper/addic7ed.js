import request from 'request';
import cheerio from 'cheerio';
import natural from 'natural';
import moment from 'moment';
import fs from 'fs';
import Q from 'q';

/**
 * Export Addic7ed helper
 */
export class addic7edHelper {

  /* Map language */
  static languageMapping(language) {

    const mapping = {
      'sq'   : '52',
      'ar'   : '38',
      'arm'  : '50',
      'az'   : '48',
      'bn'   : '47',
      'bs'   : '44',
      'bg'   : '35',
      'ca'   : '12',
      'cn'   : '41',
      'zh'   : '24',
      'hr'   : '31',
      'cs'   : '14',
      'da'   : '30',
      'nl'   : '17',
      'en'   : '1',
      'est'  : '54',
      'eu'   : '13',
      'fi'   : '28',
      'fr'   : '8',
      'fr-ca': '53',
      'gl'   : '15',
      'de'   : '11',
      'el'   : '27',
      'he'   : '23',
      'hin'  : '55',
      'hu'   : '20',
      'ice'  : '56',
      'id'   : '37',
      'it'   : '7',
      'ja'   : '32',
      'ko'   : '42',
      'lav'  : '57',
      'lit'  : '58',
      'mk'   : '49',
      'ms'   : '40',
      'no'   : '29',
      'fa'   : '43',
      'pl'   : '21',
      'pt'   : '9',
      'pt-br': '10',
      'ro'   : '26',
      'ru'   : '19',
      'sr'   : '39',
      'sr-la': '36',
      'sk'   : '25',
      'sl'   : '22',
      'es'   : '4',
      'es-la': '6',
      'es-es': '5',
      'sv'   : '18',
      'tam'  : '59',
      'th'   : '46',
      'tr'   : '16',
      'ukr'  : '51',
      'vi'   : '45'
  	};

    return mapping[language];
  }

  /* Check if the subtitles is ready */
  static getStatus(string) {
    if(string === 'Completed') {
      return 100;
    }

    return parseInt(string.replace(' Completed', '').replace('%', ''));
	}

  /* Check if the release file */
  static compareReleaseGroup(releaseFile, releaseAddic7ed) {

    releaseFile 	  = releaseFile.toLowerCase();
    releaseAddic7ed = releaseAddic7ed.toLowerCase();

    if(releaseFile === releaseAddic7ed) {
      return true;
    } else {
      const diceScore = natural.DiceCoefficient(releaseFile, releaseAddic7ed);

      return (diceScore >= 0.5) ? true : false;
    }

	}

  /* Scrapping addicted website and export data */
  static scrapping() {

    let deferred = Q.defer();
    let fileName = __dirname + '/cache.json';
    let shows    = [];

    fs.stat(fileName, (error, stats) => {

      /* Check expiration */
      let old = false;
      if(stats) {
        let birth     = moment(stats.birthtime);
        let last_week = moment().add(-8, 'days');
        old = birth.isSame(last_week, 'day');
      }

      /* File not exist */
      if (!stats || old) {

        /* Making the request */
        request('http://www.addic7ed.com/shows.php', (error, response, body) => {
          if(!error && response.statusCode === 200) {
            let $ = cheerio.load(body);
            $('h3 > a').each(function(index, element){
              shows.push({
                name: $(element).text(),
                id  : /\d+/.exec($(element).attr('href'))[0]
              });
            });

            /* Write all shows in a cache.json */
            fs.writeFile(fileName, JSON.stringify(shows));

          }

          return deferred.resolve(shows);

        });

      }else {
        deferred.resolve(JSON.parse(fs.readFileSync(fileName, 'utf8')));
      }


    });

    return deferred.promise;

  }

  static getSerieId(addic7edSeriesMapping, serieName) {

    let deferred = Q.defer();
    let serieId  = null;
    let matches  = [];

    Object.keys(addic7edSeriesMapping).forEach((serie) => {

      let currentSerieName = addic7edSeriesMapping[serie].name;

      if(currentSerieName.toLowerCase() === serieName.toLowerCase()) {
        serieId = addic7edSeriesMapping[serie].id;
      } else {
        matches.push({
          name  : currentSerieName,
          id    : addic7edSeriesMapping[serie].id,
          score : natural.DiceCoefficient(currentSerieName, serieName)
        });
      }

    });

    /* If we haven't find the serie, check with the score */
    if(!serieId) {

      matches.sort( (a, b) => {
        return b.score - a.score;
      });

      if(matches[0].score >= 0.8) {
        return deferred.resolve(matches[0].id);
      }

      return deferred.reject();
    }

    /* If we have the serie */
    deferred.resolve(serieId);

    return deferred.promise;
  }

  static getSubs(options, counter, cb, subs = []) {

    /* Exit Point */
    if(counter < 0) {
      return cb(subs);
    }

    const languageId = this.languageMapping(options.languages[counter]);

    request(`http://addic7ed.com/ajax_loadShow.php?show=${options.serieId}&season=${options.season}&langs=|${languageId}|`, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        let $ = cheerio.load(body);

        $('div#season tbody tr.epeven.completed').each((i, row) => {
          const columns = $(row).find('td');
          const percent = this.getStatus($(columns[5]).text());

          if($(columns[1]).text() === String(options.episode) && this.compareReleaseGroup(options.releaseGroup, $(columns[4]).text())) {

            if(percent >= 90) {
              subs.push({
                language    : options.languages[counter],
                releaseGroup: $(columns[4]).text(),
                url         : $(columns[9]).find('a').first().attr('href')
              });
            }

          }

        });
      }

      this.getSubs(options, counter - 1, cb, subs);
    });

  }

}
