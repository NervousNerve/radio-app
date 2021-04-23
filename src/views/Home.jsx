import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import List from "../components/List";
import { useQueryParam, NumberParam } from "use-query-params";

function Home() {
  const history = useHistory();
  const [programs, setPrograms] = useState();
  const [categories, setCategories] = useState();
  const [channelId, setChannelId] = useQueryParam("channel", NumberParam);
  const [categoryId, setCategoryId] = useQueryParam("category", NumberParam);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/categories");
      const data = await response.json();
      setCategories(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log(categoryId);
      const response = await fetch("/api/v1/programs?category=" + categoryId);
      const data = await response.json();
      setPrograms(data);
    })();
  }, [categoryId]);

  return (
    <div>
      <div
        className="grid-row justify-start align-center bg-light"
        style={{ height: "4rem" }}
      >
        <div className="grid-row mx-1 gap-1">
          <p className="text-bold m-0">Program</p>
          <Link to="/channels">Kanaler</Link>
        </div>
      </div>

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
            history.push("/channels/" + item.id);
          }}
        ></List>
      )}
    </div>
  );
}

export default Home;
