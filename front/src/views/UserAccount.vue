<template>
    <section class="hero2 is-success is-fullheight" v-if="loggedIn">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-black">Modifier votre Profil</h3>
                    <div class="box">
                        <form class="profile_picture" action="">
                            <figure class="avatar">
                                <img src="../../public/img/app_icons/user-regular.svg">
                            </figure>
                            <div id="user_avatar" class="file is-info has-name">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="resume" onchange="updateValue">
                                    <span class="file-cta">
                                    <i class="fas fa-upload"></i>
                                    <span class="file-label">
                                        Votre image…
                                    </span>
                                    </span>
                                    <span class="file-name">
                                        Aucun fichier
                                    </span>
                                </label>
                            </div>
                        </form>
                        <form>
                        <div class="columns row-one">
                            <div class="column is-three-fifths">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Prénom">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Nom">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns row-one">
                            <div class="column is-half">
                                <div class="control">
                                    <div class="input">
                                        <select>
                                            <option>-selection-</option>
                                            <option>Accueil</option>
                                            <option>Compta</option>
                                            <option>RH</option>
                                            <option>SAV</option>
                                            <option>Expédition</option>
                                            <option>Logistique</option>
                                            <option>Direction</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-haf">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Pseudo">
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Ancien Mot de Passe" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Nouveau Mot de Passe">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Confirmez votre Nouveau Mot de Passe">
                                </div>
                            </div>

                            <button class="button is-block is-success is-normal is-fullwidth">Valider <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
//  const fileInput = document.querySelector('#user_avatar input[type=file]');
//   fileInput.addEventListener("change", updateValue);
//   function updateValue() {
//     if (fileInput.files.length > 0) {
//       const fileName = document.querySelector('#user_avatar .file-name');
//       fileName.textContent = fileInput.files[0].name;
//     }
//   }
</script>

<style lang="scss" scoped>
    .profile_picture{
        display: flex;
        flex-direction: column;
        align-items: center;
        & .avatar{
            width: 40%;
        }
        & .file{
            margin: 1rem;
        }
    }
</style>