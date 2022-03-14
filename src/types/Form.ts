export default interface IForm {
    id: string;
    account: string;
    name: string;
    academy: string;
    class: string;
    first_choice: string;
    second_choice: string;
    introduction: string;
    image: string;
    condition?: boolean;
    time?: string;
}
