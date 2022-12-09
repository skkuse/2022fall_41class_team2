import { CHANGE_REPO, CLEAR_SELECTED_REPO, READY_CHANGE_SELECTED_REPO, SAVE_REPO, SAVE_REPO_LIST, TESTCASE_OFF, UPDATE_REPO } from "../pages/EditorPage/EditorAction";
import { GET_REPO, CREATE_REPO, CLEAR_REPO, READY_CREATE_SELECTED_REPO, TESTCASE_ON, TESTCASE_ERROR } from './../pages/EditorPage/EditorAction';

let editorInitState = {
    repoList: [],
    selectedModel: null,
    repoChangeInfo: {
        isChanging: false,
        prevId: null,
    },
    repoCreateInfo: {
        isCreating: false,
        prevId: null,
    },
};

export function editorReducer(state = editorInitState, action) {
    switch (action.type) {
        case SAVE_REPO_LIST:
            console.log("SAVE_REPO_LIST");
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
        
        // * 다른 과제로 들어갈 때 저장된 코드 비우기
        case CLEAR_REPO:
            console.log("CLEAR_REPO");
            return {
                ...state,
                repoList: [],
                selectedModel: null
            }

        case READY_CREATE_SELECTED_REPO:
            console.log("READY_CREATE_SELECTED_REPO");
            return {
                ...state,
                repoCreateInfo: {
                    isCreating: true,
                    prevId: action.payload
                },
            }


        case READY_CHANGE_SELECTED_REPO:
            console.log("READY_CHANGE_SELECTED_REPO");
            return {
                ...state,
                repoChangeInfo: {
                    isChanging: true,
                    prevId: action.payload
                },
                // selectedModel: null
            }

        case CREATE_REPO:
            console.log("create repo")
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
                selectedModel: action.payload,
                repoCreateInfo: {
                    isCreating: false,
                    prevId: action.payload
                },
            }

        case CHANGE_REPO:
            console.log("CHANGE_REPO " + JSON.stringify(action.payload));
            return {
                ...state,
                selectedModel: action.payload,
                repoChangeInfo: {
                    isChanging: false,
                    prevId: action.payload
                },
            }

        case UPDATE_REPO:
            console.log("UPDATE_REPO");
            let modelTemp = state.selectedModel;
            modelTemp.content.code = action.payload;
            return {
                ...state,
                selectedModel: modelTemp
            }

        case SAVE_REPO:
            console.log("SAVE_REPO");
            console.log(action);
            let repoListTemp = [...state.repoList];
            for (const idx in repoListTemp) {
                if(repoListTemp[idx].id == action.payload.id) {
                    repoListTemp[idx] = action.payload
                }
            }
           
            return {
                ...state, 
                repoList: repoListTemp
            }

        case GET_REPO:
            console.log("GET_REPO");
            console.log(action);
            const id = action.payload;
            let selectedModel = state.repoList.filter((repo) => repo.id = id);
            return {
                ...state, 
                repoList : action.payload,
                selectedModel: selectedModel
            }
        
        
      default:
        return {
            ...state,
        };
    }
}

let testcaseInitState = {
    isOnTestcase: false,
    errorContent: "",
    isError: false
};

export function testcaseReducer(state = testcaseInitState, action) {
    switch (action.type) {
        case TESTCASE_ON:
            return {
                ...state,
                isOnTestcase: true
            };

        case TESTCASE_OFF:
            return {
                isOnTestcase: false,
                errorContent: "",
                isError: false
            };

        case TESTCASE_ERROR:
            console.log(action);
            return {
                ...state,
                isError: action.is_error
            };

        default:
            return {
                ...state,
            };
    }
}