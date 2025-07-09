import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'rsuite';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { FiClock, FiAward, FiHome, FiRepeat, FiLogOut } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

let url = import.meta.env.VITE_URL;

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const questionCount = quiz.length;
  const progressPercentage = ((questionIndex) / questionCount) * 100;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const result = await axios.get(`${url}quiz/quiz`);
        setQuiz(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    };

    fetchQuiz();

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (quizStarted && questionIndex < questionCount) {
      setCurrentQuestion(quiz[questionIndex]);
      setTimeLeft(15);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }, [questionIndex, quiz, quizStarted]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && questionIndex < questionCount) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted) {
      handleTimeUp();
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timeLeft, quizStarted]);

  const clearTimers = () => {
    clearTimeout(timerRef.current);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleTimeUp = () => {
    if (questionIndex < questionCount - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      endQuiz();
    }
  };

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    
    if (correct) {
      // Calculate score based on time left (more points for faster answers)
      const timeBonus = Math.floor(timeLeft / 3);
      setScore(score + 10 + timeBonus);
    }

    setTimeout(() => {
      if (questionIndex < questionCount - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        endQuiz();
      }
    }, 1500);
  };

  const endQuiz = () => {
    clearTimers();
    setQuizCompleted(true);
    setQuizStarted(false);
  };

  const logout = () => {
    localStorage.removeItem("users");
    navigate('/signin');
  };

  const resetQuiz = () => {
    setQuizCompleted(false);
    setQuestionIndex(0);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader size="lg" speed="slow" />
          <p className="mt-4 text-lg text-purple-700">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {quizCompleted && <Confetti {...windowSize} recycle={false} />}
      
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                QuizMaster
              </Link>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 px-4 py-2 rounded-lg font-medium transition duration-200"
            >
              <FiLogOut /> Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!quizStarted && !quizCompleted && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-blue-100">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-200 to-blue-200">
                  <FiAward className="text-4xl text-purple-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Ready for the Challenge?</h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto">
                Test your knowledge with {questionCount} questions. You'll have 15 seconds per question - answer quickly for bonus points!
              </p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startQuiz}
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition duration-200 group"
            >
              <span className="relative z-10">Start Quiz</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-300"></span>
            </motion.button>
          </div>
        )}

        {quizStarted && currentQuestion && (
          <motion.div
            key={`question-${questionIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 mb-6 border border-gray-100"
          >
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="text-sm font-medium text-gray-500">
                Question <span className="font-bold text-purple-600">{questionIndex + 1}</span> of {questionCount}
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                <FiClock className="text-purple-600" />
                <span className="font-bold text-purple-700">{timeLeft}s</span>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                {currentQuestion.question}?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: selectedOption ? 1 : 1.02 }}
                  whileTap={{ scale: selectedOption ? 1 : 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedOption === null 
                      ? 'hover:border-purple-300 hover:bg-purple-50 border-gray-200' 
                      : option === currentQuestion.answer 
                        ? 'border-green-400 bg-green-50' 
                        : selectedOption === option 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                      selectedOption === null 
                        ? 'bg-purple-100 text-purple-700' 
                        : option === currentQuestion.answer 
                          ? 'bg-green-100 text-green-700' 
                          : selectedOption === option 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span className="font-bold">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span className="font-medium">{option}</span>
                    {selectedOption !== null && (
                      <div className="ml-auto">
                        {option === currentQuestion.answer ? (
                          <FaCheckCircle className="text-green-500 text-xl" />
                        ) : selectedOption === option ? (
                          <FaTimesCircle className="text-red-500 text-xl" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FiAward className="text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Score</div>
                  <div className="font-bold text-purple-600">{score}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Max possible: {(questionCount - questionIndex) * 15 + score}
              </div>
            </div>
          </motion.div>
        )}

        {quizCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center"
          >
            <div className="mb-6">
              <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-teal-100">
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-r from-green-200 to-teal-200">
                  <FiAward className="text-5xl text-green-500" />
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className="text-xl text-gray-600 mb-2">
              You scored <span className="text-purple-600 font-bold">{score}</span> points
            </p>
            <p className="text-lg text-gray-500 mb-8">
              That's {Math.round((score / (questionCount * 15)) * 100)}% of the maximum!
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full"
                style={{ width: `${Math.min(100, (score / (questionCount * 15)) * 100)}%` }}
              ></div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md"
              >
                <FiRepeat /> Try Again
              </motion.button>
              <Link to="/" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md"
                >
                  <FiHome /> Go Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} QuizMaster. All rights reserved.
      </footer>
    </div>
  );
}