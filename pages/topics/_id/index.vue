<template>
	<div class="container">
		<div class="bg-light mt-5 mb-5" style="padding:20px;">
			<h2 class="display-3">{{ topic.title }}</h2> <hr>
			<p class="text-muted">{{ topic.created_at }} por {{ topic.user.name }}</p>

			<div v-for="(content, index) in topic.posts" :key="index" class="ml-5 content">
				<p>{{ content.body }}</p>

				<div v-if="authenticated">
					<div v-if="user.id === content.user.id"  >

						<button @click.prevent="deletePost(content.id)" class="btn btn-outline-danger fa fa-trash  pull-right"> </button>

						<nuxt-link :to="{name:'topics-posts-edit', params:{id: $route.params.id, body: content.id }}" >
							<button class="btn btn-outline-success fa fa-edit  pull-right "> </button>
						</nuxt-link>


					</div>
				</div>

				<p class="text-muted">{{ content.created_at }} por {{ content.user.name }}</p>

			</div>
		</div>
		<div class="mt-5 ml-5 mb-5" v-if="authenticated">
			<form @submit.prevent="create">
				<div class="form-group">
					<h4>Añadir nuevo post</h4>
					<textarea class="form-control" v-model="body" rows="5" placeholder="Escriba aqui su nuevo post"></textarea>
					<small v-if="errors.body" class="form-text text-danger">{{ errors.body[0] }}</small>
				</div>
				<button class="btn btn-outline-primary">
					Agregar
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				topic: '',
				body: ''
			}
		},
		async asyncData({$axios, params}) {
			const {data} = await $axios.$get(`/topics/${params.id}`)
			return {
				topic: data
			}
		},
		methods: {
			async create(){
				await this.$axios.$post(`/topics/${this.$route.params.id}/posts`, {body: this.body})
				this.$router.push('/topics')
			},
			async deletePost(id) {
				await this.$axios.$delete(`/topics/${this.$route.params.id}/posts/${id}`)
				this.$router.push('/')
			}
		}
	};
</script>

<style scoped>
	.content{
		border-left: 10px solid #e9ebee;
		padding:  0 10px 0 10px;
	}
	.btn-outline-success, .btn-outline-danger {
		border: none;
	}
</style>

