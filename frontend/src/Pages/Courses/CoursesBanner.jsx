import { useEffect, useState } from 'react'
import CoursesBannerImg from '../../assets/CoursesBannerImg.jpeg'
import axios from 'axios'
import { Link } from 'react-router-dom';
import dummyBrochure from '../../assets/brochure.pdf';

let url = import.meta.env.VITE_URL

export default function CoursesBanner() {
	let [login, setLogin] = useState(false);
	let [data, setData] = useState()
	let url = import.meta.env.VITE_URL
	

 let id = localStorage.getItem('id')
    let course = async() =>{
       
        let result = await axios.get(`${url}course_detail/${id}/course_detail/${id}`);
        setData(result.data);
        console.log(data)
    }

 	useEffect(()=>{
		course();
		enroll()
	},[id])

	let payment = async () => {
    try {
        let obj = {
            name: data.title,
            course_id: data._id,
            price: data.price,
            user_id: localStorage.getItem('token')
        };
        let token = localStorage.getItem("token");

        let result = await axios.post(
            `${url}payment/payment`,
            obj,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (result.data.success) {
            const options = {
                key: "rzp_test_pEZdDpwnJejkWR",
                amount: result.data.amount * 100,
                currency: 'INR',
                name: "Your Company Name",
                description: "Test Transaction",
                order_id: result.data.id,

                // ✅ Payment successful → call enroll()
                handler: function (response) {
                    alert(`Payment ID: ${response.razorpay_payment_id}`);
                    enroll(); // enroll only after successful payment
                    setLogin(true);
                },

                // ❌ Payment cancelled → do nothing
                modal: {
                    ondismiss: function () {
                        console.log("Payment cancelled by user.");
                        setLogin(false);
                    }
                },

                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            alert(result.data.message);
        }
    } catch (error) {
        console.error("Payment error:", error);
    }
};

	

	let enroll = () =>{
		let user = localStorage.getItem("token")
		if(user){
			let obj = {
				user: localStorage.getItem('token'),
				course_id: localStorage.getItem('id')
			}
			axios.post(`${url}enroll/enroll`, obj, {
				headers:{
					"Authorization": `Bearer ${user}`,
					"Content-Type": "application/json"
				}
			}).then(result =>{
				if(result.data.success){
					setLogin(true);
				}else{
					setLogin(false)
				}
			})
		}else{
			setLogin(false)
		}
	}

    return (
      	<div className='CoursesBannerImg bg-cover' style={{backgroundImage: `url(${CoursesBannerImg})`}}>
      	    <div className='w-full h-full pt-24 max-sm:pt-12 inset-0 bg-black bg-opacity-50'>
				<div className='w-fit m-auto '>
			  		<div className='w-fit flex max-sm:block CourseTitleHeading m-auto'>
						<p className='max-sm:text-lg max-sm:m-auto text-white font-inter w-fit'>Become A {data?data.title:''} </p>
						<div><p className='pl-4 text-white font-inter m-auto w-fit'></p></div>
					</div>

					<div className='w-fit flex max-sm:block md:m-auto pt-28 max-md:pt-24 max-sm:pt-16'>
						<div className='flex mr-20 max-md:mr-16 max-md:text-sm text-lg max-lg:text-base'>
							<div className='max-sm:text-base' style={{color:'#3FC700'}}>
								<i className="bg-white rounded-full fa-solid fa-circle-check"></i>
							</div>
							<div className='ml-3 max-md:ml-2 max-md:m-auto font-normal text-white max-sm:max-w-72'>
								<p>No Prior Coding Experience Required</p>
							</div>
						</div>

						<div className='flex text-lg max-lg:text-base max-md:text-sm max-sm:mt-7'>
							<div className='max-sm:text-base' style={{color:'#3FC700'}}>
								<i className="bg-white rounded-full fa-solid fa-circle-check"></i>
							</div>
							<div className='ml-3 max-md:ml-2 max-md:m-auto font-normal text-white max-sm:max-w-72'>
								<p>{data?data.duration:''} full-time program with live classes</p>
							</div>
						</div>
				</div>

				<div className='flex m-auto w-fit pt-9 text-lg max-md:text-sm max-lg:text-base'>
					<div className='max-sm:text-base' style={{color:'#3FC700'}}>
						<i className="bg-white rounded-full fa-solid fa-circle-check"></i>
					</div>
					<div className='ml-3 max-md:ml-2 text-white max-sm:max-w-72'>
						<p className='w-fit'>10 weeks Practical Working program with live Training</p>
					</div>
				</div>

				<div className='flex m-auto w-fit pt-16 max-sm:pt-10'>
					<div className='font-inter w-48 max-md:w-36'>
						<a href={dummyBrochure} download="WillSkill_Brochure.pdf">
							<button className='w-full rounded-md max-md:text-sm max-md:h-8 max-lg:h-9 h-10 text-gray-200 hover:text-purple-200 border-2 border-gray-500 hover:border-gray-600 bg-purple-600 hover:bg-purple-800'>Download Brochure</button>
						</a>
					</div>
					<div className='font-inter w-24 max-md:w-20 ml-10 max-md:ml-6'>
						{login ? (
							<button className='w-fit rounded-md max-md:text-sm max-md:h-fit max-lg:h-9 h-10 bg-purple-400 hover:bg-purple-800 text-gray-800 hover:text-gray-300 border-2 border-stone-600'>
								<Link to="/StudentDashboard">Go To Dashboard</Link>
							</button>
						) : (
							<button className='w-full rounded-md max-md:text-sm max-md:h-8 max-lg:h-9 h-10 bg-purple-400 hover:bg-purple-800 text-gray-800 hover:text-gray-300 border-2 border-stone-600' onClick={payment}>Buy Now</button>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}
