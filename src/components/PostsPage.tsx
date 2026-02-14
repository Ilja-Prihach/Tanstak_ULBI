import {useQuery} from "@tanstack/react-query";
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

export const PostsPage = () => {
    const isAutch = false

    const {data: userData,} = useQuery({
        queryKey: ["userData"],
        queryFn: getAuthData,
        staleTime: 5000,

    });

    const {data: posts,} = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        staleTime: 5000,
        enabled: !userData
    });


  return (
    <div className="flex flex-col gap-4">
        {posts?.map((post) => (
            <div key={post.id}>
                {post.id}.{post.title}
            </div>
        ))}
    </div>
  );
};
