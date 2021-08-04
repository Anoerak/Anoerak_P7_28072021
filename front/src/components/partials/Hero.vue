<template>
    <div class="home">
        <section class="hero is-dark">
            <div class="hero-body">
            <div class="container">
                <h1 class="title">
                Bienvenue          
                </h1>
                <h2 class="subtitle">
                Rejoignez-vos collègues et partager vos dernières découvertes sur notre forum de discussion.
                </h2>
            </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Hero'
    }
</script>

<style lang="scss" scoped>
  .hero {    
    text-align: center;
    background-image: url('../../../public/img/groupo_banner.webp');
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    height: 400px;
    &-body {
      padding: 1rem 3rem;
      & .title {
        text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
        padding: 20px 0 20px 0;
        font-size: 60px;
      }
      & .subtitle {
        text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
        font-size: 30px;
      }
    }
  }
</style>
