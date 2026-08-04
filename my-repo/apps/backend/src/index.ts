import { Hono } from 'hono'
import userRouter from '../routes/userRoutes'
import { cors } from 'hono/cors'
import postRouter from '../routes/postsRoutes'

const app = new Hono()
app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/users', userRouter)
app.route('/posts',postRouter)

export default { 
  port: 8080, 
  fetch: app.fetch, 
} 
