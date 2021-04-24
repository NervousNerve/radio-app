import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useQueryParam } from "use-query-params";

import List from "../components/List";

function Programs() {
  const history = useHistory();

  const [programs, setPrograms] = useState();
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useQueryParam("category");

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/categories");
      const data = await response.json();
      setCategories(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/programs?category=" + categoryId);
      const data = await response.json();
      setPrograms(data);
    })();
  }, [categoryId]);

  return (
    <div className="grid-col gap-1 p-1">
      <div className="grid-row justify-center gap-1">
      <label>Kategori:</label>
      <select
        onChange={(e) => {
          setCategoryId(e.target.value);
        }}
      >
        <option>Alla kategorier</option>
        {categories &&
          categories.map((category, i) => (
            <option value={category.id} key={i}>
              {category.name}
            </option>
          ))}
      </select>

      {programs && (
        <List
          items={programs.map((program) => {
            return {
              image: program.programimage,
              text: program.name,
              id: program.id,
            };
          })}
          clickItem={(item) => {
            history.push("/programs/" + item.id);
          }}
        ></List>
      )}
    </div>
  );
}

export default Programs;
