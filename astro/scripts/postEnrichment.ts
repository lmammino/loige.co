import { readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime'
import { parse, stringify } from 'yaml'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const MODEL_ID = 'anthropic.claude-v2'
const REGION = 'us-east-1'

const brClient = new BedrockRuntimeClient({ region: REGION })

async function generateMetadata(filename: string) {
  const fileContent = await readFile(filename, 'utf-8')

  const [, frontmatter, articleContent] = fileContent.split('---\n', 3)

  const parsedFrontmatter = parse(frontmatter)

  if (parsedFrontmatter.subtitle && parsedFrontmatter.description) {
    console.log(`Skipping ${filename}`)
    return
  }

  const prompt = `Human: I am going to provide you with the markdown of a blog post inside <text></text> XML tags and I want you to give me 2 things:
  1. A subtitle of maximum 100 characters which should provide the conclusions of the posts and to be significantly different from "${
    parsedFrontmatter.title
  }" and provide additional context to it
  2. A description of maximum 300 characters which will be used for SEO optimization populating the og:description meta tag

  Don't use non-positive sentences. For example, don't say "This is not a non-optimal solution".

  Generate the output as a JSON with 2 fields: subtitle and summary.
  
  For example:
  \`\`\`json
  {"subtitle": "This is a subtitle", "description": "This is a summary"}
  \`\`\`

  <text>
  ${articleContent.replaceAll('<text>', '').replaceAll('</text>', '')}
  </text>

  Assistant:
  `

  const modelInput = JSON.stringify({
    prompt,
    max_tokens_to_sample: 5000,
    temperature: 0.5,
    top_k: 250,
    top_p: 1,
    stop_sequences: [],
  })

  const invokeModelCommand = new InvokeModelCommand({
    modelId: MODEL_ID,
    body: modelInput,
    accept: 'application/json',
    contentType: 'application/json',
  })

  const modelResponse = await brClient.send(invokeModelCommand)
  const output = JSON.parse(Buffer.from(modelResponse.body).toString('utf-8'))

  try {
    const jsonFragment = JSON.parse(
      output.completion.split('```json')[1].split('```')[0],
    )

    if (!parsedFrontmatter.subtitle) {
      parsedFrontmatter.subtitle = jsonFragment.subtitle
    }

    if (!parsedFrontmatter.description) {
      parsedFrontmatter.description = jsonFragment.description
    }

    const newFrontmatter = stringify(parsedFrontmatter)
    const newFileContent = `---\n${newFrontmatter}---\n${articleContent}`

    await writeFile(filename, newFileContent)
    console.log(`Updated ${filename}`)
  } catch (e) {
    console.error(
      `Failed to process ${filename}: ${e}\n\noutput from model: ${JSON.stringify(
        output,
        null,
        2,
      )}`,
    )
  }
}

const folders = await readdir(join(__dirname, '..', 'src', 'content', 'posts'))
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

  await generateMetadata(filename)
}
