<template>
  <div class="back-button" @click="goBack">
    <i class="bx bx-arrow-back"></i>
  </div>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    goBack() {
      this.$router.replace('/')
    },
  }
}
</script>

<style scoped>

</style>
