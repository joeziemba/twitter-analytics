interface RawTwitterUser {
  id: string;
  name: string;
  profile_image_url: string;
  public_metrics: { followers_count: number; following_count: number };
  username: string;
  verified: boolean;
}

interface TwitterUser extends RawTwitterUser {
  defaultOrder: number;
}

type SortKey = "followers" | "following" | "twitter default" | "alphabetically";
type SortOrder = "asc" | "desc";
