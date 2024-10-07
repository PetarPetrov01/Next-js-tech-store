import { prisma } from "../config/db-config";

async function addToWishList(userId: string, productId: string) {
  const wishlist = await prisma.wishlist.upsert({
    where: { userId },
    create: { userId, products: { connect: { id: productId } } },
    update: { products: { connect: { id: productId } } },
  });

  return wishlist;
}

async function removeFromWishList(userId: string, productId: string) {
  const updatedWishList = await prisma.wishlist.update({
    where: { userId },
    data: { products: { disconnect: { id: productId } } },
    include: { products: true },
  });

  return updatedWishList;
}

export default { addToWishList, removeFromWishList };
