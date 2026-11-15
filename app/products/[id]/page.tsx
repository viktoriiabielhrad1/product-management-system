"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SingleProduct() {
  //read the id from the URL
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  //get this one product when the page loads
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`/api/getOne?id=${id}`);
      setProduct(await res.json());
    };
    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;
  if (product.error) return <p>Product not found</p>;

  return (
    <section className="page">
      <h1>{product.brand} {product.model}</h1>

      <div className="card">
        {product.image && (
  <Image
    src={product.image}
    width={400}
    height={300}
    alt={`${product.brand} ${product.model}`}
  />
)}
        <p>Brand: {product.brand}</p>
        <p>Model: {product.model}</p>
        <p>Price: €{product.price}</p>
        <p>Description: {product.description}</p>
        <Link href={`/updateProduct/${product.id}`}>Edit this product</Link>
      </div>
    </section>
  );
}