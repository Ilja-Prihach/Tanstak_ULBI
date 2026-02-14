import { Link } from "react-router";
import {useIsFetching} from "@tanstack/react-query";

export const Header = () => {
  const isFetching = useIsFetching();
  return (
    <>
      {isFetching > 0 && <div className="h-4 bg-red-400 w-full absolute top-0 left-0"/>}
        <div className="p-4 bg-gray-200 ">
          <div className="max-w-4xl mx-auto flex gap-4 justify-end ">
            <Link className="underline" to="/users">
              users
            </Link>
            <Link className="underline" to="/posts">
              posts
            </Link>
          </div>
        </div>
    </>
  );
};
