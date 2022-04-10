const ACCESS_TOKEN =
  PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

const GASCharacterLimit=50000
const QiitaCharacterLimit=2000000

const oldestArticleCreated = '2011-09-16'

const auxCol = 20
const reservedRow = {
  start:auxCol,
  end:QiitaCharacterLimit/GASCharacterLimit*2+auxCol
}

const headers = {
  Authorization: "Bearer " + ACCESS_TOKEN,
};

const pageCount = 100; //1-100
const perPage = 100; //1-100

const column = [
  "id",
  "title",
  "body",
  "rendered_body",
  "tags",
  "url",
  "user",
  "created_at",
  "updated_at",
  "got_at",
];

const strategy=
// 1mann wo koeruto bunkatu
//https://github.com/misogihagi/aggregated-qiita-artticles/blob/main/result.csv
  [
  '<2013-01-01',
  ['2013-01-01','2013-06-01'],
  ['2013-06-01','2014-01-01'],
  ['2014-01-01','2014-04-01'],
  ['2014-04-01','2014-07-01'],
  ['2014-07-01','2014-09-01'],
  ['2014-09-01','2014-11-01'],
  ['2014-11-01','2015-01-01'],
  ['2015-01-01','2015-03-01'],
  ['2015-03-01','2015-05-01'],
  ['2015-05-01','2015-07-01'],
  ['2015-07-01','2015-09-01'],
  ['2015-09-01','2015-11-01'],
  ['2015-11-01','2015-12-01'],
  ['2015-12-01','2016-01-01'],
  ['2016-01-01','2016-02-01'],
  ['2016-02-01','2016-03-01'],
  ['2016-03-01','2016-04-01'],
  ['2016-04-01','2016-05-01'],
  ['2016-05-01','2016-06-01'],
  ['2016-06-01','2016-07-01'],
  ['2016-07-01','2016-08-01'],
  ['2016-08-01','2016-09-01'],
  ['2016-09-01','2016-10-01'],
  ['2016-10-01','2016-11-01'],
  ['2016-11-01','2016-12-01'],
  ['2016-12-01','2016-12-15'],
  ['2016-12-15','2017-01-01'],
  ['2017-01-01','2017-02-01'],
  ['2017-02-01','2017-03-01'],
  ['2017-03-01','2017-04-01'],
  ['2017-04-01','2017-05-01'],
  ['2017-05-01','2017-06-01'],
  ['2017-06-01','2017-07-01'],
  ['2017-07-01','2017-08-01'],
  ['2017-08-01','2017-09-01'],
  ['2017-09-01','2017-10-01'],
  ['2017-10-01','2017-11-01'],
  ['2017-11-01','2017-12-01'],
  ['2017-12-01','2017-12-15'],
  ['2017-12-15','2018-01-01'],
  ['2018-01-01','2018-02-01'],
  ['2018-02-01','2018-03-01'],
  ['2018-03-01','2018-04-01'],
  ['2018-04-01','2018-05-01'],
  ['2018-05-01','2018-06-01'],
  ['2018-06-01','2018-07-01'],
  ['2018-07-01','2018-08-01'],
  ['2018-08-01','2018-09-01'],
  ['2018-09-01','2018-10-01'],
  ['2018-10-01','2018-11-01'],
  ['2018-11-01','2018-12-01'],
  ['2018-12-01','2018-12-15'],
  ['2018-12-15','2019-01-01'],
  ['2019-01-01','2019-02-01'],
  ['2019-02-01','2019-03-01'],
  ['2019-03-01','2019-04-01'],
  ['2019-04-01','2019-05-01'],
  ['2019-05-01','2019-06-01'],
  ['2019-06-01','2019-07-01'],
  ['2019-07-01','2019-08-01'],
  ['2019-08-01','2019-09-01'],
  ['2019-09-01','2019-10-01'],
  ['2019-10-01','2019-10-15'],
  ['2019-10-15','2019-11-01'],
  ['2019-11-01','2019-11-15'],
  ['2019-11-15','2019-12-01'],
  ['2019-12-01','2019-12-15'],
  ['2019-12-15','2020-01-01'],
  ['2020-01-01','2020-01-15'],
  ['2020-01-15','2020-02-01'],
  ['2020-02-01','2020-02-15'],
  ['2020-02-15','2020-03-01'],
  ['2020-03-01','2020-03-15'],
  ['2020-03-15','2020-04-01'],
  ['2020-04-01','2020-04-15'],
  ['2020-04-15','2020-05-01'],
  ['2020-05-01','2020-05-15'],
  ['2020-05-15','2020-06-01'],
  ['2020-06-01','2020-06-15'],
  ['2020-06-15','2020-07-01'],
  ['2020-07-01','2020-07-15'],
  ['2020-07-15','2020-08-01'],
  ['2020-08-01','2020-08-15'],
  ['2020-08-15','2020-09-01'],
  ['2020-09-01','2020-09-15'],
  ['2020-09-15','2020-10-01'],
  ['2020-10-01','2020-10-15'],
  ['2020-10-15','2020-11-01'],
  ['2020-11-01','2020-11-15'],
  ['2020-11-15','2020-12-01'],
  ['2020-12-01','2020-12-15'],
  ['2020-12-15','2021-01-01'],
  ['2021-01-01','2021-01-15'],
  ['2021-01-15','2021-02-01'],
  ['2021-02-01','2021-02-15'],
  ['2021-02-15','2021-03-01'],
  ['2021-03-01','2021-03-15'],
  ['2021-03-15','2021-04-01'],
  ['2021-04-01','2021-05-01'],
  ['2021-05-01','2021-06-01'],
  ['2021-06-01','2021-07-01'],
  ['2021-07-01','2021-08-01'],
  ['2021-08-01','2021-09-01'],
  ['2021-09-01','2021-10-01'],
  ['2021-10-01','2021-11-01'],
  ['2021-11-01','2021-12-01'],
  ['2021-12-01','2021-12-15'],
  ['2021-12-15','2022-01-01'],
  ['2022-01-01','2022-02-01'],
  ['2022-02-01','2022-03-01'],
  ['2022-03-01','2022-04-01'],
  '>2022-04-01'
]
function queryBuilder(){
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow()
  if (lastRow <2) return '&query=' +encodeURIComponent('created:'+strategy[0])
console.log(lastRow)
  const lastDate = new Date(sheet.getRange(lastRow, 1+Number(Object.keys(column).find(k=>column[k] === 'created_at'))).getValue())
  const idx = strategy.findIndex(s=>{
    if(typeof s === 'string'){
      const left = new Date(Date.parse(s.slice(1)))
      if(s[0]==='<')return lastDate < left
      if(s[0]==='>')return lastDate > left
    }else{
      const left = new Date(Date.parse(s[0]))
      const right = new Date(Date.parse(s[1]))
      return left < lastDate && lastDate < right
    }
  })
  const [from,to] = strategy[idx+1]
  console.log(from,to)
  return '&query=' + encodeURIComponent('created:>'+from +' created:<'+ to)
}

