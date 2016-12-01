const fs = require('fs')
const Table = require('cli-table')

const firstColWidth = 25
const secondColWidth = 75

module.exports.logScripts = function() {
  var table = new Table({
    head: ['Name', 'Command'],
    colWidths: [firstColWidth, secondColWidth]
  });

  fs.readFile('package.json', function (err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(`Can't find package.json in this folder 😣`)
        process.exit()
      }
      throw err
    }

    const packageJson = JSON.parse(data.toString())
    const scripts = packageJson.scripts
    const scriptNames = Object.keys(scripts)
    
    scriptNames.forEach(name => table.push([name, scripts[name].substring(0, secondColWidth)]))
    
    console.log(table.toString());  
  })
}