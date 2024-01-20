import fs from "fs";
import { config } from "./config";

export async function getData() {
  const data = fs.readFileSync(config.dataFile, {encoding: "utf8", flag: "r"});
  return JSON.parse(data)
}