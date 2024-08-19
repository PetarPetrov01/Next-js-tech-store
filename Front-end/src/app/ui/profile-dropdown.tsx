import { User } from "@/types/User";

export default function ProfileDropdown({user}:{user: User}){
    return (
        <div className="absolute right-0 top-[105%] min-w-40 min-h-60 bg-gray-50 rounded-md px-4 py-2">
            <h3 className="relative text-new-teal font-bold after:absolute after:left-[-1rem] after:top-[calc(100%+0.2rem)] after:h-[1px] after:bg-new-teal after:w-[calc(100%+2rem)]">{user.username}</h3>
        </div>
    ) 
}