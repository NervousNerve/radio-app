function FavoriteButton(props) {
  return (
    <div>
      {!props.saved ? (
        <button className="btn-round" onClick={props.onSave}>
          <i className="fas fa-heart" /> Spara favorit
        </button>
      ) : (
        <button className="btn-round" onClick={props.onRemove}>
          <i className="fas fa-heart-broken" /> Ta bort favorit
        </button>
      )}
    </div>
  );
}

export default FavoriteButton;
