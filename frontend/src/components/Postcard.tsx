import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface PostcardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string
}
const Postcard = ({authorName, title, content, publishedDate, id}: PostcardProps) => {
  return (
    <Link to={`/post/${id}`}>
        <div className="p-4 border-b-[1px] border-slate-200 pb-4 w-[600px]">
            <div className="flex">
                <div className="flex justify-center flex-col">
                <Avatar name={authorName} />
                </div>
                <div className="font-extralight pl-2">
                {authorName} 
                </div>
                <div className="pl-2">
                •
                </div>
                <div className="pl-2 font-thin text-slate-600">{publishedDate}</div>
            </div>
            <div className="text-xl pt-2 font-semibold">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.length > 100 ? content.slice(0, 100) + "..." : content}
            </div>
            <div className="pt-4 text-slate-600 text-sm font-thin">
                { `${Math.ceil(content.length/100)} min(s) read`}
            </div>
        </div>
    </Link>
  )
}

export default Postcard