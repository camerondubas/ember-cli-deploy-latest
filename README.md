# ember-cli-deploy-latest &middot; [![License](https://img.shields.io/npm/l/ember-cli-deploy-latest)](https://github.com/camerondubas/ember-cli-deploy-latest/blob/cfcbc9e95a153381981877a73f2d6beb53321bb0/LICENSE.md) [![NPM Version](https://img.shields.io/npm/v/ember-cli-deploy-latest)](https://www.npmjs.com/package/ember-cli-deploy-latest) [![CircleCI Status](https://circleci.com/gh/camerondubas/ember-cli-deploy-latest.svg?style=shield)](https://app.circleci.com/pipelines/github/camerondubas/ember-cli-deploy-latest)

An ember-cli-deploy plugin that allows activating the latest existing revision

> Note: This addon is early in development and is pre-1.0 release.
> It has not been heavily tested in production and there may be breaking changes in the future pre-1.0 versions.

## Compatibility

- Ember-CLI-Deploy >= 1.0.0

## Installation

```
yarn add --dev ember-cli-deploy-latest
```

## Usage

```bash
ember deploy:acticvate <environment> --revision latest
```

When running the `activate` command, this addon allows passing the keyword "latest"
as the revision key to indicate that the most recent deploy should be activated.

This avoids needing to find and provided the revision key in a seperate step
when you know you want to activate the most recent deploy.

### How it works

During ember-cli-deploy's `willActivate` hook the list of revisions is first sorted
by date. The most recent deploy's revision key is then used to substitute the
"latest" keyword passed into the inital command.

This way, the proper revision key is passed to the `activate` hook
which should be implemented by another ember-cli-deploy, like [ember-cli-deploy-s3-index](https://github.com/ember-cli-deploy/ember-cli-deploy-s3-index),
for activating that revision.

## Testing

```bash
yarn test
```

## Linting

```bash
yarn lint
```

## License

This project is licensed under the [MIT License](LICENSE.md).
