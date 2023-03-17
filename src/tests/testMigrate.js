const sequelize = require("../utils/connection");
require("../models");
require("../models/Actor");
require("../models/Genre");
require("../models/Director");
require("../models/Movie");

async function main() {
  try{
    await sequelize.sync({force: true});
    process.exit();
  }catch(err) {
    console.error(err);
  }
}

main();
