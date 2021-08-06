<template>
    <div id="comment">
        <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
            <img class="is-rounded" :src="profilPictureS">
            </p>
        </figure>
        <div class="media-content">
            <div class="field">
            <p class="control">
                <textarea class="textarea" placeholder="Ajoutez votre commentaire..."></textarea>
            </p>
            </div>
            <nav class="level">
            <div class="level-left">
                <div class="level-item">
                <a class="button is-primary">Valider</a>
                </div>
            </div>
            <br>
            <br>
            <br>
            </nav>
        </div>
        </article>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
      computed: {
        ...mapState([
                'userId',
                'lastnameS',
                'firstnameS',
                'usernameS',
                'emailS',
                'divisionS',
                'tokenToCheck',
                'profilPictureS',
                'privilegesS',
                'isValid',
                'isLogged'
        ]),
    }
}
</script>


<style lang="scss" scoped>
    figure{
        margin-left: 1rem;
    }
    .media-content{
        margin-right: 1rem;
    }
</style>