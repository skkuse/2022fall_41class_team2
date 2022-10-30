import UploadButton from '../../atoms/Buttons/FuncButtons/UploadButton/UploadButton';
import ResetButton from '../../atoms/Buttons/FuncButtons/ResetButton/ResetButton';
import Clipper from '../../atoms/Buttons/FuncButtons/Clipper/Clipper';
import Downloader from '../../atoms/Buttons/FuncButtons/Downloader/Downloader';
import Execution from '../../atoms/Buttons/FuncButtons/Execution/Execution';
import Grading from '../../atoms/Buttons/FuncButtons/Grading/Grading';
import Submission from '../../atoms/Buttons/FuncButtons/Submission/Submission';


// 제출 이후에는 이 섹션이 사라진다. 다시 풀게 될 떄 렌더링 필요
function FunctoolsMaster() {
    
    return (
        <div>
            <h1>FunctoolsMaster</h1>
            <UploadButton />
            <ResetButton />
            <Clipper />
            <Downloader />
            <Execution />
            <Grading />
            <Submission />
        </div>
    )
}

export default FunctoolsMaster