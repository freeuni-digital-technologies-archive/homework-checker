import {
    filterSubmissions,
    getSubmissionsWithResults,
    processSubmissions,
    setSubmissionModule,
    sliceSubmissions
} from "../src/homeworkChecker";

import {expect} from "chai";
import {Run} from "../src/runs";

import {anything, instance, mock, when} from "ts-mockito";
import {HwConfig} from "../src/homework";
import {Submission} from "dt-types";
import * as path from "path";


const hw: HwConfig = {
    id: "hwx",
    name: "hwxname",
    module: 'karel',
    configPath: '',
    deadline: "2001-01-01",
    testFileName: "testFileName",
}


describe("homework checker Tests",() => {

    it("Slice Submissions Functionality Test",(done) => {
        /* UNDEFINED SLICE */
        let slice: number | undefined = undefined;

        const submissions: any[] = [ 1, 2, 3]

        let result = sliceSubmissions(submissions,slice);

        expect( 3 == result.length ).to.be.true;

        /* MIDDLE SLICE */

        slice = 1;

        result = sliceSubmissions(submissions,slice);

        expect( 1 == result.length ).to.be.true


        /* OUTER SLICE */
        slice = 5;

        result = sliceSubmissions(submissions,slice);

        expect( 3 == result.length).to.be.true;
        
        done();
    })

    it("Filter Submissions Functionality Test 1",(done) => {
        let run: Run = mock(Run);

        let submission: any = { emailId: "emailId1" };

        when(run.forceCheck(submission)).thenReturn(false);
        when(run.newSubmission(submission)).thenReturn(false);
        
        let actualInstanceOfRun = instance(run);


        expect( 0 == filterSubmissions([submission],actualInstanceOfRun,hw).length ).to.be.true;
        
        done();
    })

    it("Filter Submissions Functionality Test 2",(done) => {
        let run: Run = mock(Run);

        let submission: any = { emailId: "emailId1" };

        when(run.forceCheck(submission)).thenReturn(true);
        when(run.newSubmission(submission)).thenReturn(false);

        let actualInstanceOfRun = instance(run);


        expect(1 == filterSubmissions([submission],actualInstanceOfRun,hw).length ).to.be.true;

        hw.skip = [submission];

        expect(0 == filterSubmissions([submission],actualInstanceOfRun,hw).length ).to.be.false;
        
        done();
    })

    it("Filter Submissions Functionality Test 3",(done) => {
        let run: Run = mock(Run);

        let submission: any = { emailId: "emailId1" };

        when(run.forceCheck(submission)).thenReturn(false);
        when(run.newSubmission(submission)).thenReturn(true);

        hw.skip = []
        let actualInstanceOfRun = instance(run);


        expect(1 == filterSubmissions([submission],actualInstanceOfRun,hw).length ).to.be.true;
        
        hw.skip = [submission];

        expect(0 == filterSubmissions([submission],actualInstanceOfRun,hw).length ).to.be.false;

        done();
    })

    it("Filter Submissions Functionality Test 4",(done) => {
        let run: Run = mock(Run);

        let submission: any = { emailId: "emailId1" };

        
        when(run.forceCheck(submission)).thenReturn(true);
        when(run.newSubmission(submission)).thenReturn(true);

        let actualInstanceOfRun = instance(run);

        hw.skip = []

        expect(1 == filterSubmissions([submission],actualInstanceOfRun,hw).length ).to.be.true;
        
        hw.skip = [submission];

        expect(0 == filterSubmissions([submission],actualInstanceOfRun,hw).length ).to.be.false;

        done();

    });

    it("Finish Submissions Test ( False Force Check && Submission Does Not Qualify )", () => {
        const run: Run = mock(Run);

        when(run.forceCheck(anything())).thenReturn(false);
        
        const submissions: any = [
            {
                qualifies: () => { return false },
                attachment: "attach1"
            },
            {
                qualifies: () => { return false },
                attachment: "attach2"
            }
        ];
        setSubmissionModule({
            id: '',
            name: '',
            module: 'karel',
            deadline: '',
            subject: '_',
            testFileName: '',
            configPath: '',
        })
        return processSubmissions(submissions,"",null,instance(run),null).then(results => {
            for(let i=0; i < results.length; i++){
                expect(results[i].attachment).to.equal(submissions[i].attachment);
            }
        })
    })

    function mockRunForFinishSubmissionTest(){
        const run: Run = mock(Run);
        when(run.forceCheck(anything())).thenReturn(true);

        let runInstance: Run = instance(run);
        runInstance.moveDir = path.resolve(__dirname,"./files/integrationTest/submissionFiles")
        runInstance.opts = { download: true, omit: null }

        return runInstance;
    }

    function createFakeSaveFileFunction(){
        return function(first,second,third){
            return new Promise((resolve,reject) => {
                resolve("");
            });
        }
    }

    function getSubmissionsAndResults(){
        return require(path.resolve(__dirname,"./files/integrationTest/submissionsAndResults.js"));
    }

    function findResultInSamples(submissionsAndResultsJS, identifier: string, id: string){
        return submissionsAndResultsJS.results[identifier].find(result => result.id == id);
    }

    async function getTestResultsForSubmissions(submissions){

        let runInstance = mockRunForFinishSubmissionTest();

        const fakeSaveFile = createFakeSaveFileFunction();

        const results: Submission[] = await Promise.all(submissions.map((submission) => {
            const hwId: string = submission.hwId;
            const testPath = path.resolve(__dirname,`../resources/hw2tester.js`);
            const sbmssn: Submission = fromResponse(submission);
            
            return processSubmissions([sbmssn],testPath,null,runInstance,fakeSaveFile)
                .then(s => s[0])
        }))
        return results;
    }


    function createFakeGetSubmissionsFunction(returnSubmissions: Submission[]){
        return function(a: string, b: string){
            return Promise.all(returnSubmissions);
        }
    }

    it("Test Getting Submissions With Results",async () => {
        const submissionsAndResultsJS = getSubmissionsAndResults();

        const rawSubmissions = submissionsAndResultsJS.submissions

        const submissions: Submission[] = rawSubmissions.map(e => fromResponse(e));

        const fakeGetSubmissions = createFakeGetSubmissionsFunction(submissions);
        const fakeSaveFile = createFakeSaveFileFunction();
        const runInstance = mockRunForFinishSubmissionTest();
        const fakeHwConfig: HwConfig = {
            id: "hw2",
            name: "second homework",
            deadline: "undefined",
            module: "karel",
            subject: '_',
            configPath: '../dt-homeworks/hw2/config.js',
            testFileName: "hw2tester.js"
        }
        setSubmissionModule(fakeHwConfig)
        const resultsPromise = await getSubmissionsWithResults(fakeHwConfig,runInstance, null, fakeSaveFile, fakeGetSubmissions);

        const results = await Promise.all(resultsPromise);

        results.forEach(result => {
            let testResults: any[] = result.results;

            if(testResults[0].error){
                let foundError = findResultInSamples(submissionsAndResultsJS, "error",result.id);
                expect(foundError).to.not.be.undefined;
                return;
            }

            let passed: boolean = testResults.every(testResult => testResult.passed);
            if(passed){
                let foundPassed = findResultInSamples(submissionsAndResultsJS, "passed",result.id);
                expect(foundPassed).to.not.be.undefined;
            } else {
                let foundNotPassed = findResultInSamples(submissionsAndResultsJS, "failed",result.id);
                expect(foundNotPassed).to.not.be.undefined;
            }
            
        })

    })
})


function fromResponse(
        profile: any
    ) {
        const submission = new Submission(
            profile.id!,
            profile.emailId!,
            profile.emailAddress!, 
            profile.state!,
            profile.alternateLink!,
            profile.late
        )
        submission.attachment = profile.attachment
        return submission

    }