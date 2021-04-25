function Headerbar(props) {
  return (
    <div
      className="grid-row justify-start align-center bg-light"
      style={{ height: "4rem" }}
    >
      {props.children}
    </div>
  );
}

export default Headerbar;
