import {stringify} from 'csv-stringify/sync'

import { getEnv, setEnv,setTrigger } from './infra/gas'
import { getFile,createFile,readFile,writeFile } from './infra/drive'
import {sendRequests} from './requestsBuilder'

const ACCESS_TOKEN = getEnv('ACCESS_TOKEN')
const CSVFileName='qiita-db.csv'


const pageCount = 1; //1-100
const perPage = 100; //1-100

  
export  function refresh() {
    const gotAt = new Date().toISOString();
    const headers = {
        Authorization: "Bearer " + ACCESS_TOKEN,
    };
      
    const responses = sendRequests({
        pageCount,
        perPage,
        headers
    })
    const rows = responses.map((r) => {
        return [
        r.id,
        r.title,
        r.body,
        r.rendered_body,
        JSON.stringify(r.tags),
        r.url,
        r.user.id,
        r.created_at,
        r.updated_at,
        gotAt,
      ]
    });
    const file=getFile(getEnv('CSV_ID'))
    const presentData=readFile(file)
    writeFile(file,presentData+stringify(rows))
    setEnv('lastIndex', parseInt(getEnv('lastIndex')) + 1)
    //このドキュメントはサイズが大きくなりすぎたため、永続的な読み取り専用モードに切り替わりました。直近の変更内容は保存できていません。
}
  
export function init() {
    const file = createFile(CSVFileName)
    setEnv('CSV_ID',file.id)
    setTrigger('refresh')
  }
