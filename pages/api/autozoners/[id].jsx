//import speakerData from '../../../src/SpeakerData';

import path from "path";
import fs from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  //res.status(200).send(JSON.stringify(speakerData,null,2));

  const method = req?.method;
  const id = parseInt(req?.query.id);
  const recordFromBody = req?.body;
  const jsonFile = path.resolve("./", "db.json");

  switch (method) {
    case "POST":
      await postMethod();
      break;
    case "PUT":
      await putMethod();
      break;
    case "DELETE":
      await deleteMethod();
      break;
    default:
      res.status(501).send(`Method ${method} not implemented`);
      console.log(`Method ${method} not implemented`);
  }

  async function putMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const autozoners = JSON.parse(readFileData).autozoners;
      if (!autozoners) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const newAutozonersArray = autozoners.map(function (rec) {
          return rec.id == id ? recordFromBody : rec;
        });
        writeFile(
          jsonFile,
          JSON.stringify({ autozoners: newAutozonersArray }, null, 2)
        );
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(recordFromBody, null, 2));
        console.log(`PUT /api/autozoners/${id}  status: 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`PUT /api/autozoners/${id}  status: 500 unexpected error`);
      console.log(`PUT /api/autozoners/${id}  status: 200`, e);
    }
  }

  async function deleteMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const autozoners = JSON.parse(readFileData).autozoners;
      if (!autozoners) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const newAutozonersArray = autozoners.filter(function (rec) {
          return rec.id != id;
        });
        writeFile(
          jsonFile,
          JSON.stringify({ autozoners: newAutozonersArray }, null, 2)
        );
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(
          JSON.stringify(
            autozoners.find((rec) => rec.id == id),
            null,
            2
          )
        );
        console.log(`DELETE /api/autozoners/${id}  status: 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`DELETE /api/autozoners/${id}  status: 500 unexpected error`);
      console.log(`DELETE /api/autozoners/${id}  status: 200`, e);
    }
  }

  async function postMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const autozoners = JSON.parse(readFileData).autozoners;
      if (!autozoners) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const idNew =
          autozoners.reduce((accumulator, currentValue) => {
            const idCurrent = parseInt(currentValue.id);
            return idCurrent > accumulator ? idCurrent : accumulator;
          }, 0) + 1;

        const newAutozonerRec = { ...recordFromBody, id: idNew.toString() };

        const newAutozonersArray = [newAutozonerRec, ...autozoners];
        writeFile(
          jsonFile,
          JSON.stringify({ autozoners: newAutozonersArray }, null, 2)
        );
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(newAutozonerRec, null, 2));
        console.log(`POST /api/autozoners/${id}  status: 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`POST /api/autozoners/${id}  status: 500 unexpected error`);
      console.log(`POST /api/autozoners/${id}  status: 200`, e);
    }
  }
}