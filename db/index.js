const util = require("util");
const mongoClient = require("../utils/connectDb");
const { ObjectId } = require("mongodb");

class FoodDb {
  constructor(context) {
    this.context = context;
  }

  async getMacroClass(match) {
    try {
      const client = await mongoClient.getDb();
      const collection = client
        .db("test")
        .collection("test");

      const result = await collection
        .aggregate([
          { $match: match },
          { $group: { _id: "$macroclass" } },
          { $limit: 100 }
        ])
        .toArray();

      const uniqueStrings = result.map((item) => item._id);
      return uniqueStrings;
    } catch (err) {
      console.log(
        `Error while fetching dictionary mapping: \n${util.inspect(
          err,
          null,
          null
        )}`
      );
    }
  }

  }

module.exports = FoodDb;
