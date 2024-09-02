import path from 'node:path'
import consumers from 'node:stream/consumers'
import * as url from 'node:url'
import type { APIContext } from 'astro'
import type { z } from 'astro/zod'
import {
  type Image as CanvasImage,
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas'
import { split } from 'canvas-hypertxt'
import { getCollection } from 'astro:content'
import type { ImageFunction } from 'astro:content'

type AstroImage = z.infer<ReturnType<ImageFunction>>
type GetParams = APIContext<
  {
    title: string
    image?: AstroImage
  },
  {
    slug: string
  }
>

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const WIDTH = 1200
const HEIGHT = 630
const TEXT_PADDING_X = 200
const TITLE_COLOR = '#ffffff'
const TITLE_FONT_FILE = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'public',
  'fonts',
  'AtkinsonHyperlegible-Bold.ttf',
)
const TITLE_FONT_SIZE = 64
const TITLE_FONT_WEIGHT = 'bold'
const TITLE_FONT_FAMILY = 'Atkinson Hyperlegible'
const TITLE_FONT_STYLE = `${TITLE_FONT_WEIGHT} ${TITLE_FONT_SIZE}px ${TITLE_FONT_FAMILY}`
const FOOTER_TEXT_COLOR = '#cbf0f8'
const FOOTER_BOTTOM_DISTANCE = 48
const FOOTER_FONT_SIZE = 48
const FOOTER_FONT_WEIGHT = 'bold'
const FOOTER_FONT_FAMILY = 'sans-serif'
const FOOTER_FONT_STYLE = `${FOOTER_FONT_WEIGHT} ${FOOTER_FONT_SIZE}px ${FOOTER_FONT_FAMILY}`
const FOOTER_LINE_COLOR = '#cbf0f8'
const FOOTER_LINE_WIDTH = 80
const FOOTER_LINE_STROKE_SIZE = 4

function coverBounds(
  img: CanvasImage,
  width: number,
  height: number,
): [number, number, number, number] {
  const widthRatio = width / (img.width as number)
  const heightRatio = height / (img.height as number)

  if (widthRatio > heightRatio) {
    const newWidth = img.width * widthRatio
    const newHeight = img.height * widthRatio
    const posX = (width - newWidth) / 2
    const posY = (height - newHeight) / 2
    return [posX, posY, newWidth, newHeight]
  }

  const newWidth = img.width * heightRatio
  const newHeight = img.height * heightRatio
  const posX = (width - newWidth) / 2
  const posY = (height - newHeight) / 2
  return [posX, posY, newWidth, newHeight]
}

export async function GET({ props }: GetParams) {
  registerFont(TITLE_FONT_FILE, {
    family: TITLE_FONT_FAMILY,
    weight: TITLE_FONT_WEIGHT,
  })
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  // Draw cover image
  if (props.image) {
    // HACK: loads the content of the image to be able to draw it in the canvas
    // it would be nice if astro gave us a way to get the image content from an AstroImage
    let imageUrl: URL
    if (props.image.src.startsWith('/@fs')) {
      // dev server
      imageUrl = new URL(`file://${props.image.src.replace('/@fs', '')}`)
    } else {
      // prod server
      imageUrl = new URL(
        `file://${path.join(
          __dirname,
          '..',
          '..',
          '..',
          'dist',
          props.image.src,
        )}`,
      )
    }
    const image = await loadImage(imageUrl.pathname)
    ctx.drawImage(image, ...coverBounds(image, WIDTH, HEIGHT))
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  gradient.addColorStop(0, '#00000055')
  gradient.addColorStop(1, '#000000FF')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // Draw title lines
  ctx.font = TITLE_FONT_STYLE
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = TITLE_COLOR
  const lines = split(
    ctx as unknown as CanvasRenderingContext2D,
    props.title,
    TITLE_FONT_STYLE,
    WIDTH - TEXT_PADDING_X * 2,
    true,
  )
  const textBoxHeight = 48 * lines.length
  let y = (HEIGHT - textBoxHeight) / 2
  for (const line of lines) {
    ctx.fillText(line, WIDTH / 2, y)
    y += TITLE_FONT_SIZE
  }

  // Draw line at the bottom
  ctx.beginPath()
  const footerLineY =
    HEIGHT -
    FOOTER_BOTTOM_DISTANCE * 2 -
    FOOTER_FONT_SIZE -
    FOOTER_LINE_STROKE_SIZE
  const footerLineStartX = WIDTH / 2 - FOOTER_LINE_WIDTH / 2
  const footerLineEndX = WIDTH / 2 + FOOTER_LINE_WIDTH / 2
  ctx.moveTo(footerLineStartX, footerLineY)
  ctx.lineTo(footerLineEndX, footerLineY)
  ctx.strokeStyle = FOOTER_LINE_COLOR
  ctx.lineWidth = FOOTER_LINE_STROKE_SIZE
  ctx.stroke()

  // Draw loige.co text at the bottom
  ctx.font = FOOTER_FONT_STYLE
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillStyle = FOOTER_TEXT_COLOR
  ctx.fillText('loige.co', WIDTH / 2, HEIGHT - FOOTER_BOTTOM_DISTANCE)

  const responseBytes = await consumers.arrayBuffer(canvas.createPNGStream())
  return new Response(responseBytes, {
    headers: { 'Content-Type': 'image/png' },
  })
}

export async function getStaticPaths() {
  // TODO: add other collections and pages
  const allBlogPosts = await getCollection('posts')

  return allBlogPosts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
      props: {
        title: post.data.title,
        image: post.data.header_img,
      },
    }
  })
}
