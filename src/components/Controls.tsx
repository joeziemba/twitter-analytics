import cn from "classnames";
import { useContext } from "react";
import { ControlsContext } from "../contexts/ControlsContext";

export function Controls() {
  const { listView, onlyMutuals, toggleMutuals, setListView } =
    useContext(ControlsContext);
  const buttonClasses = cn(
    "flex-1 border-b-2 p-2 hover:border-emerald-400 transition-colors"
  );
  const activeClasses = " border-emerald-600";

  const setFollowers = () => setListView(0);
  const setFollowing = () => setListView(1);
  return (
    <div>
      <div className="flex mb-6 text-lg">
        <button
          className={buttonClasses + (listView ? "" : activeClasses)}
          onClick={setFollowers}
        >
          Followers
        </button>
        <button
          className={buttonClasses + (listView ? activeClasses : "")}
          onClick={setFollowing}
        >
          Following
        </button>
      </div>
      <input type="checkbox" checked={onlyMutuals} onChange={toggleMutuals} />{" "}
      Only Mutuals
    </div>
  );
}
