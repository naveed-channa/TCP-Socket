
Response =  {


    login: async function(data , collection){

        var result = [];
        if(collection){
            data.forEach(element => {
                result.push({
                    id:element.id,
                    first_name:element.first_name,
                    last_name:element.last_name,
                    role_id:element.role_id,
                    social_id:element.social_id,
                    social_token:element.social_token,
                    social_type:element.social_type,
                    device_type:element.device_type,
                    image_url:element.image_url,
                    address:element.address,
                    email:element.email,
                    mobile_no:element.mobile_no,
                    latitude:element.latitude,
                    longitude:element.longitude,
                    device_token:element.device_token,
                    status:element.status,
                })
            });
        }else{
            result =  {
                    id:data.id,
                    first_name:data.first_name,
                    last_name:data.last_name,
                    role_id:data.role_id,
                    social_id:data.social_id,
                    social_token:data.social_token,
                    social_type:data.social_type,
                    device_type:data.device_type,
                    image_url:data.image_url,
                    address:data.address,
                    email:data.email,
                    mobile_no:data.mobile_no,
                    latitude:data.latitude,
                    longitude:data.longitude,
                    device_token:data.device_token,
                    status:data.status,
            }
        }
        return result;
    },
}

module.exports = Response;