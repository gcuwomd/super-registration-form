<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import IForm from '../types/Form';
import UploadFileService from '../service/UploadFileService';
import IResponse from '../types/Response';
import IGender from '../types/Gender';
import IAcademy from '../types/Academy';
import IDepartment from '../types/Department';
import FormService from '../service/FormService';

import DialogBox from '../components/DialogBox/index';

const data: IForm = reactive({
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
    condition: false,
});

const submitData = () => {
    FormService.submit(data)
        .then((response: any) => {
            const res: IResponse = response.data;
            DialogBox(res.message);
        })
        .catch(() => {});
};

const verifyData = () => {
    if (data.account.length !== 12 || data.account.match('^[0-9]*$') === null) {
        DialogBox('请输入正确格式的学号');
        return false;
    }

    if (data.name.length < 2) {
        DialogBox('请输入正确格式的姓名');
        return false;
    }

    if (!data.gender) {
        DialogBox('请选择性别');
        return false;
    }

    if (data.phone.length !== 11 || data.phone.match('^[0-9]*$') === null) {
        DialogBox('请输入正确格式的联系电话');
        return false;
    }

    if (!data.wechat) {
        DialogBox('请输入微信号');
        return false;
    }

    if (!data.academy) {
        DialogBox('请选择学院');
        return false;
    }

    if (!data.sClass) {
        DialogBox('请输入班级');
        return false;
    }

    if (!data.dormitory) {
        DialogBox('请输入宿舍');
        return false;
    }

    if (!data.firstChoice) {
        DialogBox('请选择第一意向部门');
        return false;
    }

    if (data.introduction.length < 10) {
        DialogBox('请输入不小于 10 个字符的自我介绍');
        return false;
    }

    if (!data.fileName) {
        DialogBox('请选择一张图片上传');
        return false;
    }

    if (data.condition === false) {
        DialogBox('请同意报名须知');
        return false;
    }

    return submitData();
};

const file = ref();

const uploadFile = () => {
    const currentFile = file.value.files.item(0);

    if (!currentFile) {
        DialogBox('请选择一张图片');
        return false;
    }

    UploadFileService.upload(currentFile)
        .then((response: any) => {
            const res: IResponse = response.data;
            if (res.code === '1') {
                DialogBox(res.message);
                return false;
            }

            data.fileName = res.data.fileName;
            DialogBox(res.message);
            return true;
        })
        .catch(() => {});

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
        .catch(() => {});
});
</script>

<template>
    <div class="container">
        <div style="text-align: center">
            <br />
            <h2>填写信息</h2>
        </div>
        <article>
            <label>
                学号
                <input
                    v-model="data.account"
                    type="text"
                    placeholder="请输入学号"
                />
            </label>
            <label>
                姓名
                <input
                    v-model="data.name"
                    type="text"
                    placeholder="请输入姓名"
                />
            </label>
            <label>
                性别
                <select v-model="data.gender">
                    <option disabled value="">请选择性别</option>
                    <option v-for="(item, index) in IGender" :key="index">
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                联系电话
                <input
                    v-model="data.phone"
                    type="text"
                    placeholder="请输入联系电话"
                />
            </label>
            <label>
                微信
                <input
                    v-model="data.wechat"
                    type="text"
                    placeholder="请输入微信"
                />
            </label>
            <label>
                学院
                <select v-model="data.academy">
                    <option disabled value="">请选择学院</option>
                    <option v-for="(item, index) in IAcademy" :key="index">
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                班级
                <input
                    v-model="data.sClass"
                    type="text"
                    placeholder="请输入班级"
                />
            </label>
            <label>
                宿舍
                <input
                    v-model="data.dormitory"
                    type="text"
                    placeholder="请输入宿舍"
                />
            </label>
            <label>
                第一意向部门
                <select v-model="data.firstChoice">
                    <option disabled value="">请选择第一意向部门</option>
                    <option v-for="(item, index) in IDepartment" :key="index">
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                第二意向部门*
                <select v-model="data.secondChoice">
                    <option disabled value="">请选择第二意向部门</option>
                    <option v-for="(item, index) in IDepartment" :key="index">
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                自我介绍
                <textarea
                    v-model="data.introduction"
                    placeholder="请输入不小于 10 个字符的自我介绍"
                ></textarea>
            </label>

            <label>
                上传个性照
                <div class="grid">
                    <input ref="file" type="file" accept="image/*" />
                    <button v-if="connect" @click="uploadFile">上传图片</button>
                    <button v-if="!connect" aria-busy="true">
                        无法连接到服务器，请刷新重试……
                    </button>
                </div>
            </label>

            <span v-show="connect">
                <input v-model="data.condition" type="checkbox" role="switch" />
                <span>
                    以上信息被用于确保 WOMD
                    能够安全访问数据。出于安全性、支持和报告的目的，WOMD
                    会记录某些使用情况数据。
                </span>
            </span>

            <br /><br />
            <button v-if="!connect" aria-busy="true">
                无法连接到服务器，请刷新重试……
            </button>
            <button v-if="connect" @click.once="verifyData">提交</button>
        </article>
    </div>
</template>
