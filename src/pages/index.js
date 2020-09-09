import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPreview = styled.div`
  border-radius: 10px;
  background-color: #e9e2f6;
  margin: 1em 0;
  color: rgb(0 0 0 / 0.75);
  transition: 0.45s ease-in-out;

  &:hover {
    background-color: #cfc0ea;
  }
`
const BlogLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  & > div {
    padding: 5% 2.5% 2.5%;
  }
`

const IndexPage = ({ data }) => {
  const dataMd = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>My thoughts</h1>
        <h4>{dataMd.totalCount}</h4>
        {dataMd.edges.map(({ node }) => (
          <BlogPreview key={node.id}>
            <BlogLink to={node.fields.slug}>
              <div>
                <h3>
                  {node.frontmatter.title} - {node.frontmatter.date}
                </h3>
                <p>{node.excerpt}</p>
              </div>
            </BlogLink>
          </BlogPreview>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            date
          }
          html
          excerpt
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`
