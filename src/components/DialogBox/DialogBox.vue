<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    content: string;
}>();

const content = ref('');

onMounted(() => {
    content.value = props.content;
});
</script>

<template>
    <dialog open>
        <article>
            <!-- <h3 style="text-align: center">{{ header }}</h3> -->
            <p>
                {{ content }}
            </p>
        </article>
    </dialog>
</template>
