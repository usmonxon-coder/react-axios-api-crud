import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../Styles/Main.css";

export default function Main(props) {
  const [loading, SetLoader] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [students, setStudents] = useState([]);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    SetLoader(true);
    axios
      .get("https://studentcrudforlesson.herokuapp.com/api/student/get")
      .then((res) => {
        setStudents(res.data);
        SetLoader(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const addStudent = (e) => {
    if (
      state.firstname === "" ||
      state.lastname === "" ||
      state.username === "" ||
      state.phoneNumber === ""
    ) {
      toast.warning("Iltimos formani toldiring", {
        position: "top-center",
      });
    } else {
      SetLoader(true);
      axios
        .post(
          "https://studentcrudforlesson.herokuapp.com/api/student/add",
          state
        )
        .then((res) => {
          getStudents();
          toast.success(res.data, {
            position: "top-center",
          });
          setState({
            firstname: "",
            lastname: "",
            username: "",
            phoneNumber: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteStudent = (id) => {
    SetLoader(true);
    axios
      .delete(
        `https://studentcrudforlesson.herokuapp.com/api/student/delete/${id}`
      )
      .then((res) => {
        getStudents();
        toast.success(res.data, {
          position: "top-center",
        });
      })
      .catch((err) => console.log(err));
  };

  const editStudents = (item) => {
    setState(item);
    setIsEdit(false);
  };
  const saveEdit = () => {
    axios
      .post(
        `https://studentcrudforlesson.herokuapp.com/api/student/update/${state.id}`,
        state
      )
      .then((res) => {
        console.log(res);
        getStudents();
        setIsEdit(true);
        toast.success("Malumot ozgartirildi", {
          position: "top-center",
        });
        setState({
          firstname: "",
          lastname: "",
          username: "",
          phoneNumber: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      {loading && (
        <div
          className="text-center d-flex align-items-center justify-content-center"
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            top: "8%",
            backgroundColor: "rgba(107, 105, 105, 0.205)",
          }}
        >
          <div
            className="spinner-border"
            style={{ height: "60px", width: "60px" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="container">
        <h1 className="text-center">Students</h1>
        <div className="forma d-flex my-3">
          <input
            className="form-control me-2 input1 mb-2 mb-md-0"
            type="text"
            placeholder="Enter your Firstname"
            name="firstname"
            onChange={handleInput}
            value={state.firstname}
          />
          <input
            className="form-control me-2 input2 mb-2 mb-md-0"
            type="text"
            placeholder="Enter your LastName"
            name="lastname"
            onChange={handleInput}
            value={state.lastname}
          />
          <input
            className="form-control me-2 input3 mb-2 mb-md-0"
            type="text"
            placeholder="Enter your UserName"
            name="username"
            onChange={handleInput}
            value={state.username}
          />
          <input
            className="form-control me-2 input4 mb-2 mb-md-0"
            type="text"
            placeholder="Enter your PhoneNumber"
            name="phoneNumber"
            onChange={handleInput}
            value={state.phoneNumber}
          />
          {isEdit ? (
            <button onClick={() => addStudent()} className="btn btn-info">
              Add
            </button>
          ) : (
            <button className="btn btn-warning edit2" onClick={saveEdit}>
              Edit
            </button>
          )}
        </div>
        <div className="salom">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Username</th>
                <th scope="col">PhoneNumber</th>
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.username}</td>
                  <td>{item.phoneNumber}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning me-2 edit"
                      onClick={() => editStudents(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStudent(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
