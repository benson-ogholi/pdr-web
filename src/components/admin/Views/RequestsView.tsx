import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Mail,
  Phone,
  Package,
  Car,
  Truck,
  Users as UsersIcon,
  Layers,
  BadgeCheck,
  Clock,
  CircleDot,
  CheckCircle2,
  XCircle,
  TimerOff,
} from "lucide-react";
import type { AppDispatch, RootState } from "../../../api/store";
import { fetchAdminData } from "../../../api/slices/adminDataSlice";

// Every request in the unified schema is one of these four flows.
type RequestType =
  | "all"
  | "join-ride"
  | "offer-ride"
  | "send-package"
  | "deliver-package";

// Full lifecycle from the Request model's status enum.
type RequestStatus =
  | "all"
  | "pending"
  | "assigned"
  | "in_progress"
  | "completed"
  | "confirmed"
  | "cancelled"
  | "expired";

const TYPE_TABS: { value: RequestType; label: string; icon: any }[] = [
  { value: "all", label: "All Types", icon: Layers },
  { value: "join-ride", label: "Join Ride", icon: UsersIcon },
  { value: "offer-ride", label: "Offer Ride", icon: Car },
  { value: "send-package", label: "Send Package", icon: Package },
  { value: "deliver-package", label: "Deliver Package", icon: Truck },
];

