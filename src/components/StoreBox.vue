<script>

export default{
    name: 'StoreBox',
    props: {
        title: String,
    },
  setup() {
    return {
  }
}
}
</script>


<template>
      <div class="centralizar " :class="title ? 'mt-4' : 'mt13'">
      <h2 class="text-grey-darken-2 font-weight-bold mb-4"> {{title}}</h2>
      <slot/>
    </div>
</template>

<style lang="scss" scoped>
.centralizar {
  display: flex;
  flex-direction: column;
  width: 1200px;
  max-width: 1120px; 
}
@media screen and (max-width: 960px) {
.centralizar {
    max-width: 100vw;
    h2{
      margin-left: 30px;
    }
  }
}
@media screen and (min-width: 960px) and (max-width: 1200px) {
  .centralizar {
    max-width: calc(100vw - 60px);
    margin: 0 30px;
  }
}
</style>
