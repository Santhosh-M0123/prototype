const shortid = require("shortid");

const GenerateShortId = () => {
    let id = shortid();
    return id
}

module.exports = GenerateShortId;