<template>
	<nav class="navbar navbar-expand-md navbar-light navbar-laravel sticky-top">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-2 text-center text-lg-left">
					<div class="brand">
						<div class="float-left cursor-pointer" @click="menuToggle">
							<div id="menu_toggle">
								<span></span>
								<span></span>
								<span></span>
							</div>
							<!-- <p>menu</p> -->
						</div>
						
						<a href="/" class="navbar-brand" ><i>{{ shopTitle }}</i></a>
					</div>
				</div>
				<div class="col-xl-6 col-lg-5">
					<form @submit.prevent class="header-search-form">
						<input type="text" v-model.trim="searchProduct" v-on:change="searched($event.target.value)" placeholder="Search product ....">
						<button type="submit"><font-awesome-icon icon="search" /></button>
					</form>
				</div>
				<div class="col-xl-4 col-lg-5">
					<ul class="navbar-nav float-right">
						<li class="nav-item">
							<div class="nav-link totals">
								<span>Total: Ksh.</span>
								<span>{{ totals | threeDigitsCoversion }}</span>
							</div>
						</li>
						<li class="nav-item">
							<nuxt-link to="/customer/cart" class="nav-link ca-cart">
								<div class="icon">
									<font-awesome-icon icon="cart-plus" />
									<span>{{ cart }}</span>
								</div>
							</nuxt-link>
						</li>
						<template v-if="!authenticated">
							<li class="login">
								<nuxt-link class="nav-link" to="/customer/register">Sign up</nuxt-link>
							</li>
							<li class="login">
								<nuxt-link class="nav-link" to="/customer/login">Login</nuxt-link>
							</li>
						</template>

						<template v-else>
							<li class="dropdown">
								<a class="dropdown-toggle d-block" data-toggle="dropdown" href="#">
									<img src="~/assets/images/blade.jpg" class="img-circle img-fluid" width="30px" />
								</a>
								<ul class="dropdown-menu dropdown-user dropdown-menu-right">
									<li class="nav-item">
										<nuxt-link class="nav-link" to="/myAccount">My Account</nuxt-link>
									</li>
									<li class="dropdown-divider"></li>
									<li class="nav-item">
										<a class="nav-link" @click="logout">Log Out</a>
									</li>
								</ul>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	mounted() {
		this.$store.dispatch("loadCart")
	},
	data() {
		return {
			hideCats: true,
			searchProduct: ""
		};
	},
	methods: {
		searched(event) {
			this.$store.dispatch("searchProduct", event)
		},
		login() {
			// 
		},
		logout() {
			this.$auth.logout()
		},
		menuToggle() {
			let element = document.getElementById('wrapper');
			element.classList.toggle('menuDisplayed')
		}
	},
	computed: {
		shopTitle() {
			return this.$store.getters.shopTitle
		},
		totals(){
			const items = this.$store.getters.cart_items
			let total = 0;

			items.forEach(element => {
			    total += (Number(element.price) * Number(element.qty))
			});

			return total;
		},
		cart() {
			return this.$store.getters.cart_items.length
		}
	}
};
</script>

<style scoped>
</style>


