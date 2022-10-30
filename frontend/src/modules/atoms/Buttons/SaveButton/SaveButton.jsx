/* 
코드 중간 저장
최대 n번 저장(n==3)
*/

function SaveButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F5F5F5",
        border: "none",
        borderRadius: "10px",
        color: "#000000",
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
    >
      저장
    </Button>
  );
}

export default SaveButton;