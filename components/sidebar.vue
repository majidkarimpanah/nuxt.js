<template>
	<div id="sidebar-wrapper">
		<div class="container navbar navbar-expand-md navbar-light navbar-laravel sticky-top">
			<div class="brand">				
				<a href="/" class="navbar-brand" ><i>{{ brand }}</i></a>
				<!-- <span class="display-4" @click="menuToggle">&times;</span> -->
				<font-awesome-icon icon="times" @click="menuToggle" title="Hide sidebar"/>
			</div>
		</div>
		<div class="dash">
			<a href="javascript:void(0)">
				<i class="menu-icon fa fa-tachometer-alt"></i> Browse Categories
			</a>
		</div>
		<ul class="sidebar-nav">
			<li>
				<a href="javascript:void(0)" @click="activeBrand('')">All Products</a>
			</li>
			<li class="sub-menu" v-for="(category, index) in categories" :key="index">
				<a @click="addClassActive(index)" href="javascript:void(0)" >{{ category.category_title }}
					<span class="right float-right mr-3 ti-plus"></span>
				</a>
				<ul class="d-none">
					<li v-for="(brand, index) in brands" :key="index">
						<div v-if="category.category_id === brand.category">
							<a href="javascript:;" @click="activeBrand(brand.title)">{{ brand.title }}</a>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		methods: {
			addClassActive(index) {
				const sub = document.querySelectorAll(".sub-menu")
				sub.forEach((element, key) => {
					if (key !== index) {
						element.querySelector("ul").classList.remove("d-block");
						element.querySelector("a").classList.remove("is-active");
						element.querySelector("ul .right").classList.remove("ti-minus")
					}
				})

				const el = document.querySelectorAll(".sidebar-nav li.sub-menu")[index]

				el.querySelector("ul").classList.toggle("d-block")
				el.querySelector(".sub-menu .right").classList.toggle("ti-minus")
				el.querySelector("a").classList.toggle("is-active")
			},
			activeBrand(value) {
				if (this.$route.name !== "index") {
					this.$router.push("/")
				}

				this.$store.dispatch("setFilterBrand", value.toLowerCase())
	            // this.$store.dispatch("setActiveCategory", value.toLowerCase())
	        },
	        menuToggle() {
	        	let element = document.getElementById('wrapper');
	        	element.classList.toggle('menuDisplayed')
	        }
		},
		computed: {
			...mapGetters([ 'categories', 'brands']),
			brand() {
				return this.$store.getters.brand
			}
		}
	}
</script>

<style scoped>
#sidebar-wrapper .brand {
	width: 100%;
}
#sidebar-wrapper .fa-times {
	font-size: 1.7rem;
	float: right;
	top: 0.3rem;
	position: relative;
	cursor: pointer;
}
</style>