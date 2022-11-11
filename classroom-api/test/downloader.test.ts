import {downloadSubmissions} from "../src/downloader";
import {setupGoogleApi} from "../src";
import {mock, instance, when} from "ts-mockito";
import {Authenticator} from "../src";
import {getSubject} from "../src/homework-downloader";
import * as path from "path";
import {GoogleApi, Classroom} from "dt-types";
import {google} from "googleapis";
import {submissions} from './downloader-test-data'
import { GoogleClassroom } from '../src/classroom-api';

describe('download test', () => {
    it('sample', () => {
        const dataPath = "../../data";
        const auth = new Authenticator(path.join(dataPath, 'credentials/token.json'), path.join(dataPath, 'credentials/credentials.json'))
        return setupGoogleApi(auth, getSubject(dataPath), path.join(dataPath, 'students.json'))
            .then(api => {
                let classroomMock:Classroom = mock(GoogleClassroom)
                api.classroom  = instance(classroomMock)
                // @ts-ignore
                when(classroomMock.getSubmissions('დავალება 3')).thenResolve(submissions)
                return downloadSubmissions(api, {hwName: 'დავალება 3', pathToStore: dataPath + '/temp_output'})
            })
            .then(paths => console.log(path))
    }).timeout(20000)
})
