# Les Choux d'à Côté

Classified food ads.
[leschouxdacote.fr](https://leschouxdacote.fr/)

## Requirements

- [Node](https://nodejs.org/) v10.13+
- [Yarn](https://yarnpkg.com/)

## Config

    cp {example,}.env

## Commands

- `yarn dev`: start development mode
- `yarn lint`: check linting (Eslint + Prettier)
- `yarn build`: make production bundle

## Crontab

```
MAILTO="tech@leschouxdacote.fr"
NODE_ENV=production

# m h dom mon dow command

0 * * * * curl --silent --show-error --fail --data "{}" -H "x-trigger: crontab" https://leschouxdacote.fr/api/alerts > /dev/null
```
