import "./candy.css"

export const CandySearch = ({ setterFunction }) => {
    return (
        <div className="search">
            <div className="searchText">What candy are you looking for?</div>
            <input className="searchBar" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Enter Candy Name" />
        </div>
    )
}