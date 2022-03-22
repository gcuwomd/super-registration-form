export default interface IResponse {
    code: string;
    message: string;
    data: any;
    token?: string;
    account?: string;
}
