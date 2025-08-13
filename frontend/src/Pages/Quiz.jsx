// src/components/Quiz.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'rsuite';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FiClock, FiAward, FiHome, FiRepeat, FiLogOut, FiMic, FiBook } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle, FaVolumeUp } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const GEMINI_KEY = "AIzaSyCpgaSyevRj5gq5Cz4rsN_4ro2OFOrArQk";

export default function Quiz() {
  const navigate = useNavigate();

  // UI / quiz state
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [rivalScore, setRivalScore] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [performanceData, setPerformanceData] = useState(null);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [windowSize, setWindowSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  const [correctAnswers, setCorrectAnswers] = useState([]);

  // refs
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const isMounted = useRef(false);

  const questionCount = quiz.length;
  const progressPercentage = questionCount ? (questionIndex / questionCount) * 100 : 0;

  // Gemini Helper function
  const getGeminiResponse = async (prompt) => {
    if (!GEMINI_KEY) return null;
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.error('getGeminiResponse error:', err);
      return null;
    }
  };

  useEffect(() => {
    isMounted.current = true;
    setTopics(['Science', 'History', 'Programming', 'Mathematics', 'Geography', 'Literature']);
    setLoading(false);

    const handleResize = () => setWindowSize({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });
    
    window.addEventListener('resize', handleResize);

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimers();
      isMounted.current = false;
      stopAllSpeech();
      stopListening();
    };
  }, []);

  // Stop speech when question changes
  useEffect(() => {
    return () => {
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
        setSpeaking(false);
      }
    };
  }, [questionIndex]);

  useEffect(() => {
    if (!quizStarted || quizCompleted) return;
    if (questionIndex >= questionCount) return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    } else {
      handleTimeUp();
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, quizStarted, questionIndex, quizCompleted, questionCount]);

  useEffect(() => {
    if (quizStarted && questionIndex < questionCount) {
      setSelectedOption(null);
      setTimeLeft(15);
    }
  }, [questionIndex, quizStarted, questionCount]);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const stopAllSpeech = () => {
    if (synthRef.current?.speaking) {
      synthRef.current.cancel();
      setSpeaking(false);
    }
  };

  const normalizeQuestion = (q) => {
    const normalized = {
      question: q.question?.trim?.() || (q.prompt || 'Question'),
      options: q.options?.slice?.(0, 4) || q.choices || [],
      answer: q.answer || q.correct || (q.options?.[0] ?? ''),
      difficulty: q.difficulty || q.level || 'medium'
    };
    
    // Store correct answer
    setCorrectAnswers(prev => [...prev, normalized.answer]);
    
    return normalized;
  };

  const getFallbackForTopic = (topic) => {
    const pool = {
      Science: [
        { question: 'What is the chemical symbol for Gold', options: ['Go', 'Gd', 'Au', 'Ag'], answer: 'Au', difficulty: 'easy' },
        { question: 'Which gas is most abundant in Earth’s atmosphere', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], answer: 'Nitrogen', difficulty: 'easy' },
        { question: 'What force keeps planets in orbit around the sun', options: ['Magnetism','Gravity','Friction','Nuclear'], answer: 'Gravity', difficulty: 'medium' },
      ],
      Programming: [
        { question: 'Which language is primarily used for styling web pages', options: ['HTML','Python','CSS','Java'], answer: 'CSS', difficulty: 'easy' },
        { question: 'What does "DOM" stand for', options: ['Document Object Model','Data Object Model','Direct Object Model','Document Oriented Module'], answer: 'Document Object Model', difficulty: 'medium' },
      ],
      History: [
        { question: 'In which year did World War II end', options: ['1943','1945','1950','1939'], answer: '1945', difficulty: 'easy' },
        { question: 'Who was the first President of the United States', options: ['Thomas Jefferson','John Adams','George Washington','Abraham Lincoln'], answer: 'George Washington', difficulty: 'easy' },
      ],
      Mathematics: [
        { question: 'What is the value of π (approx)', options: ['2.14','3.14','4.14','1.41'], answer: '3.14', difficulty: 'easy' },
        { question: 'What is 12 * 11', options: ['121','132','143','144'], answer: '132', difficulty: 'easy' },
      ],
      Geography: [
        { question: 'What is the capital of France', options: ['Paris','Rome','Berlin','Madrid'], answer: 'Paris', difficulty: 'easy' },
      ],
      Literature: [
        { question: 'Who wrote "Hamlet"', options: ['Tolstoy','Shakespeare','Hemingway','Dante'], answer: 'Shakespeare', difficulty: 'medium' },
      ]
    };
    return (pool[topic] || pool['Science']).slice(0, 10);
  };

  const generateQuiz = async (topic) => {
    setLoading(true);
    setCorrectAnswers([]);
    try {
      if (GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate 10 multiple-choice questions about "${topic}". 
Return exactly in this JSON format (no extra text):
{"questions":[{"question":"...","options":["A","B","C","D"],"answer":"<one>","difficulty":"easy|medium|hard"}, ...]}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        console.log(text);

        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch (err) {
          const match = text.match(/\{[\s\S]*\}/);
          if (match) parsed = JSON.parse(match[0]);
        }

        if (parsed?.questions && parsed.questions.length) {
          const q = parsed.questions.slice(0, 10).map(normalizeQuestion);
          setQuiz(q);
          // Prefetch explanations in background
          prefetchExplanations(q);
        } else {
          const fallback = getFallbackForTopic(topic);
          setQuiz(fallback);
          setCorrectAnswers(fallback.map(q => q.answer));
        }
      } else {
        const fallback = getFallbackForTopic(topic);
        setQuiz(fallback);
        setCorrectAnswers(fallback.map(q => q.answer));
      }
    } catch (err) {
      console.error("generateQuiz error", err);
      const fallback = getFallbackForTopic(topic);
      setQuiz(fallback);
      setCorrectAnswers(fallback.map(q => q.answer));
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const prefetchExplanations = async (questions) => {
    if (!GEMINI_KEY) return;
    try {
      const map = {};
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const prompt = `Explain (in 2-3 sentences) why the correct answer to "${q.question}" is "${q.answer}".`;
        const text = await getGeminiResponse(prompt);
        if (text) {
          map[i] = text.trim();
        } else {
          map[i] = `Correct: ${q.answer}. Review concept.`;
        }
      }
      if (isMounted.current) setExplanations(map);
    } catch (err) {
      console.warn('prefetchExplanations failed', err);
    }
  };

  const selectTopic = (topic) => setSelectedTopic(topic);

  const startQuiz = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    await generateQuiz(selectedTopic);
    setAnswers([]);
    setQuestionIndex(0);
    setScore(0);
    setRivalScore(0);
    setDifficulty('medium');
    setPerformanceData(null);
    setRecommendations(null);
    setQuizCompleted(false);
    setQuizStarted(true);
    setLoading(false);
  };

  const handleOptionSelect = async (option) => {
    if (!quizStarted || quizCompleted) return;
    if (selectedOption !== null) return;
    if (questionIndex >= questionCount) return;

    clearTimers();
    setSelectedOption(option);

    const current = quiz[questionIndex];
    const normalizedOption = option.trim().toLowerCase();
    const normalizedAnswer = current.answer.trim().toLowerCase();
    const correct = normalizedOption === normalizedAnswer;
    
    // Update score immediately
    if (correct) {
      const timeBonus = Math.floor(timeLeft / 3);
      setScore(prev => prev + 10 + timeBonus);
    }

    setAnswers((prev) => [...prev, {
      index: questionIndex,
      selected: option,
      correct,
      timeLeft,
      difficulty: current.difficulty || difficulty
    }]);

    updateDifficulty(correct);

    // Get explanation from cache or generate
    let expl = explanations[questionIndex];
    if (!expl) {
      expl = await getExplanation(current.question, current.answer);
      setExplanations((prev) => ({ ...prev, [questionIndex]: expl }));
    }
    
    const currentIndex = questionIndex;
    setTimeout(() => {
      if (isMounted.current && currentIndex === questionIndex) {
        speakText(expl);
      }
    }, 500);
    
    simulateRivalTurn(correct);

    setTimeout(() => {
      if (questionIndex < questionCount - 1) {
        setQuestionIndex(p => p + 1);
      } else {
        endQuizPeriod();
      }
    }, 1400);
  };

  const getExplanation = async (questionText, correctAnswer) => {
    if (explanations && explanations[questionIndex]) return explanations[questionIndex];
    if (!GEMINI_KEY) {
      return `Correct: ${correctAnswer}. Review this concept to improve your knowledge.`;
    }
    try {
      const prompt = `Explain in 2-3 sentences why "${correctAnswer}" is the correct answer to "${questionText}".`;
      const text = await getGeminiResponse(prompt);
      return text || `Correct: ${correctAnswer}.`;
    } catch (err) {
      console.error('getExplanation err', err);
      return `Correct: ${correctAnswer}.`;
    }
  };

  const handleTimeUp = () => {
    if (!quizStarted || quizCompleted) return;
    setSelectedOption('');
    setAnswers((prev) => [...prev, {
      index: questionIndex,
      selected: '',
      correct: false,
      timeLeft: 0,
      difficulty: quiz[questionIndex]?.difficulty || difficulty
    }]);
    updateDifficulty(false);
    simulateRivalTurn(false);
    setTimeout(() => {
      if (questionIndex < questionCount - 1) setQuestionIndex(p => p + 1);
      else endQuizPeriod();
    }, 1200);
  };

  const updateDifficulty = (correct) => {
    setDifficulty((prev) => {
      if (correct) {
        if (prev === 'easy') return 'medium';
        if (prev === 'medium') return 'hard';
        return 'hard';
      } else {
        if (prev === 'hard') return 'medium';
        if (prev === 'medium') return 'easy';
        return 'easy';
      }
    });
  };

  const simulateRivalTurn = (userWasCorrect) => {
    const base = Math.floor(Math.random() * 5);
    const extra = userWasCorrect ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 6);
    setRivalScore((prev) => prev + base + extra);
  };

  const endQuizPeriod = async () => {
    clearTimers();
    stopAllSpeech();
    setQuizCompleted(true);
    setQuizStarted(false);

    const performance = { 
      correct: 0, 
      incorrect: 0, 
      byDifficulty: { easy: 0, medium: 0, hard: 0 } 
    };
    
    answers.forEach((ans) => {
      if (ans.correct) {
        performance.correct += 1;
        const diff = ans.difficulty || 'medium';
        performance.byDifficulty[diff] = (performance.byDifficulty[diff] || 0) + 1;
      } else {
        performance.incorrect += 1;
      }
    });

    setPerformanceData(performance);

    try {
      const rec = await getRecommendations(performance);
      setRecommendations(rec);
    } catch (err) {
      setRecommendations(`Review concepts related to ${selectedTopic}.`);
    }
  };

  const getRecommendations = async (performance) => {
    if (!GEMINI_KEY) {
      return `Based on your performance, focus on ${selectedTopic} concepts. Correct: ${performance.correct}, Incorrect: ${performance.incorrect}.`;
    }
    try {
      const prompt = `User scored ${performance.correct}/${performance.correct + performance.incorrect} in a ${selectedTopic} quiz. Provide 3 concise personalized learning recommendations.`;
      const text = await getGeminiResponse(prompt);
      return text || `Review key concepts in ${selectedTopic}.`;
    } catch (err) {
      console.error('getRecommendations err', err);
      return `Review key concepts in ${selectedTopic}.`;
    }
  };

  const resetQuiz = () => {
    setQuiz([]);
    setSelectedTopic(null);
    setAnswers([]);
    setPerformanceData(null);
    setRecommendations(null);
    setQuizCompleted(false);
    setQuizStarted(false);
    setScore(0);
    setRivalScore(0);
    setSelectedOption(null);
    stopAllSpeech();
  };

  const logout = () => {
    navigate('/login');
  };

  const speakText = (text) => {
    if (!synthRef.current) return;
    if (!text) return;
    try {
      stopAllSpeech();
      const u = new SpeechSynthesisUtterance(text);
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      synthRef.current.speak(u);
    } catch (err) {
      console.warn('speakText err', err);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript.trim();
      handleSpeechAnswer(transcript);
    };
    
    recognition.onend = () => setListening(false);
    
    recognition.onerror = (e) => {
      console.error('recognition error', e);
      setListening(false);
    };
    
    try {
      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
      
      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (recognitionRef.current === recognition) {
          recognition.stop();
          setListening(false);
        }
      }, 5000);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
    }
  };

  const handleSpeechAnswer = (text) => {
    if (!quizStarted || questionIndex >= questionCount) return;
    const normalizedText = text.toLowerCase().trim();
    const currentQuestion = quiz[questionIndex];
    
    // 1. Try matching by letter (A, B, C, D)
    const letterMatch = normalizedText.match(/^[a-d]$/i);
    if (letterMatch) {
      const letter = letterMatch[0].toUpperCase();
      const idx = letter.charCodeAt(0) - 65;
      if (idx < currentQuestion.options.length) {
        handleOptionSelect(currentQuestion.options[idx]);
        return;
      }
    }

    // 2. Try matching entire option text
    const exactMatch = currentQuestion.options.find(
      opt => opt.toLowerCase().trim() === normalizedText
    );
    
    if (exactMatch) {
      handleOptionSelect(exactMatch);
      return;
    }

    // 3. Try partial matching
    const partialMatch = currentQuestion.options.find(
      opt => opt.toLowerCase().includes(normalizedText) ||
             normalizedText.includes(opt.toLowerCase())
    );
    
    if (partialMatch) {
      handleOptionSelect(partialMatch);
      return;
    }

    // 4. Try matching first word
    const firstWordMatch = currentQuestion.options.find(
      opt => opt.toLowerCase().split(' ')[0] === normalizedText.split(' ')[0]
    );
    
    if (firstWordMatch) {
      handleOptionSelect(firstWordMatch);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader size="lg" speed="slow" />
          <p className="mt-4 text-lg text-purple-700">Preparing quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {quizCompleted && <Confetti {...windowSize} recycle={false} numberOfPieces={300} />}

      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">QuizMaster AI</Link>
            </div>
            <div className="flex items-center gap-4">
              {quizStarted && (
                <div className="flex gap-2">
                  <button
                    onClick={() => { if (listening) stopListening(); else startListening(); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition duration-200 ${
                      listening 
                        ? 'animate-pulse bg-blue-500 text-white' 
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                  >
                    <FiMic /> 
                    {listening ? 'Listening...' : 'Voice Answer'}
                  </button>
                  {speaking && (
                    <button
                      onClick={stopAllSpeech}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium bg-red-100 text-red-600"
                    >
                      Stop Speaking
                    </button>
                  )}
                </div>
              )}
              <button onClick={logout} className="flex items-center gap-2 text-purple-600 hover:text-purple-800 px-4 py-2 rounded-lg font-medium transition duration-200">
                <FiLogOut /> Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Topic selection */}
        {!quizStarted && !quizCompleted && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-blue-100">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-200 to-blue-200">
                <FiBook className="text-4xl text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Topic</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">Select a topic to start your personalized AI-supported quiz</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {topics.map((t) => (
                <motion.div key={t} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => selectTopic(t)} className="cursor-pointer">
                  <div className={`p-6 rounded-xl border-2 ${selectedTopic === t ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'} transition-colors duration-200`}>
                    <div className="text-xl font-semibold text-gray-800">{t}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={!selectedTopic}
              onClick={startQuiz}
              className={`relative overflow-hidden text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition duration-200 ${selectedTopic ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Start Quiz
            </motion.button>
          </motion.div>
        )}

        {/* Quiz in progress */}
        {quizStarted && questionIndex < questionCount && (
          <motion.div key={`q-${questionIndex}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 mb-6 border border-gray-100">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }} />
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="text-sm font-medium text-gray-500">Question <span className="font-bold text-purple-600">{questionIndex + 1}</span> of {questionCount}</div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                <FiClock className="text-purple-600" />
                <span className="font-bold text-purple-700">{timeLeft}s</span>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">{quiz[questionIndex].question}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {quiz[questionIndex].options.map((option, idx) => {
                const isSelected = selectedOption !== null && option === selectedOption;
                const isCorrect = option === quiz[questionIndex].answer;
                const baseClass = 'p-5 border-2 rounded-xl cursor-pointer transition-all duration-200';
                
                let dynamicClass = 'border-gray-200';
                let icon = null;
                
                if (selectedOption !== null) {
                  if (isCorrect) {
                    dynamicClass = 'border-green-400 bg-green-50';
                    icon = <FaCheckCircle className="text-green-500 text-xl" />;
                  } else if (isSelected) {
                    dynamicClass = 'border-red-400 bg-red-50';
                    icon = <FaTimesCircle className="text-red-500 text-xl" />;
                  }
                } else {
                  dynamicClass = 'hover:border-purple-300 hover:bg-purple-50 border-gray-200';
                }
                
                return (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: selectedOption ? 1 : 1.02 }} 
                    whileTap={{ scale: selectedOption ? 1 : 0.98 }} 
                    onClick={() => handleOptionSelect(option)} 
                    className={`${baseClass} ${dynamicClass}`}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                        selectedOption === null 
                          ? 'bg-purple-100 text-purple-700' 
                          : isCorrect 
                            ? 'bg-green-100 text-green-700' 
                            : isSelected 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-gray-100 text-gray-700'
                      }`}>
                        <span className="font-bold">{String.fromCharCode(65 + idx)}</span>
                      </div>
                      <span className="font-medium">{option}</span>
                      {icon && <div className="ml-auto">{icon}</div>}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* explanation area */}
            {explanations[questionIndex] && (
              <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-100 text-sm text-gray-700">
                <strong>Explanation:</strong>
                <p className="mt-2">{explanations[questionIndex]}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"><FiAward className="text-purple-600" /></div>
                <div>
                  <div className="text-sm text-gray-500">Score</div>
                  <div className="font-bold text-purple-600">{score}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">Rival: <span className="font-bold text-indigo-600">{rivalScore}</span></div>
            </div>
          </motion.div>
        )}

        {/* Quiz Completed */}
        {quizCompleted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
            <div className="text-center mb-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5 }} className="inline-block mb-6">
                <div className="w-40 h-40 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-teal-100">
                  <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-r from-green-200 to-teal-200">
                    <FiAward className="text-5xl text-green-500" />
                  </div>
                </div>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-gray-900 mb-2">Quiz Completed!</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-600 mb-2">You scored <span className="text-purple-600 font-bold">{score}</span> points in {selectedTopic}</motion.p>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Accuracy</h3>
                <div className="h-64">
                  <Pie
                    data={{
                      labels: ['Correct', 'Incorrect'],
                      datasets: [{
                        data: [performanceData?.correct || 0, performanceData?.incorrect || 0],
                        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)']
                      }]
                    }}
                    options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Performance by Difficulty</h3>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ['Easy', 'Medium', 'Hard'],
                      datasets: [{
                        label: 'Correct Answers',
                        data: [performanceData?.byDifficulty?.easy || 0, performanceData?.byDifficulty?.medium || 0, performanceData?.byDifficulty?.hard || 0],
                        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(54,162,235,0.6)', 'rgba(153,102,255,0.6)']
                      }]
                    }}
                    options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }}
                  />
                </div>
              </div>
            </div>

            {/* recommendations */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">AI Recommendations</h3>
                <button onClick={() => speakText(recommendations)} className="flex items-center gap-2 text-purple-600 hover:text-purple-800"><FaVolumeUp /> {speaking ? 'Speaking...' : 'Listen'}</button>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                <div className="prose prose-purple max-w-none">
                  {recommendations ? recommendations.split('\n').map((l, i) => <p key={i}>{l}</p>) : <p>Generating personalized recommendations...</p>}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={resetQuiz} className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md"><FiRepeat /> Try Again</button>
              <Link to="/" className="w-full sm:w-auto"><button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md"><FiHome /> Go Home</button></Link>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">© {new Date().getFullYear()} QuizMaster AI. All rights reserved.</footer>
    </div>
  );
}