<template>
  <div>
    <Navigation></Navigation>
    <nuxt />
    <Footer> </Footer>
  </div>
</template>
<script>
  import Navigation from '../components/Navigation'
  import Footer from "../components/Footer";

  export  default {
    components:{
      Footer,
      Navigation
    }
  }
</script>
