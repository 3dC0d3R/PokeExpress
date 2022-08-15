class Show extends React.Component {
    render () {
      // Variables can be declared here!
    const pokemon = this.props.passed_To_Show
      return (
        <div>
        <h1> Show Page </h1>
          The {pokemon.name} is {pokemon.img}
          <br></br>
        </div>
        );
      }
    }
    module.exports  = Show;
    
//NOTE: '{Insert_JS_Here}' is used to insert JS into HTML, in other words, JSX!