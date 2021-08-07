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
        isLogged: false,
        authorId: ''
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
