<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Array,
      required: true
    }
  }
})
</script>

<template>
  <v-card class="elevation-2 ma-3 pa-5 d-flex flex-column relative" width="240" height="370">
    <img :src="product.thumbnail" :alt="product.title" class="card-image" />
    <v-chip v-if="product.discount > 0" class="ma-2 discount" color="white"  size="x-small">
      <v-icon start icon="mdi-arrow-down"></v-icon>
      {{ product.discount }} %
    </v-chip>
    <div>
      <p class="text-subtitle-2 title">{{ product.title }} isso é um teste boy namoral</p>
      <v-rating density="compact" size="small" :model-value="product.evaluation" readonly color="yellow-darken-3" class="my-2"></v-rating>
      <p class="text-decoration-line-through text-caption">R${{product.price}}</p>
      <p class="font-weight-bold  text-h6">R${{(product.price*(100-product.discount)/100).toFixed(2)}}</p>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.card-image{
    width: 100%;
    height: 180px;
    object-fit: contain;
}
.discount{
    position: absolute;
    background: rgb(86, 226, 86);
    top: 0px;
    right: 0px;
}
.title{
    margin-top: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 43px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
