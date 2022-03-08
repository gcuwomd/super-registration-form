<script setup lang="ts">
import { reactive } from 'vue';
import '@picocss/pico/css/pico.min.css';

interface IForm {
  account: string;
  password: string;
}
interface IStatus {
  validAccount: string;
  validPassword: string;
}
const status: IStatus = reactive({
  validAccount: 'null',
  validPassword: 'null',
});
const data: IForm = reactive({
  account: '',
  password: '',
});
const submitData = () => {
  // valid account
  if (data.account === '') {
    status.validAccount = 'true';
  } else {
    status.validAccount = 'false';
    console.log(`${data.account}`);
  }
  // valid pwd
  if (data.password === '') {
    status.validPassword = 'true';
  } else {
    status.validPassword = 'false';
    console.log(`${data.password}`);
  }
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
          :aria-invalid="status.validAccount"
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
          :aria-invalid="status.validPassword"
          type="password"
          name="firstname"
          placeholder="请输入你的管理员密码"
          required
        />
      </label>
      <label>
        <a href="#">注册</a>
      </label>
      <label><button @click="submitData">登录</button></label>
    </article>
  </div>
</template>
