import React from 'react'
import DurationImg from '../../assets/DurationImg.png'
import BatchStartingLaptopImg from '../../assets/BatchStartingLaptopImg.png'
import qualification from '../../assets/qualification.png'
import TimingImg from '../../assets/TimingImg.png'
import EligibilityImg from '../../assets/EligibilityImg.png'

export default function CoursesCriteria({data}) {
  	return (
    		<div className='pl-8 pr-8 max-sm:pl-4 max-sm:pr-4'>
				{/* Criteria */}
				<div className=' max-sm:border-none Criteria border-dashed border-2 border-gray-500'>

					{/* Batch Starting */}
						<div className='Criteria-Content-1-3 max-sm:border-2 max-sm:border-dashed max-sm:border-gray-500' >
							<div >
							<div  className='ml-5 mb-2'>
								<img src={BatchStartingLaptopImg} alt="" />
							</div>
							<div className='font-semibold text-2xl mb-1' style={{color:'#363636'}}>
								<p>Batch Starting</p>
							</div>
							<div className='font-semibold' style={{color:'#7B7B7B'}}>
								<p>04 November, 2024</p>
							</div>
							</div>
						</div>
							
					{/* Duration */}
						<div className='Criteria-Content-2 max-sm:border-2 max-sm:border-dashed max-sm:border-gray-500' >
							<div>
								<div  className='mb-2'>
									<img src={DurationImg} alt="" />
								</div>
								<div className='font-semibold text-2xl mb-1' style={{color:'#363636'}}>
									<p>Duration</p>
								</div>
								<div className='font-semibold' style={{color:'#7B7B7B'}}>
									<p>30 Weeks</p>
								</div>
							</div>
						</div>
						
					

					{/* Timing */}
						<div className='Criteria-Content-1-3 max-sm:border-2 max-sm:border-dashed max-sm:border-gray-500 max-sm:pb-20' >
							<div>
								<div  className='ml-2 mb-2'>
									<img src={TimingImg} alt="" />
								</div>
								<div className='font-semibold text-2xl mb-1' style={{color:'#363636'}}>
									<p>Timings</p>
								</div>
								<div className='font-semibold' style={{color:'#7B7B7B'}}>
									<p>Monday to Saturday</p>
								</div>
							</div>
						</div>
						
						
					
					{/* Eligibility */}
						<div className='Criteria-Content-4 max-sm:border-2 max-sm:border-dashed max-sm:border-gray-500 ' >
							<div>
								<div  className='ml-3 mb-2'>
									<img src={EligibilityImg} alt="" />
								</div>
								<div className=' text-2xl mb-1' style={{color:'#363636',fontWeight:'600'}}>
									<p>Eligibility</p>
								</div>
								<div className='font-semibold' style={{color:'#7B7B7B'}}>
									<p>12th Pass,Any Stream, <br />18 - 28 years</p>
								</div>
							</div>
						</div>
						

				</div>

				{/* Minimum criteriafor software development Program */}
				<div className='mb-4'>
					<div className='Minimum-Criteria'>
						<div className=' max-2xl:text-5xl max-xl:text-4xl max-lg:3xl max-md:text-2xl ' style={{fontWeight:'600'}}>
							<p className='inner-minimum-criteria' ><span className='inner-2-minimum-criteria'>Minimum Criteria</span> <br />For Software Development Program</p>
						<div className='max-xl:w-4/12 max-lg:w-96 max-md:w-64 max-md:border max-md:mt-1 ml-1 max-sm:w-56 underline-minimum-Criteria max-2xl:mt-3 max-xl:mt-2.5 max-sm:mt-0.5 max-sm:ml-0.5 border-2 border-purple-600'></div>
						</div>
					</div>

					<div className='minimun-criteria-Cards-parent '> 
						
						
						<div >
							<div className='minimum-criteria-Cards border-2 border-gray-400 rounded-lg '>
								<div className='w-fit pt-2'>
									<img src={qualification} alt="" />
								</div>
								<div className=' pt-2 '>
									<p>Qualification</p>
								</div>
								<div className='pl-2 pr-2 max-lg:pr-1 max-lg:pl-1  max-lg:text-base text-gray-500 '>
									<p>12th Pass, Diploma & College</p>
								</div>
							</div>
						</div>
						
						<div >
							<div className='minimum-criteria-Cards border-2 border-gray-400 rounded-lg '>
								<div className=' w-fit  pt-2'>
									<img src={qualification} alt="" />
								</div>
								<div className=' pt-2 '>
									<p>Age</p>
								</div>
								<div className='pl-2 pr-2 max-lg:pr-1 max-lg:pl-1 max-lg:text-base text-gray-500'>
									<p>18 - 28 Years</p>
								</div>
							</div>
						</div>
						
						<div >
							<div className='minimum-criteria-Cards border-2 border-gray-400 rounded-lg '>
								<div className=' w-fit  pt-2'>
									<img src={qualification} alt="" />
								</div>
								<div className=' pt-2 '>
									<p>ID</p>
								</div>
								<div className='pl-2 pr-2 max-lg:pr-1 max-lg:pl-1 max-lg:text-base text-gray-500'>
									<p>Valid Aadhaar Card</p>
								</div>
							</div>
						</div>
					</div>


				</div>
    		</div>
  		)
}
