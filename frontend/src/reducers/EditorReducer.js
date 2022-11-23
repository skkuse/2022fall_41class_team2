import { CHANGE_REPO, SAVE_REPO, SAVE_REPO_LIST, UPDATE_REPO } from "../pages/EditorPage/EditorAction";
import { GET_REPO, CREATE_REPO } from './../pages/EditorPage/EditorAction';

let editorInitState = {
    repoList: [],
    selectedModel: null
};

export function editorReducer(state = editorInitState, action) {
    switch (action.type) {
        case SAVE_REPO_LIST:
            if(state.selectedModel) {
                return { 
                    ...state, 
                    repoList : action.payload,
                };
            }

            return { 
                ...state, 
                repoList : action.payload,
                selectedModel: action.payload[action.payload.length - 1]
            };

        case CREATE_REPO:
            // alert("create repo")
            let tempList = [...state.repoList];
            tempList.push(action.payload);
            // tempList.push({
            //     content: {
            //         language: "python",
            //         code: "hello world!"
            //     }
            // })
            return {
                ...state,
                repoList: tempList,
                selectedModel: action.payload
            }

        case CHANGE_REPO:
            return {
                ...state,
                selectedModel: action.payload
            }

        case UPDATE_REPO:
            let modelTemp = state.selectedModel;
            modelTemp.content.code = action.payload;
            return {
                ...state,
                selectedModel: modelTemp
            }

        case SAVE_REPO:
            console.log(action);
            let repoListTemp = [...state.repoList];
            for (const idx in repoListTemp) {
                if(repoListTemp[idx].id == action.payload.id) {
                    repoListTemp[idx] = action.payload
                }
            }
           
            return {
                ...state, 
                repoListTemp: repoListTemp
            }

        case GET_REPO:
            console.log(action);
            const id = action.payload;
            let selectedModel = state.repoList.filter((repo) => repo.id = id);
            return {
                ...state, 
                repoList : action.payload,
                selectedModel: selectedModel
            }
        
        
      default:
        return state;
    }
}
