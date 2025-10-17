// MODIFIED: switched to default import from 'jwt-decode' (was named import)
// Reason: the library exports the decoder as default. Using the correct import avoids runtime errors.
import jwtDecode from "jwt-decode";

// MODIFIED: made getRole resilient
// - returns null if no token
// - catches decode errors and returns null
// Reason: backend might not include a 'role' claim in the JWT; avoid crashing the app.
const getRole = (token) => {
  if (!token) return null;
  try {
    const payload = jwtDecode(token);
    return payload?.role ?? null;
  } catch (err) {
    console.error("El token es inválido o expiró, no se pudo decodificar.", err);
    return null;
  }
};

export { getRole };
