import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { useState } from "react"
import axios from "axios"
import EditTutorial from "./EditTutorial"

const TutorialList = ({ tutorials, getTutorial }) => {
  const BASE_URL = "https://tutorial-api.fullstack.clarusway.com/tutorials/"

  const [editItemId, setEditItemId] = useState(-1)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}${id}/`)
    } catch (error) {
      console.log(error)
    }

    getTutorial()
  }

  const editTutor = async (tutor) => {
    try {
      await axios.put(`${BASE_URL}${tutor.id}/`, tutor)
    } catch (error) {}
  }

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-center">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {tutorials?.map((item) => {
            const { id, title, description } = item
            return (
              <tr key={id}>
                <th>{id}</th>
                <td>{title}</td>
                <td>{description}</td>
                <td className="text-center text-nowrap">
                  <FaEdit
                    size={20}
                    type="button"
                    className="me-2 text-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#open-modal"
                    onClick={() => setEditItemId(id)}
                  />
                  <AiFillDelete
                    size={22}
                    type="button"
                    className="text-danger "
                    onClick={() => handleDelete(id)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <EditTutorial editTutor={editTutor} id={editItemId} />
    </div>
  )
}

export default TutorialList
