// 섹션을 모두 합친 메인 화면

import Header from "./modules/organisms/Header";
import Problem from "./modules/organisms/Problem";
import Testcase from "./modules/organisms/Testcase";
import Editor from "./modules/organisms/Editor";
import Functools from "./modules/organisms/Functools";
import Terminal from "./modules/organisms/Terminal";


function Judge(props) {
    return <div>
        <Header/>
        <Problem/>
        <Testcase/>
        <Editor/>
        <Functools/>
        <Terminal/>
    </div>
}

export default Judge;