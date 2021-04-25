import style from "./css/Headerbar.module.css";

function Headerbar(props) {
  return <div className={`${style.headerbar} bg-light`}>{props.children}</div>;
}

export default Headerbar;
