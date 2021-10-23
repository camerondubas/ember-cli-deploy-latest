"use strict";

module.exports = {
  name: require("./package").name,

  createDeployPlugin: function (options) {
    return {
      name: options.name,

      runAfter: ["s3-index"],

      willActivate(context) {
        const inputRevision = context.commandOptions.revision;
        const hasRevisions = Array.isArray(context.initialRevisions) && context.initialRevisions.length > 0
        const targetLatestRevision =
          inputRevision && inputRevision.toLowerCase() === "latest";

        if (targetLatestRevision && hasRevisions) {
          const reverseChronologicalRevisions = context.initialRevisions.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );

          const latestRevision = reverseChronologicalRevisions[0];

          context.commandOptions.revision = latestRevision.revision;
        }
      },
    };
  },
};
