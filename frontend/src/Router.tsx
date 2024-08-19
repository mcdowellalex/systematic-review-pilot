import { Route, Routes } from "react-router-dom";

import { FourOhFourPage } from "./pages/FourOhFourPage";
import { TestingGroundsPage } from "./pages/TestingGroundsPage/TestingGroundsPage";
import HomePage from "./pages/HomePage/HomePage";
import { AbstractCategorizationConfidencePage } from "./pages/AbstractCategorizationConfidencePage/AbstractCategorizationConfidencePage";
import { TextSummarizationPage } from "./pages/TextSummarizationPage/TextSummarizationPage";
import { ReferenceCollectionPage } from "./pages/ReferenceCollectionPage/ReferenceCollection";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/reference-collection"
        element={<ReferenceCollectionPage />}
      />
      <Route
        path="/abstract-categorization-confidence"
        element={<AbstractCategorizationConfidencePage />}
      />
      <Route path="/text-summarization" element={<TextSummarizationPage />} />
      <Route path="/testing-grounds" element={<TestingGroundsPage />} />
      <Route path="*" element={<FourOhFourPage />} />
    </Routes>
  );
};

export default Router;
