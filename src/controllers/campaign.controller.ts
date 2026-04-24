import {Request, Response} from 'express';
import runPipeline from "../pipeline/runPipeline";


export const runCampaign = async (req: Request, res: Response) => {
  try {
    const result = await runPipeline(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};