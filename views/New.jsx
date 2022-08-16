const React = require('react');

class New extends React.Component {
  render() {
    return (//NOTE: <form action> will be the route, <form method> will be the HTTP verb
        <div> 
            <h1>Add New Pokemon</h1>
            <form action="/pokemon" method="POST"> 
              Name: <input type="text" name="name" /><br/>
              Img URL: <input type="text" name="img" /><br/>
              <input type="submit" name="" value="Create Pokemon"/>
            </form>
        </div>);
    }
  }// The /fruits route accesses the array stored inside of ./models/fruits_File_Name.jsx, using the ./views/Index.jsx file. However, you will need a route handler usind Middleware.

module.exports = New;