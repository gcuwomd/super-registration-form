import { createStore } from 'vuex';

const store = createStore({
    state: {
        title: '',
        content: '',
        show: false,
    },
    mutations: {
        SET_DIALOG_MSG(state, dialogMessage) {
            this.state.title = dialogMessage.title;
            this.state.content = dialogMessage.content;
        },
        SET_SHOW(state, show) {
            this.state.show = show;
        },
    },
});

export default store;
