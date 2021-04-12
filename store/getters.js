export default{
	authenticated(state) {
		return state.auth.loggedIn
	},
	user(state) {
		return state.auth.user
	},
	shopTitle(state) {
		return state.shopTitle
	},
	products(state) {
		const products = state.products

		let filteredProducts = products.filter(product => {
            return product.product_category.toLowerCase().match(state.activeCategory);
        });

        if (state.filterBrand !== "") {
			filteredProducts = filteredProducts.filter(product => {
	            return product.product_brand.toLowerCase().match(state.filterBrand);
	        });
        }

        return filteredProducts.filter(product => {
			return Object.keys(product).some(key => {

				if (key === "product_title" || key === "product_body") {
					let string = String(product[key]);
					return string.toLowerCase().match(state.searchedProduct);
				}
			});
		});
	},
	categories(state) {
		return state.categories
	},
	brands(state) {
		return state.brands
	},
	cart_items(state) {
		return state.cart_items
	},
	cart_btn(state) {
		return state.cart_button
	},
	reviews(state) {
		return state.reviewsgitignore
	}
}
