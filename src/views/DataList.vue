<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import FormService from '../service/FormService';
import '@picocss/pico/css/pico.min.css';
import IResponse from '../types/Response';
import IForm from '../types/Form';

const dataList = ref<IForm[]>([]);

const groupData = ref<any>([]);
const pageSize = ref<number>(10);
const pageNum: Ref<number> = ref(1);
const dataShow = ref<IForm[]>([]);
const currPage = ref<number>(0);

onMounted(() => {
    FormService.getAll()
        .then((response: any) => {
            const res: IResponse = response.data;

            dataList.value = res.data as IForm[];

            pageNum.value =
                Math.ceil(dataList.value.length / pageSize.value) || 1;
            for (let i = 0; i < pageNum.value; i += 1) {
                groupData.value[i] = dataList.value.slice(
                    pageSize.value * i,
                    pageSize.value * (i + 1)
                );
            }
            dataShow.value = groupData.value[currPage.value];
        })
        .catch((error) => {
            alert(error);
        });
});

const nextPage = () => {
    if (currPage.value === pageNum.value - 1) {
        return false;
    }
    dataShow.value = groupData.value[(currPage.value += 1)];
    return true;
};

const prePage = () => {
    if (currPage.value === 0) {
        return false;
    }
    dataShow.value = groupData.value[(currPage.value -= 1)];
    return true;
};
</script>

<template>
    <div class="container">
        <h3>报名列表</h3>
        <article>
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
                    <tr v-for="(data, index) in dataShow" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <router-link :to="`/details/${data.account}`">{{
                                data.account
                            }}</router-link>
                        </td>
                        <td>{{ data.name }}</td>
                        <td>{{ data.academy }}</td>
                        <td>{{ data.sClass }}</td>
                        <td>{{ data.time }}</td>
                    </tr>
                </tbody>
            </table>
        </article>
        <div class="grid">
            <button @click="prePage">上一页</button>
            <button @click="nextPage">下一页</button>
        </div>
        <div>当前第 {{ currPage + 1 }} 页，共 {{ pageNum }} 页</div>
    </div>
</template>
