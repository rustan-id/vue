<template>
  <div class="project__container project__container--baker">
    <h2 class="project__title">Проект №1</h2>
    <h3 class="project__title">Установка 2-х лавочек и укладка плитки по адресу "Baker Street, 221b"</h3>
    <h4 class="project__title">Период сбора участников: 01.09.19.- 30.09.19.</h4>
    <div class="project__images">
      <div class="project__image">
        <p>Сейчас</p>
        <div class="project__img">
          <img src="../../img/before-bench.jpg" alt="teacher's illustration"/>
        </div>
      </div>
      <div class="project__image">
        <p>Планируемый результат</p>
        <div class="project__img">
          <img src="../../img/bench.jpg" alt="teacher's illustration">
        </div>
      </div>
    </div>
    <div class="project__smeta" >
      <table>
        <caption>Смета</caption>
        <tr>
          <th>Ресурс</th>
          <th>Кол-во</th>
          <th>Цена за единицу, &#8364;</th>
          <th>Сумма, &#8364;</th>
        </tr>
        <tr v-for="row in smetaBaker"
            :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.num }}</td>
          <td>{{ row.price }}</td>
          <td >{{ sum(row.num, row.price) }}</td>
        </tr>
        <tr>
          <td>З/п менеджера, руб</td>
          <td>10%</td>
          <td></td>
          <td>{{ salary }}</td>
        </tr><tr>
          <td>Итого:</td>
          <td></td>
          <td></td>
          <td>{{ finalSum }}</td>
        </tr>
      </table>
    </div>

    <!-- <a class="button button--details" href="https://1drv.ms/x/s!Aq7rTqq1ai6lgq1cIbz-4Y4KBXr55g">Участвовать</a> -->
  </div>
</template>

<script>
  export default {
    data() {
      return{
        // rows: [],
        // modelSum: null,
        sumTotal: null,
        num: null,
        price: null,
        smetaBaker: []
        // finalSum: null
        // row: {
        //   num: null,
        //   price: null
        // },
        // sum: null
        // sums: null
      }
    },
    // props: ['rows'],
    created() {
      this.$store.dispatch('initSmeta')
      this.smetaBaker = this.$store.getters.smetaBaker

    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      },
      total() {
        const smetaBaker = this.$store.getters.smetaBaker
        // const rows = this.rows;
        // this.smeta = this.$store.getters.smeta
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
    methods: {
      sum(a,b) {
        return a * b
      }
    },
    mounted() {
      const finalSum = this.finalSum
      this.$store.dispatch('saveSum', finalSum)
    }
  };
</script>

<style lang="sass">
</style>
