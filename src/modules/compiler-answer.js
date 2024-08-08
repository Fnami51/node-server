const getErrorTime = require('./error-time.js')

function getContentType (type) {
    return `Content-Type: ${type}` 
}

function getStatusMessage(statusCode) {
    switch (statusCode) {
        case 200: return "OK";
        case 400: 
            console.error('Error ', getErrorTime(), ' - ', `Status code ${statusCode}: Не передано имя в ссылке запороса`)
            return "Bad Request";
        case 500: 
            console.error('Error ', getErrorTime(), ' - ', `Status code ${statusCode}: Неверное обращение к серверу или сервер не работает`)
            return "Internal Server Error";
        default: 
            return `Your request status code: ${statusCode}`;
    }
}

function compiler (response, statusCode, contenType, answer) {
    if (!response) {
        console.error('Error ', getErrorTime(), ' - ', 'Объект response не определен.')
        return
    }
    response.status = statusCode
    response.statusMessage = getStatusMessage(statusCode)
    response.header = getContentType(contenType)
    response.write(answer)
    response.end()
}

module.exports = compiler;