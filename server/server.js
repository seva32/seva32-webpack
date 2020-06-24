/* eslint-disable no-console */
import dotenv from "dotenv";
import express from "express";
import cookiesMiddleware from "universal-cookie-express";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Loadable from "react-loadable";
import logger from "./middleware/logger";
import { devMiddleware, hotMiddleware } from "./middleware/webpack";
import router from "./router/router";

dotenv.config({ silent: true });

mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.set("x-powered-by", false);

app.use(compression());
app.use(logger);
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static("build", {
      index: false,
      // etag: false
    })
  );
} else {
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

app.use(cookiesMiddleware());

router(app);

Loadable.preloadAll()
  .then(() => {
    const server = app.listen(process.env.PORT || 8080, () => {
      console.log(
        "Express started at http://localhost:%d\n",
        server.address().port
      );
      if (process.env.NODE_ENV !== "production") {
        console.log("Waiting for webpack...\n");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
