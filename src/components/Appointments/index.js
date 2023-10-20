import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isFavorite: !eachList.isFavorite}
        }
        return eachList
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      titleInput,
      formatedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilterAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {isFilterActive, titleInput, dateInput} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterAppointmentList = this.getFilterAppointmentList()

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form
                className="appointment-input-container"
                onSubmit={this.addAppointment}
              >
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                  className="input"
                />

                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                  className="input"
                />

                <button type="submit" className="addBtn">
                  Add
                </button>
              </form>

              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-img"
              />
            </div>
            <hr />
            <div className="appointment-filter-container">
              <h1 className="appoint-heading">Appointments</h1>
              <button
                type="button"
                onClick={this.onFilter}
                className={`filter-style ${filterClassName}`}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filterAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsFavorite={this.toggleIsFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
