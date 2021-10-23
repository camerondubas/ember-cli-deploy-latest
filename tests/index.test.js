const index = require("../index");
const cloneDeep = require("lodash.clonedeep");

const daysAgo = (num) => {
  let date = new Date();
  date.setDate(date.getDate() - num);
  return new Date(date);
};

const latestRevision = {
  revision: "1",
  timestamp: daysAgo(1),
};

const contextMock = {
  commandOptions: { revision: "latest" },
  initialRevisions: [
    {
      revision: "3",
      timestamp: daysAgo(3),
    },
    latestRevision,
    {
      revision: "2",
      timestamp: daysAgo(2),
    },
  ],
};

let context;
let plugin;
const options = { name: "test-name" };

beforeEach(() => {
  context = cloneDeep(contextMock);
  plugin = index.createDeployPlugin(options);
});

test("it applies the provided name", () => {
  expect(plugin.name).toBe(options.name);
});

describe("willActivate", () => {
  test("it does nothing if there is no target revision", () => {
    context.commandOptions = {};
    const contextClone = Object.assign({}, context);

    plugin.willActivate(context);

    expect(context).toStrictEqual(contextClone);
  });

  test('it does nothing if the target revision is not "latest"', () => {
    context.commandOptions.revision = "123456";
    const contextClone = cloneDeep(context);

    plugin.willActivate(context);

    expect(context).toStrictEqual(contextClone);
  });

  test("handles empty revision list", () => {
    context.initialRevisions = [];
    const contextClone = cloneDeep(context);

    plugin.willActivate(context);

    expect(context).toStrictEqual(contextClone);
  });

  test('it sets the target revision to the most recent, if the target revision is "latest"', () => {
    plugin.willActivate(context);

    expect(context.commandOptions.revision).toBe(latestRevision.revision);
  });
});
