import axios from 'axios'

export default {
	async nuxtServerInit({ getters, commit }) {
		let brands = await axios.get(process.env.apiURLAllBrands)
		let categories = await axios.get(process.env.apiURLCategories)
		
		if (getters.products.length < 1) {
			let {data} = await axios.get(process.env.apiURLProducts)
			commit("SET_PRODUCTS", data.data)			
		}

		commit("SET_BRANDS", brands.data.data)
		commit("SET_CATEGORIES", categories.data.data)
	},
	setProducts({ commit }, products) {
		commit("SET_PRODUCTS", products.data)
	},
	loadCart({ commit }) {
		if (localStorage.getItem("spoty_cart")) {
		    try {
		        const getCartData = JSON.parse(localStorage.getItem("spoty_cart"));

		        commit("LOAD_CART", getCartData)
		    } catch (e) {
		        localStorage.removeItem("spoty_cart");
		    }
		}
	},
	addCart({ getters,commit }, index) {
		let found = false;
		getters.cart_items.forEach(element => {
		    if (element.id === getters.products[index].product_id) {
		        found = true;
		    }
		});

		if (!found) {
		    const newItem = {
		        id: getters.products[index].product_id,
		        price: Number(getters.products[index].product_price),
		        qty: 1,
		        // index: index
		    };

			commit("ADD_TO_CART", newItem)
		}
	},
	removeCart({ getters,commit }, id) {
		let found = false;
		getters.cart_items.forEach((element, key) => {
		    if (element.id === id) {
		        return commit("REMOVE_FROM_CART", key)
		    }
		});
	},
	existsInCart({ getters, commit }, value) {
		if (value) {
			const newValue = {
				showAddBtn: false,
				backgroundColor: "#dc3545",
				border: "1px solid #dc3545"
			}

			return commit("UPDATE_CART_BUTTON", newValue)
		}

		const newValue = {
			showAddBtn: true,
			backgroundColor: "#ffc107",
			border: "1px solid #ffc107"
		}

		return commit("UPDATE_CART_BUTTON", newValue)
	},
	updateQty({ getters, commit }, item) {

		let newValue = item.qty

		if (item.operation === "+") {
			item.qty += 1
		} else if (item.operation === "-") {
			(parseInt(getters.cart_items[item.cart_index].qty) > 1) ? item.qty -= 1 : ""
		} else {
			if (newValue !== "") {
				item.qty = Number(item.qty)
			} 
			// else { newValue = newValue }
		}
		// item.qty = newValue
		console.log(item)
		commit("UPDATE_CART_QTY", item)
	},
	async setReviews({ commit }, id) {
		const {data} = await this.$axios.$get(`products/${id}/reviews`)
		commit("SET_REVIEWS", data)
	},
	addReview({ commit }, review) {
		commit("ADD_REVIEW", review)
	},
	setActiveCategory({ commit }, category) {
		commit("SET_ACTIVE_CATEGORY", category)
	},
	searchProduct({ commit }, value) {
		commit("SEARCH_PRODUCT", value)
	},
	setFilterBrand({ commit }, brand) {
		commit("FILTER_BRAND", brand)
	},
}