import { IconButton } from "../general/IconButton";
import CopyIcon from "@material-design-icons/svg/outlined/content_copy.svg";
import {
  coralReefsAbstract,
  climateChangeAbstract,
  invasiveZebraMusselsAbstract,
  hockeyYouthConcussionAbstract,
} from "./exampleAbstracts";

const CopyAbstracts = () => {
  const handleCopyToClipboard = async (text: string) => {
    try {
      await window.navigator.clipboard.writeText(text);
      // alert("Copied to clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };
  return (
    <div>
      <h4>Copy example abstracts from our list below</h4>
      <ul>
        <li>
          <IconButton
            icon={CopyIcon}
            size="small"
            onClick={() => handleCopyToClipboard(coralReefsAbstract)}
          />
          Interventions to help coral reefs under global change—A complex
          decision challenge
        </li>
        <li>
          <IconButton
            icon={CopyIcon}
            size="small"
            onClick={() => handleCopyToClipboard(climateChangeAbstract)}
          />
          Health effects of climate change: an overview of systematic reviews
        </li>
        <li>
          <IconButton
            icon={CopyIcon}
            size="small"
            onClick={() => handleCopyToClipboard(invasiveZebraMusselsAbstract)}
          />
          Invasive zebra mussel (Dreissena polymorpha) threatens an
          exceptionally large population of the depressed river mussel
          (Pseudanodonta complanata) in a postglacial lake
        </li>
        <li>
          <IconButton
            icon={CopyIcon}
            size="small"
            onClick={() => handleCopyToClipboard(hockeyYouthConcussionAbstract)}
          />
          MICK (Mobile Integrated Cognitive Kit) App for Concussion Assessment
          in a Youth Ice Hockey League
        </li>
      </ul>
    </div>
  );
};

export default CopyAbstracts;
