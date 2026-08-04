import { Hono } from 'hono'
import { db } from '../index'
import { usersTable } from '../db/schema'

const userRouter = new Hono()

userRouter.get('/health', (c) => c.text('User route working!')) // GET /book

userRouter.post("/new",async (c) => {
    const {clerkID,username,email} = await c.req.json()
    // console.log(clerkID,username,email)
    const response = await db.insert(usersTable).values({clerkID,username,email})
    return c.json(
        {"msg":response}
    )
})


export default userRouter
