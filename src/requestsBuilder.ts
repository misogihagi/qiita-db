import { getEnv } from "./infra/gas";
import { strategy } from './constants'

function queryBuilder(){
    const idx = parseInt(getEnv('lastIndex')) + 1
    const [from,to] = strategy[idx+1]
    return '&query=' + encodeURIComponent('created:>'+from +' created:<'+ to)
}

interface RequestOption {
    perPage:number
    pageCount:number
    headers:{
        [key: string]: string;
     }
}

export function sendRequests(option:RequestOption){
    const query = queryBuilder()
    const requests = [...Array(option.pageCount)]
      .map((_, i) => {
        return {
          url:
            "https://qiita.com/api/v2/items?page=" +
            (i + 1) +
            "&per_page=" +
            option.perPage +
            query
          ,
          headers:option.headers
      };
    });
      // due to 403 access 1 time by 1 sec
  return requests.flatMap(req=>{
    Utilities.sleep(1000)
    return JSON.parse(UrlFetchApp.fetch(req.url,{headers:req.headers}).getContentText())
  })

}



