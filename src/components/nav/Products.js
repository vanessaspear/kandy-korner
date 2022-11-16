import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const Products = () => {

    //Initialize state to an empty array
    const [product, setProduct] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [topPricedProd, setTopPricedProd] = useState(false)

    //Observe product state and set it equal to the products array from the api
    useEffect (
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
                .then( res => res.json())
                .then( (productArray) => {
                    setProduct(productArray)
                    setFiltered(productArray)
                })
        },
        []
    )

    //Sort products in alphabetical order by product name 
    //const productAscending = [...product].sort((a,b) => a.name > b.name ? 1 : -1)

    //Observe if employee wants to view the top priced products only
    useEffect(
        () => {
            if (topPricedProd) {
                const topProducts = product.filter(prod => {
                    return prod.price > 2;
                })
                setFiltered(topProducts)
            } else {
                setFiltered(product)        
            }
        },
        [topPricedProd]
    )

    const navigate = useNavigate()

    //Return the JSX output for the products page 
    return <>
        
        <div className="products">

        <h2 className="products_title">Products</h2> 

        {
            <div className="btn_products">
                <button className="btn_products_type" onClick={() => {setTopPricedProd(true)}}>Top Priced</button>
                <button className="btn_products_type" onClick={() => {setTopPricedProd(false)}}>All Products</button>
                <button className="btn_products_type" onClick={() => navigate("/product/create")}>Create Product</button>
            </div>
  
        }   

        <div className="products_container">
        {
            filteredProducts.map(prod => {
                return <div className="product" key={`product--${prod.id}`}>
                    <header>{prod.name}</header>
                    <div>Category: {prod.productType.category}</div>
                    <div>Price: ${prod.price}</div>
                </div>
            })
        }
        </div>

        </div>
    </>

}