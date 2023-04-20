import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import Image from "next/image";
import { GetStaticProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";

import Link from "next/link";
import Head from "next/head";

interface homeProps {
  products: {
    id: string;
    name: string;
    imgUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: homeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>ignite shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.imgUrl}
                  width={520}
                  height={480}
                  alt="img"
                />
                <footer>
                  <strong>{product.name}</strong>
                  <span>
                    {product.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((prodcut) => {
    const price = prodcut.default_price as Stripe.Price;

    return {
      id: prodcut.id,
      name: prodcut.name,
      imgUrl: prodcut.images[0],
      price: price.unit_amount! / 100,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // a cada 2 hr
  };
};
