import { useEffect, useState } from "react"
import "./candy.css"

export const CandyList = ({ searchTermState }) => {

    const [products, setProduct] = useState([])
    const [searchedProducts, setSearchedProduct] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(res => res.json())
                .then( 
                    productsArray => {
                        setProduct(productsArray)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            const searchedProducts = products.filter(
                product => {
                    return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
                }
            )
            setSearchedProduct(searchedProducts)
        },
        [searchTermState]
    )

    return <>
        {
            searchedProducts.map( product => {
                    return <article className="candies">
                        <section className="candy" key={`candy--${product.id}`}>
                            <header>{product.name}</header>
                            <footer>Price: ${product.price}</footer>
                        </section>
                    </article>
                }
            )
        }
    </>
}