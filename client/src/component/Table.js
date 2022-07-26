import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [inputField, setInputField] = useState({
    employeName: '',
    department: '',
    salary: '',
  });

  const [editTableData, setEditTableData] = useState({
    employeName: '',
    department: '',
    salary: '',
  });
  const [sortState, setSortState] = useState({
    1: false,
    2: false,
    3: false,
  });
  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const editInputsHandler = (e) => {
    const { name, value } = e.target;
    setEditTableData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitButton = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_URL}/api/add`,
        inputField
      );
      if (data.status === 200) {
        setTableData([...tableData, data.data]);
        setInputField({
          employeName: '',
          department: '',
          salary: '',
        });
      }
    } catch (error) {
      alert('error');
    }
  };
  const sorting = async (refId) => {
    const obj = {
      1: 'employeName',
      2: 'department',
      3: 'salary',
    };
    setSortState({ ...sortState, [refId]: !sortState[refId] });
    const sortId = sortState[refId] ? 1 : -1;
    try {
      const { status, data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/get/${obj[refId]}/${sortId}`
      );
      setTableData([]);
      if (status === 200) setTableData(data);
    } catch (error) {
      alert('error');
    }
  };
  const deleteRecord = async (id) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_URL}/api/delete/${id}`
      );
      if (data.status === 200)
        setTableData(tableData.filter((item) => item._id !== id));
    } catch (error) {
      alert('error');
    }
  };
  const updateRecord = async (id) => {
    try {
      const { status } = await axios.put(
        `${process.env.REACT_APP_URL}/api/update/${id}`,
        editTableData
      );
      if (status === 200) getDatafromDb();
    } catch (error) {
      alert('error');
    }
  };
 
  const getDatafromDb = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/get`
      );
      setTableData(data);
  };
  useEffect(() => {
    getDatafromDb();
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Employees Name{' '}
                <span onClick={() => sorting(1)}>
                  {sortState[1] ? '↑' : '↓'}
                </span>
              </th>
              <th>
                departments{' '}
                <span onClick={() => sorting(2)}>
                  {sortState[2] ? '↑' : '↓'}
                </span>
              </th>
              <th>
                Salary{' '}
                <span onClick={() => sorting(3)}>
                  {sortState[3] ? '↑' : '↓'}
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <label>
                    <input
                      type="text"
                      name="employeName"
                      onChange={inputsHandler}
                      value={inputField.employeName}
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="text"
                      name="department"
                      onChange={inputsHandler}
                      value={inputField.department}
                    />
                  </label>
                </div>
              </td>
              <td>
                <div>
                  <label>
                    <input
                      type="number"
                      name="salary"
                      onChange={inputsHandler}
                      value={inputField.salary}
                    />
                  </label>
                </div>
              </td>
              <td>
                <button onClick={submitButton}>Submit Now</button>
              </td>
            </tr>
            {tableData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div>
                      <label>
                        <input
                          type="text"
                          name="employeName"
                          onChange={editInputsHandler}
                          defaultValue={item.employeName}
                        />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div>
                      <label>
                        <input
                          type="text"
                          name="department"
                          onChange={editInputsHandler}
                          defaultValue={item.department}
                        />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div>
                      <label>
                        <input
                          type="number"
                          name="salary"
                          onChange={editInputsHandler}
                          defaultValue={item.salary}
                        />
                      </label>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => deleteRecord(item._id)}>
                      Delete
                    </button>
                    <button onClick={() => updateRecord(item._id, item)}>
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
