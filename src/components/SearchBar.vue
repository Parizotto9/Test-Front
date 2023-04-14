<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import img from '../assets/logo.png'

export default{
  setup() {
    const state = reactive({
      search: ''
    })

    const router = useRouter();

    const findItem = ()  => {
      router.push({ path: 'search', query: { search: state.search } })
    }

    return {
      state,
      findItem,
      img
    }
  },
}
</script>


<template>
  <div class="pa-8 searchHeader elevation-5">
    <div class="container d-flex justify-sm-center justify-space-between ">
      <v-img :src="img"  contain class="mx-0 mr-4 mx-md-10 mx-sm-4"></v-img>
      <div class="searchBar">
          <v-text-field
          v-model="state.search"
          density="compact"
          variant="solo"
          label="Procure um produto"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @keydown.enter="findItem"
          @click:append-inner="findItem"
          ></v-text-field>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-img{
    max-width: 60px;
    min-width: 50px;
}
.searchHeader {
  background: teal;
}
.searchBar{
    width: 600px;
}
</style>
