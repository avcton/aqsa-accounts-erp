import PageAnimation from "./PageAnimation"
import logo from "./assets/logo.png"

function Home(){
    return (
        <PageAnimation>
            <div className=" flex flex-col justify-center items-center h-screen w-screen">
                // Top Bar
                <div className=" bg-inherit shadow-md w-screen font-normal absolute top-0 flex flex-row justify-center items-center text-black">
                    <h4 className=" my-4">Aqsa Traders</h4>
                    <UserImage />
                </div>
                <h3 className=" text-black">This is the home page</h3>
            </div>
        </PageAnimation>
    )
}

// Generates a user image based on the provided data
function UserImage({Image}){
    if(Image == undefined){
        // Generating a placeholder image
        return (
            <div class=" absolute right-0 mx-4 w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>    
            </div>
        )
    }
    else {
        return(
            <img class=" absolute right-0 mx-4 w-12 h-12 rounded-full" src={Image} alt="Rounded avatar"/>
        )
    }
}

export default Home