<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FormService from '../service/FormService';
import '@picocss/pico/css/pico.min.css';
import IResponse from '../types/Response';
import IForm from '../types/Form';

const dataList = ref<IForm[]>();

onMounted(() => {
    FormService.getAll()
        .then((response: any) => {
            const res: IResponse = response.data;

            dataList.value = res.data as IForm[];
        })
        .catch((error) => {
            alert(error);
        });
});
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
                    <th scope="col">班级</th>
                    <th scope="col">报名时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in dataList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <router-link :to="`/details/${data.account}`">{{
                            data.account
                        }}</router-link>
                    </td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.academy }}</td>
                    <td>{{ data.class }}</td>
                    <td>{{ data.time }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
