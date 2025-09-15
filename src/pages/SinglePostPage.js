// src/pages/SinglePostPage.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../sanityClient";
import { mockPosts } from "../data/mockPosts";
import "./SinglePostPage.css";

function SinglePostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const sanityPosts = await sanityClient.fetch(
          `*[_type == "post" && slug.current == $slug][0]{
            title,
            slug,
            "authorName": author->name,
            "authorImage": author->image.asset->url,
            "mainImageUrl": mainImage.asset->url,
            publishedAt,
            excerpt,
            body
          }`,
          { slug }
        );

        if (sanityPosts) {
          setPost(sanityPosts);
          return;
        }

        const mockPost = mockPosts.find((p) => p.slug === slug);
        if (mockPost) {
          setPost({
            title: mockPost.title,
            slug: { current: mockPost.slug },
            authorName: mockPost.author,
            authorImage: mockPost.authorImage || null,
            mainImageUrl: mockPost.image,
            publishedAt: mockPost.date,
            excerpt: mockPost.excerpt,
            body: mockPost.content,
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l’article:", error);
      }
    }

    fetchPost();
  }, [slug]);

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
        {post.mainImageUrl && (
          <img
            src={post.mainImageUrl}
            alt={post.title}
            className="post-image"
          />
        )}
        <div className="post-header">
          {post.authorImage && (
            <img
              src={post.authorImage}
              alt={post.authorName}
              className="author-avatar"
            />
          )}
          <h1>{post.title}</h1>
          <p className="post-meta">
            Par {post.authorName} - Le {post.publishedAt}
          </p>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html:
              typeof post.body === "string"
                ? post.body
                : post.body
                    .map((block) =>
                      block.children
                        ? block.children.map((child) => child.text).join(" ")
                        : ""
                    )
                    .join("<br/>"),
          }}
        />

        <Link to="/blog" className="back-to-blog-link">
          ← Retour au blog
        </Link>
      </div>
    </div>
  );
}

export default SinglePostPage;
