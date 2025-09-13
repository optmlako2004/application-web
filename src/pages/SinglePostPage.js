// src/pages/SinglePostPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockPosts } from "../data/mockPosts";
import "./SinglePostPage.css";

function SinglePostPage() {
  const { slug } = useParams();
  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Article non trouvé</h2>
        <p>Désolé, l'article que vous cherchez n'existe pas.</p>
        <Link to="/blog">Retourner au blog</Link>
      </div>
    );
  }

  return (
    <div className="single-post-page">
      <div className="post-container">
        <img src={post.image} alt={post.title} className="post-image" />
        <div className="post-header">
          <h1>{post.title}</h1>
          <p className="post-meta">
            Par {post.author} - Le {post.date}
          </p>
        </div>

        {/* MODIFICATION ICI 👇 */}
        {/* On remplace le <p>{post.content}</p> par ce div */}
        {/* pour que React interprète les balises HTML contenues dans la chaîne de caractères */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Link to="/blog" className="back-to-blog-link">
          ← Retour au blog
        </Link>
      </div>
    </div>
  );
}

export default SinglePostPage;
