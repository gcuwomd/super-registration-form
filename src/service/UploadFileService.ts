import http from '../utils/http';

class UploadFileService {
    api: string;

    constructor() {
        this.api = '/upload';
    }

    upload(file: File): Promise<any> {
        const formData = new FormData();

        formData.append('file', file);

        return http.post(this.api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    getFiles(): Promise<any> {
        return http.get(this.api);
    }
}

export default new UploadFileService();
