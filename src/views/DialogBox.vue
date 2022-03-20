<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

function close() {
    store.commit('SET_SHOW', false);
}
</script>
<template>
    <dialog id="modal" :open="store.state.show">
        <article>
            <span
                href="#"
                aria-label="Close"
                class="close"
                data-target="modal"
                @click="close"
            >
            </span>
            <h3>{{ store.state.title }}</h3>
            <p>
                {{ store.state.content }}
            </p>
        </article>
    </dialog>
</template>
