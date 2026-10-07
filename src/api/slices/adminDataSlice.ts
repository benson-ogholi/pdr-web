// ==========================================
// adminDataSlice.ts - FULLY UPDATED VERSION
// ==========================================
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// ==========================================
// 1. ASYNC THUNKS (API REQUESTS)
// ==========================================

interface PaginatedResponse<T> {
    success: boolean;
    count: number;
    total: number;
    page: number;
    data: T[];
}

export const fetchAdminData = createAsyncThunk(
    "adminData/fetchAll",
    async (
        {
            collection,
            page = 1,
            limit = 10,
            type,
            status,
        }: {
            collection: string;
            page?: number;
            limit?: number;
            type?: string;
            status?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(limit),
            });
            if (type) params.set("type", type);
            if (status) params.set("status", status);

            const response = await axiosInstance.get<PaginatedResponse<any>>(
                `/padiman_route/admin/data/${collection}?${params.toString()}`
            );
            return { collection, responseData: response.data };
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || `Failed to fetch ${collection}`
            );
        }
    }
);

// Dedicated GET Thunk for Address Verifications (now supports ?status= param)
export const fetchAddressVerifications = createAsyncThunk(
    "adminData/fetchAddressVerifications",
    async (
        { page = 1, limit = 10, status }: { page?: number; limit?: number; status?: string } = {},
        { rejectWithValue }
    ) => {
        try {
            const params = new URLSearchParams({ page: String(page), limit: String(limit) });
            if (status) params.set("status", status);

            const response = await axiosInstance.get(
                `/padiman_route/admin/data/address-verifications?${params.toString()}`
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch address verifications"
            );
        }
    }
);

export const updateDriverStatus = createAsyncThunk(
    "adminData/updateDriverStatus",
    async (
        {
            id,
            status,
            rejectionReason,
        }: {
            id: string;
            status: "approved" | "rejected" | "failed" | "suspended";
            rejectionReason?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.put(
                `/padiman_route/admin/data/driver-submissions/${id}/status`,
                { status, rejectionReason }
            );
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update driver status"
            );
        }
    }
);

export const updateAddressVerificationStatus = createAsyncThunk(
    "adminData/updateAddressVerificationStatus",
    async (
        {
            userId,
            status,
            rejectionReason,
        }: {
            userId: string;
            status: "approved" | "rejected" | "failed";
            rejectionReason?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.put(
                `/padiman_route/admin/data/address-verifications/${userId}/status`,
                { status, rejectionReason }
            );
            // Fallback gracefully if backend returns response.data directly or response.data.data
            return response.data.data || response.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to update address verification status"
            );
        }
    }
);

export const updateWithdrawalStatus = createAsyncThunk(
    "adminData/updateWithdrawalStatus",
    async (
        { id, status }: { id: string; status: "success" | "failed" },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.put(
                `/padiman_route/admin/data/withdrawals/${id}/status`,
                { status }
            );
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update withdrawal status"
            );
        }
    }
);

export const fetchDashboardStats = createAsyncThunk(
    "adminData/fetchDashboardStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                "/padiman_route/admin/data/dashboard-statistics"
            );
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch dashboard metrics"
            );
        }
    }
);

// ==========================================
// 2. STATE INTERFACES & INITIAL STATE
// ==========================================

export interface DashboardStats {
    systemCounters: {
        users: number;
        activeDrivers: number;
        pendingDriverSubmissions: number;
        negotiations: number;
        totalRequests: number;
        activeRequestsInProgress: number;
        requestsByType: Record<string, number>;
        requestsByStatus: Record<string, number>;
    };
    financialSummaries: {
        grossVolumeInvoiced: number;
        liquidRevenueEarned: number;
        totalPaymentsProcessed: number;
        driverWalletBalancesEscrow: number;
        successfulPayoutsSettled: number;
        pendingPayoutsInQueue: number;
        adminCommissionEarned: number;
        paymentBreakdownDistribution: any[];
        totalWithdrawableBalances: number;
        escrowHeldEarnings: number;
        releasedEarnings: number;
    };
    charts: {
        historicalThirtyDayRevenue: any[];
        requestStatusPieChart: any[];
        requestTypePieChart: any[];
        negotiationComparisonMetrics: {
            successRatePercentage: number;
            totalNegotiationsCount: number;
            statusBreakdown: any[];
        };
    };
}

interface PaginationState {
    total: number;
    page: number;
    count: number;
}

