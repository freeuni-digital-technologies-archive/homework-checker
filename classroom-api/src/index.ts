import {ClassroomApi} from './classroom-api'
import {StudentList} from './students'
import {Authenticator} from './authenticate'
import {Submission} from 'dt-types'
import {fromResponse} from './submission'
import {drive_v3} from "googleapis";
//export * from './types'
export { ClassroomApi, downloadFile, downloadZip, createDrive, saveFile } from './classroom-api'

export type Drive = drive_v3.Drive
export * from './students'
export * from './mailer'
export { downloadAll, downloadSome, downloadAtInterval } from './downloadHW'
export { Authenticator } from './authenticate'
export { downloadError } from './classroom-api'

export async function getSubmissions(subject: string, homework: string, studentList: StudentList, auth: Authenticator): Promise<Submission[]> {
	let classroom = await ClassroomApi.findClass(subject, auth)

	let submissions = await (classroom.getSubmissions(homework)
		.then(submissions => submissions
			.filter(response => response.id && response.userId)))

	// we need to fetch profiles if its not already in `students.json`
	// async filter does not exist btw. 
	await Promise.all(submissions.map(async response => {
		if (!studentList.getStudentById(response.userId!)) {
			await studentList.fetchStudentById(classroom, response.userId!)
		}
	}))

	return submissions.filter(response => studentList.getStudentById(response.userId!)).map(s => fromResponse(s, studentList))
}

export async function getDueDate(subject: string, homeworkTitle: string, auth: Authenticator): Promise<Date> {
	let classroom = await ClassroomApi.findClass(subject, auth);
	const courseWork = await classroom.listCourseWork();

	return courseWork.filter(work => work.title === homeworkTitle).map((work): Date =>{
		if(work.dueDate === undefined || work.dueDate.year === undefined  || work.dueDate.month === undefined || work.dueDate.day === undefined )
			throw "Selected homework does not have due date"
		return new Date(work.dueDate.year, work.dueDate.month, work.dueDate.day)
	})[0]
}
