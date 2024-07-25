const express = require("express");
const { catchErrors } = require("../utils/custom-helpers");
const Router = express.Router({ caseSensitive: true });

const Food = require("../controller/indexController");
const food = new Food();



Router.post(
  "/search",
  catchErrors(async (req, res) => {
    // let { page, pageSize } = req.query;
    // let { category, novaclass, nutrients, type } = req.body;
    // const result = await food.getSearchResult(
    //   category,
    //   novaclass,
    //   nutrients,
    //   type || "advanced",
    //   Number(page) || 0,
    //   Number(pageSize) || 20
    // );
    const response = {
      success: "true",
      message: "Food fetched successfully.",
      payload: "result"
    };
    res.status(200).send(response);
  })
);

module.exports = Router;
