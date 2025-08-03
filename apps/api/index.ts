
import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "store/client";
import { AuthInput, LoginInput } from "./types";
import { authMiddleware } from "./middleware";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());

app.post("/website", authMiddleware, async(req, res) => {
  if (!req.body.url) {
    res.status(411).json({});
  }
   const website =  await prismaClient.website.create({
    data: {
      url: req.body.url,
      timeAdded: new Date(),
      user_id: req.userId!
    }
  })
  res.json({
    id: website.id
  })
});


app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/status/:websiteId", authMiddleware, async (req, res) => {
  const website = await prismaClient.website.findFirst({
    where: {
      user_id: req.userId!,
      id: req.params.websiteId
    },
    include: {
      ticks: {
        orderBy: [{ id: 'desc' }],
        take: 10
      }
    }
  });

  if (!website) {
    res.status(409).json({ message: "Not found" });
    return;
  }

  res.json({
    url: website.url,
    id: website.id
  });
});


app.post("/user/signup", async (req, res)=> {
  const data = AuthInput.safeParse(req.body);
  if (!data.success) {
    res.status(403).send("");
    return;
  }

  try{
  let user = await prismaClient.user.create({
    data: {
      name: data.data.name,
      username: data.data.username,
      password: data.data.password
    }
  })
  res.send({
  id: user.id 
})
} catch (e) {
  res.status(403).send("");
}
})

app.post("/user/login", async (req, res) =>{
  const data = LoginInput.safeParse(req.body);
  if (!data.success) {
    res.status(403).send("");
    return;
  }
  let user = await prismaClient.user.findFirst({
    where: {
    username: data.data.username,
    }
  })
  if (user?.password !== data.data.password) {
    res.status(403).send("");
    return;
  }
  let token = jwt.sign({
    sub: user?.id || ""
  },
process.env.JWT_SECRET!)

res.json({
  token: token
})
})


app.get("/website", authMiddleware, async (req, res) => {
 const website = await prismaClient.website.findMany({
    where: {
      user_id: req.userId
    },
    include: {
      ticks: {
        orderBy: [{ id: 'desc' }],
        take: 1
      }
    }
  })
  res.json({
    websites: website
  })
})

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});