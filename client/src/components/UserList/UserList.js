import React from 'react';
import moment from "moment";

const UserList = () => {

    const [data, setData] = React.useState([]);

    const getData = () => {
        fetch("http://localhost:8000/user/alluser").then((response) => response.json()).then((result) => {
            console.log(result);
            setData(result)
        }).catch((error) => console.log(error));
    };

    React.useEffect(() => {
        getData();
    }, []);

  return (
    <div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    {data.length > 0 ? data.map((value, index) => {
        return  <tr>
        <th scope="row">{index + 1}</th>
        <td>{value.username}</td>
        <td>{value.email}</td>
        <td>{moment(value.date).format("DD MMM YYYY")}</td>
      </tr>
    }) : ""}
  </tbody>
</table>
    </div>
  )
}

export default UserList