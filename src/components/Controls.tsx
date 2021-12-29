import cn from "classnames";
import { ChangeEvent, useContext } from "react";
import { ControlsContext } from "../contexts/ControlsContext";

const sortOptions: SortKey[] = [
  "alphabetically",
  "followers",
  "following",
  "twitter default",
];

export function Controls() {
  const {
    followingView,
    onlyMutuals,
    setSortBy,
    sortBy,
    sortOrder,
    toggleMutuals,
    toggleSortOrder,
    viewFollowers,
    viewFollowing,
  } = useContext(ControlsContext);
  const buttonClasses = cn(
    "flex-1 border-b-2 p-2 hover:border-emerald-400 transition-colors"
  );
  const activeClasses = " border-emerald-600";

  function handleSortByChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    if (sortOptions.includes(value as SortKey)) setSortBy(value as SortKey);
  }

  return (
    <div>
      <div className="flex mb-6 text-lg">
        <button
          className={buttonClasses + (followingView ? "" : activeClasses)}
          onClick={viewFollowers}
        >
          Followers
        </button>
        <button
          className={buttonClasses + (followingView ? activeClasses : "")}
          onClick={viewFollowing}
        >
          Following
        </button>
      </div>
      <div className="text-center">
        Sort by{" "}
        <select
          className="sort-select"
          value={sortBy}
          onChange={handleSortByChange}
        >
          {sortOptions.map((opt) => (
            <option value={opt}>{opt}</option>
          ))}
        </select>{" "}
        <button className="sort-button" onClick={toggleSortOrder}>
          <span className={sortOrder}> ➜ </span> {sortOrder}
        </button>
      </div>
      <input type="checkbox" checked={onlyMutuals} onChange={toggleMutuals} />{" "}
      Only Mutuals
    </div>
  );
}
