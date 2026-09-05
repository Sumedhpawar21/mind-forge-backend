import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client.js"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

const plans = [
  {
    name: "Free",
    description:
      "Get started at no cost with 3 AI messages. Ideal for a quick first look at the assistant before upgrading.",
    price: 0,
    max_messages: 3,
  },
  {
    name: "Starter",
    description:
      "Perfect for trying things out. Get 5 AI messages to explore chats and see how the assistant works — ideal for light, one-off questions.",
    price: 100,
    max_messages: 5,
  },
  {
    name: "Plus",
    description:
      "A solid everyday plan with 20 AI messages. Great for regular conversations, drafting, and getting more done without upgrading to the top tier.",
    price: 300,
    max_messages: 20,
  },
  {
    name: "Pro",
    description:
      "Our most generous plan with 40 AI messages. Built for power users who chat often, iterate on ideas, and need room to explore longer threads.",
    price: 500,
    max_messages: 40,
  },
]

async function main() {
  const existing = await prisma.plans.count()
  if (existing > 0) {
    console.log(`Plans already exist (${existing}). Skipping seed.`)
    return
  }

  const created = await prisma.plans.createMany({ data: plans })
  console.log(`Seeded ${created.count} plans.`)
}

main()
  .catch((error) => {
    console.error("Seed failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
