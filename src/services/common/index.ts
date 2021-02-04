import request from '../request/index';

// jsSessionUrl
export async function getRule(payload) {
  return request.get('/api/auth/authRule',  { jsCode: payload.jsCode}, false);
}

