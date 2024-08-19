import { useEffect, useState } from "react";
import { Layout } from "../../components/general/Layout/Layout";
import { TextArea } from "../../components/general/TextArea";
import styles from "./ReferenceCollection.module.css";
import { Button } from "../../components/general/Button";
import { Loading } from "../../components/general/Loading/Loading";
import axios from "axios";

const ReferenceCollectionPage = () => {
  const [researchQuestion, setResearchQuestion] = useState("");
  const [relatedReferences, setRelatedReferences] = useState([]);
  const [isRelatedReferencesLoading, setIsRelatedReferencesLoading] =
    useState(false);
  const [isAllReferencesLoading, setIsAllReferencesLoading] = useState(false);
  const [allReferences, setAllReferences] = useState([]);

  useEffect(() => {
    const fetchAllReferences = async () => {
      try {
        setIsAllReferencesLoading(true);
        const response = await axios.get(
          "http://localhost:8000/pubmed-references"
        );
        setAllReferences(response.data.references);
      } catch (error) {
        console.error("Error fetching pubmed references:", error);
      } finally {
        setIsAllReferencesLoading(false);
      }
    };

    fetchAllReferences();
  }, []);

  const getRelatedPubmedReferences = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      setIsRelatedReferencesLoading(true);
      const response = await axios.post(
        "http://localhost:8000/related-pubmed-references",
        {
          research_question: researchQuestion,
        }
      );
      setRelatedReferences(response.data);
    } catch (error) {
      console.error("Error fetching related pubmed references:", error);
    } finally {
      setIsRelatedReferencesLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Reference Collection</h3>
      <p>
        Describe the goal of your systematic review below and tweak your search
        to your needs.
      </p>

      <div className={styles.queryContainer}>
        <form
          className={styles.researchQuestionForm}
          onSubmit={getRelatedPubmedReferences}
        >
          <h4>Describe your research question:</h4>
          <TextArea
            value={researchQuestion}
            onChange={(e) => setResearchQuestion(e.target.value)}
          />
          <div>
            <Button type="submit">Query</Button>
          </div>
        </form>
        <div className={styles.querySettingsContainer}>
          <h4>Query settings</h4>
          <p>Adjust your settings here for the reference query</p>
          <div>Select the journals to search through (checkboxes)</div>
          <div>How many references do you want (slider)?</div>
        </div>
      </div>

      <h4 className={styles.queryResultsHeader}>Query results</h4>
      {isRelatedReferencesLoading ? (
        <Loading />
      ) : relatedReferences ? (
        <>
          {relatedReferences.map((reference) => (
            <div key={reference.title}>
              {reference.title} [ {reference.score} ]
            </div>
          ))}
        </>
      ) : (
        "womp womp no related references :("
      )}

      <h4>All example references</h4>
      {isAllReferencesLoading ? (
        <Loading />
      ) : allReferences ? (
        <>
          {allReferences.map((reference) => (
            <div key={reference.title}>{reference.title}</div>
          ))}
        </>
      ) : (
        "no references loaded"
      )}
    </Layout>
  );
};

export { ReferenceCollectionPage };
