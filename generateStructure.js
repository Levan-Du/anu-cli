var Promise = require("bluebird"),
    fs = Promise.promisifyAll(require('fs-extra'));


function generateStructure(demoDir, project) {
    return fs.copyAsync(__dirname + '/' + demoDir, project, { clobber: true })
}


module.exports = generateStructure;
