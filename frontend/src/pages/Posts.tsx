import Appbar from "../components/Appbar"
import Postcard from "../components/Postcard"
import Feed from "../components/Feed"
import Featured from "../components/Featured"
import { usePosts } from "../hooks"

const Posts = () => {
  const {loading, post} = usePosts();

  if (loading){
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    )
  }

  return (
    <>
    <Appbar />
    <div className="grid grid-cols-1 xl:grid-cols-2">
    <div>
    <Feed />
    <div className="flex justify-center">
        <div className=" max-w-xl">
          {post.map(post => <Postcard authorName={post.author.name || "Anonymous"} title={post.title} 
          content={post.content} id={post.id} publishedDate="20 September, 2024" />)}
    </div>
    </div>
    </div>
    <div className="flex justify-center items-center pt-10">
            <Featured />
          </div>
    </div>
    </>
  )
}

export default Posts