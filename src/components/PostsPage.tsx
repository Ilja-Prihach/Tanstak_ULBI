import {useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "../api/api.ts";

type Post = {
    id: number;
    title: string;
}


function getPosts() {
    return api.get<Post[]>("/posts").then((res) => res.data);
}

function getAuthData() {
    return new Promise((res) => {
        setTimeout(() => res({userData: {}}), 1000)
    });
}

function getPostById(id: number) {
    return api.get<Post>(`/posts/${id}`).then((res) => res.data);
}

function Postlist() {
    const queryClient = useQueryClient();
    const {data: posts, isFetching, isPending, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        retry: false
    });

    const invalidatePosts = () => {
        // queryClient.invalidateQueries({queryKey: ["posts"]});
        // queryClient.refetchQueries({queryKey: ["posts"]});
        queryClient.resetQueries({queryKey: ["posts"]});
    }

    return (
        <div>
            <button
                className="border border-gray-600 rounder-md p-2"
                onClick={invalidatePosts}
            >
                INVALIDATE
            </button>
            {isFetching && <div>isFetching...</div>}
            {isLoading && <div>loading...</div>}
            {isPending && <div>isPending...</div>}
            {posts?.map((post) => (
                <div key={post.id}>
                    {post.id}.{post.title}
                </div>
            ))}
        </div>
    )
}



export const PostsPage = () => {

  return (
    <div className="flex flex-col gap-4">
            <Postlist/>
    </div>
  );
};
