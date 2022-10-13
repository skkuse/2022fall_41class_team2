import assignmentSelector from '../assignmentSelector';

function ProblemDesc(props) {
    
    const ProblemDesc = assignmentSelector(props.assignmentId).question;

    return (
        <div className="ProblemDesc">
            <h3>ProblemDesc</h3>
            <p>{ProblemDesc}</p>
        </div>
    );
}

export  default  ProblemDesc;