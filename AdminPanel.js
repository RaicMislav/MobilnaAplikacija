// AdminPanel.js

import { supabase } from "./supabaseConfig"; // Adjust the import path as needed

// Specify the admin UID(s)
export const ADMIN_UID = "49215ea1-1d5e-4a9d-a53f-6d0a208dca5d";

/**
 * Fetch the current user's UID from Supabase
 * and check if they are an admin.
 * @returns {Promise<boolean>} - Returns true if the user is an admin, false otherwise.
 */
export const isAdmin = async () => {
  try {
    // Get the current session from Supabase
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching session:", error);
      return false; // Default to false on error
    }

    if (session && session.user) {
      const currentUid = session.user.id;
      return currentUid === ADMIN_UID; // Check if the UID matches the admin UID
    }

    console.log("No user is currently logged in.");
    return false; // Return false if no user is logged in
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false; // Default to false on error
  }
};