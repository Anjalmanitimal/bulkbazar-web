import UserGuard from "@/app/(public)/components/guards/UserGuard";
import ProfileForm from "./profile-form";

export default function ProfilePage() {
  return (
    <UserGuard>
      <ProfileForm />
    </UserGuard>
  );
}
