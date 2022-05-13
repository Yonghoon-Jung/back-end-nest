import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    // 로깅 미들웨어
    this.app.use((req, res, next: express.NextFunction) => {
      console.log(req.rawHeaders[1]);
      next();
    });

    // json 미들웨어 추가
    this.app.use(express.json());

    this.setRoute();

    // 경로를 찾지 못했을 경우 에러 핸들링 미들웨어
    this.app.use((req, res, next: express.NextFunction) => {
      res.send({ error: "404 not found error" });
    });
  }

  public listen() {
    const port: number = 8000;

    this.setMiddleware();
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
