import {useSuspenseQueries} from "@tanstack/react-query";
import {api} from "../api/api.ts";
import {Suspense} from "react";

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

function Postlist() {
    const [userData, posts] = useSuspenseQueries({
        queries: [
            {
                queryKey: ["userData"],
                queryFn: getAuthData,
            },
            {
                queryKey: ["posts"],
                queryFn: getPosts,
            }
        ]
    })
    console.log(userData.data);
    console.log(posts.data)
    // const {data: userData,} = useSuspenseQuery({
    //
    //     staleTime: 5000,
    //
    // });
    //
    // const {data: posts,} = useSuspenseQuery({
    //
    //     staleTime: 5000,
    // });

    return (
        <div>
            {/*{posts?.map((post) => (*/}
            {/*    <div key={post.id}>*/}
            {/*        {post.id}.{post.title}*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    )
}



export const PostsPage = () => {

  return (
    <div className="flex flex-col gap-4">
        <Suspense fallback={<h1>Loading post...</h1>}>
            <Postlist/>
        </Suspense>
    </div>
  );
};
