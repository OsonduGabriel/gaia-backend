
import { Programme } from "../models/index.js";

// Generate a URL-friendly slug from the programme title.
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Get all published programmes.
export async function getAllProgrammes() {
  return await Programme.findAll({
    where: { status: "published" },
    order: [["createdAt", "DESC"]],
  });
}

// Get one published programme by its ID.
export async function getProgrammeById(id) {
  return await Programme.findOne({
    where: {
      id,
      status: "published",
    },
  });
}

// Create a new programme.
export async function createProgramme(programmeData) {
  const { title, summary, description, imageUrl } = programmeData;

  const slug = generateSlug(title);

  // Ensure the generated slug is not already in use.
  const existingProgramme = await Programme.findOne({
    where: { slug },
  });

  if (existingProgramme) {
    const error = new Error(
      "A programme with a similar title already exists."
    );
    error.status = 409;
    throw error;
  }

  return await Programme.create({
    title,
    slug,
    summary,
    description,
    imageUrl,
  });
}

// Update an existing programme.
export async function updateProgramme(id, programmeData) {
  const programme = await Programme.findByPk(id);

  if (!programme) {
    const error = new Error("Programme not found.");
    error.status = 404;
    throw error;
  }

  const allowedFields = [
    "title",
    "summary",
    "description",
    "imageUrl",
    "status",
  ];

  const updateData = {};

  for (const field of allowedFields) {
    if (programmeData[field] !== undefined) {
      updateData[field] = programmeData[field];
    }
  }

  // Regenerate the slug when the title changes.
  if (
    updateData.title &&
    updateData.title !== programme.title
  ) {
    const newSlug = generateSlug(updateData.title);

    const existingProgramme = await Programme.findOne({
      where: { slug: newSlug },
    });

    if (existingProgramme && existingProgramme.id !== id) {
      const error = new Error(
        "A programme with a similar title already exists."
      );
      error.status = 409;
      throw error;
    }

    updateData.slug = newSlug;
  }

  await programme.update(updateData);

  return programme;
}

// Delete a programme.
export async function deleteProgramme(id) {
  const programme = await Programme.findByPk(id);

  if (!programme) {
    const error = new Error("Programme not found.");
    error.status = 404;
    throw error;
  }

  await programme.destroy();

  return true;
}
