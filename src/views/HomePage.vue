<script setup lang="ts">
import logo from '../assets/logo.png';
</script>

<template>
    <div class="container centera">
        <article>
            <h2><img :src="logo" /></h2>
            <h2>欢迎加入学生网络与信息工作委员会</h2>
            <h2>网络运维部</h2>
            <h2>网站运维部</h2>
            <h2>信息化运维部</h2>
            <h2>行政秘书部</h2>
            <router-link to="/form"> <button>即刻报名</button></router-link>
        </article>
    </div>
</template>

<style scoped>
h2 {
    text-align: center;
}
img {
    margin: auto;
    height: 200px;
}
</style>