interface AdminDataState {
    users: any[];
    requests: any[];
    payments: any[];
    negotiations: any[];
    driverSubmissions: any[];
    addressVerifications: any[];
    withdrawals: any[];
    commissions: any[];
    dashboardStats: DashboardStats | null;
    loading: boolean;
    actionLoading: boolean;
    statsLoading: boolean;
    error: string | null;
    pagination: Record<string, PaginationState>;
}

const initialState: AdminDataState = {
    users: [],
    requests: [],
    payments: [],
    negotiations: [],
    driverSubmissions: [],
    addressVerifications: [],
    withdrawals: [],
    commissions: [],
    dashboardStats: null,
    loading: false,
    actionLoading: false,
    statsLoading: false,
    error: null,
    pagination: {},
};

// ==========================================
// 3. REDUX SLICE CREATION & REDUCERS
// ==========================================

const adminDataSlice = createSlice({
    name: "adminData",
    initialState,
    reducers: {
        clearAdminError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch All Collections ---
            .addCase(fetchAdminData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                state.loading = false;
                const { collection, responseData } = action.payload;

                state.pagination[collection] = {
                    total: responseData.total,
                    page: responseData.page,
                    count: responseData.count,
                };

                switch (collection) {
                    case "users":
                        state.users = responseData.data;
                        break;
                    case "requests":
                        state.requests = responseData.data;
                        break;
                    case "payments":
                        state.payments = responseData.data;
                        break;
                    case "negotiations":
                        state.negotiations = responseData.data;
                        break;
                    case "driver-submissions":
                        state.driverSubmissions = responseData.data;
                        break;
                    case "address-verifications":
                        state.addressVerifications = responseData.data;
                        break;
                    case "withdrawals":
                        state.withdrawals = responseData.data;
                        break;
                    case "commissions":
                        state.commissions = responseData.data;
                        break;
                }
            })
            .addCase(fetchAdminData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- Dedicated Fetch Address Verifications (now supports status filter) ---
            .addCase(fetchAddressVerifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddressVerifications.fulfilled, (state, action) => {
                state.loading = false;
                state.addressVerifications = action.payload.data;
                state.pagination["address-verifications"] = {
                    total: action.payload.total,
                    page: action.payload.page,
                    count: action.payload.count,
                };
            })
            .addCase(fetchAddressVerifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- Update Driver Submission Status ---
            .addCase(updateDriverStatus.pending, (state) => {
                state.actionLoading = true;
                state.error = null;
            })
            .addCase(updateDriverStatus.fulfilled, (state, action) => {
                state.actionLoading = false;
                const updatedItem = action.payload;
                state.driverSubmissions = state.driverSubmissions.map((item) =>
                    item._id === updatedItem._id || item.user?._id === updatedItem._id
                        ? { ...item, ...updatedItem }
                        : item
                );
            })
            .addCase(updateDriverStatus.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload as string;
            })

            // --- Update Address Verification Status ---
            .addCase(updateAddressVerificationStatus.pending, (state) => {
                state.actionLoading = true;
                state.error = null;
            })
            .addCase(updateAddressVerificationStatus.fulfilled, (state, action) => {
                state.actionLoading = false;
                const updatedItem = action.payload;
                
                if (!updatedItem) return;
            
                state.addressVerifications = state.addressVerifications.map((item) => {
                    const itemUserId = item.user?._id || item.user;
                    const updatedUserId = updatedItem.user?._id || updatedItem.userId || updatedItem.user;
            
                    const matches =
                        item._id === updatedItem._id ||
                        itemUserId === updatedUserId ||
                        itemUserId === updatedItem._id;
            
                    return matches ? { ...item, ...updatedItem } : item;
                });
            })
            .addCase(updateAddressVerificationStatus.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload as string;
            })

            // --- Update Withdrawal Status ---
            .addCase(updateWithdrawalStatus.pending, (state) => {
                state.actionLoading = true;
                state.error = null;
            })
            .addCase(updateWithdrawalStatus.fulfilled, (state, action) => {
                state.actionLoading = false;
                const { withdrawal, adminCommission } = action.payload;

                state.withdrawals = state.withdrawals.map((item) =>
                    item._id === withdrawal._id ? { ...item, ...withdrawal } : item
                );

                if (adminCommission) {
                    state.commissions.unshift(adminCommission);
                }
            })
            .addCase(updateWithdrawalStatus.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload as string;
            })

            // --- Fetch Dashboard Stats ---
            .addCase(fetchDashboardStats.pending, (state) => {
                state.statsLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.dashboardStats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearAdminError } = adminDataSlice.actions;
export default adminDataSlice.reducer;