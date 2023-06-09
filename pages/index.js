import { useState, useEffect } from "react";
import Head from "next/head";
import ProductCard from "@bable/components/components/Products/ProductCard";
import Hero from "@bable/components/components/Herosection/Hero";
import axios from "axios";
import FeatureCategories from "@bable/components/components/FeaturedCategory/FeatureCategories";
import SubHero from "@bable/components/components/Subhero/SubHero";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    try {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        setProducts(response.data);
        setCategory(response.data);
        console.log('useEffect Working')
      });
      
      // pCategory();
    } catch (error) {
      console.log(error);
      setErrorMsg("check your internet");
    }
  }, []);

  // const pCategory = () => {
  //   const data = category.filter(function (item) {
  //     return item.category == ' jewelery';
  //   });
  //   console.log("product cat", data);
  // };

  // useEffect(() => {
  //   pCategory();
  // }, []);

  return (
    <>
      <Head>
        <title>E-Commerce site</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <div className="container mx-auto mt-24 py-16 sm:mt-10">
          <div className="flex justify-between items-center mx-10 mb-5">
            <h1>Featured Categories</h1>
            <h1>See All Categories</h1>
          </div>
          <div className="grid items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-sm mx-auto md:max-w-none md:mx-auto justify-between">
            {category.map((product) => (
              <FeatureCategories key={product.id} product={product} />
            ))}
          </div>
        </div>

        <section className="py-16">
          {!errorMsg ? (
            <div className="container mx-auto ">
              <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-sm mx-auto md:max-w-none md:mx-auto justify-between">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div>Check Your Internet {errorMsg}</div>
          )}
        </section>
        <section className="mt-10">
          <SubHero />
        </section>
      </main>
    </>
  );
}
