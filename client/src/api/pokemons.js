export const getAllOnPage = async (pageId) => {
    const response = await fetch(
        'http://localhost:4443/pokemons/list', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                page: pageId
            })
        }
    )
    const pokemons = await response.json()
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

export const getCollectionLength = async (collection) => {
    const response = await fetch('http://localhost:4443/collection/length',{
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            collection: collection
        })
    });
    const length = await response.json();
    return length;
}