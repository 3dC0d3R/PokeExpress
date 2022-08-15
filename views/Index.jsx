const React = require('react');
const myStyle = {
    color: '#000000',
    backgroundColor: '#ffffff',
  };
const img_Size = {width:'128px',height:'128px'};

    class Index extends React.Component {
      render() {
          const pokemon  = this.props.passed_To_Index
          return (
                  <div style={myStyle}>
                      <h1>pokemon Index Page</h1>
                      <ul>
                          {pokemon.map((pokemon, i) => {
                              return (
                                  <li>
                                      <a href={`/pokemon/${i}`}>
                                          {pokemon.name}
                                      </a>
                                      <br></br>
                                      <img src={pokemon.img} alt={pokemon.name} style={img_Size}></img>
                                  </li>
                              );
                          })}
                      </ul>
                    {/* <nav>
                        <a href="/pokemon/new">Create a New pokemon</a>
                    </nav> */}
                  </div>
          );
      }
    }
    module.exports = Index;
