const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyPareser = require("body-parser");
const conn = require("./DataBase/connections");
const employeeRouter = require("./Routes/employee");
const buyerRouter = require("./Routes/buyer");
const UserRouter = require("./Routes/user");
const FileRouter = require("./Routes/file");
const MessageRouter = require("./Routes/message");
const SellerRouter = require("./Routes/seller");
const CompanyRouter = require("./Routes/company");
const TokenRouter = require("./Routes/token");
const LookupRouter = require("./Routes/lookup");
const PropertyRouter = require("./Routes/property");
const ReportRouter = require("./Routes/report");
const GenaralReportRouter = require("./Routes/GenralReport");
const PropertyReportRouter = require("./Routes/propertyreport");
const ContacUsReportReportRouter = require("./Routes/ContacUsReport");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyPareser.urlencoded({ extended: false }));
app.use(bodyPareser.json());

const knex = conn.openConnection();
app.locals.knex = knex;

app.use("/employee", employeeRouter);
app.use("/buyer", buyerRouter);
app.use("/seller", SellerRouter);
app.use("/company", CompanyRouter);
app.use("/report", ReportRouter);
app.use("/token", TokenRouter);
app.use("/lookup", LookupRouter);
app.use("/property", PropertyRouter);
app.use("/user", UserRouter);
app.use("/file", FileRouter);
app.use("/message", MessageRouter);
app.use("/GenaralReportRouter", GenaralReportRouter);
app.use("/PropertyReportRouter", PropertyReportRouter);
app.use("/ContacUsReportReportRouter", ContacUsReportReportRouter);
app.use((req, res, next) => {
  const error = new Error("Page not Found");
  error.status = 404;
  next(error);
});

app.use((req, res, next) => {
  session({
    resave: true,
    saveUninitialized: true,
    secret: "yash is a super star",
    cookie: { secure: false, maxAge: 14400000 },
  });
});



app.use((error, req, res, next) => {
  if (error.status == 404) {
    res.status(404).json({
      status: "error",
      msg: "Page not Found",
    });
  } else {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "500 internal server error",
    });
  }
});

module.exports = app;
