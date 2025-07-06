import { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Placeholder } from "rsuite";
import url from '../misc/url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import assistant from '../assets/assistant.gif';

function Video() {
  const [modules, setModules] = useState([]);
  const [topic, setTopic] = useState([]);
  const [video, setVideo] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // AI Bot Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { user: userInput, bot: '' }]);
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCpgaSyevRj5gq5Cz4rsN_4ro2OFOrArQk");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const data = await model.generateContent(userInput);
      setMessages((prev) => [...prev, { user: '', bot: data.response.text() || 'No response from AI.' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { user: '', bot: `Error: ${err.message}` }]);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  // Fetch Modules
  useEffect(() => {
    const id = localStorage.getItem("topic_id");
    axios.post(`${url}modules/modules`, { id })
      .then((res) => setModules(res.data || []))
      .catch(console.error);
  }, []);

  // Fetch Topics by Module
  const select_topic = (e) => {
    const name = e.target.value;
    setLoadingTopics(true);
    axios.post(`${url}topics/topics`, { name })
      .then((res) => setTopic(res.data || []))
      .catch(console.error)
      .finally(() => setLoadingTopics(false));
  };

  // Fetch Video by Topic ID
  const fetch_video = (id) => {
    setLoadingVideo(true);
    setVideo([]);
    axios.post(`${url}video/video`, { id })
      .then((res) => setVideo(res.data || []))
      .catch(console.error)
      .finally(() => setLoadingVideo(false));
  };

  return (
    <>
      {/* Assistant Icon */}
      <div className="fixed bottom-24 right-6 z-50">
        <img src={assistant} alt="AI Assistant" className="h-24 cursor-pointer" onClick={() => document.querySelector('.chatbox').style.display = "block"} />
      </div>

      {/* Chatbox */}
      <div className="chatbox hidden fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
        <div className="bg-purple-500 rounded-3xl shadow-xl p-5 w-full max-w-sm relative">
          <button className="absolute top-2 right-3 text-white text-lg" onClick={() => document.querySelector('.chatbox').style.display = "none"}>
            <i className='fa-solid fa-circle-xmark'></i>
          </button>
          <h2 className="text-white text-xl font-bold mb-4">WillSkill AI</h2>
          <div className="bg-white h-60 overflow-y-auto p-3 rounded shadow-inner mb-4">
            {messages.length > 0 ? messages.map((msg, i) => (
              <div key={i}>
                {msg.user && <p className="text-sm p-2 bg-blue-100 rounded mb-1"><strong>You:</strong> {msg.user}</p>}
                {msg.bot && <p className="text-sm p-2 bg-orange-500 text-white rounded mb-2"><strong>Bot:</strong> {msg.bot}</p>}
              </div>
            )) : <Loader />}
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask me anything..." disabled={loading} className="w-full p-2 rounded border" />
            <button type="submit" className="mt-3 w-full bg-white text-black border rounded p-2 hover:bg-gray-100" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-full min-h-screen">
        {/* Sidebar */}
        <div className="lg:w-1/4 border-r p-4 overflow-y-auto max-h-screen">
          <h3 className="font-bold text-gray-700 text-lg mb-2">Modules</h3>
          <select className="w-full h-10 border rounded mb-4" onChange={select_topic}>
            <option value="">Select Module</option>
            {modules.length > 0 ? modules.map((mod, i) => (
              <option key={i} value={mod.name}>{mod.name}</option>
            )) : <option disabled>Loading...</option>}
          </select>

          <h3 className="font-bold text-gray-700 text-lg mb-2">Topics</h3>
          {loadingTopics ? <Placeholder.Paragraph rows={5} active /> : topic.length > 0 ? topic.map((el, i) => (
            <div key={i} onClick={() => fetch_video(el._id)} className="cursor-pointer border rounded p-3 mb-3 hover:bg-gray-100">
              <div className="flex items-center space-x-2">
                {el.type.includes("image") ? <i className="fa-solid fa-image" /> : <i className="fa-brands fa-youtube" />}
                <span>{el.name}</span>
              </div>
            </div>
          )) : <div className="text-sm text-gray-500">No topics found.</div>}
        </div>

        {/* Video Display */}
        <div className="lg:w-3/4 flex justify-center items-center p-4">
          {loadingVideo ? (
            <Placeholder.Graph active style={{ height: 400, width: '100%' }} />
          ) : video.length > 0 ? video.map((el, i) => (
            <div key={i} className="w-full max-w-4xl">
              {el.type.includes("image") ? (
                <img
                  src={`data:${el.type};base64,${el.file}`}
                  alt="Content"
                  className="w-full max-h-[500px] object-contain rounded shadow"
                  loading="lazy"
                />
              ) : (
                <video
                  src={`data:${el.type};base64,${el.file}`}
                  className="w-full max-h-[500px] rounded shadow"
                  controls
                  preload="metadata"
                />
              )}
            </div>
          )) : <div className="text-gray-500">Select a topic to load content.</div>}
        </div>
      </div>
    </>
  );
}

export default Video;
