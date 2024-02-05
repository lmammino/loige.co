import { inspect } from 'node:util'
import { OramaClient } from '@oramacloud/client'

const client = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/blog-xm7dbi',
  api_key: 'XKhLSulaGVruYaITY9avRbaATRMtSJqj',
})

const results = await client.search({
  term: 'rust python',
  limit: 5,
  mode: 'fulltext',
  threshold: 0,
  returning: ['title'],
})

console.log(inspect(results, true, null, true))
