// src/pages/BlogPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../sanityClient";
import { mockPosts } from "../data/mockPosts";
import "./BlogPage.css";

function BlogPage() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchAndCombinePosts() {
      try {
        // Récupération des articles depuis Sanity
        const sanityData = await sanityClient.fetch(
          `*[_type == "post"]{
            title,
            slug,
            "authorName": author->name,
            "authorImage": author->image.asset->url,
            "mainImageUrl": mainImage.asset->url,
            publishedAt,
            excerpt,
            body
          }`
        );

        // Transformation des posts mock pour avoir la même structure
        const transformedMockPosts = mockPosts.map((mockPost) => ({
          title: mockPost.title,
          slug: { current: mockPost.slug },
          authorName: mockPost.author,
          authorImage: mockPost.authorImage || null,
          mainImageUrl: mockPost.image,
          publishedAt: mockPost.date,
          excerpt: mockPost.excerpt,
          body: mockPost.content,
        }));

        // Fusion des deux sources
        const allPosts = [...sanityData, ...transformedMockPosts];

        // Normalisation et tri des dates
        const postsWithDate = allPosts.map((p) => {
          let date = p.publishedAt || p.date;
          return {
            ...p,
            _sortDate: new Date(date).getTime() || 0,
          };
        });

        postsWithDate.sort((a, b) => b._sortDate - a._sortDate);

        setPosts(postsWithDate);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
      }
    }

    fetchAndCombinePosts();
  }, []);

  const createExcerpt = (body) => {
    if (!body) return "";
    if (typeof body === "string") return body.substring(0, 150) + "...";
    const firstTextBlock = body.find(
      (block) => block._type === "block" && block.children
    );
    if (!firstTextBlock) return "";
    return (
      firstTextBlock.children
        .map((child) => child.text)
        .join(" ")
        .substring(0, 150) + "..."
    );
  };

  return (
    <div className="blog-page">
      <div className="blog-page-header">
        <h1>Le Blog de la Street-Food</h1>
        <p>
          Retrouvez ici nos derniers articles, conseils et actualités sur le
          monde culinaire nomade.
        </p>
      </div>

      <div className="blog-list">
        {posts &&
          posts.map((post, index) => (
            <Link
              to={`/blog/${post.slug.current}`}
              key={post.slug.current + index}
              className="post-card"
            >
              <div className="post-card-image-wrapper">
                {post.mainImageUrl && (
                  <img
                    src={post.mainImageUrl}
                    alt={post.title}
                    className="post-card-image"
                  />
                )}
              </div>
              <div className="post-card-content">
                <span className="post-category">Conseils</span>
                <h2>{post.title}</h2>
                <p className="excerpt">
                  {post.excerpt ? post.excerpt : createExcerpt(post.body)}
                </p>
                <div className="post-card-footer">
                  <div className="author-info">
                    {post.authorImage && (
                      <img
                        src={post.authorImage}
                        alt={post.authorName}
                        className="author-avatar"
                      />
                    )}
                    <p className="post-meta">Par {post.authorName}</p>
                  </div>
                  <span className="read-more-link">Lire la suite →</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BlogPage;
