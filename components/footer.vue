<template>
	<footer id="footer" class="bg-dark text-center text-light">
		<div class="row mr-0">
			<div class="col-4">
				<ul class="nav justify-content-center">
					<li class="nav-item">
						<a class="nav-link active" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">About Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Contact Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Careers</a>
					</li>
				</ul>
			</div>
			<div class="col-4">Copyright {{ shopTitle }} &copy; {{ dateYear.getFullYear() }}</div>
			<div class="col-4 text-capitalize">
				Powered by
				<a href="http://www.avion.co.ke" target="_blank" rel="noopener noreferrer">
					<span class="designer">Avion</span>
				</a>
			</div>
		</div>
		<p></p>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			dateYear: new Date()
		};
	},
	computed: {
		shopTitle() {
			return this.$store.getters.shopTitle
		}
	}
};
</script>

<style scoped>
</style>