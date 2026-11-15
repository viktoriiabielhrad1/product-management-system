"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  // get all products from our API
  const getProducts = async () => {
    const res = await fetch("/api/getAll");
    setProducts(await res.json());
  };

  // run once when the page loads
  useEffect(() => {
    getProducts();
  }, []);

  // delete one product, then reload the list
  const deleteProduct = async (id: string) => {
    await fetch(`/api/deleteProduct?id=${id}`, { method: "DELETE" });
    getProducts();
  };

  return (
    <section className="page">
      <h1>Products</h1>

      <div className="card">
        <h2>All laptops</h2>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.image && (
                    <Image
                      src={product.image}
                      width={80}
                      height={60}
                      alt={`${product.brand} ${product.model}`}
                    />
                  )}
                </td>
                <td>{product.brand}</td>
                <td>{product.model}</td>
                <td>€{product.price}</td>
                <td>
                  <Link href={`/products/${product.id}`}>View</Link>{" "}
                  <Link href={`/updateProduct/${product.id}`}>Edit</Link>{" "}
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}