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