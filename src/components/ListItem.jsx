import style from "./css/ListItem.module.css";

function ListItem(props) {
  return (
    <div
      className={`grid-row justify-start align-center bg-light ${style.listItem}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default ListItem;
