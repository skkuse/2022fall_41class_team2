export const SAVE_REPO_LIST = "SAVE_REPO_LIST";
export const SAVE_REPO = "SAVE_REPO";
export const GET_REPO = "GET_REPO";
export const CHANGE_REPO = "CHANGE_REPO";
export const CREATE_REPO = "CREATE_REPO";
export const UPDATE_REPO = "UPDATE_REPO";

export const updateRepoAction  = (code) => {
    return {
        type: UPDATE_REPO,
        payload: code
    }
}

export const createRepoAction =(repo) => {
    return {
        type: CREATE_REPO,
        payload: repo
    }
}

export const saveRepoListAction = (repoList) => {
    console.log("saveRepoListAction");
    return {
        type: SAVE_REPO_LIST,
        payload: repoList
    }
}

export const saveRepoAction = (repo) => {
    console.log("save");
    return {
        type: SAVE_REPO,
        payload: repo
    }
}

export const changeRepoAction = (repo) => {
    console.log("change");
    return {
        type: CHANGE_REPO,
        payload: repo
    }
}

export const getRepoAction = (index) => {
    return {
        type: GET_REPO,
        payload: index
    }
}