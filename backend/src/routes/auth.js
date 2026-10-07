const express = require("express");
const bcrypt = require("bcryptjs");
const prisma = require("../prisma");

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.json({
            message: "User registered successfully!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});
module.exports = router;