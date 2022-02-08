# [Money balance pwa-app in react](https://money-balance.vercel.app)

## Why I build this app?
I wanted to track my outcomes/incomes of money on my own style, with graphs, a time line and a history with a list of transactions(timestamp, description, amount)
but I did not want to link my banck accounts to the app.

## What did I use to build this app?
- React as main front-end library
- Firebase as database, authentication tool
- React query to manage the data state, refetch actions
- React context to manage the state of the authentication
- React-router-dom
- React Material as UI library
- Vercel as Hosting service provider

## Steps to use this app locally
1. Clone repo
2. Create your own project at firebase console
    1. Enable google-auth
3. Create a `local.env` file with the next template
```
REACT_APP_apiKey=
REACT_APP_authDomain=
REACT_APP_projectId=
REACT_APP_storageBucket=
REACT_APP_messagingSenderId=
REACT_APP_appId=
REACT_APP_measurementId=
REACT_APP_PUBLIC_URL=
```
4. Run `npm -i`
5. Run `npm start`

## Todos
[To-do list at my notion page](https://petalite-mammal-fac.notion.site/To-do-money-balance-f14dbf46c2b84e5293d0ba4f23d74209)