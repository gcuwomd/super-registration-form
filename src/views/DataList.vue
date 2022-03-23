<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue';
import FormService from '../service/FormService';
import IResponse from '../types/Response';
import IForm from '../types/Form';

import SearchBar from '../components/SearchBar.vue';

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
        })
        .catch(() => {});
});

const groupPage = () => {
    pageNum.value = Math.ceil(dataList.value.length / pageSize.value) || 1;
    for (let i = 0; i < pageNum.value; i += 1) {
        groupData.value[i] = dataList.value.slice(
            pageSize.value * i,
            pageSize.value * (i + 1)
        );
    }
    dataShow.value = groupData.value[currPage.value];
};

watch(dataList, () => {
    groupPage();
    currPage.value = 0;
    dataShow.value = groupData.value[currPage.value];
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

const downloadCsv = () => {
    FormService.downloadCsv()
        .then((response: any) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'form.csv');
            document.body.appendChild(link);
            link.click();
        })
        .catch(() => {});
};

const updateDataList = (newDataList: IForm[]) => {
    dataList.value = newDataList as IForm[];
    return true;
};
</script>

<template>
    <div class="container">
        <div style="text-align: center">
            <br />
            <h2>报名一览</h2>
        </div>
        <SearchBar @update="updateDataList"></SearchBar>
        <article>
            <table role="grid">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">学号</th>
                        <th scope="col">姓名</th>
                        <th scope="col">性别</th>
                        <th scope="col">学院</th>
                        <th scope="col">宿舍</th>
                        <th scope="col">第一意向</th>
                        <th scope="col">第二意向</th>
                        <th scope="col">提交时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in dataShow" :key="index">
                        <td>
                            <router-link :to="`/details/${data.id}`">
                                {{ data.id }}
                            </router-link>
                        </td>
                        <td>
                            {{ data.account }}
                        </td>
                        <td>{{ data.name }}</td>
                        <td>{{ data.gender }}</td>
                        <td>{{ data.academy }}</td>
                        <td>{{ data.dormitory }}</td>
                        <td>{{ data.firstChoice }}</td>
                        <td>{{ data.secondChoice }}</td>
                        <td>{{ data.time }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">学号</th>
                        <th scope="col">姓名</th>
                        <th scope="col">性别</th>
                        <th scope="col">学院</th>
                        <th scope="col">宿舍</th>
                        <th scope="col">第一意向</th>
                        <th scope="col">第二意向</th>
                        <th scope="col">提交时间</th>
                    </tr>
                </tfoot>
            </table>

            <div style="float: right">
                当前第 {{ currPage + 1 }} 页，共 {{ pageNum }} 页
            </div>
        </article>
        <div class="grid">
            <button @click="prePage">上一页</button>
            <button @click="nextPage">下一页</button>
        </div>

        <button @click="downloadCsv">一键导出全部数据</button>
    </div>
</template>

<style scoped>
table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
}
</style>
