// 파일에 작성된 코드 불러오기
/* - 로컬 파일 업로드 구현
       - 에디터 섹션 업데이트 필요 */

function UploadButton(props) {
    const [file, setFile] = useState(null);
    const [upload, { loading, error }] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
        console.log(data);
        },
    });
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleUpload = () => {
        upload({ variables: { file } });
    };
    
    return (
        <>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        </>
    );
}

export default UploadButton