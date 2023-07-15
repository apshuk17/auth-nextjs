import Header from "@/components/Header"

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default ProfileLayout