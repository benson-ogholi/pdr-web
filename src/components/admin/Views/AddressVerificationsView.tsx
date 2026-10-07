import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressVerifications,
  updateAddressVerificationStatus,
} from "../../../api/slices/adminDataSlice";

export const AddressVerificationsView: React.FC = () => {
  const dispatch = useDispatch<any>();

  const {
    addressVerifications = [],
    loading,
    actionLoading,
    pagination,
    error,
  } = useSelector((state: any) => state.adminData);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State Management for Document View
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // Modal State Management for Rejection
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    userId: string | null;
    userName: string;
  }>({
    isOpen: false,
    userId: null,
    userName: "",
  });

  const [reasonInput, setReasonInput] = useState("");

  useEffect(() => {
    dispatch(
      fetchAddressVerifications({
        page: currentPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, currentPage]);

  const openRejectModal = (userId: string, userName: string) => {
    setReasonInput("");
    setStatusModal({
      isOpen: true,
      userId,
      userName,
    });
  };

  const handleConfirmReject = async () => {
    if (!statusModal.userId || !reasonInput.trim()) return;

    await dispatch(
      updateAddressVerificationStatus({
        userId: statusModal.userId,
        status: "failed",
        rejectionReason: reasonInput.trim(),
      })
    );

    setStatusModal({
      isOpen: false,
      userId: null,
      userName: "",
    });
    setReasonInput("");
  };

  const handleApprove = (userId: string) => {
    dispatch(
      updateAddressVerificationStatus({
        userId,
        status: "approved",
      })
    );
  };

  const collectionPagination = pagination["address-verifications"] || {
    total: 0,
    page: 1,
    count: 0,
  };
  const totalPages = Math.ceil(collectionPagination.total / itemsPerPage) || 1;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-zinc-100">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Address Verification Queue
          </h2>
          <p className="text-sm text-zinc-500">
            Review user proof of address, utility bill uploads, and location
            verification statuses.
          </p>
        </div>
        <div className="text-xs bg-zinc-100 text-zinc-600 px-3 py-1.5 rounded-md font-medium">
          Total Submissions: {collectionPagination.total}
        </div>
      </div>

      {/* Errors Alerts */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Main Table Interface */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4">Address Details</th>
                <th className="px-6 py-4">Utility Bill Document</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-20 text-zinc-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin"></div>
                      <span>Loading address verification records...</span>
                    </div>
                  </td>
                </tr>
              ) : addressVerifications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-20 text-zinc-400">
                    No pending or processed address verifications found.
                  </td>
                </tr>
              ) : (
                addressVerifications.map((item: any) => {
                  const userName = item.user?.fullName || "Unknown User";
                  const profileImg = item.user?.profileImage;
                  const userId = item.user?._id || item._id;

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {profileImg ? (
                            <img
                              src={profileImg}
                              alt="Profile"
                              onClick={() =>
                                setSelectedImage({
                                  url: profileImg,
                                  title: `${userName} - Profile Image`,
                                })
                              }
                              className="w-10 h-10 rounded-full object-cover border border-zinc-200 cursor-pointer hover:opacity-80 transition"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-500 uppercase">
                              {userName.slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-zinc-900">
                              {userName}
                            </div>
                            <div className="text-xs text-zinc-500 mt-0.5">
                              {item.user?.email || "N/A"}
                            </div>
                            <div className="text-xs text-zinc-400 mt-0.5">
                              {item.user?.phone || "No Phone"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Address Details */}
                      <td className="px-6 py-4">
                        <div className="text-zinc-800 font-medium max-w-xs">
                          {item.address || "No address provided"}
                        </div>
                        {item.submittedAt && (
                          <div className="text-xs text-zinc-400 mt-1">
                            Submitted:{" "}
                            {new Date(item.submittedAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>

                      {/* Utility Bill Document */}
                      <td className="px-6 py-4 text-xs">
                        {item.utilityBillUrl ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedImage({
                                  url: item.utilityBillUrl,
                                  title: `${userName} - Utility Bill Proof`,
                                })
                              }
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-700 hover:bg-zinc-200 transition font-medium cursor-pointer"
                            >
                              <span>View Utility Bill</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-zinc-400 italic">
                            No document uploaded
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            item.status === "approved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : item.status === "failed" ||
                                item.status === "rejected"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              item.status === "approved"
                                ? "bg-emerald-500"
                                : item.status === "failed" ||
                                  item.status === "rejected"
                                ? "bg-rose-500"
                                : "bg-amber-500"
                            }`}
                          />
                          <span className="capitalize">
                            {item.status === "approved"
                              ? "Verified"
                              : item.status === "failed" ||
                                item.status === "rejected"
                              ? "Failed"
                              : "Pending Review"}
                          </span>
                        </span>
                        {item.rejectionReason && (
                          <p
                            className="text-xs text-rose-600 mt-1 max-w-[180px] truncate"
                            title={item.rejectionReason}
                          >
                            Reason: {item.rejectionReason}
                          </p>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4 text-right">
                        <div
                          className="flex justify-end gap-2"
                          data-disabled={actionLoading}
                        >
                          {item.status !== "approved" && (
                            <button
                              disabled={actionLoading}
                              onClick={() => handleApprove(userId)}
                              className="px-2.5 py-1.5 bg-zinc-950 text-white rounded-md text-xs font-medium hover:bg-zinc-800 transition shadow-sm disabled:opacity-50 cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {item.status !== "failed" &&
                            item.status !== "rejected" && (
                              <button
                                disabled={actionLoading}
                                onClick={() =>
                                  openRejectModal(userId, userName)
                                }
                                className="px-2.5 py-1.5 bg-white text-rose-600 border border-rose-200 rounded-md text-xs font-medium hover:bg-rose-50 transition disabled:opacity-50 cursor-pointer"
                              >
                                Reject
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            Showing Page{" "}
            <span className="font-semibold text-zinc-800">
              {collectionPagination.page}
            </span>{" "}
            of <span className="font-semibold text-zinc-800">{totalPages}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1.5 border border-zinc-200 rounded-md bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 transition cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || loading}
              className="px-3 py-1.5 border border-zinc-200 rounded-md bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Document Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
              <h3 className="text-sm font-semibold text-zinc-800">
                {selectedImage.title}
              </h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold px-2 rounded-lg cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="flex justify-center max-h-[70vh] overflow-auto rounded-lg bg-zinc-900/5 p-2">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain rounded-md"
              />
            </div>
            <div className="flex justify-end pt-2">
              <a
                href={selectedImage.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Open full resolution document &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {statusModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() =>
            setStatusModal({
              isOpen: false,
              userId: null,
              userName: "",
            })
          }
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-lg font-bold text-zinc-900">
                Reject Address Verification
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Please provide a reason for declining address verification for{" "}
                <span className="font-semibold text-zinc-700">
                  {statusModal.userName}
                </span>
                .
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Reason / Explanation
              </label>
              <textarea
                rows={3}
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                placeholder="Type reason (e.g. Utility bill name does not match user account)..."
                className="w-full text-sm p-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  setStatusModal({
                    isOpen: false,
                    userId: null,
                    userName: "",
                  })
                }
                className="px-4 py-2 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!reasonInput.trim() || actionLoading}
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-50 cursor-pointer"
              >
                {actionLoading ? "Updating..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
