import http from '@/services/http';
export default {
    namespaced: true,
    state:{
        data:[]
    },

    mutations:{
        setUsers(state, payload){
            state.data = payload
        }
    },

    actions:{
        async getUsers(state){
            try {
                const {data} = await http.get('/api/users')
                state.commit('setUsers', data)
            } catch (error) {
                console.log(error.response.data)
            }
        },

        hideUsers(state){
            state.commit('setUsers', []);
        }
    },

    getters:{

    }
}