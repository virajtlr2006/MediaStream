import { Hono } from 'hono'
import { db } from '../index'
import { usersTable } from '../db/schema'
import { eq } from 'drizzle-orm'

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

userRouter.get("/getuser", async (c) => {
    const clerkID = c.req.query('clerkID')
    
    if (!clerkID) {
        return c.json({ error: "clerkID query param is required" }, 400)
    }

    const response = await db.select().from(usersTable).where(eq(usersTable.clerkID, clerkID))
    return c.json({ "msg": response })
})


export default userRouter
