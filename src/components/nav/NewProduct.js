/*
New Product form: 

Fields: 
-product name
    -check to see if product name already exists
-product type 
    -create new product types if needed
-product price 
    -only accept numbers
-logged-in user
-submit button 
    -re-route to product list page

*/

import { useNavigate } from "react-router-dom" 
import { useState } from "react"
import { useEffect } from "react"

export const NewProduct = () => {

//Add the correct default properties to the initial state object
const [product, setProduct] = useState({
    name: "",
    productType: "",
    price: ""
})

const [productTypes, setProductTypes] = useState([])

useEffect (
    () => {
        fetch(`http://localhost:8088/productTypes`)
            .then( res => res.json())
            .then( productTypesArray => {
                setProductTypes(productTypesArray)
            })
    },
    [productTypes]
)

//Use the useNavigation() hook so you can redirect the user to the ticket list
const navigate = useNavigate()

//Save the user info for the logged-in user.  This is needed to be able to access the logged-in user's ID
const localKandyUser = localStorage.getItem("kandy_user")
const kandyUserObj = JSON.parse(localKandyUser)

const handleSaveButtonClick = (event) => {
   //Print a note to the console that lets the user know they clicked the submit button
    event.preventDefault()
    console.log("You clicked the button")

    //Create the data object to send to the API 
    const saveDataToAPI = {
        user: kandyUserObj.id,
        name: product.name,
        productTypeId: product.productType,
        price: product.price
    }

    //Perform the fetch to post the object to the API 
    return fetch("http://localhost:8088/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(saveDataToAPI)
    })
    //Navigate back to the products list page
    .then(res => res.json())
    .then(
        () => {
            navigate("/products")
        }
    )
}

return <>
    <form className="productForm">
        <h2 className="productForm_title">Create New Product</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input 
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={product.name}
                //onChange is an event handler that allows yor app to listen to user input in real-time
                onChange={
                    (event) => {
                        const copy = {...product}
                        copy.name = event.target.value
                        setProduct(copy)
                    }
                }
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group>">
                <label htmlFor="productType">Product Type:</label>
                <select name="productType" id="productType" onChange={
                    (event) => {
                        const copy = {...product}
                        copy.productType = parseInt(event.target.value)
                        setProduct(copy)
                    }
                }>
                    {productTypes.map(prod => {
                        return <>
                            <option value={prod.id} key={`product--${prod.id}`}>{prod.category}</option>
                        </>
                    })}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="productPrice">Product Price:</label>
                <input type="number" step="any" min="0" id="productPrice" name="productPrice" value={product.price} onChange={
                    (event) => {
                        const copy = {...product}
                        copy.price = event.target.value
                        setProduct(copy)
                    }
                }></input>
            </div>
        </fieldset>
        <button onClick={
            (clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Submit Product</button>
    </form>
</>

}