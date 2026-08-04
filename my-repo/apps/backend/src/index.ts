import { Hono } from 'hono'
import userRouter from '../routes/userRoutes'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/users', userRouter)

export default { 
  port: 8080, 
  fetch: app.fetch, 
} 
