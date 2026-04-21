import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "graphql/mutations/mutations.gql";
import { updateAuthorCache } from "utils/helpers/cache.helper";

const AuthorForm = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [birthyear, setBirthyear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (_, { data }) => {
      updateAuthorCache(data.editAuthor);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedOption || !birthyear || isNaN(birthyear)) return;

    editAuthor({
      variables: {
        author: selectedOption,
        birthyear: parseInt(birthyear),
      },
    });

    setBirthyear("");
    setSelectedOption("");
  };

  return (
    <section>
      <h2>Set birthyear</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <label>
          Author
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Born
          <input
            type="text"
            value={birthyear}
            onChange={(e) => setBirthyear(e.target.value)}
          />
        </label>

        <button type="submit" className="secondary">
          Update author
        </button>
      </form>
    </section>
  );
};

export default AuthorForm;
