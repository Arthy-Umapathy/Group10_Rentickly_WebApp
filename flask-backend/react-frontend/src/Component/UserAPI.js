import axios from "axios";

export const register = (newUser) => {
  var bodyFormData = new FormData();
  bodyFormData.append("user_name", newUser.user_name);
  bodyFormData.append("emailid", newUser.emailid);
  bodyFormData.append("password", newUser.password);
  return axios
    .post("http://127.0.0.1:5000/users/register", bodyFormData)
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  // return axios.post('users/register', {

  // })
  //     .then(res => {
  //         const mes = res.data
  //         console.log(`message${mes}`)
  //         console.log('Registered')
  //     })
  //     .catch(err => {
  //         console.log(err)
  //     })
};

export const login = (user) => {
  return axios
    .post("users/login", {
      emailid: user.emailid,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const getProfile = user => {
//     return axios
//       .get('users/profile', {
//         //headers: { Authorization: ` ${this.getToken()}` }
//       })
//       .then(response => {
//         console.log(response)
//         return response.data
//       })
//       .catch(err => {
//         console.log(err)
//       })
// }
