import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import List from "../components/List";

function Category() {
  const history = useHistory();
  const { id } = useParams();
  const [programs, setPrograms] = useState();

  useEffect(() => {
    // Fetch schedule for this channel
    (async () => {
      const response = await fetch(`/api/v1/programs?category=${id}`);
      const data = await response.json();
      setPrograms(data);
    })();
  }, [id]);

  if (!programs) return null;

  return (
    <div>
      <div
        className="grid-row justify-start align-center bg-light"
        style={{ height: "4rem" }}
      >
        <div className="grid-row align-center bg-dark px-1 height-100">
          <p className="text-bold m-0">Category</p>
        </div>
      </div>

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
      />
    </div>
  );
}

export default Category;
