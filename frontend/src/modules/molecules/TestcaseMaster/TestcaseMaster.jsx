// PROPOSED_COMPONENTS
import TestCasePanel
    from "../../atoms/Assignment/TestcaseSection/TestCasePanel";
import ValidationButton from "../../atoms/Buttons/ValidationButton/ValidationButton";

function TestcaseMaster(props) {
    return <div>
        테스트케이스...
        <ValidationButton />
        <TestCasePanel />
    </div>
}

export default TestcaseMaster;