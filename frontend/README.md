# test-yoshi-app

## Install
> Still not sure if you need node v12, it worked for me with v13
yoshi requires node v12, so you have two options: 
- Get node v12.16.2 from [here](https://nodejs.org/en/download/)
- Use [nvm](https://github.com/nvm-sh/nvm): 
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install 12.16.2
```
nvm lets you easily switch node versions ([read more](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/))

Then, just run:
`npm install`

## Usage
`npm start` http://localhost:3000 should open automatically

## Caution
Please don't change anything besides src/

## TODO
- Agree on eslint rules
