<template> 
    <section class="hero2 is-success is-fullheight">
        <div class="hero-body">
            <div class="field">
                <label class="label">Titre</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Titre de votre Post">
                    </div>
            </div>

            <div class="field">
                <label class="label">Catégorie</label>
                <div class="control">
                    <div class="select">
                        <select>
                            <option>Actualité</option>
                            <option>Animaux</option>
                            <option>Film</option>
                            <option>Musique</option>
                            <option>People</option>
                            <option>Politique</option>
                            <option>Voyage</option>
                        </select>
                    </div>
                </div>
            </div>

            <form class="profile_picture" action="">
                <figure class="avatar">
                    <p>Votre GIF :</p>
                    <img src="#">
                </figure>
                <div id="user_avatar" class="file is-info has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume" onchange="updateValue">
                        <span class="file-cta">
                        <i class="fas fa-upload"></i>
                        <span class="file-label">
                            Votre GIF...
                        </span>
                        </span>
                        <span class="file-name">
                            Aucun fichier
                        </span>
                    </label>
                </div>
            </form>
            <br>

            <div class="field">
                <label class="label">Message</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Votre message"></textarea>
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link">Valider</button>
                </div>
                <div class="control">
                        <router-link :to="'/PostsList'">
                            <button class="button is-text">Annuler</button>
                        </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

</script>
