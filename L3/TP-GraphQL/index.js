import { ApolloServer } from '@apollo/server';
// Importer des modules pour le serveur HTTP
import { startStandaloneServer } from '@apollo/server/standalone';
 
// Définition du schéma
const typeDefs = `
  type Pokemon {
    name: String!
    url: String!
  }
 
  type Query {
    getAllPokemons: [Pokemon]
    getPokemonByID(id: Int!): Pokemon
  }
`;

// Données pokemons 
async function getPokemon(){
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302");
  const pokemons = await response.json();
  return pokemons.results
}

 
// Resolvers pour fournir les données
const resolvers = {
  Query: {
    getAllPokemons: async () => await getPokemon(),
    getPokemonByID : async (_, { id }) => (await getPokemon())[id]
  },
};
 
// Création du serveur
const server = new ApolloServer({ typeDefs, resolvers });


 
// Démarrage du serveur
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Serveur GraphQL prêt à l'adresse : ${url}`);
});