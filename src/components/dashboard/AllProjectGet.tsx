"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Project } from "@/types";

function AllProjectGet({ project }: { project: Project }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/${project._id}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      toast.success("Project deleted successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    toast("Update functionality coming soon");
  };

  return (
    <tr className="grid grid-cols-2 border-2 border-gray-400 rounded-lg mb-4">
      {/* Project Title */}
      <td className="px-6 py-4 text-sm text-gray-200 font-medium text-left">
        {project.title}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-sm">
        <div className="flex justify-end gap-2">
          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="inline-flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
            disabled={isDeleting}
          >
            <Edit size={16} />
            <span>Update</span>
          </button>

          {/* Delete Button with AlertDialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
                disabled={isDeleting}
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-600">
                  Are you sure you want to delete this project?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  This action cannot be undone. The project will be permanently
                  removed.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
}

export default AllProjectGet;
