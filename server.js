/* ---> Following steps outline the process to create apps using node.js, express(), hosted in Heroku

// Bash (command) Terminal commands!
  // Copy this file into server.js inside of the project directory. 
      // “touch" and “mkdir" means “create” -Look them up...

STEPS: 
  // Type the following commands into a bach terminal. 
-01. mkdir project_Directory && cd project_Directory
    //Create folder to  house Application files. 
-02. touch "create" server.js
-03. npm init -y
-04. npm i express 
  //Install the Express Module. (See A.2, & B. below)

-05. npm i dotenv
  //Install the dotenv module , used for privacy purposes. (See A.1)

-06. touch .env
  //on the same level of server.js and add variables: PORT=3000. no spaces, no commas, no semi-colons. If you have a second variable, you would put it on the next line. (See C. below)

-07. touch .gitignore
  //add node_modules and .env, and anything you want ignored by github

//---------------^^^MODEL^^^----------------------------->
-08. mkdir models 
-09. touch data_Var_Name.js 
  //at the bottom of file add: "module.exports = data_Var_Name"; 'data_Var_Name' is the same name as the variable declared in server.js(see A.4 below). This allows us to export the internal data to an external file. The purpose of this folder and js file is to separate the data such as arrays, objects, classes, and variables that would normally live in your "/main server.js" file. Ofcourse, this is in effort to keep our code modular "separation of responsibilites," and cleanly formatted.

-----^^^Sample Data Model: fruits_File_Name.js^^^-------->
    const fruits = [
        {
            name:'apple',
            color: 'red',
            readyToEat: true
        },
        {
            name:'pear',
            color: 'green',
            readyToEat: false
        },
        {
            name:'banana',
            color: 'yellow',
            readyToEat: true
        }
    ];
    module.exports = fruits;

-----^^^Sample Route for fruits_File_Name.js^^^---------->
  Require fruits_File_Name.js in the original server.js
  Place this in Section A.
    const fruits = require('./models/fruits_File_Name.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package

    
    
//---------------^^^VIEWS^^^----------------------------->

-10. npm i express-react-views react@16 react-dom@16 --save 
  //Installs 'EXPRESS React Views, react, react-dom' (This will let us make our pages appear in the dom),this is a templating library that allows us to mix data into our html. The HTML will change based on the data! (See D) lesson: Mod2 W1 D4

-11. mkdir views
  // Same concept as the 'models' folder, but used for VIEW rendering, in other words, you're formatting the HTML pages to be displayed. Multiple .jsx files can be housed in the 'views' directory in order to render differect webpage templates.

-12. touch ./views/View_File_Name.jsx in the views directory => 
  //Where 'View_File_Name.jsx' = name of desired view template file, you may have as many as files as needed with different names. This file is called by the VIEWS Rendering Engine installed in Step 10, and Created in Section D. lesson: Mod2 W1 D4

------^^^Sample Template: Show.jsx^^^--------------->
      // inside .jsx file:
        //This is an example on how to access the data in the models folder from a views template.
                    
          class Show extends React.Component {
            render () {
              // Variables can be declared here!
            const fruits9 = this.props.fruits_File_Name
              return (
                <div>
                <h1> Show Page </h1>
                  The {fruits9.name} is {fruits9.color}
                  <br></br>
                  {fruits9.readyToEat? 'It is ready to eat' : 'It is not ready to eat... Cant touch this' }
                </div>
                );
              }
            }
            module.exports  = Show;
            
  //NOTE: '{Insert_JS_Here}' is used to insert JS into HTML, in other words, JSX!

------^^^Sample Template: Index.jsx^^^--------------->
const React = require('react');

    class Index extends React.Component {
      render() {
          const fruits_InsideIndex  = this.props.passed_To_Index
          return (
                  <div>
                      <h1>fruits_InsideIndex Index Page</h1>
                      <ul>
                          {fruits_InsideIndex.map((fruit, i) => {
                              return (
                                  <li>
                                      The{' '}
                                      <a href={`/fruits_InsideIndex/${i}`}>
                                          {fruit.name}
                                      </a>{' '}
                                      is {fruit.color} <br></br>
                                      {fruit.readyToEat
                                          ? `It is ready to eat`
                                          : `It is not ready to eat`}
                                      <br />
                                  </li>
                              );
                          })}
                      </ul>
                    <nav>
                        <a href="/fruits/new">Create a New Fruit</a>
                    </nav>
                  </div>
          );
      }
    }
    module.exports = Index;

------^^^Sample Template: New.jsx^^^--------------->

const React = require('react');

class New extends React.Component {
  render() {
    return (//NOTE: <form action> will be the route, <form method> will be the HTTP verb
        <div> 
            <h1>New Fruit page</h1>
            <form action="/fruits" method="POST"> 
              Name: <input type="text" name="name" /><br/>
              Color: <input type="text" name="color" /><br/>
              Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
              <input type="submit" name="" value="Create Fruit"/>
            </form>
        </div>);
    }
  }// The /fruits route accesses the array stored inside of ./models/fruits_File_Name.jsx, using the ./views/Index.jsx file. However, you will need a route handler and the use of middleware (Section F).

module.exports = New;
---------------------------------------------------->

-13. Define middleware
  // paste "app.use(express.urlencoded({extended:false}));" in Section F.
  // It runs in the middle of the request response cycle (in the middle)
sometime after the request is received, but before the final route handler is called. Be sure to put middleware at the top of your server.js file, so that other routes don't handle the request and send the response before the middleware can be executed. Most of the time, you won't write your own middleware, but a lot of plugins and extended functionality of express exist as middleware!

-14. Create Routes
 // Paste the following samples into section G. 

//-----^^^Sample GET Route to fruits_File_Name.js^^^---------->
    app.get('/fruits', function(req, res){
        res.render('Index', { passed_To_Index: data_Var_Name }); // The object 'passed_To_Index:' is assigned the value of the variable 'data_Var_Name', and then it is passed to ./views/Index.jsx, for data proccessing instructions using jsx inside of the Index.jsx file. 
    });

    //From Mod2 Week1 Day 2: URL and Query Parameters: Using Data.
    //NOTE: By putting javascript inside of curly braces React knows you want to execute js

          app.get('/fruits/:indexOfFruitsArray', function(req, res){
        res.render('Show', { 
            passed_To_Show: data_Var_Name[req.params.indexOfFruitsArray] // React JS knows to look for data stored in ./models/fruits_File_Name.jsx, because we declared data_Var_Name in Section A.4. 
        });
    });
    -Second param must be an OBJECT:        
    'passed_To_Show:' is the OBJECT. Assigned to this object, is the stored value of the array index of 'data_Var_Name'. 
        Think of it as: 
    let i = req.params.indexOfFruitsArray
    let 'passed_To_Show:' = data_Var_Name[i]
        Where, 'req.params.indexOfFruitsArray' = The user input at the url path ./fruits/:indexOfFruitsArray.


//-----^^^Sample POST Route to fruits_File_Name.js^^^---------->
    // Used with NEW route and dependant on middleware "urlencoded"
    app.post('/fruits', (req, res)=>{
        if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
            req.body.readyToEat = true; //do some data correction
        } else { //if not checked, req.body.readyToEat is undefined
            req.body.readyToEat = false; //do some data correction
        }
        data_Var_Name.push(req.body); // Pushes the data collected form the route '/fruits/new' to ./models/fruit_File_Nm
        console.log(data_Var_Name);
        res.redirect('/fruits'); //send the user back to /fruits

    });

//-----^^^Sample NEW Route to fruits_File_Name.js^^^---------->
// Used with above POST route
        app.get('/fruits/new', (req, res) => {
        res.render('New', {}); // This will allow the user to add data to the array stored in ./models/fruits_File_Name.js using ./views/New.jsx. 
    });





    GitHub commands
    --------------- 
1. Navigate to project directory!
2. git init  
  //Initialize the local directory as a Git  repository.
3. git add .
  //Adds the files in the local repository and stages them for commit. To unstage a file, use 'git reset HEAD YOUR-FILE'.
4.  commit -m 'Added my projectgit'
  //Commits the tracked changes and prepares them to be pushed to a remote repository. To remove this commit and modify the file, use 'git reset --soft HEAD~1' and commit and add the file again.
5. git remote add origin git@g3dC0d3R/m2w1d3_First_Express_HW.git
  //Sets the new remote
6. git remote -v 
  //Verifies the new remote URL
6. git push -u -f origin main
  //Pushes the changes in your local repository up to the remote repository you specified as the origin. The -f (or --force) flag stands for force. This will automatically overwrite everything in the remote directory.  
*/

