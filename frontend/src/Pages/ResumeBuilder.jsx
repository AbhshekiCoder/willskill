import { useState, useRef } from 'react';
import { FaDownload, FaArrowRight, FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    address: '',
    email: '',
    phone: '',
    projects: '',
    skills: '',
    technicalSkills: '',
    activities: '',
    summary: '',
    education: '',
    expertise: '',
    conclusion: ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const resume1Ref = useRef();
  const resume2Ref = useRef();
  const resume3Ref = useRef();

  const templates = [
    {
      id: 1,
      name: 'Professional',
      thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Creative',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Modern',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      name: 'Minimalist',
      thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemplateSelect = (id) => {
    setSelectedTemplate(id);
    setIsFormFilled(true);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const downloadResume = (ref) => {
    if (!ref.current) return;

    html2canvas(ref.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4'
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.name || 'resume'}.pdf`);
    });
  };

  const renderResume1 = () => (
    <div ref={resume1Ref} className="bg-blue-50 p-8 max-w-4xl mx-auto my-8 rounded-lg shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">{formData.name}</h1>
        <p className="text-xl text-blue-600">{formData.title}</p>
        <div className="flex justify-center space-x-4 mt-2 text-gray-600">
          <p>{formData.email}</p> | <p>{formData.phone}</p>
        </div>
      </div>

      <div className="border-t-2 border-blue-200 pt-6 mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded">Career Objective</h2>
        <p className="mt-2 text-gray-700">{formData.summary}</p>
      </div>

      <div className="border-t-2 border-blue-200 pt-6 mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded">Projects</h2>
        <p className="mt-2 text-gray-700">{formData.projects}</p>
      </div>

      <div className="border-t-2 border-blue-200 pt-6 mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded">Education</h2>
        <p className="mt-2 text-gray-700">{formData.education}</p>
      </div>

      <div className="border-t-2 border-blue-200 pt-6 mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded">Skills</h2>
        <ul className="mt-2 text-gray-700 list-disc pl-5">
          {formData.technicalSkills.split(',').map((skill, index) => (
            <li key={index} className="mb-1">{skill.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="border-t-2 border-blue-200 pt-6 mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded">Hobbies</h2>
        <ul className="mt-2 text-gray-700 list-disc pl-5">
          {formData.activities.split(',').map((activity, index) => (
            <li key={index} className="mb-1">{activity.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="border-t-2 border-blue-200 pt-6">
        <h2 className="text-2xl font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded">Declaration</h2>
        <p className="mt-2 text-gray-700">{formData.conclusion}</p>
        <p className="mt-4 font-semibold">{formData.name}</p>
      </div>
    </div>
  );

  const renderResume2 = () => (
    <div ref={resume2Ref} className="bg-white max-w-4xl mx-auto my-8 rounded-lg shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-800 text-white p-8 md:w-1/3">
          <div className="flex justify-center mb-6">
            <img 
              src="https://randomuser.me/api/portraits/men/1.jpg" 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-white pb-2">CONTACT</h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <FaPhone className="mr-2" /> {formData.phone}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" /> {formData.email}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {formData.address}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-white pb-2">SKILLS</h2>
            <ul className="space-y-2">
              {formData.technicalSkills.split(',').map((skill, index) => (
                <li key={index} className="flex items-center">
                  <IoIosArrowForward className="mr-2" /> {skill.trim()}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 border-b-2 border-white pb-2">EDUCATION</h2>
            <p className="text-gray-300">{formData.education}</p>
          </div>
        </div>

        <div className="p-8 md:w-2/3">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">{formData.name}</h1>
            <h3 className="text-xl text-gray-600 mt-2">{formData.title}</h3>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">About Me</h2>
            <p className="text-gray-700">{formData.summary}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Projects</h2>
            <p className="text-gray-700">{formData.projects}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Activities</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {formData.activities.split(',').map((activity, index) => (
                <li key={index}>{activity.trim()}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Conclusion</h2>
            <p className="text-gray-700">{formData.conclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResume3 = () => (
    <div ref={resume3Ref} className="max-w-md mx-auto my-8 bg-white shadow-lg">
      <div className="flex">
        <div className="w-1/3 bg-gray-700 text-white p-4">
          <div className="flex justify-center mb-4">
            <img 
              src="https://randomuser.me/api/portraits/women/1.jpg" 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-2 border-white object-cover"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2">Contact</h3>
            <div className="text-xs space-y-1">
              <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
              <p><span className="font-semibold">Email:</span> {formData.email}</p>
              <p><span className="font-semibold">Address:</span> {formData.address}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2">Education</h3>
            <p className="text-xs">{formData.education}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2">Expertise</h3>
            <ul className="text-xs list-disc pl-4">
              {formData.technicalSkills.split(',').map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-2">Activities</h3>
            <ul className="text-xs list-disc pl-4">
              {formData.activities.split(',').map((activity, index) => (
                <li key={index}>{activity.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-2/3 p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">{formData.name}</h1>
            <p className="text-sm text-gray-600">{formData.title}</p>
            <p className="text-xs mt-2 text-gray-700">{formData.summary}</p>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <h3 className="text-sm font-bold mb-2">Projects</h3>
            <p className="text-xs text-gray-700">{formData.projects}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-bold mb-2">Declaration</h3>
            <p className="text-xs text-gray-700">{formData.conclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-600">Resume Builder</h1>
          <p className="text-gray-600">Create your professional resume in minutes</p>
        </div>
      </header>

      {!isFormFilled ? (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Choose a Template</h2>
            <p className="text-xl text-gray-600">Select from our professionally designed templates</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {templates.map((template) => (
                  <div key={template.id} className="w-full flex-shrink-0 px-4">
                    <div 
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <img 
                        src={template.thumbnail} 
                        alt={template.name} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800">{template.name}</h3>
                        <p className="text-gray-600 mt-2">Professional {template.name.toLowerCase()} design</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Select Template
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
              <IoIosArrowBack className="text-gray-700 text-xl" />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
              <IoIosArrowForward className="text-gray-700 text-xl" />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Fill Your Details</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Professional Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123 Main St, City"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Education</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="BSc Computer Science, University"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Career Objective/Summary</label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Brief summary of your professional background..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Projects</label>
                  <textarea
                    name="projects"
                    value={formData.projects}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Describe your key projects..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Technical Skills (comma separated)</label>
                  <input
                    type="text"
                    name="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="JavaScript, React, Node.js, Python"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Activities/Hobbies (comma separated)</label>
                  <input
                    type="text"
                    name="activities"
                    value={formData.activities}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Reading, Hiking, Photography"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Declaration</label>
                  <textarea
                    name="conclusion"
                    value={formData.conclusion}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    placeholder="I hereby declare that the above information is true..."
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setIsFormFilled(false)}
                  className="flex items-center px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <FaArrowLeft className="mr-2" /> Back to Templates
                </button>
                <button 
                  onClick={() => downloadResume(selectedTemplate === 1 ? resume1Ref : selectedTemplate === 2 ? resume2Ref : resume3Ref)}
                  className="flex items-center px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Download PDF <FaDownload className="ml-2" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Resume Preview</h3>
            {selectedTemplate === 1 && renderResume1()}
            {selectedTemplate === 2 && renderResume2()}
            {selectedTemplate === 3 && renderResume3()}
            {selectedTemplate === 4 && renderResume1()} {/* Reusing template 1 for minimalist */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;