import style from "./css/Headerbar.module.css";

function Headerbar(props) {
  return (
    <div className="bg-light">
      <div className={`${style.headerbar} px-1 container`}>
        {props.children}
      </div>
    </div>
  );
}

export default Headerbar;
