import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {titleInput, formatedDate, isFavorite, id} = appointmentDetails
  const filledStarImg = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }
  return (
    <li className="appointment-item">
      <div className="appoint-container">
        <p className="appointment-title">{titleInput}</p>
        <button
          data-testid="star"
          type="button"
          onClick={onClickFavoriteIcon}
          className="btn-style"
        >
          <img src={filledStarImg} alt="star" className="star" />
        </button>
      </div>
      <p className="appointment-date">Date: {formatedDate}</p>
    </li>
  )
}
export default AppointmentItem
