const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
