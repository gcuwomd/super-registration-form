<script lang="ts" setup>
import { reactive, ref } from 'vue';

interface Iform {
  name: string;
  gender: string;
  major: string;
  class: string;
  firstDepartment: string;
  secondDepartment: string;
  introduction: string;
  file: string[];
  license: boolean;
}

const formData: Iform = reactive({
  name: '',
  gender: '',
  major: '',
  class: '',
  firstDepartment: '',
  secondDepartment: '',
  introduction: '',
  file: [],
  license: false,
});

const form = ref();
</script>

<template>
  <div class="container">
    <var-form ref="form">
      <var-space direction="column" size="large">
        <var-input
          v-model="formData.name"
          :rules="[(v) => v.length > 1 || '请填写合规的姓名']"
          placeholder="请输入姓名"
        ></var-input>

        <var-radio-group
          v-model="formData.gender"
          :rules="[(v) => !!v || '必须选择一个性别']"
        >
          <var-radio checked-value="male">男</var-radio>
          <var-radio checked-value="female">女</var-radio>
          <var-radio checked-value="non-binary">非二元性别</var-radio>
        </var-radio-group>

        <var-select
          v-model="formData.major"
          :rules="[(v) => v.length > 1 || '请选择专业']"
          placeholder="请选择专业"
        >
          <var-option label="计算机科学" />
          <var-option label="大数据" />
          <var-option label="土木工程" />
        </var-select>

        <var-input
          v-model="formData.class"
          :rules="[(v) => v.length > 1 || '请填写合规的班级']"
          placeholder="请输入班级"
        ></var-input>

        <var-select
          v-model="formData.firstDepartment"
          :rules="[(v) => v.length > 1 || '请选择第一志愿部门']"
          placeholder="请选择第一志愿部门"
        >
          <var-option label="吃饭组" />
          <var-option label="睡觉组" />
          <var-option label="打游戏组" />
        </var-select>

        <var-select
          v-model="formData.secondDepartment"
          :rules="[(v) => v.length > 1 || '请选择第二志愿部门']"
          placeholder="请选择第二志愿部门"
        >
          <var-option label="吃饭组" />
          <var-option label="睡觉组" />
          <var-option label="打游戏组" />
        </var-select>

        <var-input
          v-model="formData.introduction"
          :rules="[(v) => v.length > 10 || '请输入长度大于 10 的自我介绍']"
          placeholder="请输入自我介绍"
          textarea
        />

        <span>上传个性照片</span>
        <var-uploader v-model="formData.file" :maxlength="1" />

        <span>同意</span>
        <var-switch
          v-model="formData.license"
          :rules="[(v) => !!v || '请同意规则条款']"
        >
        </var-switch>

        <var-button block type="success" @click="form.validate()">
          触发验证
        </var-button>
      </var-space>
    </var-form>
  </div>
</template>

<style scoped>
.container {
  padding: 15px 12px;
}
</style>
