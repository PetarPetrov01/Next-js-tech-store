import { prisma } from "../config/db-config";

async function getProfile(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: { email: true, username: true, id: true, image: true },
    });
  }

const userService = {
    getProfile
}

export default userService