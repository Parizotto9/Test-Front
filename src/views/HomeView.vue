<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import smartphone from '../assets/smartphone-icon.webp'
import notebook from '../assets/notebook-icon.jpg'
import games from '../assets/games-icon.jpg'
import tv from '../assets/tv-icon.jpg'
import house from '../assets/house-icon.jpeg'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue';

export default {
  components: { ProductCard },
  setup() {
    const state = reactive({
      loading: true, // Adicionado para definir loading como true inicialmente
      categorys: [
        {
          name: "Smartphones",
          image: smartphone,
          to: "/search?category=SMARTPHONES"
        },
        {
          name: "Notebooks",
          image: notebook,
          to: "/search?category=NOTEBOOKS"
        },
        {
          name: "Games",
          image: games,
          to: "/search?category=GAMES"
        },
        {
          name: "Television",
          image: tv,
          to: "/search?category=TV"
        },
        {
          name: "Home",
          image: house,
          to: "/search?category=HOME"
        },
      ],
      products: [], // Movido para o objeto state
    });

    const router = useRouter();

    const redirect = (to) => {
      router.push(to);
    };

    const getProducts = async () => {
      try {
        const res = await axios.get("https://testfront.zlinkt.com/?index=0&length=4&startDiscount=40");
        state.products = res.data.products;
        state.loading = false;
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(getProducts);

    return {
      state,
      redirect,
    };
  },
}
</script>

<template>
  <main class="main">
    
    <div class="centralizar">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="item, ind in state.categorys" :key="ind">
          <div class="card ma-3 ma-sm-5 ma-md-10 text-black" @click="redirect(item.to)">
            <img :src="item.image" class="image" :alt="item.name"/>
            {{item.name}}
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>
    
    <div class="centralizar">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="card, ind in state.products" :key="ind" class="">
          <ProductCard  :product="card"/>
        </v-slide-group-item>
      </v-slide-group>
    </div>
    </main>
  </template>
<style lang="scss" scoped>
.centralizar{
display: flex;
justify-content: center;
}

.image {
  width: 100px;
  aspect-ratio: 1/1;
  background: white;
  object-fit: contain ;
  border-radius: 50%;
  margin-bottom: 10px;
  mix-blend-mode: screen;
}
.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  max-width: fit-content;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
}
</style>
