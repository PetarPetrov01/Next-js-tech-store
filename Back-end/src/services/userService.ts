import { prisma } from "../config/db-config";

async function getProfile(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { email: true, username: true, id: true, image: true },
  });
}

async function getProfileImage(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { image: true },
  });

  return user?.image;
}

const userService = {
  getProfile,
  getProfileImage,
};

export default userService;
