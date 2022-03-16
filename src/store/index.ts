import { Product } from "@/contracts/Product.interface";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [] as Product[],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
  mutations: {
    ADD_PRODUCT(state, payload: Product): void {
      state.products = [...state.products, payload];
    },
    SET_PRODUCTS(state, payload: Product[]): void {
      state.products = [...payload];
    },
    SET_PRODUCTS_SELECTED(state, payload) {
      state.products = [
        ...state.products.map((product: Product) => {
          product.selected = payload;
          return product;
        }),
      ];
    },
    SET_PRODUCT_SELECTED({ products }, payload) {
      products.forEach((product) =>
        product.id === payload.id ? (product.selected = payload.selected) : ""
      );
    },
    DELETE_SELECTED_PRODUCTS(state) {
      const filteredProducts = state.products.filter(
        (p: Product) => !p.selected
      );
      state.products = filteredProducts;
    },
  },
  actions: {
    addProduct({ commit }, payload) {
      commit("ADD_PRODUCT", payload);
    },
    setProducts({ commit }, payload) {
      if (payload.length) {
        commit("SET_PRODUCTS", [...payload]);
      }
    },
  },
});
