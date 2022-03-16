<template>
  <div class="layout">
    <Form />
    <Table />
  </div>
</template>

<script lang="ts">
import Form from "@/components/Form.vue";
import Table from "@/components/Table.vue";
import { Product } from "@/contracts/Product.interface";
import { mapGetters } from "vuex";

export default {
  components: {
    Form,
    Table,
  },
  computed: {
    ...mapGetters({ products: "getProducts" }),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    const savedProducts = localStorage.getItem("products");
    const initialState = savedProducts
      ? JSON.parse(savedProducts)
      : ([] as Product[]);
    this.$store.dispatch("setProducts", initialState);
    localStorage.setItem("products", JSON.stringify(this.products));
  },
};
</script>
<style lang="scss">
@import "../assets/styles/ main";
</style>
