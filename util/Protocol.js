
const getProtocol = (status, route, data = []) => {
    return JSON.stringify({status, route, data});
}

module.exports = {
    getProtocol: getProtocol
}