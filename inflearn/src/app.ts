import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();
const port: number = 8000;

// 로깅 미들웨어
app.use((req, res, next: express.NextFunction) => {
  console.log(req.rawHeaders[1]);
  next();
});

// json 미들웨어 추가
app.use(express.json());

app.use(catsRouter);

// 경로를 찾지 못했을 경우 에러 핸들링 미들웨어
app.use((req, res, next: express.NextFunction) => {
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
