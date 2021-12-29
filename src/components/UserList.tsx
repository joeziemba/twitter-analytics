import React, { useContext } from "react";
import { ControlsContext } from "../contexts/ControlsContext";
import { TwitterContext } from "../contexts/FollowersContext";
import { ProfileCard } from "./ProfileCard";

const sort: {
  [key in SortKey]: (a: TwitterUser[], sortOrder: string) => TwitterUser[];
} = {
  alphabetically: (a, sortOrder) =>
    [...a].sort((a, b) => {
      let result = b.username < a.username ? 1 : -1;
      return sortOrder === "desc" ? result : result * -1;
    }),
  followers: (a, sortOrder) =>
    [...a].sort((a, b) => {
      let result =
        b.public_metrics.followers_count - a.public_metrics.followers_count;
      return sortOrder === "desc" ? result : result * -1;
    }),
  following: (a, sortOrder) =>
    [...a].sort((a, b) => {
      let result =
        b.public_metrics.following_count - a.public_metrics.following_count;
      return sortOrder === "desc" ? result : result * -1;
    }),
  "twitter default": (a, sortOrder) =>
    [...a].sort((a, b) => {
      let result = b.defaultOrder - a.defaultOrder;
      return sortOrder === "desc" ? result : result * -1;
    }),
};

export function UserList() {
  const { onlyMutuals, followingView, sortBy, sortOrder } =
    useContext(ControlsContext);
  const { followers, following, mutuals } = useContext(TwitterContext);

  const users = followingView ? following : followers;
  if (!users) return null;
  // sorting
  const sortFunc = sort[sortBy];
  const sortedUsers: TwitterUser[] = sortFunc(users.list, sortOrder);

  return (
    <ol>
      {sortedUsers.map((user, i) => {
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
