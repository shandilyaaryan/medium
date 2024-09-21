import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@shandilyaaryan/medium-common'

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string
	}
}>();


userRouter.post('/signup', async (c) =>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success){
    c.status(411);
    return c.json({
        msg: "Inputs are not correct"
    })
  }

  try{
    const user = await prisma.user.create({
      data: {
            email: body.email,
            password: body.password
      },
    })
    
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
  
    return c.text(
      token
    )
  } catch(e) {
    c.status(403)
    return c.text("Invalid Credentials")
  }
})

userRouter.post('/signin', async (c) =>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const { success } = signinInput.safeParse(body);
  if (!success){
    c.status(411);
    return c.json({
        msg: "Inputs are not correct"
    })
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if (!user) {
    c.status(403)
    return c.json({
      msg: "User not found"
    })
  }

  const jwt = await sign({ id: user.id}, c.env.JWT_SECRET)
  return c.text( jwt )
})