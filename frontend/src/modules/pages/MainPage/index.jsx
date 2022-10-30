// 섹션을 모두 합친 메인 화면

import Header from "../../organisms/Header";
import Problem from "../../organisms/Problem";
import Testcase from "../../organisms/Testcase";
import Editor from "../../organisms/Editor";
import Functools from "../../organisms/Functools";
import Terminal from "../../organisms/Terminal";


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