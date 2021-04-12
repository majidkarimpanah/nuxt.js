<template>
	<div id="wrapper">
		<Navbar />
		<Sidebar />
		<nuxt />
		<Footer />
	</div>
</template>

<script>
	import Navbar from '@/components/navbar'
	import Sidebar from '@/components/sidebar'
	import Footer from '@/components/footer'

	export default {

		name: 'default',

		data () {
			return {

			}
		},
		components: {
			Navbar,
			Sidebar,
			Footer
		}
	}
</script>

<style lang="css" scoped>
</style>