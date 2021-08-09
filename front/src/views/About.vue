<template>
  <div class="about">
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title is-size-3">À Propos de la communauté Groupomania</p>          
        </div>
      </div>
    </div>
    <div class="container">
      <p class="comp-description is-size-4">Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement 300 il y a 3 ans.</p>
      <p class="comp-description is-size-4">Afin de faciliter les intéractions entre nos différents services et permettre à nos collaborateurs de faire plus ample connaissance, nous avons développer un outil interne permettant d'échanger sur des sujets divers et variés.</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.about{
  & .hero.is-primary{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #182a48;
    height: 100px;
  }
  & .container{
    margin: 1rem;
    & .comp-description {
      margin-top: 50px;
    }
  }
}

</style>