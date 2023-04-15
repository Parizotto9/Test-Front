<script>
import { onBeforeMount, reactive, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useApiStore } from '../stores/store'
import ProductCard from '../components/ProductCard.vue'
import StoreBox from '../components/StoreBox.vue'

export default {
  components: { ProductCard, StoreBox },
  setup() {
    const store = useApiStore()
    const state = reactive({
      item: {},
      indexImg: 0,
      itemId: null,
      dialogZoom: false,
      products: [],
      productsDiscount: []
    })

    const route = useRoute()

    const getItem = async () => {
      const data = await store.getItem(state.itemId)
      state.item = data
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      getProducts()
      getProductsDiscount()
    }

    const getProducts = async () => {
      const params = [1, 15, '', '', '', '', state.item.category, '']
      const data = await store.getProducts(params)
      state.products = data.products
    }

    onBeforeRouteUpdate((to, from, next) => {
      state.itemId = to.query.item
      getItem()
      next()
    })

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

    const getId = () => {
      state.itemId = route.query.item
    }

    const finalPrice = computed(() => {
      return ((state.item.price * (100 - state.item.discount)) / 100).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    })

    onBeforeMount(getId)
    onBeforeMount(getItem)

    return {
      state,
      finalPrice
    }
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-center align-center mb-16 pb-16 mb-0 pb-0">
    <StoreBox v-if="state.item.category">
      <p class="text-grey-darken-2">
        <router-link to="/">Home </router-link>
        <span class="mx-5"> ></span>
        <router-link :to="`/search?category=${state.item.category}`">
          {{ state.item.category.toLowerCase() }}
        </router-link>
      </p>
    </StoreBox>
    <div class="d-flex justify-center flex-column flex-md-row ma-md-10 my-md-4 ma-0">
      <v-card
        elevation="0"
        class="d-flex flex-column align-center align-md-start flex-md-row ma-0 ma-md-1 rounded-lg text-grey-darken-2 cards"
      >
        <div class="d-flex flex-column justify-center align-center card-img">
          <img
            v-if="state.item.pictures"
            :src="state.item.pictures[state.indexImg]"
            :alt="state.item.title"
            class="img-full my-8"
            @click="state.dialogZoom = !state.dialogZoom"
          />
          <v-slide-group
            v-model="state.indexImg"
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
        <div class="card-info">
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
          <v-divider class="my-3"></v-divider>
          <router-link to="/">
            <p class="mt-5 text-grey-darken-2">
              {{ $vuetify.display.mdAndUp ? 'Mais informações' : 'Informações do produto' }}
            </p>
          </router-link>
          <v-divider class="my-5"></v-divider>
        </div>
      </v-card>

      <v-card
        elevation="0"
        class="rounded-lg ma-0 ma-md-1 my-3 card-price text-grey-darken-2 cards"
      >
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
        <v-divider v-if="$vuetify.display.mdAndUp" class="my-8"></v-divider>
        <v-btn
          v-if="$vuetify.display.mdAndUp"
          prepend-icon="mdi-cart-outline"
          color="green-lighten-1"
          block
        >
          Comprar</v-btn
        >
        <p class="text-caption mt-5" v-if="$vuetify.display.mdAndUp">
          Este produto é vendido por
          <a href="" class="text-grey-darken-2">{{ state.item.store }}</a> e entregue por
          <strong>Loja</strong>, que garante a sua compra, do pedido à entrega.
        </p>
      </v-card>
    </div>
    <v-dialog v-model="state.dialogZoom" width="600">
      <img :src="state.item.pictures[state.indexImg]" :alt="state.item.title">
    </v-dialog>
    <v-card class="cards d-md-none fixed-card pa-4">
      <h3 class="font-weight-bold text-h5">{{ finalPrice }}</h3>
      <p class="mb-1 text-caption">no <strong>cartão de crédito</strong></p>
      <v-btn prepend-icon="mdi-cart-outline" color="green-lighten-1" block> Comprar</v-btn>
    </v-card>

    <StoreBox title="Produtos similares">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="(card, ind) in state.products" :key="ind">
          <ProductCard :product="card" :carrousel="true" />
        </v-slide-group-item>
      </v-slide-group>
    </StoreBox>

    <StoreBox title="Aproveite as ofertas">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="(card, ind) in state.productsDiscount" :key="ind">
          <ProductCard :product="card" :carrousel="true" />
        </v-slide-group-item>
      </v-slide-group>
    </StoreBox>

    <StoreBox title="Informações do produto">
      <v-card elevation="0" class="rounded-lg ma-1 text-grey-darken-2 pa-8 mx-7 mx-md-0">
        {{ state.item.description }}
      </v-card>
    </StoreBox>
  </div>
</template>

<style scoped lang="scss">
.big-price {
  font-size: 30px;
}
.v-slide-group {
  max-width: 1420px;
}
.v-text-field {
  border: solid 1px rgb(163, 163, 163);
  border-radius: 5px;
  overflow: hidden;
}
.card-price {
  width: 300px;
  padding: 30px;
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
  padding: 20px;
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
  padding: 20px;
  h2 {
    line-height: 26px;
  }
}
.img-full {
  width: 350px;
  aspect-ratio: 1/1;
  cursor: zoom-in;
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
@media screen and (max-width: 960px) {
  .cards {
    width: 100vw !important;
    height: auto;
  }
  .card-img {
    width: 80vw;
    margin-bottom: 20px;
  }
  .card-info, .links {
    max-width: 100vw;
    padding: 10px;
  }
  .description {
    display: none;
  }
  .img-full {
    width: 335px;
  }
  .fixed-card {
    position: fixed;
    bottom: 0;
    z-index: 10;
  }
}
@media screen and (min-width: 960px) and (max-width: 1200px) {
  .card-img {
    width: 280px;
  }

  .img-full {
    width: 250px;
  }
  .img-carrousel {
    width: 50px;
  }
  .card-info {
    max-width: 280px;
    padding: 10px;
  }
  .cards {
    height: 475px;
    padding: 10px;
  }
  .card-price {
    padding: 20px;
  }
}
</style>
