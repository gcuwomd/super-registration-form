<script setup lang="ts">
import '@picocss/pico/css/pico.min.css';
import { reactive } from 'vue';
import AuthService from '../api/AuthService';
import IUser from '../types/User';
import IResponse from '../types/Response';

const data: IUser = reactive({
    account: '',
    password: '',
});

const submitData = () => {
    AuthService.login(data)
        .then((response: any) => {
            const res: IResponse = response.data;
            if (res.code === '0') {
                alert('登录成功');
            } else {
                alert('账号或密码错误');
            }
        })
        .catch((e: any) => {
            alert(e);
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
    </div>
</template>
