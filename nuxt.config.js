require('dotenv').config()

export default {
	mode: 'universal',
	/*
	** Headers of the page
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ rel: "stylesheet", href: '/css/bootstrap.min.css' },
		{ rel: "stylesheet", href: '/css/new-styles.css' },
		{ rel: "stylesheet", href: '/css/themify-icons.css' },
		],
		script: [
		      { src: "/js/jquery-3.2.1.min.js", type: "text/javascript" },
		      { src: "/js/bootstrap.min.js", },
		    ]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
		'assets/css/styles.css',
		'@fortawesome/fontawesome-svg-core/styles.css',
	],

	router: {
		middleware: ["clearValidationErrors"]
	},
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~/plugins/font-awesome.js',
		'plugins/filters.js',
		'plugins/mixins/userMix.js',
		'plugins/mixins/validationMix.js',
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://bootstrap-vue.js.org
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'@nuxtjs/pwa',
		// Doc: https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
		],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		baseUrl: process.env.API_URL || 'http://backend.site/api'
	},

	auth: {
		strategies: {
			local: {
				endpoints: {
					login: { url: 'customers/login', method: 'post', propertyName: 'meta.token' },
					logout: { url: 'customers/logout', method: 'post' },
					user: { url: 'customers/user', method: 'get', propertyName: 'data' }
				},
	      		// tokenRequired: true,
	      		tokenType: 'bearer'
	  		}
		}
	},

	/*
	** Build configuration
	*/
	build: {
		// plugins: [
		//       new webpack.ProvidePlugin({
		//         $: "jquery",
		//         jQuery: "jquery",
		//         'window.jQuery': "jquery",
		//       })
		//     ],
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
		}
	},


}
