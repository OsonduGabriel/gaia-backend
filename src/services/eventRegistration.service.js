
import {
  Event,
  EventRegistration,
  User,
} from "../models/index.js";

// Register a user for an event.
export async function registerForEvent(userId, eventId) {
  // Find the event and make sure it is published.
  const event = await Event.findOne({
    where: {
      id: eventId,
      status: "published",
    },
  });

  if (!event) {
    const error = new Error("Event not found or registration unavailable.");
    error.statusCode = 404;
    throw error;
  }

  // Check whether this user has already registered.
  const existingRegistration = await EventRegistration.findOne({
    where: {
      userId,
      eventId,
    },
  });

  if (existingRegistration) {
    if (existingRegistration.status === "registered") {
      const error = new Error("You have already registered for this event.");
      error.statusCode = 409;
      throw error;
    }

    // Allow a user to register again after cancelling.
    await existingRegistration.update({
      status: "registered",
    });

    return existingRegistration;
  }

  // Create a new registration.
  return await EventRegistration.create({
    userId,
    eventId,
  });
}

// Get all registrations belonging to a user.
export async function getUserRegistrations(userId) {
  return await EventRegistration.findAll({
    where: { userId },
    include: [
      {
        model: Event,
        as: "event",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

// Cancel a user's registration.
export async function cancelEventRegistration(userId, registrationId) {
  const registration = await EventRegistration.findOne({
    where: {
      id: registrationId,
      userId,
    },
  });

  if (!registration) {
    const error = new Error("Registration not found.");
    error.statusCode = 404;
    throw error;
  }

  if (registration.status === "cancelled") {
    const error = new Error("This registration has already been cancelled.");
    error.statusCode = 409;
    throw error;
  }

  await registration.update({
    status: "cancelled",
  });

  return registration;
}

// Admin: Get all registrations for a particular event.
export async function getEventRegistrations(eventId) {
  const event = await Event.findByPk(eventId);

  if (!event) {
    const error = new Error("Event not found.");
    error.statusCode = 404;
    throw error;
  }

  return await EventRegistration.findAll({
    where: { eventId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "fullName", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}
