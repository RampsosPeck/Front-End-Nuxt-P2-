<template>
	<div class="container col-md-4 mt-5">
		<h2>Login</h2>
		<br>
	<form @submit.prevent="submit">
	  <div class="form-group">
	    <label for="exampleInputEmail1">Email address</label>
	    <input v-model.trim="form.email" type="email" class="form-control" placeholder="Enter email" autofocus>
	    <small  class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
	  </div>
	  <div class="form-group">
	    <label>Password</label>
	    <input v-model.trim="form.password" type="password" class="form-control"  placeholder="Password">
	    <small  class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
	  </div>
	  <button type="submit" class="btn btn-primary">Ingresar</button>
	</form>
	<br>
	<p>No tiene una cuenta? <nuxt-link to="/register">Registrate</nuxt-link> </p>
	</div>
</template>

<script>
	export default {
		middleware: ['guest'],
		data(){
			return {
				form: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			async submit(){
				await this.$auth.loginWith("local", {
					data: this.form
				})
				this.$router.push({
					path:this.$route.query.redirect || "/dashboard"
				})
			}
		}
	};
</script>


