var rp = require("request-promise-native")

module.exports.getReqDO = async function (path, key) {
        return rp({
            method: "GET",
            uri: `https://api.digitalocean.com/v2${path}`,
            headers: {
                Authorization: `Bearer ${key}`,
                "Content-Type": "application/json"
            },
            json: true
        });
}