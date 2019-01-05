// import Vue from 'vue'

const gotDonations = () => {
  let sumDonations = null
  const donations = this.$store.getters.usersLenina
  for (let i = 0; i < donations.length; i++ ) {
    sumDonations = sumDonations + Number(donations[i].donation)
  }
  return sumDonations
}

const needDonations = () => {
  let needSum = 0
  let sum = 0
  const smeta = this.$store.getters.smetaLenina
  for (let i = 0; i < smeta.length; i++ ) {
    sum = sum + smeta[i].num * smeta[i].price
  }
  needSum = sum + sum * 0.1
  return needSum
}

const restDonationsLenina = () => {
  const needSum = 0
  const sum = 0
  const smeta = this.$store.getters.smetaLenina
  for (let i = 0; i < smeta.length; i++ ) {
    sum = sum + smeta[i].num * smeta[i].price
  }
  needSum = sum + sum * 0.1

  const sumDonations = null
  const donations = this.$store.getters.usersLenina
  for (let i = 0; i < donations.length; i++ ) {
    sumDonations = sumDonations + Number(donations[i].donation)
  }
  const rest = needSum - sumDonations
  return rest
}

export default {
  gotDonations,
  needDonations,
  restDonationsLenina
}


// export default rest

