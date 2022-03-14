import path from 'path'
import { data_path} from "./runs";
import fs from "fs";

// ამ ფაილში უნდა იყოს მხოლოდ და მხოლოდ default პარამეტრები 
// იმ ყველაფრის, რაც user-ს შეუძლია რომ გადმოაწოდოს

export const config = {
    subject: JSON.parse(fs.readFileSync(path.resolve(__dirname, `${data_path}/subject.json`)).toString()).subject,
    STUDENTS_DATA_PATH: path.resolve(__dirname, `${data_path}/students.json`),
    CLASSROOM_CREDENTIALS_PATH: path.resolve(__dirname, `${data_path}/credentials/credentials.json`),
    CLASSROOM_TOKEN_PATH: path.resolve(__dirname, `${data_path}/credentials/token.json`)
}
