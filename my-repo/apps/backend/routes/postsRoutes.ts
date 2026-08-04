import { Hono } from 'hono'
import { db } from '../index'
import { postsTable } from '../db/schema'
import { eq } from 'drizzle-orm'

const postRouter = new Hono()

postRouter.get('/health', (c) => c.text('User route working!')) 
postRouter.post("/create",async (c) => {
    const {clerkID,image,description} = await c.req.json()
    const response = await db.insert(postsTable).values({clerkID,image,description})
    return c.json(
        {"msg":response}
    )
})

postRouter.get("/all",async (c) => {
    const response = await db.select().from(postsTable)
    return c.json(
        {"msg":response}
    )
})

postRouter.post("/myposts",async (c) => {
    const {clerkID} = await c.req.json()
    const response = await db.select().from(postsTable).where(eq(postsTable.clerkID,clerkID))
    return c.json(
        {"msg":response}
    )
})

postRouter.post("/update",async (c) => {
    const {postID,description} = await c.req.json()
    const response = await db.update(postsTable).set({description}).where(eq(postsTable.postID,postID))

    return c.json(
        {"msg":response}
    )
})

postRouter.post("/delete",async (c) => {
    const {postID} = await c.req.json()
    const response = await db.delete(postsTable).where(eq(postsTable.postID,postID))
    
    return c.json(
        {"msg":response}
    )
})


export default postRouter
