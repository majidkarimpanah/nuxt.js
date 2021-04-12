<template>
	<div id="page-content-wrapper">
		<div class="container-fluid">
			<div class="row" v-if="!emptySearch">
				<div class="col-lg-3 mt-3 col-md-4 col-sm-4 prods" v-for="(product,index) in products" :key="index">
					<div class="card pr-cd" @mouseover="hover(product, 1)" @mouseout="hover(product, 0)" :class="{ hovered:product.hovered }" >
						<nuxt-link class="pr-det text-center" :to="{ name: 'customer-product-slug', params: { slug:product.product_slug, index: index } }">
							<div class="image">
								<img class="card-img-top" src="~/assets/images/blade.jpg" alt="" />
							</div>
							<p class="card-text">{{ product.product_title }}</p>
							<p class="price"><strong>Ksh. {{ product.product_price | threeDigitsCoversion }}</strong></p>
						</nuxt-link>
						<div class="card-body text-center">
							<p class="cart btn btn-warning mx-4 mt-2 mb-4" @click.prevent="addCart(index)">Add cart</p>
						</div>
					</div>
				</div>
			</div>
			<template class="row" v-if="emptySearch">
				<div class="container">
					<div class="col-md-8 text-center alert alert-danger">
						<p class="text-danger">No product matching your search!!!</p>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

	export default {
		async fetch({ store }) {
			// let {data} = await axios.get("http://backend.site/api/products")
			let {data} = await axios.get(process.env.apiURLProducts)
			store.dispatch("setProducts", data)
		},
		data() {
			return {
				emptySearch: false
			};
		},
		methods: {
			addCart(index) {
				this.$store.dispatch("addCart", index)
			},
			hover(product, v) {
				product.hovered = v;
			}
		},
		computed: {
			products (){
				if (this.$store.getters.products.length > 0) {
					this.emptySearch = false;
				 	return this.$store.getters.products
				}

				return this.emptySearch = true
			}
		}
	};

</script>

<style lang="css" scoped>

</style>
