<template>
	<div class="container-fluid cart-page">
		<div class="breadcrumb breadcrumb_bg my-4">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-lg-6">
						<div class="breadcrumb_iner">
							<div class="breadcrumb_iner_item">
								<!-- <p>Home/Shop/Single product</p> -->
								<nav aria-label="breadcrumb">
									<ol class="breadcrumb">
										<li class="breadcrumb-item" @click="removeFilters"><nuxt-link to="/">Home</nuxt-link></li>
										<li class="breadcrumb-item" @click="removeFilters"><nuxt-link to="/customer/categories/Networks">Shop</nuxt-link></li>
										<li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="row checkout-top">
							<div class="col-4">
								<h2>Products in Cart</h2>
							</div>
							<div class="col-5 text-center ca-totals">
								<h2 v-show="totals > 0">
									<strong>Total</strong>
									Ksh. {{ sumTotal }}
								</h2>
							</div>
							<div class="col-3" v-if="carts.length > 0">
								<button type="button" class="btn btn-success" @click="checkout">Checkout</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<section class="col-md-8 col-sm-12 ca-prod offset-2">
				<div v-for="(product,index) in selectedProducts" :key="index">
					<div class="card">
						<div class="card-body">
							<div class="image">
								<img class="card-img"src="~/assets/images/blade.jpg"
									alt="image of product"
								/>
							</div>
							<div class="content">
								<h4 class="card-title">{{ product.product_title }}</h4>
								<p>
									<strong>Ksh.</strong>
									{{ product.productTotals | threeDigitsCoversion }}
								</p>
								<span>
									<strong>Quantity :</strong>
								</span>
								<div class="product_count d-inline-block">
									<span @click="changeQty(product.product_id + '/' + '-')"> <i class="ti-minus"></i></span>
									<input type="text" class="input-number" :value="product.qty" min="1" v-on:keyup="changeQty(product.product_id + '/' + '=')"/>
									<span @click="changeQty(product.product_id + '/' + '+')"><i class="ti-plus"></i></span>
								</div>
								<button
									type="button"
									class="btn btn-danger float-right"
									@click="removeFromCart(product.product_id)"
								>Remove</button>
							</div>
						</div>
					</div>
				</div>
				<div class="card text-center" v-if="carts.length == 0">
					<div class="card-body">
						<h1 class="card-title">Empty Cart</h1>
						<p class="card-text">
							There are no products in your cart.
							<router-link to="/">Click here to return &nbsp;</router-link>to products page and select a product.
						</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	model: {
		prop: "input",
		event: "change"
	},
	data() {
		return {};
	},
	mounted() {
		//hides the menu toggle icons for pages other than the all products page
		this.$emit("active-category", "all");
		this.$emit("hide-cat", true);
	},
	methods: {
		remove_cart(id) {
			this.$emit("remove-from-cart", id);
		},
		checkout() {
			try {
				return this.$router.push({ name: "checkout" });

			} catch (e) {
				localStorage.removeItem("userLogged");
				window.location.reload();
			}
		},
		changeQty(event) {
			let input = document.querySelector(".product_count input")
			const index = this.carts.findIndex(element => element.id == event.split("/")[0])
			const newValue = { cart_index: index, operation: event.split("/")[1], qty: Number(input.value) }

			if (input.value > 0) {
				return this.$store.dispatch("updateQty", newValue)
			}

			this.$store.dispatch("updateQty", { cart_index: index, operation: event.split("/")[1], qty: 1})
			return input.value = 1
		},
		removeFromCart(id) {
            this.$store.dispatch("removeCart", id)
		},
		removeFilters() {
			this.$store.dispatch("setFilterBrand", "")
			this.$store.dispatch("setActiveCategory", "")
		},
	},
	computed: {
		selectedProducts() {
			let selProducts = [];

			this.products.forEach(product => {
				this.carts.forEach(cart => {
					if (product.product_id == cart.id) {
						product.qty = cart.qty
						product.productTotals = product.qty * product.product_price
						selProducts.push(product);
					}
				});
			});
			return selProducts;
		},
		sumTotal() {
			return roundToTwoDecimals(this.totals).toLocaleString();
			// const arrSum = arr => arr.reduce((a, b) => a + b, 0);
			// return this.totals.reduce((a, b) => a + b, 0);
		},
		totals() {
			let total = 0;

            this.carts.forEach(element => {
                total += (Number(element.price) * Number(element.qty))
            });

            return total;
		},
		carts() {
			return this.$store.getters.cart_items
		},
		products() {
			return this.$store.getters.products
		},
		itemQty: {
			get() {
				// const existsInCart = this.checkExistsInCart();

				// if (existsInCart.length > 0) {
					// this.$store.dispatch("existsInCart", true)
					// return existsInCart[0].qty
				// }

				// this.$store.dispatch("existsInCart", false)
				// return 1
			},
			set(newValue) {
				const index = this.getProductIndex()

				if (index !== -1) {
					this.$store.dispatch("updateQty", { cart_index: index, operation: "=", qty: newValue })
				}
			}
		},
	}
};

function roundToTwoDecimals(num) {
	return +(Math.round(num + "e+2") + "e-2");
}
</script>

<style scoped>

</style>
