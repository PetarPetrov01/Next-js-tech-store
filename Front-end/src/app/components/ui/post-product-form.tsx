export default function PostProductForm({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} className="w-1/2 flex flex-col gap-4">
      <div className="w-full flex justify-between gap-10">
        <h2 className="basis-[30%]">Category:</h2>
      </div>
    </form>
  );
}
