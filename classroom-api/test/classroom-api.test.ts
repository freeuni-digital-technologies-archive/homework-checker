import {expect} from 'chai'
import {ClassroomApi} from "../src";
import {createDrive, downloadFile} from "../src/classroom-api";
import {Authenticator} from "../src";
import {getDueDate} from "../src";

describe('test case', () => {
    it('getting due date', async () => {
        const auth = new Authenticator("../../data/credentials/token.json", "../../data/credentials/credentials.json")
        let className = '22f შესავალი ციფრულ ტექნოლოგიებში';
        return ClassroomApi
            .findClass(className, auth)
            .then(classWork => classWork.listCourseWork())
            .then(courseWork => Promise.all(courseWork.map(assignment => getDueDate(className, assignment.title, auth))))
            .then(dueDates => {
                // console.log(dueDates)
                expect(dueDates[0].toString()).to.equal('Mon Nov 28 2022 23:59:00 GMT+0400 (Georgia Standard Time)');
            });
    }).timeout(30000);
})

