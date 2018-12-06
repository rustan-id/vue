<template>
	<div class="project__container">
    <h2 class="project__title">Проект №1</h2>
    <h3 class="project__title">Установка 2-х лавочек и укладка плитки возле дома №35 по ул.Щетинина</h3>
    <h4 class="project__title">Период сбора участников: 01.09.18.- 30.09.18.</h4>
    <div class="project__images">
      <div class="project__img">
        <p>Сейчас</p>
        <img src="src/img/sweden.jpg" alt="teacher's illustration"/>
      </div>
      <div class="project__img">
        <p>Планируемый результат</p>
        <img src="src/img/sweden.jpg" alt="teacher's illustration">
      </div>
    </div>
    <div class="project__smeta" >
      <table>
        <caption>Смета</caption>
        <tr>
          <th>Ресурс</th>
          <th>Количество</th>
          <th>Цена за единицу, руб</th>
          <th>Сумма, руб</th>
        </tr>
        <tr v-for="row in rows"
            :row="row" >
          <td>{{ row.name }}</td>
          <td>{{ row.num }}</td>
          <td>{{ row.price }}</td> 
          <td>{{ sum(row.num, row.price) }}</td>
        </tr>
        <!-- <tr>
          <td>{{ rows[1].name }}</td>
          <td>{{ rows[1].num }}</td>
          <td>{{ rows[1].price }}</td> 
          <td>{{ sum1 }}</td>
        </tr> -->
        <!-- <tr>
          <td>Урна, шт</td>
          <td>1</td>
          <td>900</td>
          <td>900</td>
        </tr>
        <tr>
          <td>Песок, кг</td>
          <td>200</td>
          <td>10</td>
          <td>200</td>
        </tr>
        <tr>
          <td>Бордюр, м</td>
          <td>22</td>
          <td>80</td>
          <td>1600</td>
        </tr>
        <tr>
          <td>Щебень, кг</td>
          <td>400</td>
          <td>10</td>
          <td>4000</td>
        </tr>
        <tr>
          <td>З/п менеджера</td>
          <td></td>
          <td>10%</td>
          <td>4000</td>
        </tr>
        <tr>
          <td>Стоимость проекта, руб</td>
          <td></td>
          <td></td>
          <td>30 000</td> -->
        <!-- </tr> -->
      </table>
    </div>   
    <div v-if="!auth">               
      <router-link to="/signup">
        <span class="button button--details">Участвовать</span>
      </router-link>
    </div>
    <!-- <a class="button button--details" href="https://1drv.ms/x/s!Aq7rTqq1ai6lgq1cIbz-4Y4KBXr55g">Участвовать</a> -->
  </div>
</template>

<script>
  export default {
  	// props: ['rows'],
  	created() {
  		this.$store.dispatch('initRows');
  	},
    // data () {
    //   return {
    //   	rows: [
    //   	  {
    //   	  	name: "Лавки",
	   //  	  	num: 2,
	   //        price: 3000
	   //        // sum: 0
    //   	  },
    //   	  {
    //   	  	name: "Плитка",
    //   	  	num: 15,
    //         price: 300
    //         // sum: 0
    //   	  }
    //   	]      
    //   }
    // },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      },
    	rows() {
        return this.$store.getters.rows;
    	}
    	// sum() {
    	// 	let sum = 0;
    	// 	for (let i = 0; i < this.rows.length; i++){
    	// 	  return this.rows[i].num * this.rows[i].price;
    	// 	}    
    	// 	return sum;		
    	// }
    	// sum1 () {
    	// 	  return this.rows[1].num * this.rows[1].price;
    	// }
    },
    methods: {
    	sum(a, b) {
        return a * b    		
    	}
    }

  };
</script>  

<style lang="sass">  
  @import "../../sass/_mixins.sass"
  @import "../../sass/_variables.sass"
  @import "../../sass/_base.sass"
  @import "../../sass/_project.sass"
  @import "../../sass/_buttons.sass"
</style>