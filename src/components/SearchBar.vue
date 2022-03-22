<script setup lang="ts">
import { ref } from 'vue';
import SearchService from '../service/SearchService';
import FormService from '../service/FormService';
import IAcademy from '../types/Academy';
import IDepartment from '../types/Department';
import IGender from '../types/Gender';
import IResponse from '../types/Response';
import IForm from '../types/Form';

import DialogBox from './DialogBox';

const searchList: string[] = [
    '姓名',
    '性别',
    '学院',
    '宿舍',
    '第一意向',
    '第二意向',
];

const searchTag = ref('');
const search = ref('');

const emit = defineEmits(['update']);
const emitUpdate = (data: IForm[]) => {
    emit('update', data);
};

const submitSearch = () => {
    if (searchTag.value === '姓名') {
        SearchService.searchByName(search.value)
            .then((response: any) => {
                const res: IResponse = response.data;

                emitUpdate(res.data);
            })
            .catch(() => {});
    }

    if (searchTag.value === '性别') {
        SearchService.searchByGender(search.value)
            .then((response: any) => {
                const res: IResponse = response.data;

                emitUpdate(res.data);
            })
            .catch(() => {});
    }

    if (searchTag.value === '学院') {
        SearchService.searchByAcademy(search.value)
            .then((response: any) => {
                const res: IResponse = response.data;

                emitUpdate(res.data);
            })
            .catch(() => {});
    }

    if (searchTag.value === '宿舍') {
        SearchService.searchByDormitory(search.value)
            .then((response: any) => {
                const res: IResponse = response.data;

                emitUpdate(res.data);
            })
            .catch(() => {});
    }
    if (searchTag.value === '第一意向') {
        SearchService.searchByFirstChoice(search.value)
            .then((response: any) => {
                const res: IResponse = response.data;

                emitUpdate(res.data);
            })
            .catch(() => {});
    }

    if (searchTag.value === '第二意向') {
        SearchService.searchBySecondChoice(search.value)
            .then((response: any) => {
                const res: IResponse = response.data;

                emitUpdate(res.data);
            })
            .catch(() => {});
    }
};

const resetSearch = () => {
    searchTag.value = '';
    search.value = '';

    FormService.getAll()
        .then((response: any) => {
            const res: IResponse = response.data;

            emitUpdate(res.data);
        })
        .catch(() => {});

    return true;
};

const verifySearch = () => {
    if (!searchTag.value) {
        DialogBox('请选择搜索项目');
        return false;
    }

    if (!search.value) {
        DialogBox('请输入搜索内容');
        return false;
    }

    return submitSearch();
};
</script>

<template>
    <article>
        <div class="grid">
            <select v-model="searchTag">
                <option disabled value="">请选择</option>
                <option v-for="(item, index) in searchList" :key="index">
                    {{ item }}
                </option>
            </select>
            <select v-if="searchTag === '性别'" v-model="search">
                <option disabled value="">请选择</option>
                <option v-for="(item, index) in IGender" :key="index">
                    {{ item }}
                </option>
            </select>
            <select v-else-if="searchTag === '学院'" v-model="search">
                <option disabled value="">请选择</option>
                <option v-for="(item, index) in IAcademy" :key="index">
                    {{ item }}
                </option>
            </select>
            <select v-else-if="searchTag === '第一意向'" v-model="search">
                <option disabled value="">请选择</option>
                <option v-for="(item, index) in IDepartment" :key="index">
                    {{ item }}
                </option>
            </select>
            <select v-else-if="searchTag === '第二意向'" v-model="search">
                <option disabled value="">请选择</option>
                <option v-for="(item, index) in IDepartment" :key="index">
                    {{ item }}
                </option>
            </select>
            <input v-else v-model="search" type="text" placeholder="搜索内容" />
        </div>
        <div class="grid">
            <button @click="resetSearch">重置</button>
            <button @click="verifySearch">搜索</button>
        </div>
    </article>
</template>
