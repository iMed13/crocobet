const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000

app.use("/assets", express.static(path.join(__dirname, "../view/assets")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../view/index.html"));
});

app.listen(port, () => console.log("Server running on port " + port));
