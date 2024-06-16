import toast from "react-hot-toast"


export const toastError = (message:string)=>{
    toast.error(message, {
        style:{
            backgroundColor: "#800",
            color: '#fff'
        }
    })
}

export const toastSuccess = (message:string) =>{
    toast.success(message, {
        style:{
            backgroundColor:'#090',
            color: '#fff'
        }
    })
}