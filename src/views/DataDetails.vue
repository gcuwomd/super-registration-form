<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
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
    gender: '',
    phone: '',
    wechat: '',
    academy: '',
    sClass: '',
    dormitory: '',
    firstChoice: '',
    secondChoice: '',
    introduction: '',
    fileName: '',
    time: '',
});

const imageUrl = ref('');
const path: string = 'http://127.0.0.1:3310/static/uploads/';

onMounted(() => {
    FormService.get(account as string)
        .then((response: any) => {
            const res: IResponse = response.data;

            const result = res.data as IForm[];
            const data = result[0];

            form.id = data.id;
            form.account = data.account;
            form.name = data.name;
            form.gender = data.gender;
            form.phone = data.phone;
            form.academy = data.academy;
            form.sClass = data.sClass;
            form.dormitory = data.dormitory;
            form.firstChoice = data.firstChoice;
            form.secondChoice = data.secondChoice;
            form.introduction = data.introduction;
            form.fileName = data.fileName;
            form.time = data.time;

            imageUrl.value = `${path}${form.fileName}`;
        })
        .catch(() => {});
});
</script>

<template>
    <div class="container centera">
        <h1 style="display: inline-block">报名信息</h1>
        <router-link to="/list"><button>返回</button></router-link>

        <article>
            <table>
                <tbody>
                    <tr>
                        <td>头像</td>
                        <td>
                            <img :src="imageUrl" :alt="imageUrl" />
                        </td>
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
                        <td>性别</td>
                        <td>{{ form.gender }}</td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td>{{ form.phone }}</td>
                    </tr>
                    <tr>
                        <td>微信</td>
                        <td>{{ form.wechat }}</td>
                    </tr>
                    <tr>
                        <td>学院</td>
                        <td>{{ form.academy }}</td>
                    </tr>
                    <tr>
                        <td>班级</td>
                        <td>{{ form.sClass }}</td>
                    </tr>
                    <tr>
                        <td>宿舍</td>
                        <td>{{ form.dormitory }}</td>
                    </tr>
                    <tr>
                        <td>第一志愿</td>
                        <td>{{ form.firstChoice }}</td>
                    </tr>
                    <tr>
                        <td>第二志愿</td>
                        <td>{{ form.secondChoice }}</td>
                    </tr>
                    <tr>
                        <td>自我介绍</td>
                        <td>{{ form.introduction }}</td>
                    </tr>
                    <tr>
                        <td>提交时间</td>
                        <td>{{ form.time }}</td>
                    </tr>
                </tbody>
            </table>
        </article>
        <router-link to="/list"><button>返回</button></router-link>
    </div>
</template>
