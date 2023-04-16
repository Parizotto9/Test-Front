import { vi, describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'
import { useRouter } from 'vue-router';
// import {RouteNames} from '../../router/index';
vi.mock('vue-router');

describe('ProductCard', () => {
  useRouter.mockReturnValue({
    push: vi.fn(),
  })

  beforeEach(() => {
    useRouter().push.mockReset()
  })

  const product = {
    id: 1,
    thumbnail: 'https://zapfacil-s3.s3.us-west-2.amazonaws.com/Assets/dev//jV52RQF82bvNNl8.png',
    title: 'Item title',
    price: 400,
    evaluation: 3,
    discount: 20,
  };
  const carrousel = false;
  it('renders properly', () => {
    const wrapper = mount(ProductCard, { 
      props: {
        product, 
        carrousel
      }
     })

     expect(wrapper.exists()).toBe(true);
     expect(wrapper.find('.card-image').attributes('src')).toBe(product.thumbnail);
     expect(wrapper.find('.title').text()).toBe(product.title);
     expect(wrapper.find('.text-h6').text()).toBe(((product.price * (100 - product.discount)) / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }));
  })

  it('redirect on click',  async () => {
    // const VueRouter = await import('vue-router');
    const wrapper = mount(ProductCard, {
      props:{
        product, 
        carrousel
      }
    });

    await wrapper.trigger('click');

    expect(useRouter().push).toHaveBeenCalled(`/store?item=${product.id}`)
  })
})
