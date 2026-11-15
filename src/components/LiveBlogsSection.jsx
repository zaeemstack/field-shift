import React, { useState } from 'react';
import { Newspaper, Clock, Calendar, ArrowRight, X, Bookmark, Share2, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogData';

export default function LiveBlogsSection({ lang, t }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const isUrdu = lang === 'ur';

  const posts = isUrdu ? blogPosts.ur : blogPosts.en;

  const categories = [
    { id: 'All', label: t.blogs.all },
    { id: 'Satellite Updates', label: t.blogs.satellite },
    { id: 'Climate & Drought', label: t.blogs.climate },
    { id: 'Soil & Water', label: t.blogs.soil },
    { id: 'Agronomy Advice', label: t.blogs.agronomy }
  ];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <section id="blogs" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#060a14] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{t.blogs.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t.blogs.title}
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl">
              {t.blogs.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === c.id
                    ? 'bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-[#0e1628] hover:bg-[#131d34] border border-white/10 hover:border-yellow-400/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-transparent to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-yellow-400 border border-white/20">
                    {post.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-slate-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.readTime} {t.blogs.readTime}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="text-blue-400">{post.author}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-yellow-400 text-sm font-semibold group-hover:text-yellow-300">
                  <span>{t.blogs.readArticle}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Modal Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0f172a] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
              
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-all border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-black font-mono">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Article Metadata & Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-4">
                  <span>📅 {activeArticle.date}</span>
                  <span>⏱️ {activeArticle.readTime} min read</span>
                  <span className="text-blue-400">✍️ {activeArticle.author}</span>
                </div>
              </div>

              {/* Article Content with Markdown formatting */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  🛰️ NASA Earth Science Applied Sciences Program
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold transition-all"
                >
                  {isUrdu ? "بند کریں" : "Close Bulletin"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

