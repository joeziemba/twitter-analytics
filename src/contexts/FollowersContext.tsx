import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TwitterApiService } from "../services/TwitterApiService";

type TwitterContextValue = {
  followers: { count: number; list: TwitterUser[] };
  following: { count: number; list: TwitterUser[] };
  mutuals: { count: number; list: string[] };
  searched: boolean;
  setTwitterHandle: Dispatch<SetStateAction<string>>;
  setSearched: Dispatch<SetStateAction<boolean>>;
  searchedUser: TwitterUser;
  twitterHandle: string;
};

export const TwitterContext = React.createContext({} as TwitterContextValue);

export function TwitterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searched, setSearched] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [followers, setFollowers] = useState([] as TwitterUser[]);
  const [following, setFollowing] = useState([] as TwitterUser[]);
  const [followerIds, setFollowerIds] = useState([] as string[]);
  const [followingIds, setFollowingIds] = useState([] as string[]);
  const [mutualIds, setMutualIds] = useState([] as string[]);

  const [searchedUser, setUser] = useState<TwitterUser>({
    id: "",
    username: "",
    name: "",
    defaultOrder: 0,
    profile_image_url: "",
    public_metrics: { followers_count: 0, following_count: 0 },
    verified: false,
  });
  useQuery(
    "searchedUser",
    () => TwitterApiService.getUserByUsername(twitterHandle),
    {
      refetchOnWindowFocus: false,
      enabled: searched && !!twitterHandle,
      retry: 0,
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );
  useQuery(
    ["followers", searchedUser.id],
    () => TwitterApiService.getFollowersById(searchedUser.id + ""),
    {
      refetchOnWindowFocus: false,
      enabled: !!searchedUser.id,
      onSuccess: (data) => {
        setFollowers(data);
        setFollowerIds(data.map((u) => u.id));
      },
    }
  );

  useQuery(
    ["following", searchedUser.id],
    () => TwitterApiService.getFollowingById(searchedUser.id + ""),
    {
      refetchOnWindowFocus: false,
      enabled: !!searchedUser.id,
      onSuccess: (data) => {
        setFollowing(data);
        setFollowingIds(data.map((u) => u.id));
      },
    }
  );

  useEffect(() => {
    if (followerIds.length > 0 && followingIds.length > 0) {
      setMutualIds(followingIds.filter((id) => followerIds.includes(id)));
    }
  }, [followerIds, followingIds]);

  return (
    <TwitterContext.Provider
      value={{
        searched,
        searchedUser,
        followers: {
          list: followers,
          count: followers.length,
        },
        following: {
          list: following,
          count: following.length,
        },
        twitterHandle,
        setTwitterHandle,
        setSearched,
        mutuals: {
          list: mutualIds,
          count: mutualIds.length,
        },
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
}
