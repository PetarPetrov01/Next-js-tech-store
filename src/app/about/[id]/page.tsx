export default function ProductDetails({ params }: { params: { id: string } }) {
  return <main>{params.id}</main>;
}