const STATUS_TABS: { value: RequestStatus; label: string; icon: any }[] = [
  { value: "all", label: "All Statuses", icon: Layers },
  { value: "pending", label: "Pending", icon: Clock },
  { value: "assigned", label: "Assigned", icon: CircleDot },
  { value: "in_progress", label: "In Progress", icon: Loader2 },
  { value: "completed", label: "Completed", icon: BadgeCheck },
  { value: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { value: "cancelled", label: "Cancelled", icon: XCircle },
  { value: "expired", label: "Expired", icon: TimerOff },
];

const STATUS_BADGE_STYLES: Record<string, string> = {
  pending: "bg-zinc-100 text-zinc-600",
  assigned: "bg-blue-50 text-blue-700 border border-blue-200",
  in_progress: "bg-amber-100 text-amber-800 border border-amber-200",
  completed: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  confirmed: "bg-emerald-600 text-white",
  cancelled: "bg-red-100 text-red-800 border border-red-200",
  expired: "bg-zinc-200 text-zinc-500",
};

const TYPE_BADGE_STYLES: Record<string, string> = {
  "join-ride": "bg-blue-50 text-blue-700",
  "offer-ride": "bg-purple-50 text-purple-700",
  "send-package": "bg-orange-50 text-orange-700",
  "deliver-package": "bg-teal-50 text-teal-700",
};

const formatLabel = (value?: string) =>
  (value || "unknown")
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const RequestsView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, loading, pagination } = useSelector(
    (state: RootState) => state.adminData
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<RequestType>("all");
  const [activeStatus, setActiveStatus] = useState<RequestStatus>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const limit = 10;

  // Re-fetch straight from the unified /requests endpoint whenever page,
  // type, or status changes — filtering happens server-side via ?type= /
  // ?status= so pagination totals stay accurate per filter combination.
  useEffect(() => {
    dispatch(
      fetchAdminData({
        collection: "requests",
        page: currentPage,
        limit,
        type: activeType !== "all" ? activeType : undefined,
        status: activeStatus !== "all" ? activeStatus : undefined,
      })
    );
  }, [dispatch, currentPage, activeType, activeStatus]);

  // Quick summary counters off the current fetched page (mirrors the same
  // pattern used on the Users view).
  const metrics = useMemo(() => {
    const rawList = requests || [];
    const activeCount = rawList.filter((r: any) =>
      ["assigned", "in_progress"].includes(r.status)
    ).length;
    const completedCount = rawList.filter((r: any) =>
      ["completed", "confirmed"].includes(r.status)
    ).length;

    return {
      total: pagination["requests"]?.total || 0,
      activeOnPage: activeCount,
      completedOnPage: completedCount,
    };
  }, [requests, pagination]);

  const availableYears = useMemo(() => {
    if (!requests || !Array.isArray(requests)) return [];
    const yearsSet = new Set<string>();
    requests.forEach((request: any) => {
      if (request.createdAt) {
        const year = new Date(request.createdAt).getFullYear().toString();
        if (year && year !== "NaN") yearsSet.add(year);
      }
    });
    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }, [requests]);

  // Client-side layer on top of the server-filtered page: text search + the
  // month/year calendar filters (type/status are already applied server-side).
  const filteredRequests = (requests || []).filter((request: any) => {
    if (searchTerm.trim() !== "") {
      const query = searchTerm.toLowerCase().trim();
      const requester = request.userId || {};
      const matchName = requester.fullName?.toLowerCase().includes(query);
      const matchEmail = requester.email?.toLowerCase().includes(query);
      const matchPhone = requester.phone?.includes(query);
      const matchPickup = request.pickupLocation?.address
        ?.toLowerCase()
        .includes(query);
      const matchDelivery = request.deliveryLocation?.address
        ?.toLowerCase()
        .includes(query);

      if (
        !matchName &&
        !matchEmail &&
        !matchPhone &&
        !matchPickup &&
        !matchDelivery
      )
        return false;
    }

    if (request.createdAt) {
      const recordDate = new Date(request.createdAt);

      if (selectedMonth !== "all") {
        const recordMonth = recordDate.getMonth().toString();
        if (recordMonth !== selectedMonth) return false;
      }

      if (selectedYear !== "all") {
        const recordYear = recordDate.getFullYear().toString();
        if (recordYear !== selectedYear) return false;
      }
    } else if (selectedMonth !== "all" || selectedYear !== "all") {
      return false;
    }

    return true;
  });

  const totalPages = Math.ceil((pagination["requests"]?.total || 0) / limit);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleTypeChange = (type: RequestType) => {
    setActiveType(type);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: RequestStatus) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Metric Overview Analytics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Total Requests
            </p>
            <h3 className="text-2xl font-bold text-zinc-900 font-mono">
              {metrics.total}
            </h3>
          </div>
          <div className="p-3 bg-zinc-100 text-zinc-700 rounded-xl">
            <Layers size={20} />
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Active On Page
            </p>
            <h3 className="text-2xl font-bold text-amber-600 font-mono">
              {metrics.activeOnPage}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <CircleDot size={20} />
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Completed On Page
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 font-mono">
              {metrics.completedOnPage}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <BadgeCheck size={20} />
          </div>
        </div>
      </div>

      {/* Type Toggle Row */}
      <div className="flex flex-wrap items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200 w-fit">
        {TYPE_TABS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleTypeChange(value)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeType === value
                ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/50"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Status Toggle Row */}
      <div className="flex flex-wrap items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200 w-fit">
        {STATUS_TABS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleStatusChange(value)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeStatus === value
                ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/50"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Search + Calendar Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch border-b border-zinc-100 pb-5">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by requester, email, phone, or address..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
          />
        </div>

        <div className="w-full md:w-40">
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white text-zinc-700 transition-all cursor-pointer"
          >
            <option value="all">All Months</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>

        <div className="w-full md:w-32">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white text-zinc-700 transition-all cursor-pointer"
          >
            <option value="all">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading / Empty / Table States */}
      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-3 text-zinc-500">
          <Loader2 className="animate-spin text-black" size={32} />
          <p className="text-sm font-medium">Fetching request records...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="h-96 flex flex-col items-center justify-center text-zinc-500 border border-dashed border-zinc-200 rounded-xl">
          <p className="text-base font-semibold text-black mb-1">
            No matching requests found
          </p>
          <p className="text-sm text-zinc-400">
            Try adjusting the type/status toggles, keyword, or date range.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle px-6">
              <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
                <thead>
                  <tr className="text-zinc-500 font-medium">
                    <th scope="col" className="pb-4 font-semibold">
                      Requester
                    </th>
                    <th scope="col" className="pb-4 font-semibold">
                      Type
                    </th>
                    <th scope="col" className="pb-4 font-semibold">
                      Route
                    </th>
                    <th scope="col" className="pb-4 font-semibold">
                      Status
                    </th>
                    <th scope="col" className="pb-4 font-semibold">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 whitespace-nowrap">
                  {filteredRequests.map((request: any) => {
                    const requester = request.userId || {};
                    const price =
                      request.finalPrice || request.agreedPrice || 0;

                    return (
                      <tr
                        key={request._id}
                        className="hover:bg-zinc-50/70 transition-colors group"
                      >
                        {/* Requester Identity */}
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-900 text-white font-bold rounded-full flex items-center justify-center uppercase text-sm ring-2 ring-zinc-100 overflow-hidden shrink-0">
                              {requester.profileImage ? (
                                <img
                                  src={requester.profileImage}
                                  alt={requester.fullName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                requester.fullName?.charAt(0) || "?"
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-zinc-900">
                                {requester.fullName || "Unknown"}
                              </div>
                              <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                                <Mail size={11} className="text-zinc-400" />
                                {requester.email || "N/A"}
                              </div>
                              {requester.phone && (
                                <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                                  <Phone size={11} className="text-zinc-400" />
                                  {requester.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Type Badge */}
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-0.5 text-[11px] font-bold rounded ${
                              TYPE_BADGE_STYLES[request.type] ||
                              "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {formatLabel(request.type)}
                          </span>
                        </td>

                        {/* Route */}
                        <td className="py-4 px-4">
                          <div className="max-w-[220px] text-zinc-600 text-xs font-medium space-y-1">
                            <div className="flex items-center gap-1 truncate">
                              <MapPin
                                size={12}
                                className="text-emerald-500 shrink-0"
                              />
                              <span className="truncate">
                                {request.pickupLocation?.address || "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 truncate">
                              <MapPin
                                size={12}
                                className="text-red-400 shrink-0"
                              />
                              <span className="truncate">
                                {request.deliveryLocation?.address || "N/A"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-0.5 text-[11px] font-bold rounded ${
                              STATUS_BADGE_STYLES[request.status] ||
                              "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {formatLabel(request.status)}
                          </span>
                        </td>

                        {/* Price + Paid State */}
                        <td className="py-4 px-4">
                          <div className="text-zinc-900 font-bold text-xs">
                            ₦{Number(price).toLocaleString()}
                          </div>
                          <div
                            className={`text-[10px] font-semibold uppercase mt-0.5 ${
                              request.isPaid
                                ? "text-emerald-600"
                                : "text-zinc-400"
                            }`}
                          >
                            {request.isPaid ? "Paid" : "Unpaid"}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-100 pt-5 mt-4 gap-4">
            <p className="text-xs font-medium text-zinc-500">
              Showing{" "}
              <span className="text-black font-semibold">
                {filteredRequests.length}
              </span>{" "}
              entries this page out of{" "}
              <span className="text-black font-semibold">
                {pagination["requests"]?.total || 0}
              </span>{" "}
              matching requests.
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className="p-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="text-xs font-bold px-3 py-1.5 bg-zinc-100 border border-zinc-200 rounded-lg">
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={handleNextPage}
                className="p-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
