<script>
import { reactive, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useApiStore } from '../stores/store'

export default {
  components: { ProductCard },
  setup() {
    const store = useApiStore()
    const state = reactive({
      loading: true,
      filteredProducts: [],
      dialog: false
    })
    const filters = reactive({
      selectedPage: 1,
      selectedPrice: {
        text: 'Sem filtro de Preço'
      },
      selectedRatings: { value: null, label: 'Sem filtro de Avaliações' },
      selectedDiscount: {
        text: 'Sem filtro de Descontos'
      },
      order: { text: 'Sem Ordem', value: '', orderDir: '' },
      price: [
        {
          text: 'Sem filtro de Preço'
        },
        {
          text: 'Até R$ 100,00',
          startingPrice: 0,
          endingPrice: 100
        },
        {
          text: 'R$ 100,00 a R$ 500,00',
          startingPrice: 100,
          endingPrice: 500
        },
        {
          text: 'R$ 500,00 a R$ 1000,00',
          startingPrice: 500,
          endingPrice: 1000
        },
        {
          text: 'R$ 1000,00 a R$ 2000,00',
          startingPrice: 1000,
          endingPrice: 2000
        },
        {
          text: 'R$ 2000,00 a R$ 3000,00',
          startingPrice: 2000,
          endingPrice: 3000
        },
        {
          text: 'A partir de R$ 3000,00',
          startingPrice: 3000,
          endingPrice: 2000000
        }
      ],
      rating: [
        { value: null, label: 'Sem filtro de Avaliações' },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 }
      ],
      discount: [
        {
          text: 'Sem filtro de Descontos'
        },
        {
          text: 'De 60% até 80%',
          startingDiscount: 60,
          endingDiscount: 80
        },
        {
          text: 'De 30% até 60%',
          startingDiscount: 30,
          endingDiscount: 60
        },
        {
          text: 'De 10% até 30%',
          startingDiscount: 10,
          endingDiscount: 30
        },
        {
          text: 'Até 10%',
          startingDiscount: 0.0001,
          endingDiscount: 10
        }
      ],
      orderItems: [
        { text: 'Sem Ordem', value: '', orderDir: '' },
        { text: 'Menores Preços', value: 'price', orderDir: 'asc' },
        { text: 'Maiores Preços', value: 'price', orderDir: 'desc' },
        { text: 'Melhores Avaliados', value: 'evaluation', orderDir: 'desc' }
      ]
    })

    watch(state.order, () => {
      getProducts()
    })
    watch(filters, () => {
      getProducts()
    })
    watch(filters, () => {
      getProducts()
    })

    const route = useRoute()

    const getProducts = async () => {
      const params = [
        filters.selectedPage,
        24,
        filters.selectedPrice,
        filters.selectedRatings,
        filters.selectedDiscount,
        filters.order,
        query.value.category
      ]
      const data = await store.getProducts(params)
      state.filteredProducts = data.products
      state.pages = Math.floor(data.count / 24)
    }

    const query = computed(() => {
      return route.query
    })

    onMounted(getProducts)

    return {
      state,
      filters,
      getProducts
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
          <v-radio-group v-model="filters.selectedPrice">
            <v-radio
              v-for="radio in filters.price"
              :key="radio"
              :label="radio.text"
              :value="radio"
            ></v-radio>
          </v-radio-group>
        </div>
        <v-divider></v-divider>
        <h3 class="mt-4">Avaliação</h3>
        <div>
          <v-radio-group v-model="filters.selectedRatings">
            <v-radio
              v-for="(rating, ind) in filters.rating"
              :key="ind"
              :value="rating"
              :label="rating.label"
            >
              <template v-slot:label v-if="ind != 0">
                <v-rating size="small" :model-value="rating.value" readonly></v-rating>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
        <h3 class="mt-4">Desconto</h3>
        <div>
          <v-radio-group v-model="filters.selectedDiscount">
            <v-radio
              v-for="discount in filters.discount"
              :key="discount"
              :label="discount.text"
              :value="discount"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>
      <div class="cards d-flex flex-column align-center align-md-start">
        <div class="order ma-3">
          <v-select
            label="Ordenar"
            v-model="filters.order"
            :items="filters.orderItems"
            item-title="text"
            item-value="value"
            variant="underlined"
            return-object
            hide-details
            prepend-inner-icon="mdi-swap-vertical"
          ></v-select>
          <v-btn
            prepend-icon="mdi-filter-variant"
            variant="text"
            color="black"
            class="dialog text-none"
            @click="state.dialog = !state.dialog"
          >
            Filtros
          </v-btn>
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
                <v-radio-group v-model="filters.selectedPrice">
                  <v-radio
                    v-for="radio in filters.price"
                    :key="radio"
                    :label="radio.text"
                    :value="radio"
                  ></v-radio>
                </v-radio-group>
              </div>
              <v-divider></v-divider>
              <h3 class="mt-4">Avaliação</h3>
              <div>
                <v-radio-group v-model="filters.selectedRatings">
                  <v-radio
                    v-for="(rating, ind) in filters.rating"
                    :key="ind"
                    :value="rating"
                    :label="rating.label"
                  >
                    <template v-slot:label v-if="ind != 0">
                      <v-rating size="small" :model-value="rating.value" readonly></v-rating>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
              <h3 class="mt-4">Desconto</h3>
              <div>
                <v-radio-group v-model="filters.selectedDiscount">
                  <v-radio
                    v-for="discount in filters.discount"
                    :key="discount"
                    :label="discount.text"
                    :value="discount"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-card>
          </v-dialog>
        </div>
        <div class="d-flex flex-wrap justify-center justify-md-start">
          <ProductCard v-for="(card, ind) in state.filteredProducts" :key="ind" :product="card" :carrousel="false" />
        </div>
        <div class="d-flex justify-center w-100" fluid>
          <v-pagination
            v-model="filters.selectedPage"
            :length="state.pages"
            rounded="circle"
            class="mt-5"
            :size=" $vuetify.display.smAndDown ? 'small' : 'default'"
            :total-visible="4"
          ></v-pagination>
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
  .dialog {
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
