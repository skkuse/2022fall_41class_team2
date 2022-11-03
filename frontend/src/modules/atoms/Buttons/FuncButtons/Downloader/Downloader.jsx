/*        - 작성 중인 코드를 파일로 저장
       - 에디터 섹션 접근 (state -> props) 필요 */

function Downloader(props) {
  const { url, fileName } = props;
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const download = useCallback(() => {
    setIsDownloading(true);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    setDownloaded(true);
    setIsDownloading(false);
  }, [url, fileName]);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={download}
      disabled={isDownloading || downloaded}
    >
      {isDownloading ? 'Downloading...' : downloaded ? 'Downloaded' : 'Download'}
    </Button>
  );
}

export default Downloader;