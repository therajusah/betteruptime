
import express from "express";
// import v1Router from './routes/v1';
import { prismaClient } from "store/client";


const app = express();

app.use(express.json());
// app.use("api/v1", v1Router);

app.get("/website", async(req, res) => {
   const website =  await prismaClient.website.create({
    data: {
      url: req.body.url,
      timeAdded: new Date()
    }
  })




  res.send("Hello World");
});


app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/status/:websiteId", (req, res) => {
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});