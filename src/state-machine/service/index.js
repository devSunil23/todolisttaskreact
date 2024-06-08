import { atom } from "jotai";
import { allTodoListAtom, allUserAtom } from "../model";
import axios from "axios";
export const fetchAllUsersService = atom(null, async (get, set) => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        set(allUserAtom, response.data);
    } catch (error) {
        console.log(error);
    }
});

export const fetchTodoListService = atom(null, async (get, set) => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
        );
        set(allTodoListAtom, response.data);
    } catch (error) {
        console.log(error);
    }
});
