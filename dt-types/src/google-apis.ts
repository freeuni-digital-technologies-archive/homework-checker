import {Submission} from "./submission";

export interface GoogleApi {
    classroom: Classroom
    drive: Drive
}

export interface Drive {
    downloadFile(id: string, path?: string): Promise<any>
    saveFile(id: string, filePath: string): Promise<string>
}

export interface Classroom {
    getSubmissions(hwName: string): Promise<Submission[]>
    getUserProfiles(): Promise<StudentProfile[]>
    getDueDate(homeworkTitle: string): Promise<Date>
}


export interface StudentProfile {
    id: string
    georgianName: string
    emailId: string
    emailAddress: string
}

