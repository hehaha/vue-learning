<script>
import Vue from 'vue';
import Vuex from 'vuex';

export const ADD_TODO = 'push';
export const DELETE_TODO = 'deleteTodo';
export const FINISH_TODO = 'finish';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: []
    },
    mutations: {
        [ADD_TODO](state, todo) {
            state.todos.push(todo);
        },
        [DELETE_TODO](state, todoId) {
            for (const [index, todo] of state.todos.entries()) {
                if (todo.id === todoId) {
                    state.todos.splice(index, 1);
                    return;
                }
            }
        },
        [FINISH_TODO](state, todoId) {
            for (const todo of state.todos) {
                if (todo.id === todoId) {
                    todo.isFinish = true;
                    return;
                }
            }
        }
    }
});
</script>
