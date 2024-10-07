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
}
export default { addToWishList, removeFromWishList };
