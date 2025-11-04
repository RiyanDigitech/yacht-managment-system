import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";

export const createCustomerBooking = async (data:any) => {
    try {
        const response = await axios.post('/customer/bookings' , data)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}


export const getAllyacth = async () => {
    try {

        const url = buildUrlWithParams('/public/yachts' , {})
        const response = await axios.get(url)
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllAddons = async () => {
    try {

        const url = buildUrlWithParams('/public/addons' , {})
        const response = await axios.get(url)
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const getAvailableYachts = async ({start_time , end_time}:any) => {
    try {

        const url = buildUrlWithParams('/public/availability' , {start_time , end_time})
        const response = await axios.get(url)
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}