<template>
  <div class="favorite-city">
    <div class="favorite-city__title">
      <span>{{ city.name }}</span>
      <span>
        <i class="bx bxs-city"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoriteCity",
  props: {
    city: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
.favorite-city {
  margin: 0 auto;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgba(59, 47, 124, 0.65);
  padding: 9px 20px;
  border-radius: 20px;
  width: 400px;
  transition: background-color 0.3s;

  @media only screen and (max-width: 500px) {
    width: 85%;
  }

  .favorite-city__title {
    width: 100%;

    display: flex;
    justify-content: space-between;
  }

  &:hover {
    cursor: pointer;
    background: rgba(51, 40, 112, 0.65);
  }
}
</style>
