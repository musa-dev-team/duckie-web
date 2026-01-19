"use client"

import { CtaContent } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"
import { blogCategories, blogPosts } from "@/config/blog-content"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const ease = [0.22, 1, 0.36, 1] as const

function BlogCard({ post, index, featured = false }: { post: typeof blogPosts[0], index: number, featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className={`group ${featured ? 'md:col-span-1' : ''}`}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div 
          className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-[#E5E5E5] transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:border-[#D5D5D5] hover:-translate-y-1"
        >
          {/* Image */}
          <div className={`relative ${featured ? 'h-48 md:h-56' : 'h-40 md:h-48'} overflow-hidden`}>
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span 
                className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-[#1a1a1a] backdrop-blur-sm"
              >
                {post.category}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 text-xs text-[#888] mb-3">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#ccc]" />
              <span>{post.readTime}</span>
            </div>
            
            <h3 className={`font-bold text-[#1a1a1a] mb-2 md:mb-3 leading-snug group-hover:text-[#FF6B35] transition-colors duration-300 ${featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
              {post.title}
            </h3>
            
            <p className="text-sm md:text-base text-[#666] leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            
            {/* Read more arrow */}
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Read article</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function BlogContent() {
  return (
    <main>
      {/* Hero section */}
      <div className="relative w-full bg-white px-3 pt-3 pb-3 md:px-4 md:pt-4 md:pb-4">
        <div
          className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          <Image
            src="/images/ocean-bg-4.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at top left, rgba(0,0,0,0.5) 0%, transparent 50%),
                radial-gradient(ellipse at top right, rgba(0,0,0,0.5) 0%, transparent 50%)
              `,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-sm md:text-base text-white/60 mb-4 md:mb-6 tracking-[0.2em] uppercase font-medium"
            >
              Blog
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg max-w-4xl tracking-[-0.03em] leading-[1.05]"
            >
              Insights & <span className="text-[#FF6B35]">Updates</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-lg md:text-xl text-white/70 max-w-2xl"
            >
              Thoughts on AI, customer support, and building technology that actually helps.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Blog content section */}
      <div className="relative bg-[#FFFFFF] pt-16 md:pt-24 pb-32 md:pb-48" data-theme="light">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16"
            >
              {blogCategories.map((category, i) => (
                <button
                  key={category}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    i === 0 
                      ? 'bg-[#1a1a1a] text-white' 
                      : 'bg-[#F5F5F5] text-[#666] hover:bg-[#E8E8E8] hover:text-[#1a1a1a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* All articles grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {blogPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* CTA + Footer section with pond background */}
      <div className="relative overflow-hidden bg-[#FFFFFF] pt-0 md:pt-4">
        {/* Background image */}
        <img 
          src="/images/pond-3.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pond-bg-image"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
        />
        {/* Vignette overlay for bottom corners */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 0% 100%, rgba(0,0,0,0.35) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 70%)
            `,
          }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative">
          <div data-theme="light">
            <CtaContent />
          </div>
          <div className="h-32 md:h-0" aria-hidden="true" />
          <Footer />
        </div>
      </div>
    </main>
  )
}
