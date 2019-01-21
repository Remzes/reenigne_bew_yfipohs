# Repo: reenigne_bew_yfipohs (Web Engineer Challenge - Summer 2019)

Build a web app to search for waste items using the Toronto Waste Wizard database, and save frequently used ones.
Deployed version: https://fierce-fjord-57730.herokuapp.com/

## How to use

Before clicking on the button with some random text in the input field, follow the next guideline:
- The search field can accept 1 to N keywords (or part of them), following by comma ','
- For example, if you type "bin, coffee", it will look for a elements, which at least one of its keywords contains this text (for example, 'bin' can stand for 'garbage bin')
- The result limit is 20, and the elements will come in sorted order depends on the number of matches (for example, the word 'bin' was met 11 times in the keywrods of the element)
- To drop the search line, just clean the input field
- As mentioned in the instructions, the star button is used for managing your Favourite list (stored in MongoDB)
- As also mentioned in the instruction, the list of favourites will apeear only if you choose more than one element

## Technology Stack

 - Front-End: React, Redux, RxJS (Redux-Observable), Webpack, CSS (Scss), Antd (enterprise components system)
 - Back-End: Node.js (Express), mongoose, node-cache
 - Database: MongoDB
 - Packet Manager: Yarn
 - Conterization: Docker, Docker Compose

## Features

- The notification when you add/remove a favourite item
- Welcome to Reactive Programming - all data manipulations are caught by Redux-Observable
- Your data in a safe place - MongoDB
- If you go offlie, the application will let you know that you are in offline, and when you are back!
- Docker will help you keep you Client/Server/Database in a different place
- Retina free - the application will have the same layout and the size regardless the stand-alone platform, which you will chose (but I did not have time to make it compatible with mobile diveces :( )

## Design

![Design](http://cdn.shopify.com/static/web-eng-challenge-summer-2019/design.png)
