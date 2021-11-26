# Phaser on Heroku
## Installation
### Local
To setup a local install perform the following steps:

    git clone [this]
    cd [this]
    npm install
    npm update
    npm run build
    npm run start

### Heroku
When using this project as a template you must run `set-buildpacks.bat` to properly configure your Heroku Dyno.
Once you have created a git repository locally the following commands need to be run on your local station to configure the heroku dyno and perform your initial install.

    heroku create
    set-buildpacks.bat
    git push heroku
