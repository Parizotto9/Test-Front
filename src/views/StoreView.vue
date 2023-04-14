<script>
// import ProductCard from '../components/ProductCard.vue';
import { onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useApiStore } from '../stores/store'
import ProductCard from '../components/ProductCard.vue'

export default {
  components: { ProductCard },
  setup() {
    const store = useApiStore()
    const state = reactive({
      item: {},
      imgSelected: null,
      products: [],
      productsDiscount: []
    })

    const route = useRoute()

    const getItem = async () => {
      const data = await store.getItem(query.value.item)
      state.item = data
      getProducts()
      getProductsDiscount()
    }

    const getProducts = async () => {
      const params = [1, 15, '', '', '', '', state.item.category]
      const data = await store.getProducts(params)
      state.products = data.products
    }

    const getProductsDiscount = async () => {
      const params = [
        1,
        15,
        '',
        '',
        {
          text: 'Tem Promo',
          startingDiscount: 40,
          endingDiscount: 80
        },
        '',
        ''
      ]
      const data = await store.getProducts(params)
      state.productsDiscount = data.products
    }

    const query = computed(() => {
      return route.query
    })
    const finalPrice = computed(() => {
      return ((state.item.price * (100 - state.item.discount)) / 100).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    })
    onMounted(getItem)

    return {
      state,
      finalPrice
    }
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-center align-center">
    <div class="d-flex justify-center ma-10">
      <v-card elevation="0" class="d-flex pa-5 ma-1 rounded-lg text-grey-darken-2 cards">
        <div class="d-flex flex-column align-center card-img">
          <img :src="state.item.thumbnail" :alt="state.item.title" class="img-full my-8" />

          <v-slide-group
            v-model="state.imgSelected"
            show-arrows
            selected-class="img-selected"
            mandatory
            continuous
          >
            <v-slide-group-item
              v-for="(item, ind) in state.item.pictures"
              :key="ind"
              v-slot="{ toggle, selectedClass }"
            >
              <img
                :src="item"
                :alt="`image ${ind}`"
                :class="[selectedClass, 'img-carrousel']"
                @click="toggle"
              />
            </v-slide-group-item>
          </v-slide-group>
        </div>
        <div class="card-info pa-5">
          <h2 class="text-h6 font-weight-bold text-grey-darken-1">
            {{ state.item.title }}
          </h2>
          <p class="d-flex align-center font-weight-bold my-3">
            <v-rating
              density="comfortable"
              size="small"
              color="yellow-darken-3"
              :model-value="state.item.evaluation"
              readonly
            ></v-rating>
            {{ state.item.evaluation }}
            <v-icon icon="mdi-chat-question-outline" class="ml-4 mr-1" size="small"></v-icon>
            <router-link to="/" class="mb-1">
              <span class="text-grey-darken-2"> faça a 1ª pergunta </span>
            </router-link>
          </p>
          <p class="description text-subtitle-2">{{ state.item.info }}</p>
          <router-link to="/">
            <p class="mt-5 text-grey-darken-2">Mais informações</p>
          </router-link>
          <v-divider class="my-8"></v-divider>
        </div>
      </v-card>

      <v-card elevation="0" class="rounded-lg ma-1 card-price text-grey-darken-2 cards">
        <p v-if="state.item.discount > 0" class="my-n5">
          <span class="text-decoration-line-through text-caption">
            {{ state.item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
          </span>
          <v-chip class="ma-2 bg-green mb-3" color="white" size="x-small">
            <v-icon start icon="mdi-arrow-down"></v-icon>
            {{ state.item.discount }} %
          </v-chip>
        </p>
        <h3 class="font-weight-bold big-price text-black">{{ finalPrice }}</h3>
        <p class="mt-1 mb-3">no <strong>cartão de crédito</strong></p>
        <router-link to="/"
          ><p class="text-caption text-grey-darken-2">Mais formas de pagamento</p></router-link
        >
        <v-divider class="my-8"></v-divider>
        <p class="mt-5 text-caption">Calcular frete e prazo</p>
        <div class="d-flex align-center mb-5">
          <v-text-field
            rounded
            density="compact"
            hide-details
            placeholder="digite o CEP"
            variant="solo"
          ></v-text-field>
          <v-btn class="ml-4" color="blue-lighten-1">Ok</v-btn>
        </div>
        <v-divider class="my-8"></v-divider>
        <v-btn prepend-icon="mdi-cart-outline" color="green-lighten-1" block> Comprar</v-btn>
        <p class="text-caption mt-5">
          Este produto é vendido por
          <a href="" class="text-grey-darken-2">{{ state.item.store }}</a> e entregue por
          <strong>Loja</strong>, que garante a sua compra, do pedido à entrega.
        </p>
      </v-card>
    </div>
    <div class="centralizar mt-13">
      <h2 class="text-grey-darken-2 font-weight-bold mb-4">Produtos similares</h2>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="(card, ind) in state.products" :key="ind">
          <ProductCard :product="card" :carrousel="true" />
        </v-slide-group-item>
      </v-slide-group>
    </div>
    <div class="centralizar mt-13">
      <h2 class="text-grey-darken-2 font-weight-bold mb-4">Aproveite as ofertas</h2>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="(card, ind) in state.productsDiscount" :key="ind">
          <ProductCard :product="card" :carrousel="true" />
        </v-slide-group-item>
      </v-slide-group>
    </div>
    <!-- <ProductCard :product="state.item" :carrousel="true" /> -->
  </div>
</template>

<style scoped lang="scss">
.big-price {
  font-size: 30px;
}
.v-slide-group {
  max-width: 1420px;
}
.centralizar {
  display: flex;
  flex-direction: column;
  // align-items: center;
  max-width: 1120px;
}
.v-text-field {
  border: solid 1px rgb(163, 163, 163);
  border-radius: 5px;
  overflow: hidden;
}
/* .v-field__field, .v-input, .v-field__loader, .v-field__outline{
} */
.card-price {
  width: 300px;
}
.discount {
  background: rgb(86, 226, 86);
  top: 0px;
  right: 0px;
}
.icon {
  text-decoration: none !important;
}
.cards {
  padding: 30px;
  border: none !important;
  height: 525px;
}
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-height: 18px;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-img {
  width: 380px;
}
.card-info {
  max-width: 390px;
  h2 {
    line-height: 26px;
  }
}
.img-full {
  width: 350px;
  aspect-ratio: 1/1;
}
.img-selected {
  border: solid 1px black !important;
}
.img-carrousel {
  cursor: pointer;
  margin: 0 4px;
  border: solid 1px lightgray;
  width: 60px;
  aspect-ratio: 1/1;
}
</style>
