<template>
  <section id="pro" class="project">
    <select size="1" v-model="proAdres">
      <option disabled>Выберите проект</option>
      <option v-for="(project, index) in projects">{{ project.proAdres }}
      </option>      
    </select> 
    <shetinina v-if='proAdres==="shetinina"'></shetinina>

    <school  v-else-if='proAdres==="school"'>school
      <div class="project__smeta">
        <table>
          <caption>Смета</caption>
          <tr>
            <th>Необходимый ресурс</th>
            <th>Необходимое количество</th>
          </tr>
        </table>
      </div>  
    </school>
    <!-- <div class="project__container lugansk hospital" v-else-if='proAdres==="yubiley"'>hospital
    </div>
    <div class="project__container lugansk order" v-else-if='proAdres==="yubik"'>Order pro
    </div>  -->

    <!-- <button > -->
    
    <!-- </button> -->


    <!-- <div>
      <p v-if="!reviews.length">Комментариев еще нет</p>
      <ul v-else>
        <li v-for="(review, index) in reviews" :key="index">
          <p>Name: {{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>Review: {{ review.review }}</p>
          <p>Recommendation(Value of inputRadio): {{ review.recommend }}</p>
        </li>
      </ul>
    </div>  -->

    <!-- <project-review @review-submitted="addReview"></project-review> -->
    

   </section> 
</template>

<script>
  export default {
    data () {
      return {
        image: "src/img/sweden.jpg",
        selectedVariant: 0,
        proID: 1,
        proAdres: "shetinina",
        // number: 0,
        projects: [
          {
            proID: 1,
            proCity: "Donetsk",
            proAdres: "shetinina"
          },          
          {
            proID: 2,
            proCity: "Donetsk",
            proAdres: "school"
          }          
        ]
        // reviews: []               
      }  

    },
    // methods: {
    //   addReview(productReview) {
    //     this.reviews.push(productReview)
    //   }    
    // }
  };

</script>

<style lang="sass">
  
  @import "../../sass/_mixins.sass"
  @import "../../sass/_variables.sass"
  @import "../../sass/_base.sass"
  @import "../../sass/_project.sass"
  @import "../../sass/_buttons.sass"
</style>