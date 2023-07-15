import UserDetails from "@/components/UserDetails"

const Profile = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl font-bold mb-10'>Profile</h1>
        <UserDetails />
    </div>
  )
}

export default Profile