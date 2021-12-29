import { useContext } from "react";

import "./App.css";
import { Controls } from "./components/Controls";
import { FollowerList } from "./components/FollowerList";
import { ProfileCard } from "./components/ProfileCard";
import { SearchUserForm } from "./components/SearchUserForm";
import { ControlsContext } from "./contexts/ControlsContext";
import { TwitterContext } from "./contexts/FollowersContext";

function App() {
  const { searched, searchedUser } = useContext(TwitterContext);
  const { followingView } = useContext(ControlsContext);

  return (
    <div className="app-container bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="h-full flex flex-col">
        <div className="text-center">
          <h1 className="text-5xl font mt-40 mb-6">App Title</h1>
          <h2 className="text-2xl mb-12">
            Explore your Twitter follows and followers.
          </h2>
        </div>
        <div className="mx-auto mb-12">
          {!searched ? (
            <SearchUserForm />
          ) : (
            <div className="flex-1 max-w-xl mx-auto">
              <ProfileCard user={searchedUser} />
              <Controls />

              {followingView ? <FollowerList /> : <FollowerList />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
