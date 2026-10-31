
import { Resource } from "../models/index.js";

// Generate a URL-friendly slug from the resource title.
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Get all published resources.
export async function getAllResources() {
  return await Resource.findAll({
    where: { status: "published" },
    order: [["createdAt", "DESC"]],
  });
}

// Get one published resource by its ID.
export async function getResourceById(id) {
  return await Resource.findOne({
    where: {
      id,
      status: "published",
    },
  });
}

// Create a new resource.
export async function createResource(resourceData) {
  const {
    title,
    description,
    category,
    fileUrl,
    coverImageUrl,
  } = resourceData;

  const slug = generateSlug(title);

  // Check whether the slug already exists.
  const existingResource = await Resource.findOne({
    where: { slug },
  });

  if (existingResource) {
    const error = new Error("A resource with this title already exists.");
    error.statusCode = 409;
    throw error;
  }

  return await Resource.create({
    title,
    slug,
    description,
    category,
    fileUrl,
    coverImageUrl,
  });
}

// Update an existing resource.
export async function updateResource(id, resourceData) {
  const resource = await Resource.findByPk(id);

  if (!resource) {
    const error = new Error("Resource not found.");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    "title",
    "description",
    "category",
    "fileUrl",
    "coverImageUrl",
    "status",
  ];

  const updateData = {};

  // Only update fields that are allowed.
  for (const field of allowedFields) {
    if (resourceData[field] !== undefined) {
      updateData[field] = resourceData[field];
    }
  }

  // Generate a new slug if the title changes.
  if (updateData.title && updateData.title !== resource.title) {
    const newSlug = generateSlug(updateData.title);

    const existingResource = await Resource.findOne({
      where: { slug: newSlug },
    });

    if (
      existingResource &&
      String(existingResource.id) !== String(id)
    ) {
      const error = new Error("A resource with this title already exists.");
      error.statusCode = 409;
      throw error;
    }

    updateData.slug = newSlug;
  }

  await resource.update(updateData);

  return resource;
}

// Delete a resource.
export async function deleteResource(id) {
  const resource = await Resource.findByPk(id);

  if (!resource) {
    const error = new Error("Resource not found.");
    error.statusCode = 404;
    throw error;
  }

  await resource.destroy();

  return resource;
}
