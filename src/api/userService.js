import api from "./config";

export const fetchUsers = (limit = 50, skip = 0, search="", gender="all", sortKey, sortDir) => {
    let params = {limit, skip};

    if (search) {
        params.search = search;
    }
    if (gender != 'all') {
        params.gender = gender;
    }

    return api.get('/users', {
        params
    })
}
