import style from "./css/Headerbar.module.css";

function Headerbar(props) {
  return (
    <div className={`${style.headerbar} px-1 bg-light`}>{props.children}</div>
  );
}

export default Headerbar;
