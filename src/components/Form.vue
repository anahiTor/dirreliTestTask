<template>
  <div class="section">
    <h1>Vue Invoice Calc</h1>
    <div>
      <form class="form">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.product.name.$error }"
        >
          <input
            class="form__input"
            v-model.trim="$v.product.name.$model"
            @focus="$event.target.select()"
            placeholder="Product name"
          />
          <div class="error" v-if="!$v.product.name.required">
            Field is required
          </div>
          <div class="error" v-if="!$v.product.name.minLength">
            Name must have at least
            {{ $v.product.name.$params.minLength.min }} letter.
          </div>
        </div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.product.price.$error }"
        >
          <input
            class="form__input"
            v-model.trim="$v.product.price.$model"
            placeholder="Price"
            type="number"
          />
          <div class="error" v-if="!$v.product.price.between">
            Must be between {{ $v.product.price.$params.between.min }} and
            {{ $v.product.price.$params.between.max }}
          </div>
        </div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.product.qty.$error }"
        >
          <input
            class="form__input"
            v-model.trim="$v.product.qty.$model"
            placeholder="Qty"
            type="number"
          />
          <div class="error" v-if="!$v.product.qty.between">
            Must be between {{ $v.product.qty.$params.between.min }} and
            {{ $v.product.qty.$params.between.max }}
          </div>
        </div>
        <button class="button" @click.prevent="addProduct">Add</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Vue } from "vue-property-decorator";
import { Product } from "@/contracts/Product.interface";
import { required, minLength, between } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { mapGetters } from "vuex";
import store from "@/store";

@Component({})
class Form extends Vue {
  static options: any;
}

export default {
  name: "Form",
  props: Form.options.props,
  data() {
    return {
      product: {
        name: "Product",
        price: 10,
        qty: 1,
      } as Product,
    };
  },
  mixins: [validationMixin],
  validations: {
    product: {
      name: {
        required,
        minLength: minLength(1),
      },
      price: {
        required,
        between: between(10, 3000),
      },
      qty: {
        required,
        between: between(1, 40),
      },
    },
  },
  computed: {
    ...mapGetters({ products: "getProducts" }),
  },
  methods: {
    addProduct() {
      const product = {
        ...this.product,
        id: this.products.length
          ? this.products[this.products.length - 1].id + 1
          : 1,
        selected: false,
      };
      store.dispatch("addProduct", { ...product });
      localStorage.setItem("products", JSON.stringify(this.products));
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  width: 100%;
  input {
    width: 100%;
    height: 2rem;
    padding: 1rem;
    border: none;
    box-shadow: 4px 2px 13px -3px #c0baba;
    outline: none;
    border-radius: 10px;
  }
  .form-group {
    position: relative;
    width: 20rem;
    &:not(:first-child) {
      margin-left: 3rem;
      width: 10rem;
    }
    &--error {
      input {
        border: 1px solid rgb(230, 23, 23);
      }
    }
    .error {
      position: absolute;
      left: 1rem;
      top: calc(100% + 0.5rem);
      color: rgb(230, 23, 23);
    }
  }
  .button {
    margin-left: 4rem;
    border: 1px solid rgb(59, 124, 102);
  }
}
</style>
