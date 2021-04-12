export default {
	SET_PRODUCTS(state, products){
		state.products = products
	},
	SET_BRANDS(state, brands){
		state.brands = brands
	},
	SET_CATEGORIES(state, categories){
		state.categories = categories
	},
	LOAD_CART(state, product) {
		state.cart_items = product
	},
	ADD_TO_CART(state, product) {
		state.cart_items.push(product)

		const parsed = JSON.stringify(state.cart_items);
	    localStorage.setItem("spoty_cart", parsed);
	},
	REMOVE_FROM_CART(state, index) {
		state.cart_items.splice(index, 1)

		const parsed = JSON.stringify(state.cart_items);
	    localStorage.setItem("spoty_cart", parsed);
	},
	UPDATE_CART_QTY(state, item) {
		state.cart_items[item.cart_index].qty = item.qty

		const parsed = JSON.stringify(state.cart_items);
	    localStorage.setItem("spoty_cart", parsed);
	},
	UPDATE_CART_BUTTON(state, newValue) {
		state.cart_button = newValue
	},
	SET_REVIEWS(state, reviews) {
		state.reviews = reviews
	},
	ADD_REVIEW(state, review) {
		state.reviews.unshift(review)
	},
	SET_ACTIVE_CATEGORY(state, category) {
		state.activeCategory = category
	},
	SEARCH_PRODUCT(state, value) {
		state.searchedProduct = value
	},
	FILTER_BRAND(state, brand) {
		state.filterBrand = brand
	}
}