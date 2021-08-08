<template>
    <div v-if="isEven(index)" class="vif_pos" >
        <article id="message" class="message is-info">
                <div class="message-header">
                    <div class="header_container">
                        <div class="left">
                            <figure>
                                <img :src="profilPicture" alt="profil_picture" class="profilPicture">
                                <figcaption v-if="privileges != 'user'">{{ privileges }}</figcaption>
                            </figure>
                            <p>{{ author }} le {{ moment(date).format('DD.MM.YYYY') }} à {{ moment(date).format('HH:mm:ss') }}</p>
                        </div>
                        <div class="white_space"></div>
                    </div>
                    <br>
                    <div class="header_secondary_container">
                        <div class="white_space"></div>
                        <p>{{ division}}</p>
                </div>
                </div>
                <div class="message-body">
                    {{ message }}
                </div>
        </article>
    </div>
    <div v-else class="v_else" :style="{'justify-content':'flex-end'}">
        <article id="message" class="message is-info">
                <div class="message-header" :style="{'background-color':'rgba(89, 150, 231, 0.75)'}">
                    <div class="header_container">
                        <div class="left">
                            <figure>
                                <img :src="profilPicture" alt="profil_picture" class="profilPicture">
                                <figcaption v-if="privileges != 'user'">{{ privileges }}</figcaption>
                            </figure>
                            <p>{{ author }} le {{ moment(date).format('DD.MM.YYYY') }} à {{ moment(date).format('HH:mm:ss') }}</p>
                        </div>
                        <div class="white_space"></div>
                    </div>
                    <div class="header_secondary_container">
                        <div class="white_space"></div>
                        <p>{{ division}}</p>
                    </div>
                </div>
                <div class="message-body">
                    {{ message }}
                </div>
        </article>
    </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';

export default {
    props: ['message', 'date', 'author', 'division', 'profilPicture', 'index', "privileges"], 
    created: function () {
      this.moment = moment;
    },
    data() {
        return {
            isAlert: true,
            feedbackMessage: '',
            comments: [],
            img:{
                url:''
            }
        }
    },
    methods:{
        isEven(n) {
            return n % 2 == 0;
            },
        isOdd(n) {
        return Math.abs(n % 2) == 1;
        }
    },
    computed: {
    ...mapState([
            'tokenToCheck',
            'profilPictureS',
            'isLogged'
        ]),
    },
}
</script>

<style lang="scss" scoped>
    div.vif_pos,.v_else{
        display: flex;
        justify-content: flex-start;
        margin: 1.5rem;
        & article#message{
            width: fit-content;
            min-width: 300px;
            // color: rgba(89, 210, 231, 0.75);
            & .message-header{
                background-color: rgba(89, 226, 231, 0.75);
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                line-height: 0.5;
                & .header_container{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                    & .left{
                        display: flex;
                        align-items: center;
                        & figure{
                            display: flex;
                            flex-direction: column;
                            & .profilPicture{
                                width: 40px;
                                margin-right: 1rem;
                                margin-bottom: 0.5rem;
                                border-radius: 100vw;
                            }
                            & figcaption{
                                text-align: center;
                                margin-right: 1rem;
                            }
                        }
                        & .white_space{
                            display: flex;
                        }
                    }
                }
                & .header_secondary_container{
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    justify-content: flex-end;
                    width: 100%;
                    & .white_space{
                        display: flex;
                    }
                    & p{
                        display: flex;
                    }
                }
            }
        }
    }
</style>
