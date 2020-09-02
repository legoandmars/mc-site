import {modelPage} from "../layouts/model-list";
import { getAllPosts } from '../lib/posts'

export default function walls({postData}) {
    // first, get all valid models.
    return(modelPage(postData, "all Model"));
}

export async function getStaticProps({ params }) {
    const postData = getAllPosts();
    return {
        props: {
          postData
        }
      }  
  }