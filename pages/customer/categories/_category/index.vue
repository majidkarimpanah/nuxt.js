<template>
	<div class="container-fluid category-page my-4">
		<div class="breadcrumb breadcrumb_bg">
			<div class="container">
				<div class="row">
					<div class="col-md-4">
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb">
								<li class="breadcrumb-item" @click="removeFilters"><nuxt-link to="/">Home</nuxt-link></li>
								<li class="breadcrumb-item" @click="removeFilters"><nuxt-link to="/">Shop</nuxt-link></li>
								<li class="breadcrumb-item active" aria-current="page">{{ $route.params.category }}</li>
							</ol>
						</nav>
					</div>
					<div class="col-md-6">
						<div class="product_top_bar">
							<div class="left_dorp">
								<select class="sorting">
									<option value="1">Default sorting</option>
									<option value="2">Default sorting 01</option>
									<option value="4">Default sorting 02</option>
								</select>
								<select class="show">
									<option value="1">Show 12</option>
									<option value="2">Show 14</option>
									<option value="4">Show 16</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row pb-5">
			<div class="col-lg-3 left-side-area">
				<aside class="left_widgets p_filter_widgets">
					<div class="l_w_title"><h3>Browse Categories</h3></div>
					<div class="widgets_inner">
						<ul class="cats list">
							<li @click="activeCategory" v-for="(category, index) in categories" :key="index">
								<nuxt-link :to="{ name:'customer-categories-category', params: { category: category.category_title }}">{{ category.category_title }}</nuxt-link>
								<!-- <a @click="activeCategory(index, category.category_title)" href="javascript:void(0)" >{{ category.category_title }}</a> -->
							</li>
						</ul>
					</div>
				</aside>
				<aside class="left_widgets p_filter_widgets">
					<div class="l_w_title"><h3>Filter Brands</h3></div>
					<div class="widgets_inner">
						<ul class="brand list">
							<li v-for="(brand, index) in brands" :key="index">
								<a @click="activeBrand(index, brand.title)" href="javascript:void(0)" >{{ brand.title }}</a>
							</li>
						</ul>
					</div>
				</aside>
				<aside class="left_widgets p_filter_widgets filter-widget px-3 pb-3">
					<div class="l_w_title">
						<h3>Price Filter</h3>
					</div>
					<div class="filter-range-wrap">
					    <div class="range-slider">
					        <div class="price-input">
					            <input type="text" id="minamount" min="100" value="100">
					            <input type="text" id="maxamount" max="100000" value="10000">
					        </div>
					    </div>
					    <!-- <input type="range" class="custom-range" min="0" max="5" step="0.5" id="customRange3"> -->
					    <div class="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="33" data-max="98">
					        <div class="ui-slider-range ui-corner-all ui-widget-header"></div>
					        <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 0%;"></span>
					        <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 100%"></span>
					        <!-- <div class="ui-slider-range ui-corner-all ui-widget-header" style="left:0%; width:100%"></div> -->
					    </div>
					</div>
					<div class="text-center">
						<a href="#" class="filter-btn">Filter</a>
					</div>
				</aside>
			</div>
			<div class="col-lg-9 right-side-area">
				<div class="latest_product_inner">
					<div class="row">
						<div class="col-lg-3 mb-3 col-md-4 col-sm-4 prods" v-for="(product,index) in products" :key="index">
							<div class="card pr-cd" @mouseover="hover(product, 1)" @mouseout="hover(product, 0)" :class="{ hovered:product.hovered }" >
								<nuxt-link class="pr-det text-center" :to="{ name: 'customer-product-slug', params: { slug:product.product_slug, index: index } }">
									<div class="image">
										<img class="card-img-top" src="~/assets/images/blade.jpg" alt="" />
									</div>
									<p class="card-text"><strong>{{ product.product_brand }}</strong>{{ product.product_title }}</p>
									<p class="price"><strong>Ksh. {{ product.product_price | threeDigitsCoversion }}</strong></p>
								</nuxt-link>
								<div class="card-body text-center">
									<p class="cart btn btn-warning mx-4 mt-2 mb-4" @click.prevent="addCart(index)">Add cart</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				emptySearch: false
			};
		},
		mounted() {
			this.getCategoryOnMount()
		},
		methods: {
			addCart(index) {
				this.$store.dispatch("addCart", index)
			},
			hover(product, v) {
				product.hovered = v;
			},
			removeFilters() {
				this.$store.dispatch("setFilterBrand", "")
				this.$store.dispatch("setActiveCategory", "")
			},
			activeCategory(index) {
				this.$store.dispatch("setFilterBrand", "")
				
				this.removeBrandActive()

				// this.$store.dispatch("setActiveCategory", category.toLowerCase())

				// const sub = document.querySelectorAll(".cats li")
				// sub.forEach((element, key) => {
				// 	// element.classList.remove("active");
				// })

				// const el = document.querySelectorAll(".cats li")[index]

				// el.classList.add("active")
				// window.history.pushState("brand", "brand name", `hello`)
				// window.history.replaceState("", "", `dfsd`)
				// let url = new URL("http://127.0.0.1:3636/customer?id=100&topic=main");
				// let query_string = url.search
				// let search_params = new URLSearchParams(query_string)
				// search_params.set("id", "1044")
				// url.search = search_params.toString();
				// let new_url = url.toString()
				// console.log(new_url)
			},
			activeBrand(index, brand) {
				this.$store.dispatch("setFilterBrand", brand.toLowerCase())

				this.removeBrandActive()

				const el = document.querySelectorAll(".brand li")[index]

				el.classList.add("active")
				window.history.pushState("brand", "brand name", `?brand=${brand}`)
			},
			getCategoryOnMount() {
				this.$store.dispatch("setFilterBrand", "")
				this.$store.dispatch("setActiveCategory", this.$route.params.category.toLowerCase())

				this.removeBrandActive()

				this.alterURL()
			},
			removeBrandActive() {
				const sub = document.querySelectorAll(".brand li")
				sub.forEach((element, key) => {
					element.classList.remove("active");
				})
			},
			alterURL() {
				const parsedUrl = new URL(window.location.href).searchParams.get("brand")

				if (parsedUrl != null && parsedUrl !== "") {
					const sub = document.querySelectorAll(".list li")
					sub.forEach((element, key) => {
						if (element.innerText.toLowerCase() == parsedUrl.toLowerCase()) {
							this.$store.dispatch("setFilterBrand", parsedUrl.toLowerCase())

							const el = document.querySelectorAll(".list li")[key]
							el.classList.add("active")

							// window.history.pushState("brand", "brand name", `?brand=${parsedUrl}`)
							window.history.replaceState("", "", `?brand=${parsedUrl}`)
						}
					})
				}
			}
		},
		computed: {
			...mapGetters([ 'categories']),
			products (){
				if (this.$store.getters.products.length > 0) {
					this.emptySearch = false;
					return this.$store.getters.products
				}

				return this.emptySearch = true
			},
			brands() {
				const brands = this.$store.getters.brands
				const cat = this.$store.getters.categories.find(element => {
					return element.category_title.toLowerCase() === this.$store.state.activeCategory
				})
				return brands.filter((brand, key) => {
					if (cat !== undefined) {
						return brand.category === cat.category_id
					}
				})
			}
		}
	}
</script>

<style scoped>
.category-page .right-side-area {
	/* padding-right: 0px; */
	flex: 0 0 79%;
	max-width: 79%;
}
</style>