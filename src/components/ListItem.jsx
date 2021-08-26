import style from "./css/ListItem.module.css";

function ListItem(props) {
  return (
    <div
      className={`grid-row justify-start bg-light ${style.listItem}`}
      onClick={props.onClick}
    >
      {props.thumbnail && (
        <div className="grid-col align-center bg-dark">
          <img src={props.thumbnail} className={style.thumbnail} alt="" />
        </div>
      )}

      <div className="grid-col align-center px-1 py-05">{props.children}</div>
    </div>
  );
}

export default ListItem;
