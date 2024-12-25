export const SESSION_ID_KEY = 'PROJECT_SESSION_ID';

export function getSessionId() {
  return localStorage.getItem(SESSION_ID_KEY) ?? '';
}

export function setSessionId(sessionId = '') {
  localStorage.setItem(SESSION_ID_KEY, sessionId);
}

export function getSessionToken() {
  return 'SessionToken';
}
