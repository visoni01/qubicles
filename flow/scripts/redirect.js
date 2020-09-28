// Staging: http://staging.qubicles.io/
// Local:
// - http://localhost:3000/ (Frontend)
// - http://localhost:4000/ (Backend)

// TODO: setup environment variables (on apache side) for the host

const QUBICLE_URL = "http://staging.qubicles.io/"

function redirectToMainSite() {
  window.location.href = QUBICLE_FRONTEND_URL
}

function redirectToLoginSite() {
  window.location.href = QUBICLE_FRONTEND_URL + "login"
}

function refreshPage() {
  window.location.href = QUBICLE_FRONTEND_URL + "flow"
}
