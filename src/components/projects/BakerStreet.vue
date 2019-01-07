<template>
  <div class="project__container project__container--baker">
    <h2 class="project__title">Project №1</h2>
    <h3 class="project__title">Mounting of 2 benches and laying slabs in the Baker Street</h3>
    <h4 class="project__title">Period of the participants engaging: 01.09.19.- 30.09.19.</h4>
    <div class="project__images">
      <div class="project__image">
        <p>Now</p>
        <div class="project__img project__img--before-bench">
        </div>
      </div>
      <div class="project__image">
        <p>Project Preview</p>
        <div class="project__img project__img--bench">
        </div>
      </div>
    </div>
    <div class="project__smeta" >
      <table>
        <caption>Priced outlay</caption>
        <tr>
          <th>Resource</th>
          <th>Quantity</th>
          <th>Price of 1 item, &#8364;</th>
          <th>Sum, &#8364;</th>
        </tr>
        <tr v-for="row in smetaBaker"
            :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.num }}</td>
          <td>{{ row.price }}</td>
          <td >{{ multiplication(row.num, row.price) }}</td>
        </tr>
        <tr>
          <td>Manager's fee</td>
          <td>10%</td>
          <td></td>
          <td>{{ salary }}</td>
        </tr>
        <tr>
          <td>Final Sum:</td>
          <td></td>
          <td></td>
          <td>{{ finalSum }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      multiplication(a,b) {
        return a * b
      }
    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      },
      total() {
        const smetaBaker = this.$store.getters.smetaBaker
        let sumTotal = 0;
        for (let i = 0; i < smetaBaker.length; i++ ) {
          sumTotal = sumTotal + smetaBaker[i].num * smetaBaker[i].price
        }
        return sumTotal;
      },
      salary() {
        return this.total * 0.1
      },
      finalSum() {
        return this.total + this.salary
      }
    },
    created() {
      this.$store.dispatch('initSmeta')
      this.smetaBaker = this.$store.getters.smetaBaker
    }
  };
</script>

<style lang="sass">
</style>
