<template>
  <UModal v-model:open="show">
    <template #content>
      <UCard>
        <div class="space-y-2 sm:flex sm:space-y-0 items-start gap-4">
          <UIcon :name="icon as string" class="hidden sm:block text-3xl"/>

          <div class="flex-1">
            <strong class="block font-medium text-gray-900">
              Êtes-vous sûr ?
            </strong>

            <p class="mt-1 text-sm text-gray-700">
              {{ message }}
            </p>
          </div>

          <div class="space-x-2 sm:flex space-y-2 sm:space-y-0">
            <UButton class="cursor-pointer" block :color="color" @click="emit('close')">{{ no }}</UButton>
            <UButton class="cursor-pointer" block color="error" @click="emit('confirm')">{{ yes }}</UButton>
          </div>
        </div>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
enum colors {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  light = 'light',
  dark = 'dark',
};

const props = defineProps({
  message: String,
  color: {
    type: colors,
    default: 'primary'
  },
  icon: String,
  show: {
    type: Boolean,
    default: false
  },
  yes: {
    type: String,
    default: 'Oui'
  },
  no: {
    type: String,
    default: 'Non'
  }
});
const emit = defineEmits(['close', 'confirm']);

const show = ref(props.show);
watch(() => props.show, (newShow: boolean) => {
  show.value = newShow;
}, { deep: true });

watch(() => show.value, (newShow: boolean) => {
  if (!newShow) {
    emit('close');
  }
})
</script>

<style scoped>

</style>