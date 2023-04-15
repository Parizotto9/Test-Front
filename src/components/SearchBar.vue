<script>
import { reactive, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import img from '../assets/logo.png'
import { useApiStore } from '../stores/store';

export default{
  setup() {
    const state = reactive({
      search: '',
      timer: null,
      items: []
    })
    let search = ref('')
    const store = useApiStore()

    const router = useRouter();

    const findItem = ()  => {
      router.push({ path: 'search', query: { search: search.value } })
    }

    const redirect = (id) => {
      router.push(`/store?item=${id}`)
      search.value = ''
    }

    watch(search, () => {
      clearTimeout(state.timer);
      
      state.timer = setTimeout( async () => {
        const params = [1, 4, '', '', '', '', '', search.value]
        const data = await store.getProducts(params)
        state.items = data.products
        console.log(data, 'oi')
      }, 500)
    });

    return {
      state,
      findItem,
      img,
      search,
      redirect
    }
  },
}
</script>


<template>
  <div class="pa-8 searchHeader elevation-5">
    <div class="container d-flex justify-sm-center justify-space-between ">
      <v-img :src="img"  contain class="mx-0 mr-4 mx-md-10 mx-sm-4"></v-img>
      <div class="searchBar">
        <v-menu>
          <template v-slot:activator="{props}">
            <v-text-field
            v-model="search"
          density="compact"
          v-bind="props"
          variant="solo"
          label="Procure um produto"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @keydown.enter="findItem"
          @click:append-inner="findItem"
          ></v-text-field>
        </template>
        <v-list v-if="state.items && state.items.length > 0">
              <v-list-item
                v-for="(item, i) in state.items"
                :key="i"
                class="itens"
                @click="redirect(item.id)"
              >
                <v-list-item-title >{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.itens:hover{
  background: rgb(240, 240, 240);;
  transition: .42s;
}
.itens{
  cursor: pointer;
}
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
