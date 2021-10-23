'use strict';

module.exports = {
  name: require('./package').name,

  createDeployPlugin: function(options) {
    return {
      name: options.name,

      runAfter: ['s3-index'],

      willActivate(context) {
        const inputRevision = context.commandOptions.revision;
        const targetLatestRevision = inputRevision && inputRevision.toLowerCase() === 'latest';

        if (targetLatestRevision) {
          const latestRevision = context.initialRevisions[0].revision
          context.commandOptions.revision = latestRevision;
        }
      },
    };
  }
};
