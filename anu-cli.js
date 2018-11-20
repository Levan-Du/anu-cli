#!/usr/bin/env node

var program = require('commander'),
    gs = require('./generateStructure');

program
    .version(require('./package.json').version)
    .usage('[options] [project name]')
    .option('--ie', 'generate project to support low ie')
    .parse(process.argv);

var pname = program.args[0],
    demoname = 'anu-demo';
if (program.ie) {
    demoname = "anu-demo-ie8";
}

gs(demoname, pname)
    .then(() => {
        console.log('success');
    })
    .catch(function (err) {
        if (err) return console.error(err)
    });
