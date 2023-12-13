import Article from "../Models/article.js";
import User from "../Models/user.js";
import Admin from "../Models/admin.js"; //imported it so it can be displayed in the database only

class ArticleController {

//Post an article -------------------------------------------------------------------------------
  static async createArticle (req, res) {
    try { 
      let user_id = req.params.id;
      let new_article = new Article(req.body); //an instance of article gotten from body to manipulate it
      new_article.userId = user_id;
      if (req.file) {
        new_article.image_url = req.file.path
      }
      const userId = req.params.userId
      new_article.userId = userId
      console.log(req.body)
      const saved_new_article = await new_article.save(); //saving the manipulated instance to the db
      return res.status(201) //created
      .json({
        data: saved_new_article.toJSON(), //used tojson() to show the data and not the instance details
        status: 201,
        success: true,
        message: "Article added"
      });
    } catch (error) {
      return res.status(500) //internal server error
      .json({
        data: null,
        status: 500,
        success: false,
        message: `Couldn't add the article due to server error: ${error}`,
      });
    }
  }

//get all articls -------------------------------------------------------------------------------
 static async getAllArticles (req, res) {
  try {
    const all_articles = await Article.findAll({include: [User]}); //to get user with the request
    if (all_articles && all_articles.length > 0) { //added an empty array condition since it is considered true by js
      return res.status(200) //ok
      .json({
        data: all_articles,
        status: 200,
        success: true,
        message: "Got all articles"
      });
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `No articles found`,
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get articles due to server error: ${error}`,
    });
  }
}

//get article by id -------------------------------------------------------------------------------
static async getArticleById (req, res) {
  try {
    const { id }= req.params; //put :id in url as parameter
    const requested_article = await Article.findByPk(id, {include:[User]});
    if (requested_article) {
      return res.status(200)
      .json({
        data: requested_article,
        status: 200,
        success: true,
        message: "Requested article is successfully found",
      })
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `There is no article with id: ${id}`,
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get the requested article due to server error: ${error}`,
    });
  }
}

//update article image by id -------------------------------------------------------------------------------
static async changeArticleImage (req, res) {
  try {
    const input_article_id = req.params.id; //put :id in url
    if(req.file) { //-----------------------------------------------------------------first if statement openning
      const [number_of_article_changed_rows_image] = await Article.update({ //we put article rows in array since update() returns an array with updated row numbers
        image_url: req.file.path,
      },{
        where: {
          id: input_article_id,
        },
      });
      if (number_of_article_changed_rows_image > 0) { //-------------------second if statement openning
        res.status(200) //ok
        .json({
          data:null,
          status: 200,
          success: true,
          message: `changed the url of article image successfully to: ${req.file.path}`,
        });
      } else {
          res.status(404) //not found
          .send("article id not found")
        } //----------------------------------------------------------------second if statement closing
    } else {
    return res.status(404).send("Image file not found")
  } //----------------------------------------------------------------------------------first if statement closing
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change image for the chosen article due to server error: ${error}`,
    });
  }
}

//update article by id -------------------------------------------------------------------------------
static async editArticle(req, res) {
  const { id } = req.params;
  const {
  title,
  category,
  body,
  author, 
  } = req.body;
  try {
    const updateArticle = await Article.update(
      {
        title,
        category,
        body,
        author, 
      },
      {
        where: { id: id },
      }
    );
    res.status(200).json({ message: `article updated successfully` });
  } catch (err) {
    res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: err.message,
    });
  }
}

//Delete a article by id ----------------------------------------------------------------------------------------------------
static async deleteArticleByArticleId (req, res) {
  try {
    const article_id_to_delete = req.params.id; // put :id as parameter in the url
    const deleted_article_rows = await Article.destroy({
      where: {
        id: article_id_to_delete,
      }
    })
    if (deleted_article_rows > 0) {
      return res.sendStatus(200)
    } else {
      res.sendStatus(404) //not found
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't delete the chosen article due to server error: ${error}`,
    });
  }
}

}

export default ArticleController;