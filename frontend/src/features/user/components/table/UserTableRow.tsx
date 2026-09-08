import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../domain/entities/user.entity";
import { Modal } from "../../../../components/modal/Modal";
import { deleteUser } from "../../user.api";
import { useNotification } from "../../../../notifications/use-notification.context";

export const UserTableRow = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(user.id);
      showSuccess("User deleted successfully");

      setIsDeleteModalOpen(false);
    } catch (error) {
      showError("The user was not deleted");
      console.error("Unable to delete user:", error);
    }
  };

  return (
    <>
      <tr className="transition-colors hover:bg-gray-50">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>

            <div>
              <p className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>

              <p className="text-xs text-gray-500">
                ID: {user.id.slice(0, 8)}...
              </p>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>

        <td className="px-6 py-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              user.role === "ADMIN"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role}
          </span>
        </td>

        <td className="px-6 py-4">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleEdit}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDeleteClick}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete user"
        message={`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};
