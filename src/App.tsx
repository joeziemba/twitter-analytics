import { useContext } from "react";

import "./App.css";
import { Controls } from "./components/Controls";
import { ProfileCard } from "./components/ProfileCard";
import { SearchUserForm } from "./components/SearchUserForm";
import { UserList } from "./components/UserList";
import { TwitterContext } from "./contexts/FollowersContext";

function App() {
  const { searched, searchedUser, followers, mutuals } =
    useContext(TwitterContext);

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

              <p className="text-xl text-center mb-6">
                You follow <b>{mutuals.count}</b> of your{" "}
                <b>{followers.count}</b> followers - that's{" "}
                <b>{Math.floor((mutuals.count / followers.count) * 100)}%</b>
              </p>
              <UserList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
