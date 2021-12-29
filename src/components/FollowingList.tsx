import { useContext } from "react";
import { TwitterContext } from "../contexts/FollowersContext";
import { UserList } from "./UserList";

export function FollowingList() {
  const { mutuals, following } = useContext(TwitterContext);
  return (
    <>
      <p className="text-xl text-center mb-6">
        <b>{mutuals.count}</b> of the <b>{following.count}</b> accounts you
        follow following - that's{" "}
        <b>{Math.floor((mutuals.count / following.count) * 100)}%</b>
      </p>
      <UserList />
    </>
  );
}
