import react, { useEffect, useState } from "react";
import "./App.css";
import FormComponent from "./Form.js";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="App">
      <h3>g{data.message}</h3>
      <FormComponent />
    </div>
  );
}

export default App;
