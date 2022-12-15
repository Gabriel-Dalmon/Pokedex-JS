export const getAllOnPage = async (collection, pageId) => {
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

export const removeFromPokedex = async (pokemon) => {
    fetch('http://localhost:4443/pokedex/remove',{
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            name: pokemon.name
        } )
    })
}


export const deletePokemon = async (pokemon) => {
    removeFromPokedex(pokemon)
    fetch('http://localhost:4443/pokemons/delete',{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json', 
            'Content-type':'application/json',
            'filter':JSON.stringify({
                name: pokemon.name
            })
        }
    });

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

export const updateDocument = async (collection, document, updatedDocument) => {
    if(collection === "pokemons"){
        const formData = new FormData();
        formData.append('file', updatedDocument.imgFile);
        formData.append('data', JSON.stringify({
            get:document,
            set:{
                name:updatedDocument.name,
                types:updatedDocument.types,
            }
        }));
        console.log(formData)
        const response = await fetch('http://localhost:4443/'+collection+'/update',{
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
            },
            body: formData
        });
        return response.json();
    }
}

export const addPokemon = async (name, types, file) => {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({
        name:name,
        types:types
    }));
    console.log(formData)
    const response = await fetch('http://localhost:4443/pokemons/add',{
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
        },
        body: formData
    });
    return response.json();
}


