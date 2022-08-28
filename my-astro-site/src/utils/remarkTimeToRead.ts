import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export default function remarkTimeToRead() {
  return function (tree: any, { data }: any) {
    const textOnPage = toString(tree);
    const { minutes } = getReadingTime(textOnPage);
    data.astro.frontmatter.timeToRead = Math.ceil(minutes);
  };
}