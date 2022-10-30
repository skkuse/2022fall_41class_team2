import assignmentSelector from '../assignmentSelector';

function Constraints(props) {
    
    const constraints = assignmentSelector(props.assignmentId).constraints;

    return (
        <div className="constraints">
            <h3>Constraints</h3>
            <p>{constraints}</p>
        </div>
    );
}

export  default  Constraints;