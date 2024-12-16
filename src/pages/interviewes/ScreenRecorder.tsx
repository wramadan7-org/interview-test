import React, { useState, useCallback } from "react";

const ForcedScreenRecordApp: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);

  const startFullScreenRecording = useCallback(async () => {
    try {
      // Directly request entire screen
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      // Create MediaRecorder
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      // Setup data collection
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      // Handle stop event
      recorder.onstop = () => {
        setRecordedChunks(chunks);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      // Start recording
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);

      // Setup duration tracking
      const startTime = Date.now();
      const durationInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setRecordingDuration(elapsedSeconds);
      }, 1000);

      // Clean up on stream end
      stream.getVideoTracks()[0].onended = () => {
        clearInterval(durationInterval);
        recorder.stop();
        setIsRecording(false);
      };

      return () => {
        clearInterval(durationInterval);
      };
    } catch (err) {
      console.error("Screen recording error:", err);
      alert(
        "Failed to start screen recording. Please ensure you grant screen sharing permissions."
      );
    }
  }, []);

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${fullName || "screen"}_recording.webm`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim()) {
      await startFullScreenRecording();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Full Screen Recorder
        </h1>

        {!isRecording ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md 
                         hover:bg-blue-600 transition-colors duration-300"
            >
              Start Full Screen Recording
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-100 p-4 rounded-md text-center">
              <p className="text-green-800 font-semibold">
                Recording for {fullName}
              </p>
              <p className="text-green-700 text-xl font-bold mt-2">
                {formatDuration(recordingDuration)}
              </p>
            </div>

            <button
              onClick={stopRecording}
              className="w-full bg-red-500 text-white py-2 rounded-md 
                         hover:bg-red-600 transition-colors duration-300"
            >
              Stop Recording
            </button>
          </div>
        )}

        {recordedChunks.length > 0 && (
          <div className="space-y-4 mt-4">
            <video
              src={URL.createObjectURL(
                new Blob(recordedChunks, { type: "video/webm" })
              )}
              controls
              className="w-full rounded-md"
            />
            <button
              onClick={downloadRecording}
              className="w-full bg-green-500 text-white py-2 rounded-md 
                         hover:bg-green-600 transition-colors duration-300"
            >
              Download Recording
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForcedScreenRecordApp;
