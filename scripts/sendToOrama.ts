import { readFile, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ORAMA_API_KEY = process.env.ORAMA_API_KEY
const ORAMA_BASE_URL =
  'https://api.oramasearch.com/api/v1/webhooks/ewi98fni6cutx1qb3b1s9po1'

const parseRichTextIntoPlainText = (richText: string) =>
  richText
    // replaces JSX and HTML and their properties with an empty string
    // keeping only the content left
    .replace(/<[^>]+>/gm, '')
    // replaces Markdown links with their text content
    .replace(/\[([^\]]+)\]\([^)]+\)/gm, '$1')
    // replaces Markdown lists with their content
    .replace(/^[*-] (.*)$/gm, '$1')
    // replaces Markdown underscore, bold and italic with their content
    .replace(/(\*\*|\*|__|_)(.*?)\1/gm, '$2')
    // replaces Markdown multiline codeblocks with their content
    .replace(/```.+?```/gms, '')
    // replaces empty lines or lines just with spaces with an empty string
    .replace(/^\s*\n/gm, '')
    // replaces leading and trailing spaces from each line with an empty string
    .replace(/^[ ]+|[ ]+$/gm, '')
    // replaces leading numbers and dots from each line with an empty string
    .replace(/^\d+\.\s/gm, '')

async function sendToOramaSearch(filename: string) {
  const fileContent = await readFile(filename, 'utf-8')

  const [, frontmatter, articleContent] = fileContent.split('---\n', 3)

  const parsedFrontmatter = parse(frontmatter)

  const { title, subtitle, description, tags, slug } = parsedFrontmatter
  const content = parseRichTextIntoPlainText(articleContent)

  const operation = {
    upsert: [{ id: slug, title, subtitle, description, tags, content, slug }],
  }

  const resp = await fetch(`${ORAMA_BASE_URL}/notify`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ORAMA_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(operation),
  })

  console.log(slug, resp.status)
}

const folders = await readdir(join(__dirname, '..', 'src', 'content', 'posts'))

// clean up oramasearch index
const resp = await fetch(`${ORAMA_BASE_URL}/snapshot`, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ORAMA_API_KEY}`,
  },
  method: 'POST',
  body: JSON.stringify([]),
})
if (resp.status === 200) {
  console.log('Oramasearch index cleaned up')
}

for (const folder of folders) {
  const filename = join(
    __dirname,
    '..',
    'src',
    'content',
    'posts',
    folder,
    'index.md',
  )
  // skip folders that don't have an index.md file (or it's not a folder)
  try {
    await stat(filename)
  } catch (_e) {
    continue
  }

  await sendToOramaSearch(filename)
}

// deploy the index to oramasearch
const deployResp = await fetch(`${ORAMA_BASE_URL}/deploy`, {
  headers: {
    Authorization: `Bearer ${ORAMA_API_KEY}`,
  },
  method: 'POST',
})
if (deployResp.status === 200) {
  console.log('Oramasearch index deployed')
}
