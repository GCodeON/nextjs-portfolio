import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

const getSecret = (request, payloadSecret) => {
  const querySecret = request.nextUrl.searchParams.get('secret')
  const authHeader = request.headers.get('authorization') || ''
  const bearerSecret = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''

  return querySecret || bearerSecret || payloadSecret || ''
}

export async function POST(request) {
  const expectedSecret = process.env.REVALIDATE_SECRET || ''

  if (!expectedSecret) {
    return NextResponse.json({ ok: false, message: 'REVALIDATE_SECRET is not configured.' }, { status: 500 })
  }

  let payload = {}
  try {
    payload = await request.json()
  } catch {
    payload = {}
  }

  const receivedSecret = getSecret(request, payload?.secret)

  if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: 'Invalid secret.' }, { status: 401 })
  }

  const slug = payload?.slug?.current || payload?.slug || ''

  revalidatePath('/')
  revalidatePath('/blog')

  if (slug) {
    revalidatePath(`/blog/${slug}`)
  }

  return NextResponse.json({
    ok: true,
    revalidated: ['/', '/blog', slug ? `/blog/${slug}` : null].filter(Boolean)
  })
}

export async function GET(request) {
  const expectedSecret = process.env.REVALIDATE_SECRET || ''
  const receivedSecret = request.nextUrl.searchParams.get('secret') || ''

  if (!expectedSecret) {
    return NextResponse.json({ ok: false, message: 'REVALIDATE_SECRET is not configured.' }, { status: 500 })
  }

  if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: 'Invalid secret.' }, { status: 401 })
  }

  revalidatePath('/')
  revalidatePath('/blog')

  return NextResponse.json({ ok: true, revalidated: ['/', '/blog'] })
}