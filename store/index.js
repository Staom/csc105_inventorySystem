import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import {
    getField,
    updateField
} from 'vuex-map-fields';

Vue.use(Vuex);
import SecureLS from "secure-ls";

const ls = new SecureLS({
    isCompression: false
});

const vuexPersistent = createPersistedState({
    key: "vuex",
    paths: ["auth"],
    fetchBeforeUse: true,
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
    },
});


const createStore = () => new Vuex.Store({
    plugins: [vuexPersistent],
    state: {
        header: "",
        auth: {
            token: "",
            user: {
                "id": -1,
                "username": "",
                "role": "",
                "firstname": "",
                "lastname": "",
                "birthdate": "",
                "gender": "",
                "email": "",
                "tel": "",
                "status": "",
            },
            isLoggedIn: false
        },
        stocks: [{
            id: 1,
            product_name: "Cake",
            description: "Cake is lie",
            amount: 200,
            import_timestamp: Date.now(),
            export_timestamp: Date.now(),
            import_staff: 2,
            export_staff: 2,
        }, {
            id: 2,
            product_name: "Hamburger",
            description: "For eating only",
            amount: 100,
            import_timestamp: Date.now(),
            export_timestamp: Date.now(),
            import_staff: 2,
            export_staff: 2
        }],
        accounts: [{
            "id": 1,
            "role": "admin",
            "firstname": "Sirawit",
            "lastname": "Pratoomsuwan",
            "birthdate": "2001-13-12",
            "gender": "Male",
            "email": "sirawit.cssit@mail.kmutt.ac.th",
            "tel": "098-378-2018",
        }]
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
    },
    actions: {

    }
});

export default createStore;