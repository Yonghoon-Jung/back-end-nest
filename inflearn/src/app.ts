import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();
const port: number = 8000;

// 로깅 미들웨어
app.use((req, res, next: express.NextFunction) => {
  console.log(req.rawHeaders[1]);
  next();
});

// json 미들웨어 추가
app.use(express.json());

// READ 전체 고양이 데이터 조회
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    // throw new Error("db");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    const cats = Cat.find((cat) => {
      return cat.id === params.id;
    });

    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// CREATE 새로운 고양이 추가
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data);

    res.status(200).send({
      success: true,
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// 경로를 찾지 못했을 경우 에러 핸들링 미들웨어
app.use((req, res, next: express.NextFunction) => {
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
