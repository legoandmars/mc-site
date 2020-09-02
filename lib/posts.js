import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
const modelDirectory = path.join(process.cwd(), 'models/data.json');
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const modelData = fs.readFileSync(modelDirectory);
  const JSONData = JSON.parse(modelData);
  /*const allModelData = modelData.map(model => {

  });*/
  return JSONData;
  /*const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })*/
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    const modelData = fs.readFileSync(modelDirectory);
    const JSONData = JSON.parse(modelData);
    return JSONData.map(model => {
      return {
        params: {
          id: model.endpoint
        }
      }
    })
  }

export function getAllPosts() {
    const modelData = fs.readFileSync(modelDirectory);
    const JSONData = JSON.parse(modelData);
    return JSONData;
  }
  
  export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const modelData = fs.readFileSync(modelDirectory);
    const JSONData = JSON.parse(modelData);
    for(let i = 0; i < JSONData.length; i++){
        if(JSONData[i].endpoint == id){
            return JSONData[i];
        }
    }
   // const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    //const matterResult = matter(fileContents)
  
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  }
  