## Start!

```
npm install
npm run challenge
```

The following endpoints are available

```
http://localhost:9001/accounts
http://localhost:9001/claims
http://localhost:9001/user
```

For more details about pagination and relationships, see [json-server docs](https://www.npmjs.com/package/json-server)

## Test!

To run the unit tests

```
yarn test:unit
```

Add optional flag `--watch` to avoid running the test in the background. It waits for changes in the file system and
automatically run test once new changes are detected.

```
yarn test:unit --watch
```

## What I have done

I have implemented the solution for the challenge as the instruction stated in the previous version of the README.md.

1. I have implemented the `Dashboard` page. It consists of only the graph and a switch between the `Bar` or `Doughnut` charts types.
2. I have implemented a `Accounts` page that lists the debtors account. The `More` cta button has some tale to tell about the debtor account.
3. Also, implemented an account details page to show full information about the debtor account clicked from the `Accounts` page 
4. Authentication technique which includes sign in and sign out.
   I have harnessed the power of the localStorage to aid my authentication mechanism.
5. Currency formatting.
6. Working and manipulating array of objects.
6. I implemented a sample unit tests of which 2 passes with 1 fail.
7. I have updated the README.md file
8. I have also hosted a live version on the [Github Pages](https://devshittu.github.io/receeve-frontend-challenge) 

### What I still wish to add
1. Vue animation and transition.
2. The Vuex-ORM plugin it makes it really easy working with an array of objects.


###My take-away from this challenge:
I have learnt the cool use of the `json-server` which was very new to me. Sample of implementation can be seen in the codebase.

## How to use
Having clone the repo to your local machine, run this instructions in your terminal:

> yarn challenge

Please swap out the npm for yarn if npm is your preferred package manager.
Then visit this link or copy and paste the following in your browser

````
http://localhost:8080/
````

The implemented solution requires you [Sign in](http://localhost:8080/signin)  to fully see all features built within.
For you to see the full navigation items i.e. the [Dashboard](http://localhost:8080/dashboard) and the [Accounts](http://localhost:8080/accounts) page you need to sign in to gain access. You can
always signin with the following details: 
````
Email: karina@receeve.com 
Password: 12345678
````
Please do note that localStorage api was used in the implementation of the fake authentication mechanism. I am also aware of storing sensitive information in the localstorage which I do not want to do in the real life projects.

I have also hosted a live version on the [Github Pages](https://devshittu.github.io/receeve-frontend-challenge) and can be accessed via the link below.

> https://devshittu.github.io/receeve-frontend-challenge

It's  quite unfortunate that the data (restful points) is not loading as it should.