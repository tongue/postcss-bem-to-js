/* eslint-disable no-param-reassign */
const jsStringify = require("javascript-stringify");
const prettier = require("prettier");

const toJs = input => {
  const inputAsString = jsStringify(input);
  const jsString = `module.exports = ${inputAsString}`;

  return prettier.format(jsString);
};

module.exports = toJs;
