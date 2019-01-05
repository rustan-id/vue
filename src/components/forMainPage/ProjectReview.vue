<template>
  <form class="review-form" @submit.prevent="onSubmit">

    <p class="error" v-if="errors.length">
      <b>Заполните, пожалуйста, недостающие поля:</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Имя:</label>
      <input id="name" v-model="name">
    </p>

    <p>
      <label for="review">Предложение/комментарий:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Оценка проекта:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Порекомендуете участие друзьям или родственникам?</p>
    <label>
      Да, конечно!
      <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
      Маловероятно
      <input type="radio" value="No" v-model="recommend"/>
    </label>

    <p>
      <input type="submit" value="Отправить">
    </p>

  </form>
</template>

<script>
  export default {
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        recommend: null,
        errors: []
      }
    },
    methods: {
      onSubmit() {
        if(this.name && this.review && this.rating && this.recommend) {
          let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating,
            recommend: this.recommend
          }
          this.$emit('review-submitted', productReview),
          this.name = null,
          this.review = null,
          this.rating = null,
          this.recommend = null
        } else {
          if(!this.name) this.errors.push("Имя")
          if(!this.review) this.errors.push("Комментарий")
          if(!this.rating) this.errors.push("Оценка")
          if(!this.recommend) this.errors.push("Рекомендации")
        }
      }
    }
  };
</script>

<style lang="sass" scoped>
</style>
