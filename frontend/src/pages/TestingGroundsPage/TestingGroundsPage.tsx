import { useState } from "react";
import { Button } from "../../components/general/Button";
import { Layout } from "../../components/general/Layout/Layout";
import axios from "axios";
// import styles from "./TestingGroundsPage.module.css"

function TestingGroundsPage() {
  const [data, setData] = useState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/hello-world");
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Layout>
      <h3>Testing Grounds</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>test the /hello-world GET endpoint</div>
        <Button type="submit">Submit</Button>
      </form>
      <h5>JSON output:</h5>
      <pre>{data ? JSON.stringify(data, null, 2) : "no output"}</pre>
    </Layout>
  );
}

export { TestingGroundsPage };
