const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")

const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "Resume PDF must be 3MB or smaller."
            })
        }

        return res.status(400).json({
            message: err.message
        })
    }

    if (err.message === "Only PDF resume files are supported.") {
        return res.status(400).json({
            message: err.message
        })
    }

    console.error(err)

    res.status(500).json({
        message: "Something went wrong on the server."
    })
})



module.exports = app
