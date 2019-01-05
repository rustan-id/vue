<template>
  <div class="donors">
    <h1>Участники проекта</h1>
    <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Выберите проект"
      @input="getDonors"
      required>
    </v-select>
    <div class="donors__pro" v-if="selected === 'Baker Street, 221b'">
      <div v-for="user in usersBaker"
          :key="user.idToken">
      <div class="donors__row">
        <div class="donors__cell">{{ user.donation }} &#8364;</div>
        <div class="donors__cell">{{ user.pseudo }}</div>
      </div>
      </div>
      <div class="donors__row donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations(usersBaker) }} &#8364;</div>
        <div class="donors__cell">Собрано</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ needDonations(smetaBaker) }} &#8364;</div>
        <div class="donors__cell">Необходимо собрать</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation(smetaBaker, usersBaker)}} &#8364;</div>
        <div class="donors__cell">Осталось собрать</div>
      </div>
    </div>
    <div class="donors__pro" v-if="selected === 'School №53'">
      <div v-for="user in usersSchool"
          :key="user.idToken">
      <div class="donors__row">
        <div class="donors__cell">{{ user.donation }} &#8364;</div>
        <div class="donors__cell">{{ user.pseudo }}</div>
      </div>
      </div>
      <div class="donors__row donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations(usersSchool) }} &#8364;</div>
        <div class="donors__cell">Собрано</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ needDonations(smetaSchool) }} &#8364;</div>
        <div class="donors__cell">Необходимо собрать</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation(smetaSchool, usersSchool) }} &#8364;</div>
        <div class="donors__cell">Осталось собрать</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adresses: ["Baker Street, 221b","School №53"],
        selected: '',
        smetaBaker: [],
        smetaSchool: []
      }
    },
    methods: {
      gotDonations(donations) {
        let sumDonations = null
        for (let i = 0; i < donations.length; i++ ) {
          sumDonations = sumDonations + Number(donations[i].donation)
        }
        return sumDonations
      },
      needDonations(smeta) {
        let needSum = 0;
        let sum = 0;
        for (let i = 0; i < smeta.length; i++ ) {
          sum = sum + smeta[i].num * smeta[i].price
        }
        needSum = sum + sum * 0.1
        return needSum
      },
      restDonation(smeta, donations) {
        let need = this.needDonations(smeta)
        let sum = this.gotDonations(donations)
        let rest = need - sum
        return rest
      },      //
      getDonors() {
        this.$store.dispatch('fetchUsers')
      }
      //   const restLenina = this.restDonation(this.smetaLenina, this.usersLenina)
      //   const restSchool = this.restDonation(this.smetaSchool, this.usersSchool)
      //   const rest = {
      //     restLenina,
      //     restSchool
      //   }
      //   this.$store.dispatch('setRest', rest )
      // }
    },
    computed: {
      usersBaker() {
        return this.$store.getters.usersBaker
      },
      usersSchool() {
        return this.$store.getters.usersSchool
      },
      // auth() {
      //   return this.$store.getters.isAuthenticated
      // },
      // gotLenina(){
      //   return this.gotDonations(this.usersLenina)
      // }
    },
    created () {
      this.$store.dispatch('initSmeta')
      this.smetaBaker = this.$store.getters.smetaBaker
      this.smetaSchool = this.$store.getters.smetaSchool
    }
  };
</script>

<style lang="sass" scoped>
  h1
    margin-top: 100px
</style>
