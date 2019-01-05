<template>
  <section id="pro" class="project">
    <!-- <select size="1" v-model="proAdres">
      <option disabled>Выберите проект</option>
      <option v-for="project in projects" :key="project.proAdres">{{ project.proAdres }}
      </option>
    </select> -->
    <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Выберите проект"
      required>
    </v-select>
    <transition name="slide-fade">
      <app-baker v-if='selected==="Baker Street, 221b"'></app-baker>
      <school  v-else-if='selected==="School №53"'></school>
    </transition>
    <!-- <transition name="slide-fade">

    </transition> -->




      <!-- <div class="project__smeta">
        <table>
          <caption>Смета</caption>
          <tr>
            <th>Необходимый ресурс</th>
            <th>Необходимое количество</th>
          </tr>
        </table>
      </div> -->

    <div class="project__button">
      <router-link to="/signup">
        <button class="city__btn">Участвовать</button>
      </router-link>
    </div>
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
        selected: 'Baker Street, 221b',
        image: "src/img/sweden.jpg",
        // projects: [
        //   {
        //     proID: 1,
        //     proCity: "Donetsk",
        //     proAdres: "shetinina"
        //   },
        //   {
        //     proID: 2,
        //     proCity: "Donetsk",
        //     proAdres: "school"
        //   }
        // ],
         adresses: ["Baker Street, 221b","School №53"]

        // reviews: []
      }

    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      }
    }
    // methods: {
    //   addReview(productReview) {
    //     this.reviews.push(productReview)
    //   }
    // }
  };

</script>

<style lang="sass">

</style>
