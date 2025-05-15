<template>
  <div>
    <Header />
      <MainContainer>
        <slot />
      </MainContainer>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import MainContainer from '@/components/common/MainContainer.vue';
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
