export const getAll = async () => {
    const response = await fetch(
        'http://localhost:4443/pokemon/list', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            }
        }
    )
    const pokemons = await response.json()
    console.log(pokemons)
    return pokemons
}

export const addToPokedex = async (pokemon) => {
    fetch('http://localhost:4443/pokedex/add',{
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            username: "devtest-user",
            name: pokemon.name,
            img: pokemon.img,
            types: pokemon.types
        } )
    })
}