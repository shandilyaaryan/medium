import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Post {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
}

export const usePosts = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post []>([]);
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setPost(response.data.posts)
                setLoading(false);
            })
    }, [])

    return { loading, post }
}