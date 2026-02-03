import AdminGuard from "@/app/(public)/components/guards/AdminGuard";
import UsersTable from "./users-table";

export default function UsersPage() {
  return (
    <AdminGuard>
      <UsersTable />
    </AdminGuard>
  );
}
