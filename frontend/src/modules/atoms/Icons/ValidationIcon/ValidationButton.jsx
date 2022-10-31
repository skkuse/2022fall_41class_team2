import codeRunner from './codeRunner';

function ValidationButton({ children, ...props }) {
  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      type="submit"
      className="validation-button"
    >
      검증
    </Button>
  );
}

export default ValidationButton;