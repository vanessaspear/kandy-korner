import { CandySearch } from "./CandySearch"
import { CandyList } from "./CandyList"
import { useState } from "react"
import "./candy.css"


export const CandyContainer = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return <>
        <h2 className="candies_title">Satisfy Your Sweet Tooth</h2> 
        <CandySearch setterFunction={ setSearchTerm } />
        <CandyList searchTermState={ searchTerm } />
    </>
}