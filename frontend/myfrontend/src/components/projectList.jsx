import axios from "axios";
import { useEffect, useState } from "react";

const ProjectManagerList = () => {
  const [projectManagers, setProjectManagers] = useState([]);

  useEffect(() => {
    console.log("Fetching project managers...");
    axios
      .get("http://127.0.0.1:8000/api/items/")
      .then((response) => {
        console.log("Data fetched:", response.data);
        setProjectManagers(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching project manager list",
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>Project Managers</h1>
      <ul>
        {projectManagers.map((pm) => (
          <li key={pm.id}>
            <strong>Name:</strong> {pm.name}
            <br />
            <strong>Start Date:</strong> {pm.start_date}
            <br />
            <strong>End Date:</strong> {pm.end_date}
            <br />
            <strong>Comments:</strong> {pm.comments}
            <br />
            <strong>Status:</strong> {pm.status}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProjectManagerList;
