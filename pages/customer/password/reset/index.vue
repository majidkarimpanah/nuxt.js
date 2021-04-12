<template>
	<div>
		<div class="container" style="padding-top: 5.1rem;">
			<div class="row justify-content-center">
				<div class="col-md-8 mb-4">
					<div class="card">
						<div class="card-header">Reset Password</div>

						<div class="card-body my-3">
							<form @submit.prevent="resetPassword" autocomplete="off">
								<input type="hidden" name="token" v-model="token" />

								<div class="form-group row">
									<label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

									<div class="col-md-6">
										<input
											id="email"
											type="email"
											class="form-control"
											:class="{'is-invalid': errors.email}"
											v-model="email"
											name="email"
											required
											autofocus
										/>
										<span class="invalid-feedback" role="alert" v-if="errors.email">
											<strong>{{ errors.email[0] }}</strong>
										</span>
									</div>
								</div>

								<div class="form-group row">
									<label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

									<div class="col-md-6">
										<input
											id="password"
											type="password"
											class="form-control"
											:class="{'is-invalid': errors.password}"
											v-model="password"
											name="password"
											required
										/>
										<span class="invalid-feedback" role="alert" v-if="errors.password">
											<strong>{{ errors.password[0] }}</strong>
										</span>
									</div>
								</div>

								<div class="form-group row">
									<label
										for="password-confirm"
										class="col-md-4 col-form-label text-md-right"
									>Confirm Password</label>

									<div class="col-md-6">
										<input
											id="password-confirm"
											type="password"
											class="form-control"
											:class="{'is-invalid': errors.password_confirmation}"
											v-model="password_confirmation"
											name="password_confirmation"
											required
										/>
									</div>
								</div>

								<div class="form-group row mb-0">
									<div class="col-md-6 offset-md-4">
										<button type="submit" class="btn btn-primary">Reset Password</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "password-reset",
	data() {
		return {
			errors: {},
			token: this.$route.params.token,
			email: "",
			password: "",
			password_confirmation: ""
		};
	},
	methods: {
		//password.update
		resetPassword() {
			let formData = new FormData();

			formData.append("email", this.email);
			formData.append("password", this.password);
			formData.append("password_confirmation", this.password_confirmation);
			formData.append("token", this.token);

			// axios
			// 	.post("/password/update", formData)
			// 	.then(response => {
			// 		if (response.data.errors) {
			// 			return (this.errors = response.data.errors);
			// 		}

			// 		if (response.data.updateSuccess) {
			// 			return this.displayMessageFunction(
			// 				response.data.updateSuccess,
			// 				"alert-success"
			// 			);
			// 		}

			// 		if (response.data.resetFailed) {
			// 			return this.displayMessageFunction(
			// 				response.data.resetFailed,
			// 				"alert-danger"
			// 			);
			// 		}

			// 		if (response.data.resetSuccess) {
			// 			window.location.href = "/customer-login";
			// 		}
			// 	})
			// 	.catch(error => {
			// 		// console.log(error.response.data);

			// 		if (error.response.data.errors == undefined) {
			// 			this.errors = error.response.data;

			// 			if (error.response.data.message == "CSRF token mismatch.") {
			// 				return window.location.reload();
			// 			}

			// 			return false;
			// 		}

			// 		return (this.errors = error.response.data.errors);
			// 	});
		}
	}
};
</script>

