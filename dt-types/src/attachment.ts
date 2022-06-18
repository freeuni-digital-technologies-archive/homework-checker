export class Attachment  {
    static getDownloadUrl(id: string, authUser = 0) {
        return `https://drive.google.com/a/freeuni.edu.ge/uc?authuser=${authUser}&id=${id}&export=download`
    }

    public downloadUrl: string;
    constructor(
        public id: string,
        public title: string
    ) {
        this.downloadUrl = Attachment.getDownloadUrl(this.id)
    }

}