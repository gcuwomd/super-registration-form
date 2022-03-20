<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import dialogBox from './DialogBox.vue';
import '@picocss/pico/css/pico.min.css';
import IForm from '../types/Form';
import UploadFileService from '../service/UploadFileService';
import IResponse from '../types/Response';
import FormService from '../service/FormService';
import initDialog from '../service/DialogService';

const store = useStore();

interface IStatus {
    validId: string;
    validName: string;
    validPhone: string;
    validIntroduction: string;
    allowPost: boolean;
}

const academyList: string[] = [
    '计算机工程学院',
    '管理学院',
    '珠宝学院',
    '外国语学院',
];

const departmentList: string[] = [
    '网站运维部',
    '网络运维部',
    '信息化运维部',
    '行政秘书部',
];

const genderList: string[] = ['男', '女', '非二元性别'];

const data: IForm = reactive({
    account: '',
    name: '',
    gender: '',
    phone: '',
    academy: '',
    sClass: '',
    dormitory: '',
    firstChoice: '',
    secondChoice: '',
    introduction: '',
    fileName: '',
    condition: false,
});

const status: IStatus = reactive({
    validId: 'null',
    validName: 'null',
    validPhone: 'null',
    validCollege: 'null',
    validIntroduction: 'null',
    allowPost: true,
});

const submitData = () => {
    FormService.submit(data)
        .then((response: any) => {
            const res: IResponse = response.data;
            // alert(res);
            initDialog(store, '注意', String(res));
        })
        .catch((error) => {
            // alert(error);
            initDialog(store, '注意', error);
        });
};

const verifyData = () => {
    // id
    if (data.account === '' || data.account.match('^[0-9]*$') === null) {
        status.validId = 'true';
        status.allowPost = false;
    } else {
        status.validId = 'false';
    }

    // name
    if (data.name === '') {
        status.validName = 'true';
        status.allowPost = false;
    } else {
        status.validName = 'false';
    }

    // college
    if (data.academy === '') {
        initDialog(store, '注意', '请选择你的学院!');
        status.allowPost = false;
    }

    // first_choice
    if (data.firstChoice === '') {
        initDialog(store, '注意', '请选择你的第一意向部门!');
        status.allowPost = false;
    }

    // phone
    if (data.phone === '' || data.phone.match('^[0-9]*$') === null) {
        status.validPhone = 'true';
        status.allowPost = false;
    } else {
        status.validPhone = 'false';
    }

    // introduciton

    if (data.introduction.length < 10) {
        status.validIntroduction = 'true';
        status.allowPost = false;
    } else {
        status.validIntroduction = 'false';
    }

    // condition
    if (data.condition === false) {
        status.allowPost = false;
        initDialog(store, '注意', '请检查是否已经同意了报名须知！');
        // status.showModal('注意', '请检查是否已经同意了报名须知！');
    }
    if (status.allowPost) {
        // Post Content
    } else {
        status.allowPost = true;
    }

    submitData();
};

const file = ref();

const uploadFile = () => {
    const currentFile = file.value.files.item(0);

    if (!currentFile) {
        initDialog(store, '注意', '请选择一张图片');
        // alert('请选择一张图片');
        return false;
    }

    UploadFileService.upload(currentFile)
        .then((response: any) => {
            const res: IResponse = response.data;
            if (res.code === '1') {
                initDialog(store, '注意', res.message);
                // alert(res.message);
                return false;
            }

            data.fileName = res.data.fileName;
            initDialog(store, '注意', res.message);
            // alert(res.message);
            return true;
        })
        .catch((error) => {
            initDialog(store, '注意', error);
            // alert(error);
        });

    return true;
};

const connect = ref(false);

onMounted(() => {
    FormService.check()
        .then((response: any) => {
            const res: IResponse = response.data;

            if (res.code === '0') {
                connect.value = true;
            }
        })
        .catch();
});
</script>

<template>
    <div class="container">
        <h3>报名</h3>
        <article>
            <label>
                学号
                <input
                    v-model="data.account"
                    type="text"
                    placeholder="学号"
                    :aria-invalid="status.validId"
                />
            </label>
            <label>
                姓名
                <input
                    v-model="data.name"
                    type="text"
                    placeholder="姓名"
                    :aria-invalid="status.validName"
                />
            </label>
            <label>
                性别
                <select v-model="data.gender">
                    <option disabled value="">请选择</option>
                    <option v-for="(item, index) in genderList" :key="index">
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                联系电话
                <input
                    v-model="data.phone"
                    type="text"
                    placeholder="联系电话"
                    :aria-invalid="status.validPhone"
                />
            </label>
            <label>
                学院
                <select v-model="data.academy">
                    <option disabled value="">请选择</option>
                    <option v-for="(item, index) in academyList" :key="index">
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                班级
                <input
                    v-model="data.sClass"
                    type="text"
                    placeholder="班级"
                    :aria-invalid="status.validName"
                />
            </label>
            <label>
                宿舍
                <input
                    v-model="data.dormitory"
                    type="text"
                    placeholder="宿舍"
                    :aria-invalid="status.validName"
                />
            </label>
            <label>
                第一意向部门
                <select v-model="data.firstChoice">
                    <option disabled value="">请选择</option>
                    <option
                        v-for="(item, index) in departmentList"
                        :key="index"
                    >
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                第二意向部门*
                <select v-model="data.secondChoice">
                    <option disabled value="">请选择</option>
                    <option
                        v-for="(item, index) in departmentList"
                        :key="index"
                    >
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                自我介绍
                <textarea
                    v-model="data.introduction"
                    placeholder="请输入不小于 10 个字符的自我介绍"
                    :aria-invalid="status.validIntroduction"
                ></textarea>
            </label>

            <label>
                上传头像
                <input ref="file" type="file" accept="image/*" />
            </label>
            <button v-if="!connect" aria-busy="true">无法连接到服务器……</button>
            <button v-if="connect" @click="uploadFile">确认上传</button>

            <input v-model="data.condition" type="checkbox" role="switch" />
            <span
                class="contrast"
                data-target="modal"
                @click="
                    initDialog(
                        store,
                        '同意书',
                        '本人同意报名表内所填之「参加名单」参加此夏令营活动。此同意书是为确认参加活动者的家长已详读活动简章，并清楚了解本活动内容及相关规定。活动全程将由本馆工作同仁维护参加者的安全，如参加者因不守规定或不接受辅导而发生意外事件时，将自行负责。家长或报名者于报名时勾选「我已完全阅读并同意以上内容」即同意此报名同意书，未勾选者恕无法报名。'
                    )
                "
                >报名须知</span
            >

            <dialogBox></dialogBox>
            <br /><br />
            <button v-if="!connect" aria-busy="true">无法连接到服务器……</button>
            <button v-if="connect" @click="verifyData">提交</button>
        </article>
    </div>
</template>
