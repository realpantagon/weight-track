import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono on Cloudflare Worker!'))

app.get('/api/weights', (c) => {
  return c.json([
    { id: 1, weight: 70, recorded_at: '2025-09-12' },
    { id: 2, weight: 71, recorded_at: '2025-09-11' },
  ])
})

export default app
