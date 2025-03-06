const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler);
const apiRoutes = require("./api/apiRoutes");
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "intro.html"));
});
app.get("/api/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/api/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "aboutus.html"));
});

app.get("/api/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});
app.get("/api/genre1", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre1.html"));
});

app.get("/api/genre3", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre3.html"));
});


app.get("/api/genre", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre.html"));
});
app.get("/api/genre2", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre2.html"));
});

app.get("/api/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
