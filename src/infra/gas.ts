export function getEnv(key:string):string{
    return PropertiesService.getScriptProperties().getProperty(key)
}
export function setEnv(key:string,value:string|number){
    if(typeof value ==='number')value=value.toString()
    PropertiesService.getScriptProperties().setProperty(key,value)
}

export function setTrigger(name){
    ScriptApp
.newTrigger(name)
.timeBased()
.everyMinutes(5)
.create();
}
