import UserImage from "./userImage";

export default function TopBar({image, name, role}){
    return (
        <div className=" bg-inherit shadow-md bg-white w-screen font-normal absolute top-0 flex flex-row justify-center items-center text-black">
            <h4 className=" my-4 font-light">Aqsa Traders</h4>
            <div className=" flex flex-row absolute right-2 items-center">
                <div className=" flex flex-col items-center">
                    <h5 className=" font-medium">{name}</h5>
                    <h5 className=" font-light text-sm">{role}</h5>
                </div>
                <UserImage Image={image}/>
            </div>
        </div>
    )
}