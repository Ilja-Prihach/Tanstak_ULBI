import {useQuery} from "@tanstack/react-query";
import {api} from "../api/api.ts";

type Post = {
    id: number;
    title: string;
}

function getPosts() {
    return api.get<Post[]>("/posts").then((res) => res.data);
}

export const PostsPage = () => {
    const {
        data: posts,
        isLoading,
        isPending,
        isFetching
    } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        staleTime: 5000,
        gcTime: 10000,
    });


  return (
    <div className="flex flex-col gap-4">
        {isLoading && <div>Loading...</div>}
        {isPending && <div>Pending...</div>}
        {isFetching && <div>Fetching...</div>}
        {posts?.map((post) => (
            <div key={post.id}>
                {post.id}.{post.title}
            </div>
        ))}
    </div>
  );
};
