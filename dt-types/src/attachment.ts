export class Attachment  {
    static getDownloadUrl(id: string, authUser = 0) {
        return `https://drive.google.com/a/freeuni.edu.ge/uc?authuser=${authUser}&id=${id}&export=download`
    }

    constructor(
        public id: string,
        public downloadUrl: string,
        public title: string
    ) {}

}