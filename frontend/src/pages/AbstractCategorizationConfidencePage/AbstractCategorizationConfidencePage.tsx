import { useState } from "react";
import { Button } from "../../components/general/Button";
import { Layout } from "../../components/general/Layout/Layout";
import { TextArea } from "../../components/general/TextArea";
import { TextBox } from "../../components/general/TextBox";
import axios from "axios";
import { Loading } from "../../components/general/Loading/Loading";
import styles from "./AbstractCategorizationConfidencePage.module.css";
import { CopyAbstracts } from "../../components/CopyAbstracts";

function AbstractCategorizationConfidencePage() {
  const [confidenceData, setConfidenceData] = useState();
  const [abstract, setAbstract] = useState("");
  const [label, setLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/abstract-categorization-confidence",
        {
          abstract: abstract,
          labels: [label],
        }
      );
      setConfidenceData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <h3>Abstract Categorization Confidence</h3>
      <p>
        Categorize how well a label fits to the research paper abstract on a
        confidence scale of 0-1.
      </p>
      <div className={styles.container}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h4>Enter a research paper abstract:</h4>
          <TextArea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          />
          <div>Enter a label:</div>
          <TextBox value={label} onChange={(e) => setLabel(e.target.value)} />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>

        <div className={styles.copyAbstracts}>
          <CopyAbstracts />
        </div>
      </div>
      <h5>JSON output:</h5>
      {isLoading ? (
        <Loading />
      ) : (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            maxWidth: "100%",
            padding: "10px",
          }}
        >
          {confidenceData
            ? JSON.stringify(confidenceData, null, 2)
            : "no output"}
        </pre>
      )}
    </Layout>
  );
}

export { AbstractCategorizationConfidencePage };
