import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Serve static HTML file
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
