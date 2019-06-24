import styled from '@emotion/styled'

const ArticleContainer = styled.article`
  margin: 2em 0;
  line-height: 25px;
  padding: 0 1em;

  code {
    white-space: pre-wrap;
    word-break: break-word;
  }

  @media (min-width: 780px) {
    padding: 0 2em;
  }

  & a {
    background-color: rgba(187, 239, 253, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    text-decoration: none;
    color: inherit;

    &:hover {
      background-color: #bbeffd;
      border-bottom-color: #1a1a1a;
    }

    &.anchor,
    &.gatsby-resp-image-link {
      background-color: transparent;
      border: none;
    }
  }

  & > p:first-of-type {
    font-size: 18px;
    font-weight: 300;
    color: #6d6d6d;

    & a,
    & strong {
      font-weight: 400;
    }

    @media (min-width: 780px) {
      font-size: 24px;
    }
  }

  & p {
    margin: 1em 0 0 0;
    font-size: 16px;
    line-height: 1.7;
    max-width: 42em;

    @media (min-width: 780px) {
      font-size: 17px;
      line-height: 1.7;
    }
  }

  & h2,
  & h3,
  & h4,
  & h5 {
    margin: 2em 0 0 0;
  }

  & p > code,
  & li > code {
    background: rgba(255, 229, 100, 0.2);
    color: inherit;
    display: inline-block;
    padding: 0 0.3em;
  }

  & p > code,
  & li > code,
  & p > a > code,
  & li > a > code {
    padding: 0 3px;
    font-size: inherit;
    word-break: break-word;
  }

  & h2 {
    border-top: 1px solid #ececec;
    margin-top: 2em;
    padding-top: 2em;
    line-height: 1.2;
    font-size: 20px;

    &:first-of-type {
      border-top: 0;
      padding-top: 0;
    }

    @media (min-width: 780px) {
      font-size: 35px;
    }
  }

  & hr + h2 {
    border-top: 0;
    margin-top: 0;
  }

  & h3 {
    padding-top: 45px;
    font-size: 18px;

    @media (min-width: 780px) {
      font-size: 25px;
      line-height: 1.3;
    }
  }

  & h2 + h3,
  & h2 + h3:first-of-type {
    padding-top: 30px;
  }

  & h4 {
    font-size: 20px;
    color: #6d6d6d;
    line-height: 1.3;
    margin-top: 50px;
    font-weight: 400;
  }

  & h4 + p {
    margin-top: 20px;
  }

  & ol,
  & ul {
    margin-top: 20px;
    font-size: 16px;
    padding-left: 2em;

    & p,
    & p:first-of-type {
      font-size: 16px;
      margin-top: 0;
      line-height: 1.2;
    }

    & li {
      margin-top: 10px;
    }

    & ol,
    & ul {
      margin-left: 20px;
      margin-top: 10px;
    }
  }

  & img {
    max-width: 100%;
  }

  & ol {
    list-style: decimal;
  }

  & ul {
    list-style: disc;
  }

  & blockquote {
    background-color: rgba(255, 229, 100, 0.3);
    border-left-color: #ffe564;
    border-left-width: 9px;
    border-left-style: solid;
    padding: 20px 45px 20px 26px;
    margin: 1em 0 2em -1em;

    @media (min-width: 780px) {
      margin-left: -2em;
    }

    & p {
      margin-top: 15px;

      &:first-of-type {
        font-weight: 700;
        margin-top: 0;
      }

      &:nth-of-type(2) {
        margin-top: 0;
      }
    }
  }

  table {
    margin: 1em auto;
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;

    @media (min-width: 780px) {
      width: 80%;
    }

    td,
    th {
      border: 1px solid #ccc;
      margin: 0;
      padding: 0.4em;
    }
  }

  table + legend {
    border-left: 3px solid #ccc;
    font-size: small;
    font-style: italic;
    width: 100%;
    margin: 1em auto;
    padding: 0 0 0 1em;
    @media (min-width: 780px) {
      width: 80%;
    }
  }
`

export default ArticleContainer
