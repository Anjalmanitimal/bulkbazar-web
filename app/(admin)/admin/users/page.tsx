import UsersTable from "./users-table";

export default function AdminUsersPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>

        <a
          href="/admin/users/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create User
        </a>
      </div>

      <UsersTable />
    </div>
  );
}
