<script>
import { useRouter } from 'vue-router';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    carrousel: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    const redirect = (id) =>{
      router.push(`/store?item=${id}`)
    }
    return{
      redirect
    }
  },
}
</script>

<template>
  <v-card
    class="elevation-2 ma-1 ma-sm-2 ma-md-2 pa-5 d-flex flex-column relative"
    :class="carrousel ? '' : 'size'"
    @click="redirect(product.id)"
  >
    <img :src="product.thumbnail" :alt="product.title" class="card-image" />
    <v-chip v-if="product.discount > 0" class="ma-2 discount" color="white" size="x-small">
      <v-icon start icon="mdi-arrow-down"></v-icon>
      {{ product.discount }} %
    </v-chip>
    <div>
      <p class="text-subtitle-2 title">{{ product.title }}</p>
      <v-rating
        density="compact"
        size="small"
        :model-value="product.evaluation"
        readonly
        color="yellow-darken-3"
        class="my-2"
      ></v-rating>
      <p v-if="product.discount > 0" class="text-decoration-line-through text-caption">
        {{ product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
      </p>
      <p class="font-weight-bold text-h6" :class="product.discount > 0 ? '' : 'mt-4'">
        {{
          ((product.price * (100 - product.discount)) / 100).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })
        }}
      </p>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  transition: 0.5s;
  width: 240px;
  height: 370px;
  cursor: pointer;
}
.v-card:hover {
  box-shadow: 0 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0 4px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0 1px 10px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
}
@media screen and (max-width: 390px) {
  .size {
    width: 280px;
  }
}
@media screen and (min-width: 390px) and (max-width: 600px) {
  .size {
    width: 180px;
  }
}
.card-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
}
.discount {
  position: absolute;
  background: rgb(86, 226, 86);
  top: 0px;
  right: 0px;
}
.title {
  margin-top: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 43px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
