import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useQueryParam } from "use-query-params";

import List from "../components/List";
import ListItem from "../components/ListItem";

import { getAllCategories } from "../data/categories";
import { getAllPrograms } from "../data/programs";

function Programs() {
  const history = useHistory();

  const [programs, setPrograms] = useState();
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useQueryParam("category");

  useEffect(() => {
    getAllCategories().then((cats) => setCategories(cats));
  }, []);

  useEffect(() => {
    getAllPrograms({ category: categoryId }).then((progs) =>
      setPrograms(progs)
    );
  }, [categoryId]);

  return (
    <div className="grid-col gap-1 p-1 container">
      <div className="grid-row justify-center align-center gap-1">
        <label>Kategori:</label>
        <select
          onChange={(e) => {
            if (e.target.value === "0") setCategoryId(undefined);
            else setCategoryId(e.target.value);
          }}
        >
          <option value={0}>Alla kategorier</option>
          {categories &&
            categories.map((category, i) => (
              <option value={category.id} key={i}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <List>
        {programs &&
          programs
            .sort((a, b) => a.name.localeCompare(b.name, "sv"))
            .map((program) => (
              <ListItem
                key={program.id}
                thumbnail={program.programimage}
                onClick={() => {
                  history.push("/programs/" + program.id);
                }}
              >
                <p className="text-bold m-0">{program.name}</p>
              </ListItem>
            ))}
      </List>
    </div>
  );
}

export default Programs;
