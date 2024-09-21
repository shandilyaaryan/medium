import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@shandilyaaryan/medium-common";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

postRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);

  if (user && typeof user.id === "string") {
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.text("Not looged in!")
  }
  } catch(e) {
    c.status(403);
    return c.text("Not logged in or Server error")
  }
});

postRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success){
    c.status(411);
    return c.json({
        msg: "Inputs are not correct"
    })
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({
    id: post.id,
  });
});

postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success){
    c.status(411);
    return c.json({
        msg: "Inputs are not correct"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ post });
  } catch (e) {
    c.status(404);
    return c.json({ error: "Post not found or could not be updated" });
  }
});

postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      } 
    }
  });

  return c.json({
    posts,
  });
});

postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post) {
      return c.json({ post });
    } else {
      c.status(404);
      return c.json({ error: "Post not found" });
    }
  } catch (e) {
    c.status(500);
    return c.json({ error: "Server error" });
  }
});


