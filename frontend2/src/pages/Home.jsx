import React from 'react'
import Hero from '../components/sections/Hero'
import { Marquee, CategoryCards, FeaturedCollections } from '../components/sections/CategorySection'
import { BestSellers, TrendingProducts } from '../components/sections/ProductSections'
import { Testimonials, Newsletter } from '../components/sections/TestimonialsNewsletter'
import PromoBanner from '../components/sections/PromoBanner'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <BestSellers />
      <CategoryCards />
      <FeaturedCollections />
      <TrendingProducts />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
