const path = require("path");
const fsPromises = require("fs/promises");
const { readJsonFile, fileExists } = require("../utils/fileHandling");
const crypto = require("node:crypto");
const { graphql, GraphQLError } = require("graphql");
const { json } = require("express");
const axios = require("axios");

const catDirectory = path.join(__dirname, "/src/data/projects");

exports.resolvers = {
  Query: {
    getCatbyId: async (_, args) => {
      const searchCat = 1;
      fetch(`https://sheetdb.io/api/v1/9bojdg20qf1vr/search?id=${searchCat}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
    },

    getAllCats: async (_) => {
      let cats = [];
      try {
        const response = await axios.get(process.env.SHEETDB_URI);

        // console.log(response);

        if (response.data.length > 0) {
          cats = response.data;
        }

        return cats;
      } catch (error) {
        console.error(error);
        return new GraphQLError("Ooops... something went wrong!");
      }
      return cats;
    },
  },
  Mutation: {
    createCat: async (_, args) => {
      const newCat = {
        id: crypto.randomUUID(),
        name: args.name,
        url: args.url,
      };
      fetch("https://sheetdb.io/api/v1/9bojdg20qf1vr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          data: [newCat],
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      return newCat;
    },
  },
};
