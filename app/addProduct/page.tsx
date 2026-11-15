"use client";

import { useState } from "react";

export default function AddProduct() {
  //one state variable for each form field
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const addProduct = async () => {
    //build the url values and send them to api
    const params = new URLSearchParams({ brand, model, price, description, image });
    const res = await fetch(`/api/addProduct?${params}`);

    if (res.ok) {
      setMessage("Product added");
      setBrand("");
      setModel("");
      setPrice("");
      setDescription("");
      setImage("");
    } else {
      setMessage("Could not add product");
    }
  };

  return (
    <section className="page">
      <h1>Add Product</h1>

      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault(); //stop the page reloading
            addProduct();
          }}
        >
          <p>
            <label>
              Brand <input value={brand} onChange={(e) => setBrand(e.target.value)} required />
            </label>
          </p>
          <p>
            <label>
              Model <input value={model} onChange={(e) => setModel(e.target.value)} required />
            </label>
          </p>
          <p>
            <label>
              Price <input value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
          </p>
          <p>
            <label>
              Description{" "}
              <input value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
          </p>
          <p>
            <label>
              Image link <input value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
          </p>
          <button type="submit">Add product</button>
        </form>

        <p>{message}</p>
      </div>
    </section>
  );
}