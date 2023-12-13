import ArticleController from "../Controllers/articleController.js";
import express from "express";
// import {upload} from "../Config/cloudinary.js";

const articleRouter = express.Router();

//Create ------------------------------------------------------------------------------
articleRouter.post("/post/:id", /*upload.single('image_url'),*/ ArticleController.createArticle);
//Read --------------------------------------------------------------------------------
articleRouter.get("/getAll",ArticleController.getAllArticles);
articleRouter.get("/getById/:id", ArticleController.getArticleById);
//Update ------------------------------------------------------------------------------
articleRouter.put('/:id', ArticleController.editArticle);
articleRouter.put("/changeImage/:id", /*upload.single('image_url'),*/ ArticleController.changeArticleImage);
//Delete ------------------------------------------------------------------------------
articleRouter.delete("/deleteByName/:id",ArticleController.deleteArticleByArticleId);

export default articleRouter;