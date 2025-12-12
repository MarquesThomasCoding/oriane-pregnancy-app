// TODO: Replace with a real Auth.js / session lookup.
// For now we use a demo user id so server actions remain type-safe.
export async function getCurrentUserId() {
  const fallbackId = "demo-user"
  const envId = process.env.DEMO_USER_ID
  return envId ?? fallbackId
}
