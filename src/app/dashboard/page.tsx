import ActionBar from "@/components/views/Dashboard/ActionBar";
import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import TaskList from "@/components/views/Dashboard/TaskList";
import { Play, Plus, Settings } from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <main className="min-h-screen flex">
      <div className="p-4 min-h-screen flex items-start justify-between gap-4 flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-4">
          <HeaderDashboard />
          <div className="flex-1 flex">
            <ActionBar />
          </div>

          <TaskList />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
