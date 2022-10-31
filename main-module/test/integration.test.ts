import {HwConfig} from "../src/homework";
import {RunOpts} from "../src/runs";
import {check} from "../src";

describe('', () => {
    it('run hw3 test with using main test',  () => {
        const fakeConfigHw4: HwConfig = {
            id: 'hw3',
            name: 'დავალება 3',
            module: 'karel',
            deadline: '2022-10-28',
            dataDir: '../../data',
            configPath: '../dt-homeworks/hw3/config.js',
            testFileName: 'hw3tester.js',
            emailTemplates: {}
        };
        const fakeRunOpts: RunOpts = {
            trial: false,
            restart: false,
            rerun: false,
            continue: null,
            omit:  [''],
            slice: 10,
            download: false
        };
        return check(fakeConfigHw4, fakeRunOpts)
            .then(output => {
                expect(output.error).length(0)
            })
            .catch((ex) => {
                console.log(ex)
                expect(ex).to.be.null
            });
    }).timeout(20000)
})
