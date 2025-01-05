"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/app/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  // revalidate the root route so it shows the updated list of snippets
  revalidatePath(`/`);
  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    //check user's inputs and make sure they are valid
    const title = formData.get("title");
    const code = formData.get("code");
    const language = formData.get("language") as string;

    //validating user's inputs
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be a string and longer than 3 characters",
      };
    }
    if (typeof code !== "string" || code.length < 5) {
      return {
        message: "Code must be a string and longer than 5 characters",
      };
    }

    //create new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
        language,
      },
    });

    // throw new Error("Failed to save to database");
  } catch (error: unknown) {
    //if there is an error, return the error message
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }

  // revalidate the root route so it shows the updated list of snippets
  revalidatePath("/");
  //redirect user back to the root route
  redirect("/");
}
