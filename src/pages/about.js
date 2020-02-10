import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
// import dimensions from "styles/dimensions";
import { RichText } from "prismic-reactjs";
import Layout from "components/Layout";

const AboutTitle = styled("h1")`
    margin-bottom: 1em;
`

const About = ({ about, meta }) => (
    <>
        <Helmet
            title={`About | Prist, Gatsby & Prismic Starter`}
            titleTemplate={`%s | About | Prist, Gatsby & Prismic Starter`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `About | Prist, Gatsby & Prismic Starter`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <AboutTitle>
                About {about.about_author}
            </AboutTitle>
            <div>
              {about.about_title[0].text}
            </div>
            <div>
              {RichText.render(about.about_preview_description)}
            </div>
        </Layout>
    </>
);

export default ({ data }) => {
    const about = data.prismic.allAbouts.edges;
    const meta = data.site.siteMetadata;
    if (!about) return null;

    console.log('about', about)

    return (
        <About about={about[0].node} meta={meta}/>
    )
}

About.propTypes = {
    posts: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};


export const query = graphql`
    {
        prismic {
            allAbouts {
                edges {
                    node {
                        about_title
                        about_preview_description
                        about_author
                        about_author_image
                        about_author_annotation
                        about_body
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
