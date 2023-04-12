<script>
import { reactive, watch, onMounted, computed } from 'vue'
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
      filteredProducts: [],
      dialog: false
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
          endingPrice: Number.POSITIVE_INFINITY
        }
      ],
      rating: [
        { apply: false, value: 1 },
        { apply: false, value: 2 },
        { apply: false, value: 3 },
        { apply: false, value: 4 },
        { apply: false, value: 5 }
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
          startingDiscount: 0.0001,
          endingDiscount: 10
        }
      ]
    })

    watch(filters, () => {
      filter()
    })

    const route = useRoute()

    const getProducts = async () => {
      await axios
        .get('https://testfront.zlinkt.com/?index=0&length=4&startDiscount=40')
        .then((res) => {
          state.products = res.data.products
          state.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
        filter()
    }

    const filter = () => {
      let selectedPrices = filters.price.filter((item) => {
        return item.apply
      })

      let selectedRatings = filters.rating.filter((item) => {
        return item.apply
      })

      let selectedDiscounts = filters.discount.filter((item) => {
        return item.apply
      })

      state.filteredProducts = state.products.filter((item) => {
        const finalPrice = item.price*(100-item.discount)/100
        return filterPrice(selectedPrices, finalPrice)
      }).filter((item) => {
        return filterRating(selectedRatings, item)
      }).filter((item) => {
        return filterDiscount(selectedDiscounts, item)
      })
    }

    const filterPrice = (selectedFilters, price) => {
      if (selectedFilters.length === 0) {
        return true
      }
      return selectedFilters.some((fil) => {
        return fil.startingPrice <= price && fil.endingPrice >= price
      })
    }

    const filterRating = (selectedRatings, item) => {
      if (selectedRatings.length === 0) {
        return true
      } 
      return selectedRatings.some((fil) => {
        const value = fil.value - item.evaluation
        return  value <= 0 && value > -1 
      })
    }

    const filterDiscount = (selectedDiscounts, item) => {
      if (selectedDiscounts.length === 0) {
        return true
      } 
      return selectedDiscounts.some((fil) => {
        return fil.startingDiscount <= item.discount && fil.endingDiscount >= item.discount
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
          filter()
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
      filter
    }
  }
}
</script>

<template>
  <main>
    <div class="page ma-1 ma-md-4">
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
              <v-rating size="small" :model-value="filter.value" readonly></v-rating>
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
                    <v-rating size="small" :model-value="filter.value" readonly></v-rating>
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
          <ProductCard v-for="(card, ind) in state.filteredProducts" :key="ind" :product="card" />
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
  width: 380px;
}
@media screen and (min-width: 1020px) {
  .filters {
    display: block;
  }
  .dialog{
    display: none;
  }
}
@media screen and (min-width: 800px) and (max-width: 1320px) {
  .cards {
    width: 800px;
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  .cards {
    width: 550px;
  }
}
@media screen and (min-width: 1320px) {
  .cards {
    width: 1100px;
  }
}
</style>
