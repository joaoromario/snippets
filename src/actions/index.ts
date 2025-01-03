"use server";

import { redirect } from "next/navigation";
import { db } from "@/app/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
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
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
      language,
    },
  });

  //redirect user back to the root route
  redirect("/");
}
