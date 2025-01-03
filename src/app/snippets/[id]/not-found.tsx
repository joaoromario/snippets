import React from "react";

export default function SnippetNotFound({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div>
      <h1>Sorry, but we couldn&#39;t find that particular snippet.</h1>
      <p>Id: {id}</p>
    </div>
  );
}
