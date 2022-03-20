import { reactive } from 'vue';

interface IModal {
    title: string;
    content: string;
}
const dialog: IModal = reactive({
    title: '',
    content: '',
});

export default function initDialog(
    store: any,
    title: string,
    content: string
): void {
    dialog.title = title;
    dialog.content = content;

    store.commit('SET_DIALOG_MSG', dialog);
    store.commit('SET_SHOW', true);
}
