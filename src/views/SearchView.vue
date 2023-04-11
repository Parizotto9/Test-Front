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
      products: [],
      dialog: false
      // filters: {
      // }
    })
    const filters = reactive({
      price: [
        {
          apply: false,
          text: 'Até R$ 100,00',
          startingPrice: 0,
          endingPrice: 100
        },
        {
          apply: false,
          text: 'R$ 100,00 a R$ 500,00',
          startingPrice: 100,
          endingPrice: 500
        },
        {
          apply: false,
          text: 'R$ 500,00 a R$ 1000,00',
          startingPrice: 500,
          endingPrice: 1000
        },
        {
          apply: false,
          text: 'R$ 1000,00 a R$ 2000,00',
          startingPrice: 1000,
          endingPrice: 2000
        },
        {
          apply: false,
          text: 'R$ 2000,00 a R$ 3000,00',
          startingPrice: 2000,
          endingPrice: 3000
        },
        {
          apply: false,
          text: 'A partir de R$ 3000,00',
          startingPrice: 3000,
          endingPrice: null
        }
      ],
      rating: [
        { apply: false },
        { apply: false },
        { apply: false },
        { apply: false },
        { apply: false }
      ],
      discount: [
        {
          apply: false,
          text: 'De 60% até 80%',
          startingDiscount: 60,
          endingDiscount: 80
        },
        {
          apply: false,
          text: 'De 30% até 60%',
          startingDiscount: 30,
          endingDiscount: 60
        },
        {
          apply: false,
          text: 'De 10% até 30%',
          startingDiscount: 10,
          endingDiscount: 30
        },
        {
          apply: false,
          text: 'Até 10%',
          startingDiscount: null,
          endingDiscount: 10
        }
      ]
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
      filters,
      getProducts,
      getByCategoryOrSearch,
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
          <v-checkbox
            v-for="(filter, ind) in filters.price"
            :key="ind"
            v-model="filter.apply"
            hide-details
            :label="filter.text"
          ></v-checkbox>
        </div>
        <v-divider></v-divider>
        <h3>Avaliação</h3>
        <div>
          <v-checkbox
            v-for="(filter, ind) in filters.rating"
            v-model="filter.apply"
            :key="ind"
            hide-details
          >
            <template v-slot:label>
              <v-rating size="small" :model-value="ind + 1" readonly></v-rating>
            </template>
          </v-checkbox>
        </div>
        <h3>Desconto</h3>
        <div>
          <v-checkbox
            v-model="filter.apply"
            v-for="(filter, ind) in filters.discount"
            :key="ind"
            hide-details
            :label="filter.text"
          ></v-checkbox>
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
          <v-btn prepend-icon="mdi-filter-variant" variant="text" color="black" class="dialog text-none" @click="state.dialog = !state.dialog"> Filtros </v-btn>
          <v-dialog v-model="state.dialog" width="auto">
            <v-card class="pa-10 relative">
              <v-btn
              icon
                @click="state.dialog = !state.dialog"
                variant="text"
                class="btn-close"
                size="large"
              >
                <v-icon icon="mdi-close"></v-icon>
              </v-btn>
              <h3>Preço</h3>
              <div>
                <v-checkbox
                  v-for="(filter, ind) in filters.price"
                  :key="ind"
                  v-model="filter.apply"
                  hide-details
                  :label="filter.text"
                ></v-checkbox>
              </div>
              <v-divider></v-divider>
              <h3>Avaliação</h3>
              <div>
                <v-checkbox
                  v-model="filter.apply"
                  v-for="(filter, ind) in filters.rating"
                  :key="ind"
                  hide-details
                >
                  <template v-slot:label>
                    <v-rating size="small" :model-value="ind + 1" readonly></v-rating>
                  </template>
                </v-checkbox>
              </div>
              <h3>Desconto</h3>
              <div>
                <v-checkbox
                  v-model="filter.apply"
                  v-for="(filter, ind) in filters.discount"
                  :key="ind"
                  hide-details
                  :label="filter.text"
                ></v-checkbox>
              </div>
            </v-card>
          </v-dialog>
        </div>
        <div class="d-flex flex-wrap justify-center justify-md-start">
          <ProductCard v-for="(card, ind) in state.products" :key="ind" :product="card" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
}
.page {
  display: flex;
  color: black;
  justify-content: center;
}
.order {
  display: flex;
  width: 320px;
  align-items: end;
}
.filters {
  margin-top: 80px;
  min-width: 230px;
  display: none;
}
.cards {
  max-width: 380px;
}
@media screen and (min-width: 1020px) {
  .filters {
    display: block;
  }
  .dialog{
    display: none;
  }
}
@media screen and (min-width: 780px) and (max-width: 1320px) {
  .cards {
    max-width: 850px;
  }
}
@media screen and (min-width: 600px) and (max-width: 780px) {
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
