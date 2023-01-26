import axiosInstance from "../axios";

const apiOrderSettings = {

createListing: async (data) => {
    let form_data = new FormData();
    let order_name = (Math.random() + 1).toString(36).substring(7)
    let generate_slug = (Math.random() + 1).toString(36).substring(7)
    if (data.files)
        form_data.append("files", data.files, data.files.name);
    form_data.append("name", order_name);
    form_data.append("slug", generate_slug);
    form_data.append("technical_task", data.technical_task);

const myNewModel = await axiosInstance
        .post(`create/order`, form_data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            return res;
        }).catch((error) => {
            console.log(error.response)
            return error.response;
        });

    if (myNewModel.status === 201) {
        window.location.href = `/`;
    }
    return myNewModel;
    },
};

export default apiOrderSettings;