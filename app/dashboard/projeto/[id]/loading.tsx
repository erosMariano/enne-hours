import ActionBarSkeleton from "@/components/skelleton/ActionBarSkeleton";
import HeaderSkeletonDashboard from "@/components/skelleton/HeaderSkeletonDashboard";
import SidebarSkeleton from "@/components/skelleton/SidebarSkeleton";
import TaskListSkeleton from "@/components/skelleton/TaskListSkeleton";

function Loading() {
  return (
    <main className="dark min-h-screen flex">
      <div className="h-auto p-4 min-h-screen flex items-start justify-between gap-4 flex-1">
        <SidebarSkeleton />
        <div className="flex-1 flex flex-col gap-4">
          <HeaderSkeletonDashboard />
          <div className="flex-1 flex flex-col gap-4">
            <ActionBarSkeleton />
            <TaskListSkeleton />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Loading;
