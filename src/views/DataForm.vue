<script setup lang="ts">
import { reactive } from 'vue';
import '@picocss/pico/css/pico.min.css';
import IForm from '../types/Form';

interface IStatus {
    show: boolean;
    validId: string;
    validName: string;
    validPhone: string;
    validIntroduction: string;
    allowPost: boolean;
    close: any;
    showModal: any;
}

interface IModal {
    title: string;
    content: string;
}

const renderList: string[] = [
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

const data: IForm = reactive({
    id: '',
    account: '',
    name: '',
    academy: '',
    class: '',
    first_choice: '',
    second_choice: '',
    phone: '',
    introduction: '',
    image: '',
    condition: false,
});

const modalBox: IModal = reactive({
    title: '',
    content: '',
});

const status: IStatus = reactive({
    show: false,
    validId: 'null',
    validName: 'null',
    validPhone: 'null',
    validCollege: 'null',
    validIntroduction: 'null',
    allowPost: true,
    close: () => {
        status.show = false;
    },
    showModal: (title: string, content: string) => {
        status.show = true;
        modalBox.title = title;
        modalBox.content = content;
    },
});

const submitData = () => {
    // id
    if (data.id === '' || data.id.match('^[0-9]*$') === null) {
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
        status.showModal('注意', '请选择你的学院!');
        status.allowPost = false;
    }

    // first_choice
    if (data.first_choice === '') {
        status.showModal('注意', '请选择你的第一意向部门!');
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
        status.showModal('注意', '请检查是否已经同意了报名须知！');
    }
    if (status.allowPost) {
        // Post Content
        console.log(data.name);
    } else {
        status.allowPost = true;
    }
};
</script>

<template>
    <div class="container">
        <h3>报名</h3>
        <article>
            <label>
                学号
                <input
                    v-model="data.id"
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
                学院
                <select ref="select_box" v-model="data.academy">
                    <option disabled value="">请选择</option>
                    <option v-for="(item, index) in renderList" :key="index">
                        {{ item }}
                    </option>
                </select>
            </label>
            <label>
                第一意向部门
                <select ref="select_box" v-model="data.first_choice">
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
                <select ref="select_box" v-model="data.second_choice">
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
                联系电话
                <input
                    v-model="data.phone"
                    type="text"
                    placeholder="联系电话"
                    :aria-invalid="status.validPhone"
                />
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
                <input type="file" accept="image/*" />
            </label>

            <input v-model="data.condition" type="checkbox" role="switch" />
            <span
                class="contrast"
                data-target="modal"
                @click="
                    status.showModal(
                        '同意书',
                        '本人同意报名表内所填之「参加名单」参加此夏令营活动。此同意书是为确认参加活动者的家长已详读活动简章，并清楚了解本活动内容及相关规定。活动全程将由本馆工作同仁维护参加者的安全，如参加者因不守规定或不接受辅导而发生意外事件时，将自行负责。家长或报名者于报名时勾选「我已完全阅读并同意以上内容」即同意此报名同意书，未勾选者恕无法报名。'
                    )
                "
                >报名须知</span
            >
            <dialog id="modal" :open="status.show">
                <article>
                    <span
                        href="#"
                        aria-label="Close"
                        class="close"
                        data-target="modal"
                        @click="status.close"
                    >
                    </span>
                    <h3>{{ modalBox.title }}</h3>
                    <p>
                        {{ modalBox.content }}
                    </p>
                </article>
            </dialog>
            <br /><br />
            <button @click="submitData">提交</button>
        </article>
    </div>
</template>
