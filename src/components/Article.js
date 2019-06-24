import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import {
  DiscussionEmbed as DiscussionEmbedOriginal,
  CommentCount as CommentCountOriginal
} from 'disqus-react'

import ArticleContainer from './ArticleContainer'
import CommentsIcon from './icons/CommentsSolid'
import GitHubIcon from './icons/Github'
import DateViewer from './DateViewer'
import TagsList from './TagsList'

// fixes issue with shouldComponentUpdate when not using discussion ids
// see https://github.com/disqus/disqus-react/pull/15/
class DiscussionEmbed extends DiscussionEmbedOriginal {
  shouldComponentUpdate (nextProps) {
    if (this.props.shortname !== nextProps.shortname) return true

    const nextConfig = nextProps.config
    const config = this.props.config
    if (
      nextConfig.url === config.url &&
      nextConfig.identifier === config.identifier
    ) {
      return false
    }
    return true
  }
}

class CommentCount extends CommentCountOriginal {
  shouldComponentUpdate (nextProps) {
    if (this.props.shortname !== nextProps.shortname) return true

    const nextConfig = nextProps.config
    const config = this.props.config
    if (
      nextConfig.url === config.url &&
      nextConfig.identifier === config.identifier
    ) {
      return false
    }
    return true
  }
}

const SectionContainer = styled.div`
  margin: 2em 0;
  line-height: 25px;
  padding: 0 1em;

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: 780px) {
    padding: 0 2em;
  }
`

const GitHubSectionContainer = styled.div`
  margin: 2em 0;
  line-height: 25px;
  padding: 1em;
  font-size: small;
  border-radius: 8px;
  background: rgba(255, 229, 100, 0.3);

  a {
    text-decoration: none;
    border-bottom: 2px solid #ffe564;
    color: inherit;

    &:hover {
      border-bottom: 2px solid #ff9b51;
    }
  }

  @media (min-width: 780px) {
    padding: 2em 2em;
  }
`

class Article extends Component {
  render () {
    const { post, site, disqusShortName, githubLink } = this.props
    const disqusConfig = {
      url: `${site}${post.frontmatter.slug}`,
      title: post.frontmatter.title
    }

    return (
      <Fragment>
        <SectionContainer>
          <DateViewer style={{ marginLeft: 0 }} date={post.frontmatter.date} />
          <TagsList tags={post.frontmatter.tags} />
          <a href="#comments" title="Read comments">
            <CommentsIcon style={{ margin: '0 .25em 0 1em' }} />
            <CommentCount
              postId={post.frontmatter.slug}
              shortname={disqusShortName}
              config={disqusConfig}
            >
              comments
            </CommentCount>
          </a>
          <p>
            — Published by{' '}
            <em>
              <Link to="/about">Luciano Mammino</Link>
            </em>
          </p>
        </SectionContainer>
        <ArticleContainer dangerouslySetInnerHTML={{ __html: post.html }} />
        {githubLink && (
          <GitHubSectionContainer>
            <strong>Found a typo or something that can be improved?</strong>
            <br />
            In the spirit of Open Source, you can contribute to this article by{' '}
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              submitting a PR on <GitHubIcon /> GitHub
            </a>
          </GitHubSectionContainer>
        )}
        <SectionContainer
          style={{
            borderTop: '1px solid #ececec',
            marginTop: '2em',
            paddingTop: '2em',
            lineHeight: '1.2'
          }}
        >
          <h2 id="comments">
            <CommentsIcon style={{ margin: '0 .25em 0 0' }} /> Comments
          </h2>
          <DiscussionEmbed
            postId={post.frontmatter.slug}
            shortname={disqusShortName}
            config={disqusConfig}
          />
        </SectionContainer>
      </Fragment>
    )
  }
}

export default Article
