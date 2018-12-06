<template>
	<div>
		<!-- <p>Комментариев еще нет</p> -->
    <p v-if="!reviews.length">Комментариев еще нет</p>
    <ul v-else>
      <li v-for="(review, index) in reviews" :key="index">
        <p>Name: {{ review.name }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>Review: {{ review.review }}</p>
        <p>Recommendation(Value of inputRadio): {{ review.recommend }}</p>
      </li>
    </ul>
    <project-review @review-submitted="addReview"></project-review>
  </div>   
</template>

<script>
  export default {
    data () {
      return {
        reviews: []               
      }  

    },
    methods: {
      addReview(productReview) {
        this.reviews.push(productReview)
      }    
    }
  };

</script>