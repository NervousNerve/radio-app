function ScheduleList(props) {
  return (
    <div className="grid-col gap-1">
      {props.children.map((item, i) => (
        <div key={i}>
          <p className="text-bold mt-0 mb-05">
            {item.props.timestamp.toLocaleString("sv-SE", {
              timeStyle: "short",
            })}
          </p>
          {item}
        </div>
      ))}
    </div>
  );
}

export default ScheduleList;
