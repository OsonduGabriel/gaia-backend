
import { Event } from "../models/index.js";

// Generate a URL-friendly slug from the event title.
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Get all published events.
export async function getAllEvents() {
  return await Event.findAll({
    where: { status: "published" },
    order: [["startsAt", "ASC"]],
  });
}

// Get one published event by ID.
export async function getEventById(id) {
  return await Event.findOne({
    where: {
      id,
      status: "published",
    },
  });
}

// Create a new event.
export async function createEvent(eventData) {
  const {
    title,
    description,
    location,
    startsAt,
    endsAt,
    coverImageUrl,
  } = eventData;

  const slug = generateSlug(title);

  // Check whether the slug already exists.
  const existingEvent = await Event.findOne({
    where: { slug },
  });

  if (existingEvent) {
    const error = new Error("An event with this title already exists.");
    error.statusCode = 409;
    throw error;
  }

  return await Event.create({
    title,
    slug,
    description,
    location,
    startsAt,
    endsAt,
    coverImageUrl,
  });
}

// Update an existing event.
export async function updateEvent(id, eventData) {
  const event = await Event.findByPk(id);

  if (!event) {
    const error = new Error("Event not found.");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    "title",
    "description",
    "location",
    "startsAt",
    "endsAt",
    "coverImageUrl",
    "status",
  ];

  const updateData = {};

  // Only update permitted fields.
  for (const field of allowedFields) {
    if (eventData[field] !== undefined) {
      updateData[field] = eventData[field];
    }
  }

  // Generate a new slug when the title changes.
  if (updateData.title && updateData.title !== event.title) {
    const newSlug = generateSlug(updateData.title);

    const existingEvent = await Event.findOne({
      where: { slug: newSlug },
    });

    if (
      existingEvent &&
      String(existingEvent.id) !== String(id)
    ) {
      const error = new Error("An event with this title already exists.");
      error.statusCode = 409;
      throw error;
    }

    updateData.slug = newSlug;
  }

  await event.update(updateData);

  return event;
}

// Delete an event.
export async function deleteEvent(id) {
  const event = await Event.findByPk(id);

  if (!event) {
    const error = new Error("Event not found.");
    error.statusCode = 404;
    throw error;
  }

  await event.destroy();

  return event;
}
