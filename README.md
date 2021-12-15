# TopCoder Webcrawler

Project created to crawl the web page profile of [TopCoder](https://www.topcoder.com/) user's and from there retrieve their respective [GitHub](https://github.com/) and [StackOverflow](https://stackoverflow.com/) username's if available.

## Used technologies:
- JavaScript ES6
- [Node.js](https://nodejs.org/)

## How to run?
- Clone this repository.
- Run `yarn install` to install dependencies.
- Run `node server.js` to start server.
- Open [http://localhost:3000/](http://localhost:3000/)
- Routes:
    - GET: `http://localhost:3000/:handle`
    - (Replace `:handle` with the TopCoder user's handle)