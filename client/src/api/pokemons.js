export const getAllOnPage = async (collection, pageId) => {
    console.log('http://localhost:4443/'+collection+'/list')
    const response = await fetch(
        'http://localhost:4443/'+collection+'/list', {
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

export const getAll = async (collection) => {
    console.log('http://localhost:4443/'+collection+'/listAll')
    const response = await fetch(
        'http://localhost:4443/'+collection+'/listAll', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            }
        }
    )
    const documents = await response.json()
    return documents
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