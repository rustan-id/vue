<template>
  <div class="donors">
    <h1>List of donations and participants</h1>
    <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Select the project"
      @input="getDonors"
      required>
    </v-select>
    <div class="donors__pro" v-if="selected === 'Baker Street'">
      <div v-for="user in usersBaker"
          :key="user.idToken">
      <div class="donors__row">
        <div class="donors__cell">{{ user.donation }} &#8364;</div>
        <div class="donors__cell">{{ user.pseudo }}</div>
      </div>
      </div>
      <div class="donors__row donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations(usersBaker) }} &#8364;</div>
        <div class="donors__cell">Raised</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ needDonations(smetaBaker) }} &#8364;</div>
        <div class="donors__cell">Project demand</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation(smetaBaker, usersBaker)}} &#8364;</div>
        <div class="donors__cell">Still needed</div>
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
        <div class="donors__cell">Raised</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ needDonations(smetaSchool) }} &#8364;</div>
        <div class="donors__cell">Project demand</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation(smetaSchool, usersSchool) }} &#8364;</div>
        <div class="donors__cell">Still needed</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adresses: ["Baker Street","School №53"],
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
      },
      getDonors() {
        this.$store.dispatch('fetchUsers')
      }
    },
    computed: {
      usersBaker() {
        return this.$store.getters.usersBaker
      },
      usersSchool() {
        return this.$store.getters.usersSchool
      },
    },
    created () {
      this.$store.dispatch('initSmeta')
      this.smetaBaker = this.$store.getters.smetaBaker
      this.smetaSchool = this.$store.getters.smetaSchool
    }
  };
</script>

<style lang="sass" scoped>
</style>
