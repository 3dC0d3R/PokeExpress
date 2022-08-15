const React = require('react');
const img_Size = {width:'400px',height:'400px'}

class Show extends React.Component {
    render () {
      // Variables can be declared here!
    const pokemon = this.props.passed_To_Show
      return (
        <div>
            <h1> Gotta Catch 'Em All </h1>
            <br />
            <h2>{pokemon.name}</h2>
            <br></br>
            <a  href={pokemon.img} ><img src={pokemon.img} alt={pokemon.name} style={img_Size}/></a>
            <nav>
                <a href="/pokemon">Back</a>
            </nav>
        </div>
        );
      }
    }
    module.exports  = Show;

    
    
//NOTE: '{Insert_JS_Here}' is used to insert JS into HTML, in other words, JSX!