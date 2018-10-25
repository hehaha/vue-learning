import Vue from 'vue';
import Vuex from 'vuex';

export const ADD_PRACTICE = 'addPractice';
export const DELETE_PRACTICE = 'delPractice';
export const UPDATE_PRACTICE = 'updatePractice';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        profile: {
            namespaced: true,
            state: {
                practices: []
            },
            mutations: {
                [ADD_PRACTICE](state, practice) {
                    let practicesCount = state.practices.length;
                    practice.id = practicesCount + 1;
                    state.practices.push(practice);
                },
                [DELETE_PRACTICE](state, practiceId) {
                    for (const [index, practice] of state.practices.entries()) {
                        if (practice.id === practiceId) {
                            state.practices.splice(index, 1);
                            return;
                        }
                    }
                },
                [UPDATE_PRACTICE](state, practice) {
                    let findIndex = null;
                    for (const [index, _practice] of state.practices.entries()) {
                        if (_practice.id === practice.id) {
                            findIndex = index;
                            break;
                        }
                    }
                    if (findIndex !== null) {
                        state.practices[findIndex] = practice;
                    }
                }
            }
        }
    }
});
