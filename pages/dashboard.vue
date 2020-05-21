<template>
	<div class="container col-md-4 mt-5">
		<h2> <strong> Crear un nuevo Tema</strong></h2>
	<form @submit.prevent="create">
	  <div class="form-group">
	    <label><strong>Título del tema</strong></label>
	    <input v-model="form.title" type="text" class="form-control" placeholder="Ingrese su título del tema" autofocus>
	    <small  class="form-text text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
	  </div>
	  <div class="form-group">
	    <label><strong>Cuerpo del tema</strong></label>
	  	<textarea class="form-control" v-model="form.body" rows="5"></textarea>
	    <small  class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>

	  </div>
	  <button type="submit" class="btn btn-primary">Crear</button>
	</form>
	</div>
</template>

<script>
	export default {
		middleware: ['auth'],
		data(){
			return {
				form: {
					title: '',
					body: ''
				}
			}
		},
		methods: {
			 async create(){
				 await this.$axios.$post('/topics', this.form)
				 return this.$router.push('/')
			}
		}
	};
</script>