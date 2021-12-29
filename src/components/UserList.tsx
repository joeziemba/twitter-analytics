import React, { useContext } from "react";
import { ControlsContext } from "../contexts/ControlsContext";
import { TwitterContext } from "../contexts/FollowersContext";
import { ProfileCard } from "./ProfileCard";

export function UserList() {
  const { onlyMutuals, listView } = useContext(ControlsContext);
  const { followers, following, mutuals } = useContext(TwitterContext);

  const users = listView === 0 ? followers : following;
  if (!users) return null;
  return (
    <ol>
      {users.list.map((user, i) => {
        const isMutual = mutuals.list.includes(user.id);
        if (onlyMutuals && !isMutual) return null;
        return (
          <li key={user.id}>
            <ProfileCard user={user} isMutual={isMutual} index={i + 1} />
          </li>
        );
      })}
    </ol>
  );
}
