<script setup lang="ts">
import { reactive } from 'vue';
import '@picocss/pico/css/pico.min.css';

interface IForm {
    id: string;
    name: string;
    college: string;
    introduciton: string;
    condition: boolean;
}

const data: IForm = reactive({
    id: '',
    name: '',
    college: '',
    introduciton: '',
    condition: false,
});
</script>

<template>
    <h1>报名</h1>
    <label>
        学号
        <input v-model="data.id" type="text" placeholder="学号" />
    </label>
    <label>
        姓名
        <input v-model="data.name" type="text" placeholder="姓名" />
    </label>
    <label>
        学院
        <select v-model="data.college">
            <option disabled value="">请选择</option>
            <option>计算机工程学院</option>
            <option>管理学院</option>
        </select>
    </label>
    <label>
        自我介绍
        <textarea
            v-model="data.introduciton"
            placeholder="请输入不小于 10 个字符的自我介绍"
        ></textarea>
    </label>
    <label>
        上传头像
        <input type="file" />
    </label>

    <label>
        <input v-model="data.condition" type="checkbox" role="switch" />接受
    </label>

    <!-- <button @click="submitData">提交</button> -->
</template>
