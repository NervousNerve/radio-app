import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import List from "../components/List";

function Categories() {
  const history = useHistory();
  const [categories, setCategories] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/categories");
      const data = await response.json();
      setCategories(data);
    })();
  }, []);

  const handleClickItem = (item) => {
    history.push("/categories/" + item.id);
  };

  return (
    <div>
      <div
        className="grid-row justify-start align-center bg-light"
        style={{ height: "4rem" }}
      >
        <div className="grid-row mx-1 gap-1">
          <Link to="/">Kanaler</Link>
          <p className="text-bold m-0">Kategorier</p>
        </div>
      </div>

      {categories && (
        <List
          items={categories.map((category) => {
            return {
              id: category.id,
              text: category.name,
            };
          })}
          clickItem={handleClickItem}
        ></List>
      )}
    </div>
  );
}

export default Categories;
