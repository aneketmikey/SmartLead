import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import routes from "./routes/routes.js";;
import sequelize from "./config/db.js";;
import swaggerUI from 'swagger-ui-express';
import YAML from "yamljs";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"; 
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1", routes); //Base Route

//load swagger docs
const swaggerAPIdocs = YAML.load('./docs/api-docs.yaml') 

//swagger docs routes
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerAPIdocs));

app.use(notFound); //to handle undefined routes
app.use(errorHandler);

//sync database
sequelize
  .sync({force:true})   //for the first time to make tables in the DB
 // .authenticate()  //we use it to authenticate after the first time the tables has been made
  .then((result) => {
    console.log("Database connected");   
    app.listen(PORT);   // accept incoming requests only after the connection with the DB is established
  })
  .catch((err) => console.log(err));
