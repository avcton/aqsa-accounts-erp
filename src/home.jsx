import PageAnimation from "./PageAnimation"

function Home(){
    return (
        <PageAnimation>
            <div className=" flex flex-col justify-center items-center h-screen w-screen">
                <h3 className=" text-black">This is the home page</h3>
            </div>
        </PageAnimation>
    )
}

export default Home