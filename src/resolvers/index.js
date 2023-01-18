const path = require("path");
const fsPromises = require("fs/promises");
const { readJsonFile, fileExists } = require("../utils/fileHandling");
const crypto = require("node:crypto");
const { graphql, GraphQLError } = require("graphql");
const { json } = require("express");

const catDirectory = path.join(__dirname, "/src/data/projects");

exports.resolvers = {
  Query: {
    getCatbyId: async (_, args) => {
      const catId = args.catId;
      const catFilePath = path.join(catDirectory, `${catId}.json`);

      const catExists = await fileExists(catFilePath);
      if (!catExists) return new GraphQLError("Katten existerar inte");

      const catData = await fsPromises.readFile(catFilePath, {
        encoding: "utf-8",
      });
      const data = JSON.parse(catData);
      return data;
    },

    /*  getAllCats: async (_, args) => {
      const projects = await fsPromises.readdir(catDirectory);
      const promises = [];
      projects.forEach((fileName) => {
        const filePath = path.join(catDirectory, fileName);
        promises.push(readJsonFile(filePath));
      });
      const catData = await Promise.all(promises);
      return catData;
    }, */

    getAllCats: async (_) => {
      let cats = [];
      try {
        const response = await axios.get(process.env.SHEETDB_URI);
        if (response.data.length > 0) {
          cats = response.data;
        }
      } catch (error) {
        console.error(error);
        return new GraphQLError("Ooops... something went wrong!");
      }
      return cats;
    },
  },
};
