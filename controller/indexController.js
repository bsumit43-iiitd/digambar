const FoodDb = require("../db/index");
class Food {
  constructor() {
    this.foodDb = new FoodDb();
  }

  async getFoodById(id){
    const result = await this.foodDb.getFoodById(id);
    return result;
  }

  async getMacroClass(macroclass) {
    let match = {};
    if (macroclass) {
      const keyword = macroclass;
      const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(
        "(\\b" +
          escapedKeyword +
          "\\b)|(^" +
          escapedKeyword +
          "\\b)|(\\b" +
          escapedKeyword +
          "$)|" +
          escapedKeyword,
        "i"
      );
      match["macroclass"] = { $regex: regex };
    }
    const result = await this.foodDb.getMacroClass(match);
    return result;
  }

  async getCatName(macroclass, catname) {
    let match = {};
    if (catname) {
      const keyword = catname;
      const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(
        "(\\b" +
          escapedKeyword +
          "\\b)|(^" +
          escapedKeyword +
          "\\b)|(\\b" +
          escapedKeyword +
          "$)|" +
          escapedKeyword,
        "i"
      );
      match["catname"] = { $regex: regex };
    }
    if (macroclass) {
      match["macroclass"] = macroclass;
    }
    const result = await this.foodDb.getCatName(match);
    return result;
  }

  async getDescription(macroclass, catname, description) {
    console.log(catname);
    let match = {};
    if (description) {
      const keyword = description;
      const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(
        "(\\b" +
          escapedKeyword +
          "\\b)|(^" +
          escapedKeyword +
          "\\b)|(\\b" +
          escapedKeyword +
          "$)|" +
          escapedKeyword,
        "i"
      );
      match["Main_food_description"] = { $regex: regex };
    }
    if (macroclass) {
      match["macroclass"] = macroclass;
    }
    if (catname) {
      match["catname"] = catname;
    }
    const result = await this.foodDb.getDescription(match);
    return result;
  }

  async getSearchResult(category, novaclass, nutrients, type, page, pageSize) {
    let match = {};
    if (type == "category" || type == "advanced") {
      if (category?.["macroclass"]) {
        match["macroclass"] = category?.["macroclass"];
      }
      if (category?.["catname"]) {
        match["catname"] = category?.["catname"];
      }
      if (category?.["Main_food_description"]) {
        match["Main_food_description"] = category?.["Main_food_description"];
      }
    }
    if (type == "novaclass" || type == "advanced") {
      if (novaclass) match["novaclass"] = { $in: novaclass || [1] };
    }
    if (type == "nutrients" || type == "advanced") {
      if (nutrients)
        Object.keys(nutrients)?.forEach((item) => {
          match[item] = {
            $gte: nutrients?.[item]?.[0],
            $lte: nutrients?.[item]?.[1]
          };
        });
    }
    const result = await this.foodDb.getSearchResult(match, page, pageSize);
    return result;
  }
}

module.exports = Food;
