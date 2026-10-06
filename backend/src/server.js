require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});

app.get("/test-db", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json({
            message: "Database connection works!",
            users
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});