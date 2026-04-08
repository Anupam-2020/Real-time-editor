import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3001");

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    const docId = "doc-1";
    socket.emit("join-document", docId);

    socket.on("load-document", (data) => {
      setText(data);
    });

    socket.on("receive-changes", (data) => {
      setText(data);
    });

    return () => {
      socket.off("load-document");
      socket.off("receive-changes");
    };
  }, []);

  const docId = 'doc-1';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    socket.emit("send-changes", {
      docId,
      content: value
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-time Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        style={{ width: "100%", height: "300px" }}
      />
    </div>
  );
}