function getData() {
  const gotAt = new Date().toISOString();
  const query = queryBuilder()
  const requests = [...Array(pageCount)].map((_, i) => {
    return {
      url:
        "https://qiita.com/api/v2/items?page=" +
        (i + 1) +
        "&per_page=" +
        perPage +
        query
      ,
      headers,
    };
  });

  // due to 403 access 1 time by 1 sec
  const responses =   requests.flatMap(req=>{
    Utilities.sleep(1000)
    return JSON.parse(UrlFetchApp.fetch(req.url,{headers:req.headers}).getContentText())
  })

  
  function separate(str) {
    const result = [];
    for (let i = 0; i < str.length; i += GASCharacterLimit) {
      result.push(str.substring(i, i + GASCharacterLimit));
    }
    return result
  }


  const sheet = SpreadsheetApp.getActiveSheet();
  const auxiliary=[]
  const rows = responses.map((r) => {
    let body = r.body
    let renderedBody = r.rendered_body
    const auxRow = new Array(reservedRow.end-reservedRow.start)
    if(body.length > GASCharacterLimit) {
      const separated=separate(body)
      body=separated.length
      for(let i=0;i<body;i++){
        auxRow[i]=separated[i]
      }
    }
    if(renderedBody.length > GASCharacterLimit) {
      const separated=separate(renderedBody)
      renderedBody=separated.length
      for(let i=0;i<renderedBody;i++){ //
        auxRow[i+QiitaCharacterLimit/GASCharacterLimit]=separated[i]
      }
    }
    auxiliary.push(auxRow)
    return [
    r.id,
    r.title,
    body,
    renderedBody,
    JSON.stringify(r.tags),
    r.url,
    r.user.id,
    r.created_at,
    r.updated_at,
    gotAt,
  ]
  });

  const lastRow=sheet.getLastRow()

  sheet.getRange(lastRow+1, 1, rows.length, column.length).setValues(rows);
  sheet.getRange(lastRow+1, auxCol, auxiliary.length, auxiliary[0].length).setValues(auxiliary);
  //このドキュメントはサイズが大きくなりすぎたため、永続的な読み取り専用モードに切り替わりました。直近の変更内容は保存できていません。
}

function init() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1, 1, column.length).setValues([column]);
}



function setTrigger(){
    ScriptApp
  .newTrigger("getData")
  .timeBased()
  .everyMinutes(10)
  .create();
}

