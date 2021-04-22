function List(props) {
  return (
    <div>
      {props.list && props.list.map((item) => <ListItem item={item} />)}
    </div>
  );
}

export default List;
