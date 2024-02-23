import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../data/config';

const AddStudentForm =(param)=>{
    const navigate = useNavigate(); 
    const [FirstName,setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [School, setSchool] = useState('');
    // console.log("param", param)
    // console.log("paramS", param.student.FirstName)
    const addStudent =(e)=>{
      e.preventDefault();
      if (!param.isEdit) {
        const result = fetch(`${BASE_URL.BASE_API_URL}students/`,{
            method:'post',
            body:JSON.stringify({
                firstName: FirstName,
                lastName: LastName,
                school: School,
            }),
            headers:{'Content-Type':'application/json'}
        });
        result
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            navigate('/list');
          } )
          .catch(error => console.error('Error:', error));

        // navigate('/list')
      }
      else {
        const result = fetch(`${BASE_URL.BASE_API_URL}students/${param.id}`,{
            method:'put',
            body:JSON.stringify({
                studentId: param.id,
                firstName: FirstName,
                lastName: LastName,
                school: School,
            }),
            headers:{'Content-Type':'application/json'}
        });
        result
        .then(response => {
          if (response.status === 204) {
            return;
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          navigate('/list');
        })
          .catch(error => console.error('Error:', error));

        // navigate('/list')
    }
  }
  
  const deleteStudent = () => {
    const result = fetch(`${BASE_URL.BASE_API_URL}students/${param.id}`,{
        method:'delete',
        headers:{'Content-Type':'application/json'}
    });
    result
    .then(response => {
      console.log(response)
      if (response.status === 204) {
        return;
      }
      return response.json();
    })
      .then((data) => {
        console.log(data);
        navigate('/list');
      })
      .catch(error => console.error('Error:', error));

    // navigate('/list')
  }

  useEffect(() => {
    if (param.student) {
      setFirstName(param.student.FirstName);
      setLastName(param.student.LastName);
      setSchool(param.student.School);
    }
  }, [param.student?.FirstName, param.student?.LastName, param.student?.School, param.student])
  

    return(
    <React.Fragment>
    <div className="panel panel-default">
      <form>
        <h3>{param.isEdit ? "Edit" : "Add"} Student</h3>
        <div className="form-group">
          <label>First Name:</label>
          <input className="form-control" type="text" placeholder="First Name"
            value={FirstName} onChange={(event) => setFirstName(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input className="form-control" type="text" placeholder="Last Name"
            value={LastName} onChange={(event) => setLastName(event.target.value)} />
        </div>
        <div className="form-group">
          <label>School:</label>
          <input className="form-control" type="text" placeholder="Occupation"
            value={School} onChange={(event) => setSchool(event.target.value)} />
        </div>

        <input type="submit" onClick={(e) => addStudent(e)} className="btn btn-success" value={param.isEdit ? "Edit" : "Add"} />
      </form>
      {param.isEdit ? <input type="button" onClick={() => deleteStudent()} className="btn btn-danger" value="Delete" /> : null}
    </div>
  </React.Fragment>
);
}

export default AddStudentForm;
