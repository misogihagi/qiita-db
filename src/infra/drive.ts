interface CSVFile {
    id:string,
    getBlob()
}

export function getFile(key):CSVFile{
    const file=DriveApp.getFileById(key)
    file['id']=file.getId()
    return file as unknown as CSVFile
}

export function createFile(name,data?):CSVFile{
    const file=DriveApp.createFile(name, data)
    file['id']=file.getId()
    return file as unknown as CSVFile
}

export function readFile(file:CSVFile){
    return file.getBlob().getDataAsString()
}    

export function writeFile(file:CSVFile){
    return file.getBlob().getDataAsString()
}    
