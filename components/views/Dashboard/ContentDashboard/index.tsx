"use client";
import React, { useMemo, useState } from "react";

import ActionBar from "../ActionBar";
import TaskList from "../TaskList";

import { StatusFilter, TimeEntry } from "@/types/types";

interface ContentDashboardProps {
  timeEntries: TimeEntry[];
}

function ContentDashboard({ timeEntries }: ContentDashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [allTimeEntries, setAllTimeEntries] =
    useState<TimeEntry[]>(timeEntries);
  const [searchText, setSearchText] = useState("");

  function handleChangeStatus(status: StatusFilter) {
    setSelectedStatus(status);
  }

  function handleSearchTextChange(text: string) {
    setSearchText(text.toLocaleLowerCase());
  }
  function handleNewTimeEntry(newTimeEntry: TimeEntry) {
    setAllTimeEntries((prevState) => [...prevState, newTimeEntry]);
  }

  const filteredTimeEntris = useMemo(() => {
    return allTimeEntries.filter((entry) => {
      const matchesSearch = entry.project
        .toLocaleLowerCase()
        .includes(searchText);
      const matchesStatus =
        selectedStatus === "all" || entry.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [allTimeEntries, searchText, selectedStatus]);

  return (
    <>
      <div className="flex-1 flex">
        <ActionBar
          onAddNewTimeEntry={handleNewTimeEntry}
          onChangeStatus={handleChangeStatus}
          onSearchTimeEntry={handleSearchTextChange}
        />
      </div>

      <TaskList
        statusActive={selectedStatus}
        timeEntries={filteredTimeEntris}
      />
    </>
  );
}

export default ContentDashboard;
