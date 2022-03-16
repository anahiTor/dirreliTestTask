<template>
  <div class="table">
    <div>
      <div class="table-row">
        <div>
          <input type="checkbox" @change="changeAll" />
        </div>
        <div>Product name</div>
        <div>Price</div>
        <div>Qta</div>
        <div>Sum</div>
      </div>
      <div v-for="item in products" :key="item.id" class="table-row">
        <div>
          <input
            type="checkbox"
            @change="selectProduct($event, item.id)"
            :checked="item.selected"
          />
        </div>
        <div>{{ item.name }}</div>
        <div>${{ item.price }}</div>
        <div>{{ item.qty }}</div>
        <div>${{ item.qty * item.price }}</div>
      </div>
      <div class="actions">
        <button class="button danger" @click="deleteSelectedProducts">
          Delete
        </button>
        <div>Total ${{ totalPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import store from "@/store";
import { Product } from "@/contracts/Product.interface";

@Component({})
class Form extends Vue {
  static options: any;
}

export default {
  name: "Form",
  props: Form.options.props,
  computed: {
    ...mapGetters({ products: "getProducts" }),
    totalPrice() {
      return this.products?.length
        ? this.products
            .map((product: Product) => product.price)
            .reduce((acc: number, curr: number) => +acc + +curr)
        : 0;
    },
  },
  methods: {
    deleteProducts() {
      store.dispatch("deleteProducts");
    },
    selectProduct(e: any, id: number) {
      const data = {
        id,
        selected: e.target.checked,
      };
      store.commit("SET_PRODUCT_SELECTED", data);
      store.commit("UPDATE_LOCALSTORAGE");

      console.log(e.target.checked);
    },
    changeAll(e: any) {
      this.$store.commit("SET_PRODUCTS_SELECTED", e.target.checked);
      localStorage.setItem("products", JSON.stringify(this.products));

    },
    deleteSelectedProducts() {
      store.commit("DELETE_SELECTED_PRODUCTS");
      localStorage.setItem("products", JSON.stringify(this.products));
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  margin-top: 3rem;
  .table-row {
    display: grid;
    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
    margin: 1rem 0;
    height: 4rem;
    border-radius: 10px;
    box-shadow: 4px 2px 13px -3px #c0baba;
    > div {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      &:not(:first-child) {
        border-left: 1px solid #c0baba;
      }
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
