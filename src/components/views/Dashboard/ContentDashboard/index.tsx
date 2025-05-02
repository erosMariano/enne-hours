"use client";
import React, { useState } from "react";
import ActionBar from "../ActionBar";
import TaskList from "../TaskList";
import { StatusFilter, TimeEntry } from "@/types/types";

interface ContentDashboardProps {
  timeEntries: TimeEntry[];
}

function ContentDashboard({ timeEntries }: ContentDashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");

  function handleChangeStatus(status: StatusFilter) {
    setSelectedStatus(status);
  }

  const filterdTimesEntries =
    selectedStatus == "all"
      ? timeEntries
      : timeEntries.filter((entry) => entry.status === selectedStatus);

  return (
    <>
      <div className="flex-1 flex">
        <ActionBar onChangeStatus={handleChangeStatus} />
      </div>

      <TaskList
        statusActive={selectedStatus}
        timeEntries={filterdTimesEntries}
      />
    </>
  );
}

export default ContentDashboard;
