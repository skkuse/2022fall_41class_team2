// PROPOSED_COMPONENTS
import ProblemDesc from "../../atoms/Assignment/ProblemSection/ProblemDesc";
import Constraints from "../../atoms/Assignment/ProblemSection/Constraints";

function ProblemMaster(props) {
    return <div>
        <ProblemDesc assignmentId={props.assignmentId}/>
        <Constraints assignmentId={props.assignmentId}/>
    </div>
}

export default ProblemMaster;