# frontend

## Install

Install npm modules:
`npm install`
Create file for secrets:
`echo "{}" > dev/velocity.private.data.json`

> If you're having npm-related issues, try using node v12

To use node v12, so you have two options: 
- Get node v12.16.2 from [here](https://nodejs.org/en/download/)
- Use [nvm](https://github.com/nvm-sh/nvm) if you're on OSX/Linux. nvm lets you easily switch node versions ([read more](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/))
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install 12.16.2
```

## Usage
`npm start` http://localhost:3000 should open automatically

## UI Lib storybook
[here](https://wix-style-react.now.sh/?path=/story/introduction-getting-started--getting-started)

## Caution
Please don't change anything besides src/

## TODO
- Agree on eslint rules
