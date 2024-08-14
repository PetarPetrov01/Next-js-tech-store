import { prisma } from "../config/db-config";

async function getProfile(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      id: true,
      image: true,
    },
  });
}

async function getProfileImage(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { image: true },
  });

  return user?.image;
}

async function updateUsername(id: string, username: string) {
  const newUser = await prisma.user.update({
    where: { id },
    data: {
      username,
    },
  });

  return newUser;
}

const userService = {
  getProfile,
  getProfileImage,
  updateUsername,
};

export default userService;
