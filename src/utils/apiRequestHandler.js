import { baseUrl} from '../utils/global'
import axios from "axios";
export const PostData = async (url,formData)  => {
   // const token = '';
    let BaseUrl = baseUrl + url;
    return await axios.post(BaseUrl,formData,{
        headers: {
          //  'Authorization': "Bearer "+token
        }
    }).then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if(error)
        {
            if(error.response)
            {
                if(error.response.status === 401){
                    localStorage.clear()
                    sessionStorage.clear();
                   // window.location.href = '/';
                    return error.response.data
                }else{
                    return error.response.data
                }
            }
        }
        return false
    });
}

export const GetData = async (url)  => {
  //  let token = '';
    let BaseUrl = baseUrl + url;
    return await axios.get(BaseUrl,{
        headers: {
            
        }
    }).then(function (response) {
        return response.data;})
    .catch(function (error) {
      /*   if(error)
        {
            if(error.response)
            {
                if(error.response.status === 401){
                    localStorage.clear()
                    sessionStorage.clear();
                    window.location.href = '/';
                    return error.response.data
                }else{
                    return error.response.data
                }
            }
        }*/
        return false
    });
}


