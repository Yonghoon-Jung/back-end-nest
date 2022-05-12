import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();
const port: number = 8000;

app.use((req, res, next: express.NextFunction) => {
  console.log(req.rawHeaders[1]);
  next();
});

app.get("/cats/som", (req, res, next) => {
  console.log("som middleware");
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.get("/cats/blue", (req, res) => {
  res.send({ blue: Cat[0] });
});

app.get("/cats/som", (req, res) => {
  res.send({ som: Cat[1] });
});

// 경로를 찾지 못했을 경우 에러 핸들링 미들웨어
app.use((req, res, next: express.NextFunction) => {
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
