import {createStore} from 'vuex'
import jwt from 'jsonwebtoken'
import axios from 'axios'


export default createStore({
    state: {
        userId: '',
        lastnameS: '', 
        firstnameS: '',
        usernameS: '',
        emailS: '',
        divisionS: '',
        tokenToCheck: '',
        profilPictureS: '',
        privilegesS: '',
        isValid: 'test',
        isLogged: false
    }, 
    getters: {
        isLogged: (state) => {
            return state.isLogged; 
        },
        usernameS: (state) => {
            return state.usernameS;
        }    
    },
    mutations: {
        CHECK_TOKEN(state) {
            try{
                jwt.verify(state.tokenToCheck, 'RANDOM_TOKEN');
                state.isValid = 'ok';
                state.isLogged = true;
                return true;
            } catch(error) { 
                state.isValid = "expiry"; 
                state.isLogged = false;
                this.commit('LOGOUT');
                this.commit('CLEAR_STATE');
                return false;
            }
        },
        LOGOUT(state) {
            this.tokenToCheck = '';
            state.isLogged = false;
        },
        CLEAR_STATE(state) {
            state.userId= '',
            state.firstnameS= '', 
            state.lastnameS= '', 
            state.usernameS= '', 
            state.emailS= '',
            state.privilegesS= '',
            state.isLogged = false,
            state.tokenToCheck = '';
        }
    }, actions: {
        getInfos(context) {
                axios.get('http://localhost:3000/user/getInfos/' + context.state.userId, { headers: {
                'Authorization': `token ${context.state.tokenToCheck}`
                }})
            .then(res => {
                this.state.firstnameS = res.data[0].firstname;
                this.state.lastnameS = res.data[0].lastname;
                this.state.usernameS = res.data[0].username;
                this.state.emailS = res.data[0].email;
                this.state.passwordS = res.data[0].password;
                this.state.divisionS = res.data[0].division;
                this.state.profilPictureS = res.data[0].profilPicture;
                this.state.privilegesS = res.data[0].privileges;
            })
            .catch(error => {
                console.log("Aucun utilisateur en ligne", error);
            })
        }
    }
});




// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//     article: {},
//     posts: [
//       {
//         id: 1,
//         name: 'Olympique 2022 ??',
//         category: 'Animaux',
//         description: 'Vos pronostiques sur les prochains JO :)',
//         featuredImage: 'https://img-9gag-fun.9cache.com/photo/ad8rExB_700bwp.webp',
//         images: [
//           'https://img-9gag-fun.9cache.com/photo/ad8rExB_700bwp.webp',
//         ],
//         division: 'Comptabilité',
//         author: 'Pierre',
//         date: '25-06-2021',
//         time: '11:30',
//       },
//       {
//         id: 2,
//         name: "Qui a dit que FIAT n'était plus sexy?!",
//         category: 'Voiture',
//         description: "Rien de tel pour vous donner envie d'une FIAT :-)",
//         featuredImage: 'https://media.giphy.com/media/XQHN4wfaAcgTe/giphy.gif',
//         images: [
//           'https://media.giphy.com/media/XQHN4wfaAcgTe/giphy.gif'
//         ],
//         division: 'Secrétariat',
//         author: 'Isabelle',
//         date: '21-05-2021',
//         time: '16:15'
//       },
//       {
//         id: 3,
//         name: "Allez-vous commander le dernier iPhone?!",
//         category: 'Divers',
//         description: "Que pensez-vous du dernier iPhone et surtout, allez-vous craquer ?",
//         featuredImage: 'https://media.giphy.com/media/mNwhyN3JyuMykpxaTA/giphy.gif',
//         images: [
//           'https://media.giphy.com/media/mNwhyN3JyuMykpxaTA/giphy.gif'
//         ],
//         division: 'Direction',
//         author: 'Jean-Pierre',
//         date: '21-05-2021',
//         time: '16:15'
//       }
//     ],
//     comment:{},
//     comments:[
//       {
//         id: 1,
//         messageId: 78,
//         author : 'Sebastien',
//         division: 'Acceuil',
//         date: '21-07-2021',
//         time: '17:22',
//         message: 'Sympa, cela nous donnerait de quoi discuter :)'
//       },
//       {
//         id: 1,
//         messageId: 78,
//         author : 'Sasha',
//         division: 'Comptabilité',
//         date: '21-07-2021',
//         time: '17:29',
//         message: "On peut lancer les pronostiques ce soir autours d'un verre ?"
//       },
//       {
//         id: 2,
//         messageId: 24,
//         author : 'David',
//         division: 'Garage',
//         date: '21-07-2021',
//         time: '17:22',
//         message: "Je n'ai jamais aimé FIAT :)"
//       },
//       {
//         id: 2,
//         messageId: 25,
//         author : 'Aline',
//         division: 'Comptabilité',
//         date: '21-07-2021',
//         time: '17:29',
//         message: "Elles sont mignonnes !!!!!"
//       }
//     ]  
//   },
// })
