<template>
	<div class="container col-md-4 mt-5">
		<h2>Registrarse</h2>
		<br>
	<form>
	  <div class="form-group">
	    <label >Nombre completo:</label>
	    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Ingrese aqui su nombre completo">
	    <small  class="form-text text-danger">Show errors here.</small>
	  </div>
	  <div class="form-group">
	    <label >Email address</label>
	    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Ingrese su correo">
	    <small  class="form-text text-danger">Show errors here.</small>
	  </div>
	  <div class="form-group">
	    <label  >Password</label>
	    <input type="password" class="form-control"  placeholder="Password">
	    <small  class="form-text text-danger">Show errors here.</small>
	  </div>
	  <button type="submit" class="btn btn-primary">Guardar</button>
	</form>
	<br>
	<p>Ya tiene una cuenta? <nuxt-link to="/login">Inicar sesión</nuxt-link> </p>
	</div>
</template>