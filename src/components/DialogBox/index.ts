import { createApp } from 'vue';
import DialogBox from './DialogBox.vue';

export default (content: string) => {
    const dialogInstance = createApp(DialogBox, { content });

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
    dialogInstance.mount(mountNode);

    setTimeout(() => {
        dialogInstance.unmount();
        document.body.removeChild(mountNode);
    }, 2000);
};
