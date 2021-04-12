<template>
	<div class="si-prod">
		<div class="breadcrumb breadcrumb_bg my-4">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-lg-12">
						<div class="breadcrumb_iner">
							<div class="breadcrumb_iner_item">
								<!-- <p>Home/Shop/Single product</p> -->
								<nav aria-label="breadcrumb">
									<ol class="breadcrumb">
										<li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
										<li class="breadcrumb-item"><nuxt-link to="/">Shop</nuxt-link></li>
										<li class="breadcrumb-item active" aria-current="page">Single Product</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-lg-5">
					<div class="card pr-cd si-pg">
						<div class="pr-det">
							<div class="image">
								<img class="card-img" :src="image" :alt="singleProduct.title" />
							</div>
							<div class="row sin-ima my-2">
								<div class="col-3" v-for="(icon,index) in icons" :key="index">
									<img class="card-img-top" :src="icon.image" :alt="icon.alt" @mouseover="updateViewImage(index)" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-5 offset-lg-1">
					<div class="s_product_text">
						<h3>{{ singleProduct.product_title }}</h3>
						<h2>KSH. {{ singleProduct.product_price | threeDigitsCoversion }}</h2>
						<ul class="list">
							<li>
								<span>Category</span> : <nuxt-link class="active" 
								:to="{ name:'customer-categories-category', params: {category: singleProduct.product_category }}">{{ singleProduct.product_category }}</nuxt-link>
							</li>
							<li>
								<span>Availibility: {{ inStock }}</span>
							</li>
						</ul>
						<p>{{ singleProduct.product_body }}</p>
						<div class="card_area">
							<div class="product_count d-inline-block">
								<span class="inumber-decrement" @click="decrement(itemQty)"> <i class="ti-minus"></i></span>
								<input class="input-number" type="text" v-model.number="itemQty" />
								<span class="number-increment" @click="increment(itemQty)"><i class="ti-plus"></i></span>
							</div>
							<small class="form-text text-danger" v-if="showCartError">
								<em>Item must be in the cart</em>
							</small>
							<div class="add_to_cart">
								<a href="javascript:;" class="btn_3 cart" :style="cartButton" @click="add_cart(singleProduct.product_id)" v-if="cartButton.showAddBtn">add cart</a>

								<a href="javascript:;" class="btn_3 cart" :style="cartButton" @click="remove_cart(singleProduct.product_id)" v-if="!cartButton.showAddBtn">remove from cart</a>
								<a href="#" class="like_us"><i class="ti-heart"></i></a>
							</div>
							<div class="social_icon">
								<a href="#" class="fb"><i class="ti-facebook"></i></a>
								<a href="#" class="tw"><i class="ti-twitter-alt"></i></a>
								<a href="#" class="li"><i class="ti-linkedin"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<section class="product_description_area">
			<div class="container">
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item">
						<a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
						aria-selected="true">Description</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="specifications-tab" data-toggle="tab" href="#specifications" role="tab" aria-controls="specifications"
						aria-selected="false">Specification</a>
					</li>
					<li class="nav-item">
						<a class="nav-link active" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews"
						aria-selected="false">Reviews</a>
					</li>
				</ul>
				<div class="tab-content" id="myTabContent">
					<div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
						<p>
							It is often frustrating to attempt to plan meals that are designed
							for one. Despite this fact, we are seeing more and more recipe
							books and Internet websites that are dedicated to the act of
							cooking for one. Divorce and the death of spouses or grown
							children leaving for college are all reasons that someone
							accustomed to cooking for more than one would suddenly need to
							learn how to adjust all the cooking practices utilized before into
							a streamlined plan of cooking that is more efficient for one
							person creating less
						</p>
					</div>
					<div class="tab-pane fade" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
						<div class="table-responsive">
							<table class="table">
								<tbody>
									<tr>
										<td>
											<h5>Quality checking</h5>
										</td>
										<td>
											<h5>yes</h5>
										</td>
									</tr>
									<tr>
										<td>
											<h5>Freshness Duration</h5>
										</td>
										<td>
											<h5>03days</h5>
										</td>
									</tr>
									<tr>
										<td>
											<h5>Quality checking</h5>
										</td>
										<td>
											<h5>yes</h5>
										</td>
									</tr>
									<tr>
										<td>
											<h5>Freshness Duration</h5>
										</td>
										<td>
											<h5>03days</h5>
										</td>
									</tr>
									<tr>
										<td>
											<h5>When packeting</h5>
										</td>
										<td>
											<h5>Without touch of hand</h5>
										</td>
									</tr>
									<tr>
										<td>
											<h5>Each Box contains</h5>
										</td>
										<td>
											<h5>60pcs</h5>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="tab-pane fade show active" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
						<div class="row">
							<div class="col-lg-6">
								<div class="review_list">
									<div class="review_item" v-for="(review, index) in reviews" :key="index">
										<div class="media" v-if="showReviews">
											<div class="d-flex">
												<img src="~/static/single-product-img/review-3.png" alt="" />
											</div>
											<div class="media-body">
												<h4>{{ review.creator.fullName }}</h4>
												<h5 class="float-left mr-2">{{ review.created_at }}</h5>
												<div class="stars">
													<font-awesome-icon icon="star" />
													<font-awesome-icon icon="star" />
													<font-awesome-icon icon="star" />
													<font-awesome-icon icon="star" />
													<font-awesome-icon icon="star" />
												</div>
												<!-- <a class="reply_btn" href="#">Reply</a> -->
											</div>
										</div>
										<p>{{ review.body }}</p>
									</div>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="review_box">
									<h4>Add a Review</h4>
									<p>Your Rating:</p>
									<ul class="list">
										<li>
											<a href="#">
												<font-awesome-icon icon="star" />
											</a>
										</li>
										<li>
											<a href="#">
												<font-awesome-icon icon="star" />
											</a>
										</li>
										<li>
											<a href="#">
												<font-awesome-icon icon="star" />
											</a>
										</li>
										<li>
											<a href="#">
												<font-awesome-icon icon="star" />
											</a>
										</li>
										<li>
											<a href="#">
												<font-awesome-icon icon="star" />
											</a>
										</li>
									</ul>
									<p>Outstanding</p>
									<form class="row contact_form" @submit.prevent="createReview">
										<div class="col-md-12">
											<div class="form-group">
												<textarea class="form-control" v-model="form.message" rows="5"
												placeholder="Message"></textarea>
												<small class="text-danger ml-2" v-if="errors.message">{{ errors.message[0] }}</small>
											</div>
										</div>
										<div class="col-md-12 text-center">
											<button type="submit" value="submit" class="col-md-8 col-8 font-weight-bold btn_3"> Submit Now </button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	// import {mapGetters} from 'vuex'

	export default {
		// fetch({ store, params, $axios }) {
		// 	const products = store.getters.products
		// 	const product_id = products.filter((element) => element.product_slug === params.slug)[0].product_id
		// 	const data = $axios.$get(`products/${product_id}/comments`)
		// 	store.dispatch("setComments", data.data)
		// },
		mounted() {
			this.getProduct()
			this.getReviews()
			this.showReviews = false
		},				
		data() {
			return {
				showCartError: false,
				showReviews: false,
				imageHovered: 0,
				singleProduct: [],
				form: {
					message: ""
				}
			};
		},
		methods: {
			add_cart(id) {
				const index = this.$store.getters.products.findIndex((element) => element.product_id === id)
				this.$store.dispatch("addCart", index)

				this.showCartError = false
			},
			remove_cart(id) {
				this.$store.dispatch("removeCart", id)
			},
			updateViewImage(index) {
				this.imageHovered = index;
			},
			getProduct() {
				const products = this.$store.getters.products
				this.singleProduct = products.filter((element) => element.product_slug === this.$route.params.slug)[0]
			},
			getReviews() {
				const products = this.$store.getters.products
				const product_id = products.filter((element) => element.product_slug === this.$route.params.slug)[0].product_id

				this.$store.dispatch("setReviews", product_id)
			},
			checkExistsInCart() {
				// const product_id = this.singleProduct.product_id
				const cart_items = this.$store.getters.cart_items
				return cart_items.filter(element => element.id === this.singleProduct.product_id )
			},
			getProductIndex() {
				// const product_id = this.singleProduct.product_id
				const cart_items = this.$store.getters.cart_items
				return cart_items.findIndex(element => element.id == this.singleProduct.product_id)
			},
			increment(value){
				const existsInCart = this.checkExistsInCart();
				(existsInCart.length > 0) ? '' : this.showCartError = true

				setTimeout(() => this.showCartError = false, 5000)

				const index = this.getProductIndex()
				if (index !== -1) {
					this.$store.dispatch("updateQty", { cart_index: index, operation: "+", qty: value })
				}
			},
			decrement(value){
				const existsInCart = this.checkExistsInCart();
				(existsInCart.length > 0) ? '' : this.showCartError = true

				setTimeout(() => this.showCartError = false, 5000)

				const index = this.getProductIndex()
				if (index !== -1) {
					this.$store.dispatch("updateQty", { cart_index: index, operation: "-", qty: value })
				}
			},
			async createReview() {
				try {
					const data = await this.$axios.$post(`products/${this.singleProduct.product_id}/reviews`, this.form)
					this.$store.dispatch("validation/clearErrors")
					this.$store.dispatch("addReview", data.data)

					this.form.message = ""
				} catch(error) {
					if (error.response) {
						if (error.response.status == 401) {
							return this.$router.push({ name: "customer-login" })
						}

						this.$store.dispatch("validation/setErrors", error.response.data.errors)
					}
				}
			}	
		},
		computed: {
			reviews() {
				setTimeout(() => this.showReviews = true , 3000)
				return this.$store.getters.reviews;
			},
			icons() {
				const icons = [
					{
						image: "/product_details/prodect_details_1.png",
						alt: "Front view of product"
					},
					{
						image: "/product_details/prodect_details_2.png",
						alt: "Side view of the product"
					}
				];
				return icons;
			},
			image() {
				return this.icons[this.imageHovered].image;
			},
			inStock() {
				return (this.singleProduct.product_quantity > 0) ? "In Stock" : "Out of Stock"
			},
			cartButton() {
				return this.$store.getters.cart_btn
			},
			itemQty: {
				get() {
					const existsInCart = this.checkExistsInCart();

					if (existsInCart.length > 0) {
						this.$store.dispatch("existsInCart", true)
						return existsInCart[0].qty
					}

					this.$store.dispatch("existsInCart", false)
					return 1
				},
				set(newValue) {
					const index = this.getProductIndex()

					if (index !== -1) {
						this.$store.dispatch("updateQty", { cart_index: index, operation: "=", qty: newValue })
					}
				}
			},
		}
	}
</script>

<style scoped>
</style>

