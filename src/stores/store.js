import { defineStore } from 'pinia'
import axios from 'axios';

export const useApiStore = defineStore('store',{
  id: 'exemplo',
  state: () => ({}),
  actions: {
    async getProducts(params) {
      //a API n aceita valores quebrados de avaliação então não tem como colocar para ir até 4.99 por exemplo, deixei indo de 4 a 5 para caso tenha algum com 4.5 estrelas mostrar
      const preco = params[2].text && params[2].text !== 'Sem filtro de Preço' ? `&startPrice=${params[2].startingPrice}&endPrice=${params[2].endingPrice}` : '';
      const avaliacao = params[3].value ? `&startEvaluation=${params[3].value}&endEvaluation=${params[3].value + 1}` : '';
      const discount = params[4].text && params[4].text !== 'Sem filtro de Descontos' ?  `&startDiscount=${params[4].startingDiscount}&endDiscount=${params[4].endingDiscount}` : '';
      const order = params[5].text && params[5].text !== 'Sem Ordem' ? `&orderBy=${params[5].value}&orderDir=${params[5].orderDir}` : '';
      const category = params[6] ? `&category=${params[6]}` : ''
      const url = `https://testfront.zlinkt.com/`;
      const parametros = 
      `?index=${params[0] === 1 ? '0' : (params[0])*24 -1}` +
      `&length=${params[1]}` +
      preco +
      avaliacao +
      discount +
      order +
      category;
      console.log(parametros)
      try {
        const data = (await axios.get(url + parametros)).data.products
        return data
      } catch(err) {
        console.log(err)
      }
    }
  }  
});