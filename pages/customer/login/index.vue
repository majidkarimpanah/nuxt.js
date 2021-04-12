<template>
	<div class="container" style="padding-top: 4.85rem;">
		<div class="row justify-content-center">
			<div class="col-md-8 mb-4">
				<div class="card">
					<div class="card-header">
						<h3>Login</h3>
					</div>
					<div class="card-body my-3">
						<form @submit.prevent="customerLogin" autofocus>
							<div class="form-group row">
								<label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
								<div class="col-md-6">
									<input autocomplete="new-password" id="logEmail" type="email" class="form-control" :class="{'is-invalid': errors.email}" name="email" v-model.trim="form.email" autofocus />

									<span class="invalid-feedback" role="alert" v-if="errors.email">
										<strong>{{ errors.email[0] }}</strong>
									</span>
								</div>
							</div>
							<div class="form-group row">
								<label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
								<div class="col-md-6">
									<input autocomplete="new-password" id="logPassword" type="password" class="form-control" :class="{'is-invalid': errors.password}" v-model.trim="form.password" />
									<span class="invalid-feedback" role="alert" v-if="errors.password">
										<strong>{{ errors.password[0] }}</strong>
									</span>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-md-6 offset-md-4">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" v-model.trim="form.remember" id="remember" />
										<label class="form-check-label" for="remember">Remember Me</label>
									</div>
								</div>
							</div>

							<div class="form-group row mb-0">
								<div class="col-md-8 offset-md-4">
									<button type="submit" class="btn btn-primary">Login</button>
									<nuxt-link class="btn btn-link" to="password/reset">Forgot Your Password?</nuxt-link>
									<!-- <a class="btn btn-link" href="password/reset">Forgot Your Password?</a> -->
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	middleware: "guest",
	data() {
		return {
			dispMes: true,
			form: {
				email: "",
				password: "",
				remember: ""
			}
		};
	},
	methods: {
		async customerLogin() {
			try {
				await this.$auth.loginWith('local', {
				  data: this.form
				})

				this.$store.dispatch("validation/clearErrors");
				// this.$router.push({
				// 	path: this.$route.query.redirect || "/"
				// })
				this.$router.back()
			} catch(error) {
				if (error.response) {
					this.$store.dispatch("validation/setErrors", error.response.data.errors)
				}
			}
		},
	}};
</script>

<style scoped>
</style>
