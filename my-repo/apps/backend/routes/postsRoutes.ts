import { Hono } from 'hono'
import { db } from '../index'
import { postsTable } from '../db/schema'
import { eq } from 'drizzle-orm'

const postRouter = new Hono()

postRouter.get('/health', (c) => c.text('post route working!')) 

postRouter.post("/create", async (c) => {
    try {
        const { clerkID, image, description } = await c.req.json()

        if (!clerkID || !image || !description) {
            return c.json({ msg: "Missing parameters" }, 400)
        }

        const response = await db.insert(postsTable).values({ clerkID, image, description })
        return c.json({ msg: response })
    } catch (error) {
        return c.json({ msg: "Error" }, 500)
    }
})

postRouter.get("/all", async (c) => {
    try {
        const response = await db.select().from(postsTable)
        return c.json({ msg: response })
    } catch (error) {
        return c.json({ msg: "Error" }, 500)
    }
})

postRouter.post("/myposts", async (c) => {
    try {
        const { clerkID } = await c.req.json()

        if (!clerkID) {
            return c.json({ msg: "Missing parameter: clerkID" }, 400)
        }

        const response = await db.select().from(postsTable).where(eq(postsTable.clerkID, clerkID))
        return c.json({ msg: response })
    } catch (error) {
        return c.json({ msg: "Error" }, 500)
    }
})

postRouter.post("/update", async (c) => {
    try {
        const { postID, description } = await c.req.json()

        if (!postID || !description) {
            return c.json({ msg: "Missing parameters" }, 400)
        }

        const response = await db.update(postsTable).set({ description }).where(eq(postsTable.postID, postID))
        return c.json({ msg: response })
    } catch (error) {
        return c.json({ msg: "Error" }, 500)
    }
})

postRouter.post("/delete", async (c) => {
    try {
        const { postID } = await c.req.json()

        if (!postID) {
            return c.json({ msg: "Missing parameter: postID" }, 400)
        }

        const response = await db.delete(postsTable).where(eq(postsTable.postID, postID))
        return c.json({ msg: response })
    } catch (error) {
        return c.json({ msg: "Error" }, 500)
    }
})

export default postRouter