//--------------^^^CONTROLLER^^^---------->
      //The following code belongs in server.js. -Rename this file, or Save As: 'server.js'

  // A. ---> Require Modules
    // A.1  // Link .env file. (See step 05.)
    require('dotenv').config() 
    
    // A.2  // Load express (See step 04.)
    const express = require('express')

    // A.3  // this engine requires the fs module
    const fs = require('fs')

    // A.4  // Imports value of 'module.exports = data_Var_Name' (See step 08.)
    const data_Var_Name = require('./models/pokemon.js') 

  // B. ---> Create the Express app
    const app = express(); //app is an object. (see step 04.)


  // C. ---> Declare environment variables.
    const port = process.env.PORT // Links PORT variable from .env file. (See A.1)


  // D. ---> Create views engine  // (See step 10.)
    app.engine("jsx", require("express-react-views").createEngine()); 


  // E. ---> Configure the app (app.set)
    app.set("view engine", "jsx"); // (See D)


  // F. ---> Mount middleware (app.use)
    app.use(express.urlencoded({ extended: true }));

    
  // G. ---> Mount routes (app.get)
    
    // Home Page
      // touch /views/Home.jsx, Replace 'View_File_Name' with 'Home'
    app.get('/', function(req, res){
      res.render('Home',{});
    });


  // H. ---> Listen on port defined in .env (See C.)
  app.listen(port, function() {
  console.log('Listening on port: ' + port);
  });