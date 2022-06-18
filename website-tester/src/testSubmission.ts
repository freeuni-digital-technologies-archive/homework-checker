import { WebTester} from "./webTester";
import { program } from 'commander'

program
    .requiredOption('-t, --test-file <testFile>', 'test file')
    .requiredOption('-f, --file <file>', 'submission file')
program.parse(process.argv)

const tester = new WebTester({targetFiles: ['index.html'], testsLocation: ''})
const res = tester.testSubmission(program.file, false)

if (process.send) {
    process.send(res)
    tester.finish()
} else {
    console.log(JSON.stringify(res, null, '\t'))
}
