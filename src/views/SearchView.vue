<script>
import { reactive, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
//Colocar um onmounted

export default {
  components: { ProductCard },
  setup() {
    const state = reactive({
      loading: true,
      products: []
    })

    const route = useRoute()

    const getProducts = async () => {
      console.log(query.value.category)
      await axios
        .get('https://testfront.zlinkt.com/?index=0&length=4&startDiscount=40')
        .then((res) => {
          state.products = res.data.products
          state.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const query = computed(() => {
      return route.query
    })
    const getByCategoryOrSearch = async () => {
      if (query.value.category) {
        await axios
          .get(`https://testfront.zlinkt.com/?category=${query.value.category}`)
          .then((res) => {
            state.products = res.data.products
            state.loading = false
          })
          .catch((err) => {
            console.log(err)
          })
        return
      }
      getProducts()
    }

    onMounted(getByCategoryOrSearch)
    return {
      state,
      getProducts,
      getByCategoryOrSearch
    }
  }
}
</script>

<template>
  <main>
    <div class="page ma-1 ma-md-5">
      <div class="filters">
        <h3>Preço</h3>
        <div>
          <v-checkbox hide-details label="Até R$ 100,00"></v-checkbox>
          <v-checkbox hide-details label="R$ 100,00 a R$ 500,00"></v-checkbox>
          <v-checkbox hide-details label="R$ 500,00 a R$ 1000,00"></v-checkbox>
          <v-checkbox hide-details label="R$ 1000,00 a R$ 2000,00"></v-checkbox>
          <v-checkbox hide-details label="R$ 2000,00 a R$ 3000,00"></v-checkbox>
          <v-checkbox hide-details label="A partir de R$ 3000,00"></v-checkbox>
        </div>
        <v-divider></v-divider>
        <h3>Avaliação</h3>
        <div>
          <v-checkbox v-for="i in 5" :key="i" hide-details>
            <template v-slot:label>
              <v-rating size="small" :model-value="i" readonly></v-rating>
            </template>
          </v-checkbox>
        </div>
        <h3>Desconto</h3>
        <div>
          <v-checkbox hide-details label="De 60% até 80%"></v-checkbox>
          <v-checkbox hide-details label="De 30% até 60%"></v-checkbox>
          <v-checkbox hide-details label="De 10% até 30%"></v-checkbox>
          <v-checkbox hide-details label="Até 10%"></v-checkbox>
        </div>
      </div>
      <div class="cards d-flex flex-column align-center align-md-start">
        <div class="order ma-3">
          <v-select
            label="Ordenar"
            :items="['Sem Ordem', 'Menores Preços', 'Maiores Preços', 'Mais avaliados']"
            variant="underlined"
            hide-details
            prepend-inner-icon="mdi-swap-vertical"
          ></v-select>
        </div>
        <div class="d-flex flex-wrap justify-center justify-md-start">
          <ProductCard v-for="(card, ind) in state.products" :key="ind" :product="card" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  color: black;
  justify-content: center;
}
.order {
  width: 200px;
}
.filters {
  // display: none;
  margin-top: 80px;
  min-width: 230px;
}
.cards {
  max-width: 380px;
}
@media screen and (min-width: 780px) and (max-width: 1020px) {
  .filters {
    display: none;
  }
}
@media screen and (min-width: 780px) and (max-width: 1320px) {
  .cards {
    max-width: 850px;
  }
}
@media screen and (min-width: 600px) and (max-width: 780px) {
  .filters {
    display: none;
  }
  .cards {
    max-width: 550px;
  }
}
@media screen and (min-width: 1320px) {
  .cards {
    max-width: 1100px;
  }
}
</style>
