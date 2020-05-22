<template>
	<div class="container">
		<h2>Lista de temas</h2>
		<div v-for="(topic, index) in topics" :key="index"  class="bg-light mt-5 mb-5" style="padding:20px;">
			<h2> <nuxt-link :to="{name:'topics-id', params:{id:topic.id  }}">{{ topic.title }}</nuxt-link> </h2>

			<div v-if="authenticated">
				<div v-if="user.id === topic.user.id"  >
					<nuxt-link :to="{name:'topics-edit', params:{id:topic.id  }}" >
						<button class="btn btn-outline-success fa fa-edit fa-2x pull-right "> </button>
					</nuxt-link>

					<button @click.prevent="deleteTopic(topic.id)" class="btn btn-outline-danger fa fa-trash fa-2x pull-right">

					</button>
				</div>
			</div>

			<p class="text-muted">{{ topic.created_at }} por {{ topic.user.name }}</p>

			<div v-for="(content, index) in topic.posts" :key="index" class="ml-5 content">
				{{ content.body }}
				<p class="text-muted">{{ content.created_at }} por {{ content.user.name }}</p>
				<!--Añadiendo los likes-->
				<div class="btn btn-outline-primary fa fa-thumbs-up ml-5 mb-2" @click="likePost(topic.id, content.id)">
					<span class="badge">{{ content.like_count }}</span>
				</div>
			</div>
		</div>
		<nav>
			<ul class="pagination justify-content-center">
				<li v-for="(key, value) in links" class="page-item">
					<a @click.prevent="loadMore(key)" href="" class="page-link">{{ value }}</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				topics: [],
				links: []
			}
 		},
		async asyncData({$axios}) {
			let {data, links} = await $axios.$get('/topics')
			//console.log(data)
			return {
				topics: data,
				links
			}
		},
		methods: {
			async loadMore(key){
				//console.log(key)
				let {data} = await this.$axios.$get(key)
				return this.topics = {...this.topics, ...data}
			},
			async deleteTopic(id){
				await this.$axios.$delete(`/topics/${id}`)
				this.$router.push('/')
			},
			async likePost(topicId, content){
				const userFromVuex = this.$store.getters["auth/user"];
				if(userFromVuex){
					// can like your own post
					if(userFromVuex.id === content.user.id){
						alert('No te puede gustar tu propia publicación')
					}
					// is user have already liked
					if(content.users){
						if(content.users.some(user => user.id === userFromVuex.id)){
							alert('ya te ha gustado esta publicación')
						}else {
							await this.$axios.$post(`/topics/${topicId}/posts/${content.id}/likes`)
							let {data, links} = await this.$axios.$get(`/topics`)
							this.topics = data
							this.links = links
						}
					}
				}else{
					alert('por favor Iniciar sesión')
					this.$router.push('/login')
				}
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