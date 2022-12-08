function PokeBox(props) {
    {/* typeList may be removed in the future once the type collection is ready? */}
    const typeList = [
        "normal",
        "grass",
        "fire",
        "water",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dark",
        "dragon",
        "steel",
        "fairy",
    ]
    let type1=props.type1
    let type2=props.type2
    if (!typeList.includes(props.type1)) {
        type1="other"
    }
    if (!typeList.includes(props.type2)) {
        type2="other"
    }
    return (<div className='pokebox'>
                <div className='top-box'>
                    <div className='img'>
                        <img src={props.img}/>
                    </div>
                </div>
                <div className='bottom-box'>
                    <h2>{props.name}</h2>
                    <div className='sep'></div>
                    <div className='types'>
                        <p className={'type '+type1}>{props.type1}</p>
                        <p className={'type '+type2}>{props.type2}</p>
                    </div>
                </div>
            </div>)
}

export default PokeBox;