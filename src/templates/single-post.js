import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter

  //Converted HTML source
  console.log(post.tags)

  return (
    <Layout>
      <SEO title={post.title} />
      <Post
        category={post.category}
        title={post.title}
        date={post.date}
        author={post.author}
        tags={post.tags}
        id={data.markdownRemark.id}
        slug={pageContext.slug}
        isSinglePage={true}
      >
        <div
          className="markdown-body container py-5"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Post>
    </Layout>
  )
}

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        tags
        date(formatString: "MMM Do YYYY")
        category
      }
      excerpt
    }
  }
`
//String! --> Exclamation Mark means it MUST receive this
//  gatsby-node will pass 'slug' when it calls single-post.js

export default SinglePost
