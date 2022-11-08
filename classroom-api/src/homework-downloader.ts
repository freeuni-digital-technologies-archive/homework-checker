const { program } = require('commander')

program.description('Download all homework from the class into the specified folder')
    .requiredOption('-c, --class <string>', 'class name')
    .requiredOption('-h, --hw <string>', 'name of homework in the classroom')
    .requiredOption('-p, --path <string>', 'directory to store homework')

program.parse()

const opts = program.opts()
console.log(opts)
