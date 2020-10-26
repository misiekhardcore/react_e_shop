export const checkUserIsAdmin = (currentUser) => {
  console.log(currentUser)
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true;
  return false;
};
