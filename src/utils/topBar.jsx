import UserImage from "./userImage";

export default function TopBar({image}){
    return (
        <div className=" bg-inherit shadow-md bg-white w-screen font-normal absolute top-0 flex flex-row justify-center items-center text-black">
            <h4 className=" my-4">Aqsa Traders</h4>
            <UserImage Image={image}/>
        </div>
    )
}