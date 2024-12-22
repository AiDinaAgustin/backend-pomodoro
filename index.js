const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const fs = require("fs");
const path = require("path");

const authRoute = require("./src/routes/routeAuth");
const pomodoroRoute = require("./src/routes/routePomodoro");
const taskRoute = require("./src/routes/routeTask"); 
const detailTaskRoute = require("./src/routes/routeDetailTask"); 

const prisma = PrismaClient;
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser());

const allowedOrigins = [process.env.PRODUCTION, "http://localhost:3000", "http://localhost:5173"];
// Replace placeholder in swagger.yaml with actual PRODUCTION URL
const swaggerPath = path.join(__dirname, "swagger.yaml");
let swaggerDocument = YAML.load(swaggerPath);

// Ganti placeholder ${PRODUCTION} dengan nilai dari environment
swaggerDocument.servers.forEach((server) => {
  if (server.url) {
    server.url = server.url.replace("${PRODUCTION}", process.env.PRODUCTION);
  }
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
 );

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Swagger setup
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//auth route
app.use(authRoute);
app.use(pomodoroRoute)
app.use(taskRoute); 
app.use(detailTaskRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
