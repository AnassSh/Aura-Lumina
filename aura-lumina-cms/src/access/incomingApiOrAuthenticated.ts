import type { Access } from 'payload'

/**
 * Allows access if the user is authenticated (logged in) OR
 * if the request includes the incoming API key (Bearer token).
 * Use for Orders and Partners so the main site can POST new submissions.
 * Set PAYLOAD_INCOMING_API_KEY in the CMS env; main site uses same value in Authorization header.
 */
export const incomingApiOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  const key = process.env.PAYLOAD_INCOMING_API_KEY
  if (!key) return false
  const auth = req.headers.get('Authorization')
  return auth === `Bearer ${key}`
}
