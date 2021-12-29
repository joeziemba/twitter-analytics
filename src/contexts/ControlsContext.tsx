import React, { useState } from "react";

interface ControlsContextValue {
  onlyMutuals: boolean;
  followingView: number;
  toggleMutuals: () => void;
  sortBy: SortKey;
  toggleSortOrder: () => void;
  sortOrder: SortOrder;
  setSortBy: (key: SortKey) => void;
  viewFollowers: () => void;
  viewFollowing: () => void;
}

export const ControlsContext = React.createContext({} as ControlsContextValue);

export function ControlsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // filter control state
  const [onlyMutuals, setOnlyMutuals] = useState(true);
  const [followingView, setFollowingView] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>("followers");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const toggleMutuals = () => {
    setOnlyMutuals(!onlyMutuals);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const viewFollowers = () => {
    setFollowingView(0);
  };
  const viewFollowing = () => {
    setFollowingView(1);
  };
  return (
    <ControlsContext.Provider
      value={{
        followingView,
        onlyMutuals,
        setSortBy,
        sortBy,
        sortOrder,
        toggleMutuals,
        toggleSortOrder,
        viewFollowers,
        viewFollowing,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
}
