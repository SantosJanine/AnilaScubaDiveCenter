// utils/auth.ts

export const isUserLoggedIn = (): boolean => {
  const userId = localStorage.getItem('id');
  return Boolean(userId);
};

// Get the full logged-in user from localStorage
export const getLoggedInUser = (): { id: string; first_name: string; last_name: string; avatar: string } | null => {
  const user = localStorage.getItem('user'); // store the full user object when signing in
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (e) {
    console.error('Error parsing user from localStorage', e);
    return null;
  }
};

// Convenience function for display name
export const getUsername = (): string => {
  const user = getLoggedInUser();
  if (!user) return '';
  return `${user.first_name} ${user.last_name}`;
};
