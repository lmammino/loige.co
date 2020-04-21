import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { get } from 'lodash'

import SEO from '../../src/components/SEO'
import Layout from '../../src/components/layout'
import ResponsiveWrapper from '../../src/components/ResponsiveWrapper'
import ArticleContainer from '../../src/components/ArticleContainer'
import ProfilePicImage from '../../src/components/images/profile-pic.jpg'

const ProfilePic = styled('img')`
  float: left;
  border-radius: 50%;
  margin: 1em 1em 0 0;
`

const FloatClear = styled('div')`
  clear: both;
`

const AboutPage = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const lastPosts = get(props, 'data.lastPosts.edges')
  const blogPostCount = get(props, 'data.lastPosts.totalCount')
  const speakingCount = get(props, 'data.speaking.totalCount')
  const externalArticles = get(props, 'data.externalPosts.edges')
  const externalPostsCount = get(props, 'data.externalPosts.totalCount')
  const sideProjects = get(props, 'data.sideProjects.edges')
  return (
    <Layout section="about">
      <SEO
        path={'about/'}
        pageData={{
          frontmatter: {
            title: `About Loige - ${siteTitle}`,
            meta_description:
              'I am a passionate software engineer born in 1987, the same year that "Super Mario Bros" was released in Europe, which, by chance is my favourite game!'
          }
        }}
      />
      <ResponsiveWrapper>
        <ArticleContainer style={{ minHeight: '80vh' }}>
          <h2 style={{ marginTop: '4em' }}>Hello, this is Luciano :)</h2>
          <ProfilePic src={ProfilePicImage} alt="Luciano's portrait" />
          <p>
            Since I started navigating the great Internet, my nickname has been
            <em>&quot;loige&quot;</em>, that&apos;s why this website is called{' '}
            <em>&quot;loige.co&quot;</em>.
          </p>
          <FloatClear />
          <p>
            I am a passionate software engineer born in 1987, the same year that
            “Super Mario Bros” was released in Europe, which, by chance is my
            favourite game!
          </p>
          <p>
            I started coding early at the age of 12, hacking away with my
            father&apos;s old i386 armed only with MS-DOS and the QBasic
            interpreter and I have been professionally a software developer for
            more than 10 years.
          </p>
          <p>
            I am currently a <strong>Principal Software Engineer</strong> at{' '}
            <a
              href="https://fabfitfun.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              FabFitFun
            </a>{' '}
            in Dublin where I am working on improving the various Cloud deployments of the company serving more than 2 million customers daily.
          </p>
          <p>
            I love the fullstack web, <Link to="/tag/node-js">Node.js</Link> and{' '}
            <Link to="/tag/node-js">Serverless</Link> so I co-authored the book{' '}
            <a
              href="http://amzn.to/1ZF279B"
              target="_blank"
              rel="noopener noreferrer"
            >
              Node.js design patterns
            </a>
            , launched{' '}
            <a
              href="https://fstack.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              FullStack Bulletin
            </a>{' '}
            (a semi-automated newsletter for Fullstack developers) and{' '}
            <a
              href="https://serverlesslab.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ServerlessLab
            </a>{' '}
            (in-house serverless training).
          </p>
          <p>
            If you are interested in knowing more about my professional
            experience and skills you can check out my{' '}
            <a
              href="https://www.linkedin.com/in/lucianomammino/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{' '}
            or my{' '}
            <a
              href="https://github.com/lmammino"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{' '}
            profile.
          </p>
          <p>This has been my personal tag-line for a while:</p>
          <blockquote>
            Cloud developer, entrepreneur, fighter, butterfly maker!
          </blockquote>
          <p>
            Yep, I am a <strong>Full stack web developer</strong> working on cloud
            products. I enjoy coding (a lot) even though, lately,
            I am spending more and more time working on systems and cloud
            architectures.
          </p>
          <p>
            I <del>am</del> <strong>was</strong> an entrepreneur: during
            the first part of my career, I co-founded several companies,
            a couple of web and software agencies and even a startup,{' '}
            <a href="https://sbaam.com">Sbaam.com</a>, that aimed to disrupt the
            emerging fashion brands industry. I can&apos;t say any of these
            businesses was seriously successful, but I definitely learned a lot
            and I believe I still preserve some of that entrepreneurial mindset.
          </p>
          <p>
            I am a <strong>fighter</strong>, I enjoy practicing martial arts as
            a hobby and as a way to stay healthy both phisically and mentally. I
            have a red belt (master) in <strong>Sicilian Stick Fighting</strong>{' '}
            (yep, such thing{' '}
            <a
              href="https://www.youtube.com/watch?v=4SNxlby4iic"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              really exists
            </a>
            ), black belt in <strong>Judo</strong> and blue belt in{' '}
            <strong>Brasilian Jiu-Jitsu</strong>.
          </p>
          <p>
            For what concerns the &quot;butterfly making&quot; part, well... you
            will have to ask me in person :)
          </p>

          <h3>Speaking and workshops</h3>
          <p>
            I take any chance I have to speak at tech conferences or to deliver
            workshops. I have currently delivered{' '}
            <strong>{speakingCount}</strong> conference talks and workshops.
          </p>
          <p>
            You can consult the <Link to="/speaking">speaking page</Link> if you
            want to know more about my past and future engagements.
          </p>

          <h3>Writing</h3>
          <p>
            I love to write technical articles to share my knowledge and, most
            importantly, to confront my learnings with other people and get
            better bit by bit.
          </p>
          <p>
            In the last few years, I have published{' '}
            <strong>{blogPostCount}</strong> articles in this blog and
            contributed to <strong>{externalPostsCount}</strong> articles for
            other publishers.
          </p>
          <h4>Latest article on this blog</h4>
          <ul>
            {lastPosts.map(p => (
              <li key={p.node.fields.slug}>
                <Link to={`/${p.node.fields.slug}`}>
                  {p.node.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            See all the articles in the <Link to="/">blog section</Link>.
          </p>
          <h4>Articles on other websites</h4>
          <ul>
            {externalArticles.map(p => (
              <li key={p.node.link}>
                <a rel="noopener noreferrer" target="_blank" href={p.node.link}>
                  {p.node.title}
                </a>
              </li>
            ))}
          </ul>
          <h3>Side projects</h3>
          <p>Here are some of the side projects I am involved with:</p>
          <ul>
            {sideProjects.map(p => (
              <li key={p.node.link}>
                <a rel="noopener noreferrer" target="_blank" href={p.node.link}>
                  {p.node.name}
                </a>{' '}
                ({p.node.role})
              </li>
            ))}
          </ul>
        </ArticleContainer>
      </ResponsiveWrapper>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        author
        siteUrl
        twitterProfile
        disqusShortName
      }
    }

    lastPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
      filter: {
        frontmatter: { status: { eq: "published" }, layout: { eq: "post" } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }

    speaking: allMarkdownRemark(
      filter: {
        frontmatter: { status: { eq: "published" }, layout: { eq: "speaking" } }
      }
    ) {
      totalCount
    }

    externalPosts: allExternalArticlesYaml(
      sort: { fields: [date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          title
          link
        }
      }
    }

    sideProjects: allSideProjectsYaml(sort: { fields: [name], order: ASC }) {
      totalCount
      edges {
        node {
          id
          name
          link
          role
        }
      }
    }
  }
`
