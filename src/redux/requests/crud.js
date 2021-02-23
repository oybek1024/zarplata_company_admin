import axios_init from "../../utils/axios_init";
const crud = {
    clients: (data) => axios_init.post(`/client`, data)
}

export default crud
