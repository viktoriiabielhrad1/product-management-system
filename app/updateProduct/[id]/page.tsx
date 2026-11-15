"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UpdateProduct() {
  //read the id from the url
  const { id } = useParams<{ id: string }>();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  //load the current values and put them in the form
  useEffect(() => {
    let active = true; //becomes false if this load is no longer needed

    const getProduct = async () => {
      const res = await fetch(`/api/getOne?id=${id}`);
      const product = await res.json();

      //ignore an old answer so it can't overwrite what the user typed
      if (!active) return;

      setBrand(product.brand ?? "");
      setModel(product.model ?? "");
      setPrice(product.price ?? "");
      setDescription(product.description ?? "");
      setImage(product.image ?? "");
    };
    getProduct();

    //react calls this when the effect is thrown away
    return () => {
      active = false;
    };
  }, [id]);

  const updateProduct = async () => {
    const params = new URLSearchParams({ id, brand, model, price, description, image });
    const res = await fetch(`/api/updateProduct?${params}`);
    setMessage(res.ok ? "Product updated" : "Could not update product");
  };

  return (
    <section className="page">
      <h1>Update Product</h1>

      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault(); //stop the page reloading
            updateProduct();
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
          <button type="submit">Save changes</button>
        </form>

        <p>{message}</p>
      </div>
    </section>
  );
}