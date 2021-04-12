<template>
	<div>
		<div class="container mt-5">
			<div class="row justify-content-center">
				<div class="col-md-12">
					<div class="card">
						<div class="card-header">
							<h3>Register</h3>
						</div>
						<div class="card-body mx-5 my-4 register-page">
							<form @submit.prevent="customerRegister">
								<div class="form-row">
									<div class="form-group col-md-6">
										<label class="col-form-label text-md-right">Name</label>
										<input autocomplete="new-password" id="name" type="text" class="form-control" 
										:class="{'is-invalid': errors.name}" 
										v-model="form.name" autofocus />

										<span class="invalid-feedback" v-if="errors.name">
											<strong>{{ errors.name[0] }}</strong>
										</span>
									</div>
									<div class="form-group col-md-6">
										<label class="col-form-label text-md-right">Phone Number</label>
										<input autocomplete="new-password" type="text" class="form-control"
										:class="{'is-invalid': errors.phone_number}"
										v-model="form.phone_number" />

										<span class="invalid-feedback" role="alert" v-if="errors.phone_number">
											<strong>{{ errors.phone_number[0] }}</strong>
										</span>
									</div>
									<div class="form-group col-md-6">
										<label class="col-form-label text-md-right">ID Number</label>
										<input autocomplete="new-password" type="text" class="form-control"
										:class="{'is-invalid': errors.id_number}"
										v-model="form.id_number"
										/>
										<span class="invalid-feedback" role="alert" v-if="errors.id_number">
											<strong>{{ errors.id_number[0] }}</strong>
										</span>
									</div>
									<div class="form-group col-md-6">
										<label class="col-form-label text-md-right">Address</label>
										<input autocomplete="new-password" type="text" class="form-control"
										:class="{'is-invalid': errors.address}"
										v-model="form.address"
										/>
										<span class="invalid-feedback" role="alert" v-if="errors.address">
											<strong>{{ errors.address[0] }}</strong>
										</span>
									</div>
									<div class="form-group col-md-6">
										<label class="col-form-label text-md-right">Gender</label>
										<select class="custom-select mr-sm-2" v-model="form.gender"
										:class="{'is-invalid': errors.gender}" >
										<option disabled value>Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="none">Choose not to say</option>
									</select>

									<span class="invalid-feedback" role="alert" v-if="errors.gender">
										<strong>{{ errors.gender[0] }}</strong>
									</span>
								</div>
								<div class="form-group col-md-6">
									<label class="col-form-label text-md-right">E-Mail Address</label>
									<input autocomplete="new-password" id="email" type="email" 
									class="form-control" 
									:class="{'is-invalid': errors.email}" 
									v-model="form.email" />

									<span class="invalid-feedback" role="alert" v-if="errors.email">
										<strong>{{ errors.email[0] }}</strong>
									</span>
								</div>
								<div class="form-group col-md-6">
									<label class="col-form-label text-md-right">Password</label>
									<input autocomplete="new-password" id="password" type="password" class="form-control" :class="{'is-invalid': errors.password}" v-model="form.password" />

									<span class="invalid-feedback" role="alert" v-if="errors.password">
										<strong>{{ errors.password[0] }}</strong>
									</span>
								</div>
								<div class="form-group col-md-6">
									<label class="col-form-label text-md-right" >Confirm Password</label>
									<input autocomplete="new-password" id="password-confirm" type="password" class="form-control" :class="{'is-invalid': errors.password_confirmation}" v-model="form.password_confirmation" />

									<span class="invalid-feedback" v-if="errors.password_confirmation">
										<strong>{{ errors.password_confirmation[0] }}</strong>
									</span>
								</div>
							</div>
							<div class="form-group col-md-6 mt-3 mx-auto mb-0">
								<button type="submit" class="btn btn-block btn-primary">Register</button>
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
	name: "register",
	middleware: "guest",
	data() {
		return {
			dispMes: false,
			// alertClass: "",
			form: {
				name: "",
				email: "",
				id_number: "",
				phone_number: "",
				address: "",
				gender: "",
				password: "",
				password_confirmation: ""
			},
		};
	},
	methods: {
		async customerRegister() {
			try {
				await this.$axios.$post('customers/register', this.form)

				await this.$auth.loginWith('local', {
				  data: { email: this.form.email, password: this.form.password }
				})

				this.$store.dispatch("validation/clearErrors");
				this.$router.push({
					path: this.$route.query.redirect || "/"
				})

			} catch(error) {
				if (error.response) {
					this.$store.dispatch("validation/setErrors", error.response.data.errors)
				}
			}
		}
	}
};
</script>

<style lang="css" scoped>
label {
	font-weight: 600;
}
</style>
