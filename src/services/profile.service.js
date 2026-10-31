
import { Profile } from "../models/index.js";

// Get a user's profile.
export async function getUserProfile(userId) {
  const profile = await Profile.findOne({
    where: { userId },
  });

  return profile;
}

// Create or update a user's profile.
export async function updateUserProfile(userId, profileData) {
  // Only allow these profile fields to be updated.
  const allowedFields = {
    phone: profileData.phone,
    location: profileData.location,
    bio: profileData.bio,
  };

  // Remove fields that were not included in the request.
  const updateData = Object.fromEntries(
    Object.entries(allowedFields).filter(
      ([key, value]) => value !== undefined
    )
  );

  let profile = await Profile.findOne({
    where: { userId },
  });

  if (!profile) {
    // Create a profile if the user does not have one yet.
    profile = await Profile.create({
      userId,
      ...updateData,
    });
  } else {
    // Update the existing profile.
    await profile.update(updateData);
  }

  return profile;
}

