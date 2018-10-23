const fs = require('fs')
const program = require('commander')
const pkg = require('./package.json') 
const commands = require('./commands')(program)


program.
    version(pkg.version).
    description(pkg.description)
    .usage('[options] <command> [...]')
    .option('-o, --host <hostname>', 'hostname [localhost]', 'localhost') 
    .option('-p, --port <number>', 'port number [9200]', '9200') 
    .option('-j, --json', 'format output as JSON')
    .option('-i, --index <name>', 'which index to use')
    .option('-t, --type <type>', 'default type for bulk operations')

// url command
program.
    command('get [path]')
    .description('generate the URL for the options and path (default is /)')
    .action(commands.get)


// create-index command
program.
    command('create-index')
    .alias('ci')
    .description('create an index')
    .action(commands.createIndex)


program.
    command('list-indices')
    .alias('li')
    .description('get a list of indices in this cluster')
    .action(commands.listIndices)


program.parse(process.argv)

if (!program.args.filter(arg => typeof arg === 'object').length) { 
    program.help();
}
