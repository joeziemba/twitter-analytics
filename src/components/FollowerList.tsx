import { useContext } from "react";
import { TwitterContext } from "../contexts/FollowersContext";
import { UserList } from "./UserList";

export function FollowerList() {
  const { mutuals, followers } = useContext(TwitterContext);
  return (
    <>
      <p className="text-xl text-center mb-6">
        You follow <b>{mutuals.count}</b> of your <b>{followers.count}</b>{" "}
        followers - that's{" "}
        <b>{Math.floor((mutuals.count / followers.count) * 100)}%</b>
      </p>
      <UserList />
    </>
  );
}
