<script setup lang="ts">
import '@picocss/pico/css/pico.min.css';
import { reactive } from 'vue';
import AuthService from '../service/AuthService';
import IUser from '../types/User';
import IResponse from '../types/Response';
import router from '../router';

import DialogBox from '../components/DialogBox/index';

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
                DialogBox('登录成功');

                setTimeout(() => {
                    router.push('list');
                }, 2500);
            } else {
                DialogBox('用户名或密码错误');
            }
        })
        .catch((error: string) => {
            DialogBox(error);
        });
};

const verifyData = () => {
    if (data.account.length !== 12) {
        DialogBox('请输入正确格式的学号');
        return false;
    }
    if (data.password.length < 6) {
        DialogBox('请输入正确格式的密码');
        return false;
    }
    return submitData();
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
            <label><button @click="verifyData">登录</button></label>
        </article>
    </div>
</template>
