import style from "./css/List.module.css";

function List(props) {
  return (
    <div className="grid-col gap-1 p-1">
      {props.items &&
        props.items.map((item, i) => (
          <div key={i}>
            {item.timestamp && (
              <p className="m-0 mb-05 text-bold">
                {item.timestamp.toLocaleString("sv-SE", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            )}

            <div
              className={`grid-row justify-start align-center bg-light ${style.listItem}`}
              onClick={() => {
                props.clickItem(item);
              }}
            >
              <img src={item.image} style={{ height: "4rem" }} alt=""></img>
              <p className="text-bold px-1">{item.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default List;
