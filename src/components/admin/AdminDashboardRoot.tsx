import { useState } from "react";
import { UsersView } from "./Views/UsersView";
import { AdminLayout } from "./Layout/AdminLayout";
import { DriversView } from "./Views/DriverApplicationsView";
import { PaymentsView } from "./Views/PaymentsView";
import { WithdrawalsView } from "./Views/WithdrawalsView";
import { DashboardOverview } from "./Views/DashboardOverview";
import { CommissionsView } from "./Views/CommissionsView";
import { RequestsView } from "./Views/RequestsView";

export const AdminDashboardRoot = () => {
  const [currentView, setView] = useState("overview");
  const renderViewContent = () => {
    switch (currentView) {
      case "overview":
        return (
          <>
            <DashboardOverview />
          </>
        );

      case "users":
        return <UsersView />;

      case "driver-applications":
        return <DriversView />;

      case "requests":
        return <RequestsView />;
      case "payments":
        return <PaymentsView />;
      case "commissions":
        return <CommissionsView />;
      case "withdrawals":
        return <WithdrawalsView />;

      default:
        return (
          <div className="text-sm text-zinc-400 capitalize">
            {currentView.replace("-", " ")} module is connected successfully.
          </div>
        );
    }
  };

  return (
    <AdminLayout currentView={currentView} setView={setView}>
      {renderViewContent()}
    </AdminLayout>
  );
};
