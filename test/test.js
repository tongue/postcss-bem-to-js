const postcss = require("postcss");
const path = require("path");
const fs = require("fs");
const plugin = require("../");

const fixturesPath = path.resolve(__dirname, "./fixtures");

const run = (name, opts) => {
  let resultJs;
  const sourceFile = path.join(fixturesPath, "in", `${name}.css`);
  const sourceCss = fs.readFileSync(sourceFile).toString();

  const options = opts || {};

  options.getJs = (_, js) => {
    resultJs = js;
  };

  const plugins = [plugin(options)];
  return postcss(plugins)
    .process(sourceCss, { from: sourceFile })
    .then(result => {
      expect(result.css).toEqual(sourceCss); /* do not transform input */
      expect(resultJs).toMatchSnapshot();
    });
};

it("should handle BEM syntax", () => run("bem"));
