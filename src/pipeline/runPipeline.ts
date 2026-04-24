import { runOutreachAutomation } from "../services/automation.service";
import { analyzeContent } from "../services/content.service";
import { enrichCreators } from "../services/enrcihment.service";
import { filterCreators } from "../services/filter.service";
import { discoverInstagramCreators } from "../services/instagram.discovery.service";
import { Brand, matchCreators } from "../services/matching.service";
import { generateOutreach } from "../services/outreach.service";
import { segmentCreators } from "../services/segment.service";
import { discoverYouTubeCreators } from "../services/youtube.discovery.service";
import { Creator } from "../types/creator.types";


interface Input {
    keywords:string[];
    brand:Brand

}

export default async function runPipeline(input: Input) {
  const { keywords, brand } = input;


  // Task 1 — Discovery Engine For you tube
  const creators: Creator[] = await discoverYouTubeCreators(keywords);
  // Task 1 — Discovery Engine For Instagram
   const igCreators = await discoverInstagramCreators(keywords[0]);
   console.log("Ig creators discovered:", igCreators.length);

  // console.log("Total discovered:", creators.length);

  const allCreators =[...creators, ...igCreators];
  console.log("Total discovered across platforms:", allCreators.length);

  //task2 filtering 
  // const filteredCreators = filterCreators(allCreators, keywords);
  const filteredCreators = allCreators;

  // console.log("Total after filtering:", filteredCreators.length);
  //filter by Country Using hugging face to get india score and filter creators with score 
 
  // //task3 segmentation 
  const segmented = segmentCreators(filteredCreators);

  //task 4 Enrichment  
  const enriched = enrichCreators(filteredCreators);



  // task 5  Content context 
  const analyzed = enriched.map(c=> analyzeContent(c));

  //task 6 matching 
  const matched = matchCreators(analyzed,brand);

  // task 7 Generate outreach 
  const outreach = generateOutreach(matched,brand);

  // Task 8 Automation 
  const automationResults = await runOutreachAutomation(outreach);

  return {
  step: "task-7-automation",
  totalDiscovered: allCreators.length,
  totalFiltered: filteredCreators.length,
  creators: outreach,
  automation: automationResults
    
  };
}

