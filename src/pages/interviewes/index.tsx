import { FormEvent, useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import QuestionPage from "./Question";
import FormData from "./FormData";
// import { downloadBlob } from "../../utils/downloading";

const InterviewIntroduction = () => {
  const { startRecording, stopRecording, mediaBlobUrl, status } =
    useReactMediaRecorder({ video: true, screen: true });
  const [mediaBlobUrlState, setMediaBlobUrlState] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    language: "",
    code: "",
  });

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`console.log("Hello, JavaScript!");`);
  const [output, setOutput] = useState("");

  console.log(status, "status");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("START RECORDING");
    startRecording();
    console.log("FULL NAME: ", formData);
    setTimeout(() => {
      console.log("STOP RECORDING");
      stopRecording();
    }, 3000);
  };

  useEffect(() => {
    // Contoh penggunaan
    // if (mediaBlobUrl?.length) {
    //   downloadBlob(
    //     mediaBlobUrl,
    //     "my_file.webm" // Sesuaikan dengan format file
    //   );
    // }

    setMediaBlobUrlState(mediaBlobUrl ?? "");
  }, [mediaBlobUrl]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="tracking-tighter text-blue-300">
        Welcome to Test Interview in Cudo Communications
      </h1>
      <h5 className="mt-2">Please fill your name</h5>

      {/* <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-start justify-center mt-5 border border-red-300 rounded-md w-full max-w-lg gap-3 p-3"
      >
        <div className="w-full h-fit">
          <label htmlFor="fullName">Full Name</label>
          <input
            name="fullName"
            value={nameState}
            onChange={handleChangeForm}
            placeholder="Wahyu Ramadan"
            className="w-full min-h-10 px-2"
          />
        </div>

        <button type="submit">Start Interview Test</button>
      </form> */}
      <FormData
        formData={formData}
        handleChange={handleChange}
        language={language}
        setLanguage={setLanguage}
        setCode={setCode}
        handleSubmitForm={handleSubmitForm}
      />

      {!!mediaBlobUrlState?.length && (
        <video
          src={mediaBlobUrlState ?? ""}
          className="mt-10"
          controls
          autoPlay
        />
      )}
      {/* {status === "recording" && (
        <QuestionPage
          language={language}
          code={code}
          setCode={setCode}
          output={output}
          setOutput={setOutput}
        />
      )} */}
      <QuestionPage
        language={language}
        code={code}
        setCode={setCode}
        output={output}
        setOutput={setOutput}
      />
    </div>
  );
};

export default InterviewIntroduction;
