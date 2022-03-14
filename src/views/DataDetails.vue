<script setup lang="ts">
import { reactive } from 'vue';
import '@picocss/pico/css/pico.min.css';

interface IDetails {
    id: string;
    name: string;
    college: string;
    intention: string;
    introduction: string;
}

const data: IDetails = reactive({
    id: '202010089240',
    name: '小明',
    college: '计算机工程学院',
    intention: '网站运维部',
    introduction:
        '考不上高中的小明,社交恐怖分子，阿巴阿巴阿巴阿巴阿巴阿巴，这是一大串自我介绍，此处省略一万字',
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
                        <td><img src="../assets/logo.png" alt="" /></td>
                    </tr>
                    <tr>
                        <td>学号</td>
                        <td>{{ data.id }}</td>
                    </tr>
                    <tr>
                        <td>姓名</td>
                        <td>{{ data.name }}</td>
                    </tr>
                    <tr>
                        <td>学院</td>
                        <td>{{ data.college }}</td>
                    </tr>
                    <tr>
                        <td>意向部门</td>
                        <td>{{ data.intention }}</td>
                    </tr>
                    <tr>
                        <td>自我介绍</td>
                        <td>{{ data.introduction }}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    </div>
</template>
