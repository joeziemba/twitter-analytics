import React, { useState } from "react";

export const ControlsContext = React.createContext({} as any);

export function ControlsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // filter control state
  const [onlyMutuals, setOnlyMutuals] = useState(true);
  const [listView, setListView] = useState(0);

  const toggleMutuals = () => {
    setOnlyMutuals(!onlyMutuals);
  };
  return (
    <ControlsContext.Provider
      value={{
        onlyMutuals,
        listView,
        toggleMutuals,
        setListView,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
}
