import ProfileForm from "@/app/components/profile/profile-form";
import { getProfile } from "@/app/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const { error, result: profile } = await getProfile();

  if (error || !profile) {
    redirect("/login");
  }

  return (
    <div className="container flex justify-center py-5">
      <section className="flex flex-col items-center mb-8 w-[90%] justify-start min-h-[450px] px-5 py-4 rounded-3xl">
        <ProfileForm user={profile} />
      </section>
    </div>
  );
}
