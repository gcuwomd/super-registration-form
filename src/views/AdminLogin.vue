<script setup lang="ts">
import '@picocss/pico/css/pico.min.css';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import dialogBox from './DialogBox.vue';
import AuthService from '../service/AuthService';
import IUser from '../types/User';
import IResponse from '../types/Response';
import router from '../router';
import initDialog from '../service/DialogService';

const store = useStore();
const data: IUser = reactive({
    account: '',
    password: '',
});

const submitData = () => {
    AuthService.login(data)
        .then((response: any) => {
            const res: IResponse = response.data;
            const { code, token } = res;
            if (code === '0') {
                localStorage.setItem('token', token as string);
                // alert('登录成功');
                initDialog(store, '消息', '登录成功');
                setTimeout(() => {
                    router.push('list');
                }, 1000);
            } else {
                // alert('账号或密码错误');
                initDialog(store, '错误', '账号或密码错误');
            }
        })
        .catch((e: string) => {
            // alert(e);
            initDialog(store, '错误', e);
        });
};
</script>

<template>
    <div class="container centera">
        <h3>Admin Login Page</h3>
        <article>
            <label>
                账号
                <input
                    id="account"
                    v-model="data.account"
                    type="text"
                    name="firstname"
                    placeholder="请输入你的管理员账户"
                    required
                />
            </label>
            <label>
                密码
                <input
                    id="password"
                    v-model="data.password"
                    type="password"
                    name="firstname"
                    placeholder="请输入你的管理员密码"
                    required
                />
            </label>
            <label>
                <router-link to="/signup">注册</router-link>
            </label>
            <label><button @click="submitData">登录</button></label>
        </article>
        <dialogBox></dialogBox>
    </div>
</template>
