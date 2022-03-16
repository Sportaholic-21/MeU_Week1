import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    return res.render("index")
})
router.get("/product", (req, res) => {
    return res.render("pages/product/index")
})

export { router as webRouter}