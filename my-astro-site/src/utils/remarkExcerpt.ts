import { toString } from 'mdast-util-to-string';

function truncate(str: string, max: number, suffix: string) {
  return str.length < max ? str : `${str.substring(0, str.substring(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
}

export default function remarkExcerpt() {
  return function (tree: any, { data }: any) {
    const textOnPage = toString(tree);
    data.astro.frontmatter.excerpt = truncate(textOnPage, 255, '...');
  };
}