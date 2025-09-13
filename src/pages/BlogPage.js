// src/pages/BlogPage.js
import React from "react";
import { Link } from "react-router-dom"; // Importer Link
import { mockPosts } from "../data/mockPosts";
import "./BlogPage.css"; // Importer le nouveau CSS

function BlogPage() {
  return (
    <div className="blog-page">
      <div className="blog-page-header">
        <h1>Notre Blog</h1>
        <p>
          Retrouvez ici nos derniers articles, conseils et actualités sur le
          monde de la street-food.
        </p>
      </div>

      <div className="blog-list">
        {mockPosts.map((post) => (
          // Rendre la carte entière cliquable
          <Link to={`/blog/${post.slug}`} key={post.id} className="post-card">
            <img
              src={post.image}
              alt={post.title}
              className="post-card-image"
            />
            <div className="post-card-content">
              <p className="post-meta">
                Par {post.author} - Le {post.date}
              </p>
              <h2>{post.title}</h2>
              <p className="excerpt">{post.excerpt}</p>
              <span className="read-more-link">Lire la suite →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
