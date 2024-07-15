import ProfileForm from "@/app/ui/profile-form";

export default async function Profile({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <main className="flex justify-center bg-gradient-to-b from-[#03045e] via-[#090b7d] to-[#03045e]">
      <div className="container max-w-[1400px] flex justify-center py-5">
        <section className="register flex flex-col items-center mb-8 justify-start min-h-[450px] px-5 py-4 rounded-3xl bg-gradient-to-tr from-[#00b4d833] via-[#00b4d811] to-[#00b4d833] w-[40%] border-lightblue border shadow-[0_0_15px_2px_rgba(0,180,216,0.3)]">
          <ProfileForm />
        </section>
      </div>
    </main>
  );
}
