<script setup lang="ts">
import { reactive } from 'vue';
import '@picocss/pico/css/pico.min.css';

interface IData {
    id: string;
    name: string;
    college: string;
}

const data: IData = reactive({
    id: '202010089240',
    name: '小明',
    college: '计算机工程学院',
});
const data1: IData = reactive({
    id: '202010089287',
    name: '小鹏',
    college: '计算机工程学院',
});

const dataList: IData[] = [data, data1];
</script>

<template>
    <div class="container">
        <h1>报名列表</h1>
        <table>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">学号</th>
                    <th scope="col">姓名</th>
                    <th scope="col">学院</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataList" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        <a href="#">{{ item.id }}</a>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.college }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
