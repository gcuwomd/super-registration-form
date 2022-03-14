<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import '@picocss/pico/css/pico.min.css';
import { useRoute } from 'vue-router';
import FormService from '../service/FormService';
import IForm from '../types/Form';
import IResponse from '../types/Response';

const route = useRoute();
const { account } = route.params;

const form: IForm = reactive({
    id: '',
    account: '',
    name: '',
    academy: '',
    class: '',
    first_choice: '',
    second_choice: '',
    introduction: '',
    image: '',
    time: '',
});

onMounted(() => {
    FormService.get(account as string)
        .then((response: any) => {
            const res: IResponse = response.data;
            const result = res.data as IForm[];
            const data = result[0];

            form.id = data.id;
            form.account = data.account;
            form.name = data.name;
            form.academy = data.academy;
            form.class = data.class;
            form.first_choice = data.first_choice;
            form.second_choice = data.second_choice;
            form.introduction = data.introduction;
            form.image = data.image;
            form.time = data.time;
        })
        .catch((error) => {
            alert(error);
        });
});
</script>

<template>
    <div class="container centera">
        <h1>报名信息</h1>
        <article>
            <table>
                <tbody>
                    <tr>
                        <td>头像</td>
                        <td><img :src="form.image" alt="" /></td>
                    </tr>
                    <tr>
                        <td>学号</td>
                        <td>{{ form.account }}</td>
                    </tr>
                    <tr>
                        <td>姓名</td>
                        <td>{{ form.name }}</td>
                    </tr>
                    <tr>
                        <td>学院</td>
                        <td>{{ form.academy }}</td>
                    </tr>
                    <tr>
                        <td>意向部门</td>
                        <td>{{ form.first_choice }}</td>
                    </tr>
                    <tr>
                        <td>自我介绍</td>
                        <td>{{ form.introduction }}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    </div>
</template>
