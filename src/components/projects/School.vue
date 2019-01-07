<template>
  <div class="project__container">
    <h2 class="project__title">Project №2</h2>
    <h3 class="project__title">Renovation of basketball court near the school №53</h3>
    <h4 class="project__title">Period of the participants engaging: 01.09.19.- 30.09.19.</h4>
    <div class="project__images">
      <div class="project__image">
        <p>Now</p>
        <div class="project__img project__img--basket-old">
        </div>
      </div>
      <div class="project__image">
        <p>Project Preview</p>
        <div class="project__img project__img--basket">
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
        <tr v-for="row in smetaSchool"
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
        </tr><tr>
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
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      },
      total() {
        const smetaSchool = this.$store.getters.smetaSchool
        let sumTotal = 0;
        for (let i = 0; i < smetaSchool.length; i++ ) {
          sumTotal = sumTotal + smetaSchool[i].num * smetaSchool[i].price
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
    methods: {
      multiplication(a,b) {
        return a * b
      }
    },
    created() {
      this.smetaSchool = this.$store.getters.smetaSchool
      this.$store.dispatch('initSmeta')
    },
  };
</script>

<style lang="sass">
</style>
