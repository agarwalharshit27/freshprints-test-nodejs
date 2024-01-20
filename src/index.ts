import express, { ErrorRequestHandler, NextFunction } from "express";
import { config } from "./config";
import { routes } from "./routes";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res: any) => {
//   res.status(200).response({
//     success: true,
//     message: "Apparel updated successfully!",
//   });
// })
// app.use((err: any, req: any, res: any, next: NextFunction): void => {
//   console.log("middleware running")
//   next()
// });


// app.get("/status", (req: any, res: any) => {
//   console.log("reached")
//   res.status(200).end()
// });

app.use("/", routes);

// error handlers
app.use((err: any, req: any, res: any, next: NextFunction) => {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
    desc: err.desc || {}
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port: ${config.port}`)
})