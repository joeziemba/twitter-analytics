import cn from "classnames";

type ProfileCardProps = {
  isMutual?: boolean;
  user?: TwitterUser;
  index?: number;
};

export function ProfileCard({ isMutual, user, index }: ProfileCardProps) {
  const containerClasses = cn(
    "flex items-center relative",
    "mx-2 mb-4 rounded-md",
    "shadow-md border-2 dark:border-gray-900",
    "bg-white dark:bg-gray-900",
    "dark:text-white",
    {
      "border-gray-200": !isMutual,
      "border-emerald-500": isMutual,
    }
  );

  if (!user) return null;
  return (
    <div className={containerClasses} style={{ width: "26rem" }}>
      <div className="profile-card-number">{index}</div>
      <div
        className="m-5 rounded-full"
        style={{
          backgroundImage: `url(${user.profile_image_url})`,
          backgroundSize: "cover",
          width: "73px",
          height: "73px",
          // width: "7rem",
          // height: "100%",
        }}
      />
      <div className="flex-1">
        <h4 className="text-xl font-semibold leading-tight flex items-center">
          {user.name}
          {user.verified && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              aria-hidden="true"
              focusable="false"
              className="inline-block text-sky-500 ml-1"
            >
              <path
                fill="currentColor"
                d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5c-1.51 0-2.816.917-3.437 2.25-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
              ></path>
            </svg>
          )}
        </h4>
        <p className="text-lg text-emerald-600 leading-tight mb-2">
          @{user.username}
        </p>
        <p className="text-sm text-gray-500 ">
          {user.public_metrics.following_count} following
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {user.public_metrics.followers_count} followers
        </p>
      </div>
      {/* <div
        className=" text-white flex flex-col h-full text-center"
        style={{ width: "8rem" }}
      >
        <div className="bg-emerald-600 flex-1 text-xs font-semibold text-gray-600 flex items-center">
          {user.public_metrics.followers_count} followers
        </div>
        <div className="bg-emerald-700 flex-1 text-xs font-semibold text-gray-600 flex items-center">
          {user.public_metrics.followers_count} followers
        </div>
      </div> */}
    </div>
  );
}
