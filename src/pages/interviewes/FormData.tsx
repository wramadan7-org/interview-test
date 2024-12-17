import React from "react";

interface LanguageFormProps {
  formData: {
    fullName: string;
    position?: string;
    language?: string;
    code?: string;
  };
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormData: React.FC<LanguageFormProps> = ({
  formData,
  handleChange,
  language,
  setLanguage,
  setCode,
  handleSubmitForm,
}) => {
  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col items-start justify-center mt-5 border border-gray-300 rounded-md w-full max-w-lg gap-3 p-3"
    >
      <div className="w-full h-fit">
        <label htmlFor="fullName" className="font-semibold">
          Full Name:
        </label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Wahyu Ramadan"
          className="w-full min-h-10 px-2 border rounded-md"
        />
      </div>

      <div className="w-full h-fit">
        <label htmlFor="language" className="text-lg font-semibold">
          Select Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setCode(
              e.target.value === "javascript"
                ? `console.log("Hello, JavaScript!");`
                : `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Go!")\n}`
            );
          }}
          className="px-4 py-2 border rounded-md w-full"
        >
          <option value="javascript">JavaScript</option>
          <option value="go">Go</option>
        </select>
      </div>
      <div className="w-full h-fit">
        <label htmlFor="position" className="font-semibold">
          Position:
        </label>
        <input
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Frontend"
          className="w-full min-h-10 px-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Start Interview Test
      </button>
    </form>
  );
};

export default FormData;
