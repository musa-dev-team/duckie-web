"use client"

import { CtaContent } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"
import { blogPosts } from "@/config/blog-content"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Simple markdown-like renderer for content
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let listKey = 0

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 mb-6 text-[#555]">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )
      currentList = []
    }
  }

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    
    // Skip empty lines but flush lists
    if (!trimmedLine) {
      flushList()
      return
    }

    // H2 headers
    if (trimmedLine.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={index} className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-10 mb-4">
          {trimmedLine.replace('## ', '')}
        </h2>
      )
      return
    }

    // H3 headers
    if (trimmedLine.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={index} className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-3">
          {trimmedLine.replace('### ', '')}
        </h3>
      )
      return
    }

    // List items (- or *)
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.startsWith('✅ ')) {
      const listContent = trimmedLine.replace(/^[-*✅]\s*/, '')
      // Handle bold text in list items
      const formattedContent = listContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      currentList.push(formattedContent)
      return
    }

    // Regular paragraphs
    flushList()
    // Handle bold and italic text
    let formattedLine = trimmedLine
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[#1a1a1a]">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    
    elements.push(
      <p 
        key={index} 
        className="text-base md:text-lg text-[#555] leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: formattedLine }}
      />
    )
  })

  // Flush any remaining list
  flushList()

  return elements
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  return (
    <main>
      {/* Hero section */}
      <div className="relative w-full bg-[#090B0F] px-3 pt-3 pb-3 md:px-4 md:pt-4 md:pb-4">
        <div
          className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          <Image
            src={post.image}
            alt=""
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
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
            {/* Back link and category */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-4 mb-4 md:mb-6"
            >
              <Link 
                href="/blog" 
                className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              <span className="text-white/30">|</span>
              <span className="text-sm text-[#FF6B35] font-medium">{post.category}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg max-w-4xl tracking-[-0.03em] leading-[1.1]"
            >
              {post.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="flex items-center gap-4 text-sm text-white/60"
            >
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{post.readTime}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article content section */}
      <div className="relative bg-[#FFFFFF] pt-12 md:pt-20 pb-20 md:pb-32" data-theme="light">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Article content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="prose-lg"
            >
              {/* Excerpt/Lead paragraph */}
              <p className="text-xl md:text-2xl text-[#333] leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>
              
              <div className="h-px w-full bg-gradient-to-r from-[#E5E5E5] via-[#E5E5E5] to-transparent mb-8" />
              
              {/* Main content */}
              {post.content ? (
                <div className="article-content">
                  {renderContent(post.content)}
                </div>
              ) : (
                <div className="bg-[#F8F8F8] rounded-2xl p-8 md:p-12 text-center">
                  <p className="text-[#666] mb-4">Full article content coming soon.</p>
                  <Link 
                    href={`https://www.duckie.ai/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FF6B35] font-medium hover:underline"
                  >
                    Read on duckie.ai
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              )}
            </motion.article>

            {/* Share section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-12 pt-8 border-t border-[#E5E5E5]"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="text-sm text-[#888]">Share this article</span>
                <div className="flex items-center gap-3">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://duckie.ai/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#666] hover:bg-[#1DA1F2] hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://duckie.ai/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#666] hover:bg-[#0077B5] hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <button 
                    onClick={() => navigator.clipboard.writeText(`https://duckie.ai/blog/${post.slug}`)}
                    className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#666] hover:bg-[#FF6B35] hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related articles */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="max-w-6xl mx-auto mt-20 md:mt-32"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs md:text-sm font-medium text-[#999] uppercase tracking-[0.2em]">
                  Related Articles
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#E5E5E5] to-transparent" />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease }}
                    className="group"
                  >
                    <Link href={`/blog/${relatedPost.slug}`} className="block h-full">
                      <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-[#E5E5E5] transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:border-[#D5D5D5] hover:-translate-y-1">
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={relatedPost.image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 text-xs text-[#888] mb-2">
                            <span>{relatedPost.date}</span>
                            <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                          <h3 className="font-bold text-[#1a1a1a] leading-snug group-hover:text-[#FF6B35] transition-colors duration-300">
                            {relatedPost.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* CTA + Footer section with pond background */}
      <div className="relative overflow-hidden bg-[#FFFFFF] pt-0 md:pt-4">
        <img 
          src="/images/pond-3.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pond-bg-image"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
        />
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
