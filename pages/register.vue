<template>
	<div class="container col-md-4 mt-5">
		<h2>Registrarse</h2>
		<br>
	<form @submit.prevent="submit">
	  <div class="form-group">
	    <label >Nombre completo:</label>
	    <input v-model.trim="form.name" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Ingrese aqui su nombre completo">
	    <small  class="form-text text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
	  </div>
	  <div class="form-group">
	    <label >Email address</label>
	    <input v-model.trim="form.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Ingrese su correo">
	    <small  class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
	  </div>
	  <div class="form-group">
	    <label  >Password</label>
	    <input v-model.trim="form.password" type="password" class="form-control"  placeholder="Password">
	    <small  class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
	  </div>
	  <button type="submit" class="btn btn-primary">Guardar</button>
	</form>
	<br>
	<p>Ya tiene una cuenta? <nuxt-link to="/login">Inicar sesión</nuxt-link> </p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				form: {
					email: '',
					name: '',
					password: ''
				}
			}
		},
		methods:{
			async submit(){
				await this.$axios.$post('register', this.form)
				await this.$auth.loginWith('local', {
					data: {
						email: this.form.email,
						password: this.form.password
					}
				})
				this.$router.push('')
			}
		}
	};
</script>


