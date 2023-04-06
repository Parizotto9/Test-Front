<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import smartphone from '../assets/smartphone-icon.webp'
import notebook from '../assets/notebook-icon.jpg'
import games from '../assets/games-icon.jpg'
import tv from '../assets/tv-icon.jpg'
import house from '../assets/house-icon.jpeg'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const state = reactive({
      categorys: [
        {
          name: 'Smartphones',
          image: smartphone,
          to: '/search?category=SMARTPHONES'
        },
        {
          name: 'Notebooks',
          image: notebook,
          to: '/search?category=NOTEBOOKS'
        },
        {
          name: 'Games',
          image: games,
          to: '/search?category=GAMES'
        },
        {
          name: 'Television',
          image: tv,
          to: '/search?category=TV'
        },
        {
          name: 'Home',
          image: house,
          to: '/search?category=HOME'
        },
      ],
      products: [],
      loading: true,
      games: games
    })

    const router = useRouter();
    // const query = {category: 'abc', search: 'miau'}

    const redirect = (to) => {
      router.push(to)
    }

    const getProducts = async () => {
      await axios
        .get('https://testfront.zlinkt.com/?index=0&length=4&startDiscount=60')
        .then((res) => {
          console.log(res.data)
          state.products = res.data
          state.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }

    onMounted(getProducts)

    return {
      ...state,
      redirect,
    }
  }
}
</script>

<template>
  <main class="main">
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="item, ind in categorys" :key="ind">
        <div class="card ma-3 ma-sm-5 ma-md-10" @click="redirect(item.to)">
          <img :src="item.image" class="image" :alt="item.name"/>
          {{item.name}}
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </main>
</template>
<style lang="scss" scoped>
.main {
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
