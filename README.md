# ourhandsandfeet
[![CircleCI](https://circleci.com/gh/UltimatePromotions/ourhandsandfeet.svg?style=svg)](https://circleci.com/gh/UltimatePromotions/ourhandsandfeet)

## Helping Charities find volunteers

This is the frontend for the ourhandsandfeet website. Here are the steps to get the development version running. First, you should probably check the <a href="https://docs.google.com/document/d/1_QDDbqmBrJuGqBoib59fmgYtls03dAXXuLqRR5roPO4/edit">"Getting started"</a> document to make sure you have all of the necessary prerequisites installed.

Clone this repository into a directory of your choice from the terminal using "git clone [url of this repository]
Install and use the version of nodejs currently listing in our package.json<br>
From the same directory, run <b>npm install</b><br>
Install bower globally with the command <b>npm install bower -g</b><br>
Run <b>bower install</b><br>

Run <b>npm start</b>
Install the <b>Aurelia Inspector</b> Chrome extension to allow debugging of the font end code.

Now, open your browser and go to <b>localhost:9000</b>

If all goes well, the webpage should be running correctly.

Note that you will not be able to use the "Login" feature of the website unless you also run the backend server.

When working on unit tests, use the command <b>npm run test:debug</b><br>
This will run the tests in continous mode and launch a Chrome browser with Karma debugging enabled.

Use the command, <b>npm run build:prod</b><br>
and then <b>npm run:server prod</b><br>
This builds the <b>dist</b> folder, and must be done prior to pushing new code into GitHub.<br>
Open a browser at <b>localhost:8080</b> to view the production server and dist folder.
