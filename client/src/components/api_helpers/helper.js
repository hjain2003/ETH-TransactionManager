import axios from "axios";

export const getUserData = async(req,res) =>{
    try {
        const res = await axios.get("http://localhost:5000/user");
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }

}