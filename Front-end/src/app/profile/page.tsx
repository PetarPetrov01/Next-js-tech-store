import ProfileForm from "@/app/ui/profile-form";
import { useAuthContext } from "@/contexts/AuthProvider";
import { User } from "@/types/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  //Fetch profile
  const res = await fetch('http://localhost:3001/api/auth/profile',{
    method: 'GET',
    credentials: 'include',
    headers: {Cookie: cookies().toString()},
    cache: "no-store",
  })

  if(!res.ok){
    console.log('fail')
    redirect('/')
  }
  const profile: User = await res.json()

  console.log(profile)

  return (
    <main className="flex justify-center bg-gradient-radial from-new-teal to-new-gray">
      <div className="container max-w-[1400px] flex justify-center py-5">
        {/* <section className="flex flex-col items-center mb-8 justify-start min-h-[450px] px-5 py-4 rounded-3xl bg-gradient-to-tr from-[#00b4d833] via-[#00b4d811] to-[#00b4d833] w-[40%] border-lightblue border shadow-[0_0_15px_2px_rgba(0,180,216,0.3)]"> */}
        <section className="flex flex-col items-center mb-8 w-[90%] justify-start min-h-[450px] px-5 py-4 rounded-3xl">
          <ProfileForm user={profile}/>
        </section>
      </div>
    </main>
  );
}
