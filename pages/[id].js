import Layout from '../components/layout'
import { getAllPostIds, getPostData } from '../lib/posts'
import Header from '../layouts/header'
import {Button, ButtonGroup, Card, Image} from "react-bootstrap";
import Link from 'next/link'
import Head from 'next/head'
export default function Post({ postData }) {
    const renderButtons = false;
    let imageIndex = 0;
    let initialImage;
    let initialDescription;
    if(postData.extra_images){
        initialImage = postData.extra_images[0];
        initialDescription = postData.image_metadata[0];
    }else {
        initialImage = postData.image_name;
        initialDescription = "";
    }
    const [selected, setSelected] = React.useState(initialImage)
    const [selectedDescription, setSelectedDescription] = React.useState(initialDescription)

    function previousImage(){
        if(postData.extra_images.indexOf(selected) == 0){
            setSelected(postData.extra_images[postData.extra_images.length - 1]);
            setSelectedDescription(postData.image_metadata[postData.extra_images.length - 1]);
        }else{
            setSelected(postData.extra_images[postData.extra_images.indexOf(selected) - 1]);
            setSelectedDescription(postData.image_metadata[postData.extra_images.indexOf(selected) - 1]);
        }
    }
    function nextImage(){
        if(postData.extra_images.indexOf(selected) + 1 == postData.extra_images.length){
            setSelected(postData.extra_images[0]);
            setSelectedDescription(postData.image_metadata[0]);
        }else{
            setSelected(postData.extra_images[postData.extra_images.indexOf(selected) + 1]);
            setSelectedDescription(postData.image_metadata[postData.extra_images.indexOf(selected) + 1]);
        }
    }
    function getButtons(){
        if(postData.extra_images){
            return(
            <>
                <Button variant="dark" class="left-arrow-button" size="lg" onClick={()=>previousImage()}>
                    <Image class="arrowleft" src="arrow-left.png"></Image>
                </Button>
                <Button variant="dark" class="arrow-button" size="lg" onClick={()=>nextImage()}>
                    <Image class="arrow" src="arrow.png"></Image>
                </Button>        
            </>
            );
        }
    }
    function getDownloadButtons(){
        if(postData.second_button){
            return(
                <>
                    <Button type="button" className="first" variant="dark" href={`./${postData.file_name}`} download>Download</Button>
                    <Button type="button" className="second" variant="dark" href={postData.second_button.link}>{postData.second_button.text}</Button>
                </>
            );
        }else {
            return(
            <>
                <Button type="button" variant="dark" href={`./${postData.file_name}`} download>Download</Button>
            </>
            );
        }
    }

    function preloadImages(imageSources) {
        if(imageSources){
        const allImages = [];
        imageSources
          .forEach(i => {
              allImages.push(
              <>
                <a rel="preload" href={i} as="image"></a>
              </>)
          });
          return allImages;
        }
      }
    
    function getCredits(){
        if(postData.fallguyscredits){
            return(<>
                <div class="credit-holder">
                <h2 class="text-light creditheader">Credits</h2>
                <p class="text-light credittext">Fall Guy Model: <a link class="graylink" href="https://sketchfab.com/3d-models/unofficial-fall-guy-598b22b710b44c22a962fecc9dd92312">Sketchfab</a><br/></p>
                <p class="text-light credittext">Sabers: <a link class="graylink" href="https://twitter.com/Hooi21">Hooi</a></p>
                <p class="text-light credittext">Maps: <a link class="graylink" href="https://twitter.com/lethrial">Lethrial</a>, <a link class="graylink" href="https://twitter.com/One_narwhal">That_Narwhal</a>, <a link class="graylink" href="https://twitter.com/bytrius">Bytrius</a>, <a link class="graylink" href="https://twitter.com/ConnnnorJC">ConnorJC</a>, <a link class="graylink" href="https://twitter.com/Lonewolvez1">Lonewolvez</a>, <a link class="graylink" href="https://twitter.com/The_Caeden117">Caeden117</a>, <a link class="graylink" href="https://twitter.com/nomuffn">nomuffn</a></p>
                <p class="text-light credittext">Fall Guys Original Soundtrack created by Jukio Kallio and Daniel Hagström</p>
                <p class="text-light credittext">SUPPORT & FOLLOW THE ORIGINAL ARTISTS: <a link class="graylink" href="https://jukiokallio.bandcamp.com/album/fall-guys-original-soundtrack">Bandcamp</a> / <a link class="graylink" href="https://open.spotify.com/album/2XbgThX8BaW5Euimr3JAPT?si=OjPnw2qSSby1I2vGZJtOsg">Spotify</a></p>
                <p class="text-light credittext-bottom"><a link class="graylink" href="https://jukiokallio.com">More about Jukio Kallio</a> / <a link class="graylink" href="https://danielhagstrom.com">More about Daniel Hagström</a></p>
                </div>
            </>);
        }
    }

    function getDonationPopup(){
        if(postData.type == "pack"){
            return(
                <>
                    <div class="donationpopup" id="donationpopup">
                        <p class="text-light donationtext">Have a few extra bucks and want to support us in making awesome free model packs? Donate to Bobbie's ko-fi!</p>
                        <ButtonGroup className="d-flex donationbuttons">
                            <Button type="button" variant="dark" className="button1" href="https://ko-fi.com/bobbievr" download>Donate</Button>
                            <Button type="button" variant="dark" className="button2" onClick={()=>{
                                document.getElementById("donationpopup").style.visibility = "hidden";
                            }}>Close</Button>
                        </ButtonGroup>
                    </div>
                </>
            )
        }
    }
    return (
      <>
        <Header></Header>
        <style type="text/css">
            {`
                :root {
                --jumbotron-padding-y: 3rem;
                }
                .jumbotron {
                padding-top: var(--jumbotron-padding-y);
                padding-bottom: var(--jumbotron-padding-y);
                margin-bottom: 0;
                background-color: #fff;
                }
                @media (min-width: 768px) {
                .jumbotron {
                    padding-top: calc(var(--jumbotron-padding-y) * 2);
                    padding-bottom: calc(var(--jumbotron-padding-y) * 2);
                }
                }
    
                .jumbotron p:last-child {
                margin-bottom: 0;
                }
    
                .jumbotron-heading {
                font-weight: 300;
                }
    
                .jumbotron .container {
                    /*max-width: 40rem;*/
                }
                .container{
                    position: absolute;
                    max-width:100%;
                    max-height:100%;
                    width:60%;
                    left:20%;
                    height:50%; 
                }
                footer {
                    padding-top: 3rem;
                    padding-bottom: 3rem;
                }
    
                footer p {
                margin-bottom: .25rem;
                }
    
                .box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }
    
                .main {
                    background-color: #121212;
                }
                body{
                    background-color: #121212;
                }
                .card-title{
                    font-size:2rem;
                    text-align: center;
                    margin-bottom: .2rem;
                }
                .btn{
                    font-size: 1.5rem;
                }
                .card{
                    background-color: #000000;
                }
                .btn{
                    background-color: #000000;
                    border-color: #4d4d4d;
                    border-radius: 10px;       
                    border: 0.15rem solid #4d4d4d;            
                }
                .mainimage{
                    height:55%;
                    width:55%;
                    margin-left:0px;
                    background-color: #303030;
                    float:left;
                    border-radius: 0.5vw;
                }
                .imagetext{
                    width:45%;
                    height:100%;
                    float:right;
                }
                .p{
                    text-align: center;
                }
                .titletext{
                    font-size:2.25rem;
                    font-size:1.9vw;
                    text-align: center;
                    font-weight:bold;
                    background-color: #000000;
                    width: 85%;
                    margin: auto;
                    border-radius: 0.5vw;
                    border: 0.10vw solid #4d4d4d;
                }
                .descriptiontext{
                    font-size:1.5rem;
                    font-size:1.25vw;
                    text-align: center;
                    margin-top: 0.5vw;
                    margin-bottom: 0.5vw;
                    margin-left: 0.75vw;
                    margin-right: 0.75vw;
                }
                .description-holder{
                    margin: auto;
                    margin-top: 0.25vw;
                    border-radius: 0.5vw;
                    border: 0.10vw solid #4d4d4d;
                    position:relative;
                    width: 85%;
                    height:100%;
                    background-color: #000000;
                    z-index:1;
                }
                .imagesubcontainer{
                    margin-top:2.5vw;
                    display:inline-block;
                    width:100%;
                    position:relative;
                }
                .downloadbuttons{
                    position:absolute;
                    width: 37.5%;
                    bottom:0;                          
                    right:0;   
                    left: 58.75%;
                    height:3vw;
                    z-index:2;
                    top: calc(100% - 3vw);
                }
                .arrow-button{
                    position:absolute;
                    background-color: #000000;
                    border-radius: 0.5vw;
                    border: 0.10vw solid #4d4d4d;
                    width:3vw;
                    height:3vw;
                    top: calc(90% + 0.2vw);
                    left: calc(55% - 3.0vw);
                    outline: none !important;
                    padding:0;
                    margin:0;
                }
                .left-arrow-button{
                    position:absolute;
                    background-color: #000000;
                    border-radius: 0.5vw;
                    border: 0.10vw solid #4d4d4d;
                    width:3vw;
                    height:3vw;
                    top: calc(90% + 0.2vw);
                    left: 0;
                    outline: none !important;
                    padding:0;
                    margin:0;
                }
                .arrow{
                    position:absolute;
                    left:0.375vw;
                    top:0.375vw;
                    width:2.25vw;
                    height:2.25vw;
                }
                .arrowleft{
                    position:absolute;
                    right:0.375vw;
                    top:0.375vw;
                    width:2.25vw;
                    height:2.25vw;
                }
                .imageheader{
                    position: absolute;
                    font-size:3rem;
                    font-size: 2vw;
                    text-align: center;
                    font-weight:bold;
                    width: 55%;
                    margin: auto;
                }
                .imageheaderstroke{
                    position: absolute;
                    font-size:3rem;
                    font-size: 2vw;
                    text-align: center;
                    font-weight:bold;
                    width: 55%;
                    margin: auto;
                    -webkit-text-stroke-width: .4vw;
                    -webkit-text-stroke-color: black;                  
                }
                .credit-holder{
                    margin: auto;
                    margin-top: 57.5%;
                    border-radius: 0.5vw;
                    border: 0.10vw solid #4d4d4d;
                    position:absolute;
                    width: 96.75%;
                    background-color: #000000;
                    z-index:0;
                    margin-bottom: 2%;
                }
                .creditheader{
                    font-size:2.25vw;
                    text-align: center;
                    margin: auto;
                }
                .credittext{
                    font-size:1.5rem;
                    font-size:1.25vw;
                    text-align: center;
                    margin: auto;
                }
                .credittext-bottom{
                    font-size:1.5rem;
                    font-size:1.25vw;
                    text-align: center;
                    margin: auto;
                    margin-bottom:0.7%;
                }
                .graylink{
                    color: gray;
                    text-decoration: underline;
                }
                .graylink:hover {
                    color: #474747;
                }                  

                ::-webkit-scrollbar {
                    width: 8px;
                    background-color: transparent;
                    -webkit-border-radius: 100px;
                }
                ::-webkit-scrollbar:hover {
                    background-color: rgba(0, 0, 0, 0.09);
                }
                ::-webkit-scrollbar-thumb:vertical {
                    background: rgba(0,0,0,0.5);
                    -webkit-border-radius: 100px;
                }
                ::-webkit-scrollbar-thumb:vertical:active {
                    background: rgba(0,0,0,0.61);
                    -webkit-border-radius: 100px;
                }
                .btn{
                    font-size:1.25vw;
                    border-radius: 0.5vw;
                    border: 0.10vw solid #4d4d4d;
                    position:absolute!important;
                    max-height:100%;
                    height:100%;
                    max-width:100%;
                    width:100%;
                    top:0;
                    padding:0;
                    padding-top: 0.4vw;
                    /*height:3vw!important;*/
                }
                .second{
                    width:50%;
                    left:50%;
                }
                .first{
                    width:50%;
                }
                @media (max-aspect-ratio: 1/1) {
                    .container {
                        width: 95%;
                        left: 2.5%;
                    }
                    .descriptiontext{
                        font-size:2vw;
                    }    
                }     
                .donationpopup{
                    position: fixed;
                    width:15%;
                    left:85%;
                    height:20%;
                    top:80%;
                    border-radius: 0.5vw;
                    border: 0.10vw solid #4d4d4d;
                    background-color: #000000;
                }
                .donationtext{
                    font-size:1.5rem;
                    font-size:1.0vw;
                    text-align: center;
                    margin-top: 0.5vw;
                    margin-bottom: 0.5vw;
                    margin-left: 0.75vw;
                    margin-right: 0.75vw;
                }        
                .donationbuttons{
                    left:5%;
                    width:45%;
                    height:25%;
                }
                .button1{
                    font-size:1.2vw;
                    padding:0;
                    padding-top: 0.2vw;
                    margin:0;
                }
                .button2{
                    font-size:1.2vw;
                    padding:0;
                    padding-top: 0vw;
                    margin:0;
                    left:100%;
                }
        `}
            
            </style>
            <Head>
                <title>{postData.model.name}</title>
                {preloadImages(postData.extra_images)}
            </Head>
            <div class="main">
                {getDonationPopup()}
                <div class="container">
                    <div class="imagesubcontainer">
                        <div>
                            <Image class="mainimage float-left" src={selected} fluid></Image>
                            <p class="text-light imageheaderstroke">{selectedDescription}</p>
                            <p class="text-light imageheader">{selectedDescription}</p>
                            {getButtons()}
                            <ButtonGroup className="d-flex downloadbuttons">
                                {getDownloadButtons()}
                            </ButtonGroup>
                        </div>
                        <div class="imagetext">
                            <p class="text-light titletext">{postData.model.name}</p>
                            <div class="description-holder">
                                <p class="text-light descriptiontext">{postData.model.description}</p>
                            </div>
                        </div>
                        {getCredits()}
                    </div>
                </div>
          </div>
      </>
    )
  }
  
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({ params }) {
    const postData = getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }