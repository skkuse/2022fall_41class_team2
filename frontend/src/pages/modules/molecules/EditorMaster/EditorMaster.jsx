// PROPOSED_COMPONENTS
import SaveButton from "../../atoms/Buttons/SaveButton/SaveButton";
import CodeSpace from "../../atoms/Assignment/EditorSection/CodeSpace";

// 제출 이후에는 편집 가능한 섹션이 수정 방안으로 바뀌어야 한다. 
/*          - 제출 이후에는 코드 입력창 확대 시 좌우로 표기
           - conditional rendering
             - header section, termianl section 제외한 모든 화면을 수정 방안을 나타내는 editor section으로 채운다. */ */
function EditorMaster(props) {
    return <div>
        <SaveButton onClick={props.onClick} />
        <CodeSpace />
    </div>
}

export default EditorMaster;