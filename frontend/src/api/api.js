import axiosInstance from "../axios";

const apiSettings = {

createListing: async (data) => {
    let form_data = new FormData();
    if (data.avatar)
        form_data.append("avatar", data.avatar, data.avatar.name);
    form_data.append("first_name", data.first_name);
    form_data.append("last_name", data.last_name);
    form_data.append("birth_date", data.birth_date);
    form_data.append("email", data.email);
    form_data.append("password", data.password);

const myNewModel = await axiosInstance
        .post(`register/`, form_data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            return res;
        }).catch((error) => {
            return error.response;
        });

    if (myNewModel.status === 201) {
        window.location.href = `/login`;
    }
    return myNewModel;
    },
};

export default apiSettings;