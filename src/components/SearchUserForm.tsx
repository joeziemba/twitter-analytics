import { ChangeEvent, FormEvent, useContext } from "react";
import { TwitterContext } from "../contexts/FollowersContext";

export function SearchUserForm() {
  const { setSearched, setTwitterHandle, twitterHandle } =
    useContext(TwitterContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTwitterHandle(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (twitterHandle.length > 0) setSearched(true);
  };
  return (
    <form onSubmit={handleSubmit} className="text-lg mx-auto">
      <label className="inline-block rounded-l-md py-2 px-3 bg-gray-200 dark:bg-gray-900 dark:border-gray-900">
        @
      </label>
      <input
        className="mt-4 px-3 py-2 dark:bg-gray-700"
        onChange={handleChange}
        value={twitterHandle}
        placeholder="Username"
      />
      <input
        type="submit"
        value="➜"
        style={{ marginLeft: "1px" }}
        className="rounded-r-md py-2 px-3 bg-gray-200 cursor-pointer hover:bg-emerald-500 focus:bg-emerald-500 hover:text-white transition-all dark:bg-gray-900 dark:border-gray-900 focus:text-white"
      />
    </form>
  );
}
