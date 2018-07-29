import { injectGlobal } from 'emotion'

const colors = {
  char: '#D8DEE9',
  comment: '#999999',
  keyword: '#c5a5c5',
  lineHighlight: '#14161a',
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#5FB3B3',
  tag: '#fc929e',
  function: '#79b6f2',
  className: '#FAC863',
  method: '#6699CC',
  operator: '#fc929e',
}

injectGlobal`
  .gatsby-highlight {
    font-size: 15px;
    line-height: 1.7;
    background: #282c34;
    color: #ffffff;
    border-radius: 10px;
    overflow: auto;
    tab-size: 1.5em;

    margin: 1.5em -1em 1.5em 0;
    padding: 1em;

    @media (min-width: 780px) {
      margin-left: -2em;
      padding-left: 2em;
      padding-right: 2em;
      font-size: 16px;
    }

    .token.attr-name {
      color: ${colors.keyword};
    }

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: ${colors.comment};
    }

    .token.property,
    .token.number,
    .token.function-name,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: ${colors.primitive};
    }

    .token.boolean {
      color: ${colors.boolean};
    }

    .token.tag {
      color: ${colors.tag};
    }

    .token.string {
      color: ${colors.string};
    }

    .token.punctuation {
      color: ${colors.punctuation};
    }

    .token.selector,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: ${colors.char};
    }

    .token.function {
      color: ${colors.function};
    }

    .token.operator,
    .token.entity,
    .token.url,
    .token.variable {
      color: ${colors.variable};
    }

    .token.attr-value {
      color: ${colors.string};
    }

    .token.keyword {
      color: ${colors.keyword};
    }

    .token.atrule,
    .token.class-name {
      color: ${colors.className};
    }

    .token.important {
      font-weight: 400;
    }

    .token.bold {
      font-weight: 700;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity' {
      cursor: help;
    }
  }

  .gatsby-highlight > pre {
    height: auto !important;
    margin: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .gatsby-highlight + .gatsby-highlight {
    margin-top: 20px,
  }

  .gatsby-highlight-code-line {
    background-color: #14161a;
    display: block;
    margin: -0.125rem calc(-1rem - 15px);
    padding: 0.125rem calc(1rem + 15px);
  }
`
