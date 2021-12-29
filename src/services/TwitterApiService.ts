import axios from "axios";
import * as MockData from "../mock-data";

const MOCK = true;

const axiosConfig = {
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_TWITTER_KEY,
    "Access-Control-Allow-Origin": "http://api.twitter.com",
  },
};

export const TwitterApiService = {
  async getUserByUsername(username: string): Promise<TwitterUser> {
    console.log("getUserByUsername", "MOCKED?", MOCK, new Date().getDate());
    if (MOCK) return this.processUser(MockData.mockUser);

    const result = await axios.get(
      `http://api.twitter.com/2/users/by/username/${username}`,
      axiosConfig
    );
    return this.processUser(result.data, 0);
  },
  async getFollowersById(userId: string): Promise<TwitterUser[]> {
    if (MOCK) return this.processUserList(MockData.mockFollowers);

    const result = await axios.get(
      `http://api.twitter.com/2/users/${userId}/followers?user.fields=description,id,name,profile_image_url,public_metrics,url,username,verified&max_results=1000`,
      axiosConfig
    );
    return this.processUserList(result.data);
  },
  async getFollowingById(userId: string): Promise<TwitterUser[]> {
    if (MOCK) return this.processUserList(MockData.mockFollowing);

    const result = await axios.get(
      `http://api.twitter.com/2/users/${userId}/following?user.fields=description,id,name,profile_image_url,public_metrics,url,username,verified&max_results=1000`,
      axiosConfig
    );
    return this.processUserList(result.data);
  },
  processUserList(rawUserList: RawTwitterUser[]): TwitterUser[] {
    return rawUserList.map(this.processUser);
  },
  processUser(rawUser: RawTwitterUser, i: number = 0): TwitterUser {
    return {
      ...rawUser,
      defaultOrder: i,
      profile_image_url: rawUser.profile_image_url.replace(
        "_normal",
        i > 0 ? "_bigger" : "_bigger"
      ),
    };
  },
  findMutuals: () => {},
};
