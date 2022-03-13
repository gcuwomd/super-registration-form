<script setup lang="ts">
import '@picocss/pico/css/pico.min.css';
import { reactive } from 'vue';
import AuthService from '../service/AuthService';
import IResponse from '../types/Response';

interface IForm {
    account: string;
    name: string;
    password: string;
    confirm: string;
}

const form: IForm = reactive({
    account: '',
    name: '',
    password: '',
    confirm: '',
});

const submitForm = () => {
    AuthService.register(form)
        .then((response: any) => {
            const res: IResponse = response.data;
            if (res.code === '1') {
                alert(res.message);
                return false;
            }
            alert(res.message);
            return true;
        })
        .catch((error: any) => {
            alert(error);
        });
};

const verifyForm = () => {
    if (form.account.length < 0 || form.account.length !== 12) {
        alert('学号格式有误');
        return false;
    }
    if (form.name.length < 2) {
        alert('姓名格式有误');
        return false;
    }
    if (form.password.length < 6) {
        alert('请设置长度大于 6 的密码');
        return false;
    }
    if (form.password !== form.confirm) {
        alert('两次密码输入不一致');
        return false;
    }
    submitForm();
    return true;
};
</script>

<template>
    <div class="container centera">
        <h3>Admin Signup</h3>
        <article>
            <div class="grid">
                <label>
                    学号
                    <input
                        v-model="form.account"
                        type="text"
                        placeholder="请输入学号"
                        required
                    />
                </label>

                <label>
                    姓名
                    <input
                        v-model="form.name"
                        type="text"
                        placeholder="请输入姓名"
                        required
                    />
                </label>
            </div>

            <label>
                密码
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="请输入密码"
                    required
                />
            </label>
            <label>
                确认密码
                <input
                    v-model="form.confirm"
                    type="password"
                    placeholder="请确认密码"
                    required
                />
            </label>

            <label>
                <router-link to="/signin">登录</router-link>
            </label>

            <label><button @click="verifyForm">注册</button></label>
        </article>
    </div>
</template>
