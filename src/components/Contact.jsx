import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Contact = () => {
  const formRef = useRef();
  const [fullName, setFullName] = useState('')
  const [senderEmail, setEmail] = useState('')
  const [message, setMessage] = useState('')


  const submitToAdmin = () => {
    if (fullName === '' || senderEmail === '' || message === '') {
      toast.error('Please fill all fields!', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    } else {
      const confirmDetails = async () => {
        const result = await Swal.fire({
          title: 'Confirm your details before sending',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          reverseButtons: true,
          customClass: {
            container: 'my-swal-container', // Add a custom CSS class name
          },
        });

        if (result.isConfirmed) {
              sendEmail()
                Swal.fire({
                  icon: 'success',
                  title: 'Message sent successfully!',
                  text: 'We will get back to you shortly via email. Thank you!',
                })
                  setFullName('');
                  setEmail('');
                  setMessage('');
        } else {
        }
      };

      confirmDetails();
    }
  };

  const sendEmail = () => {
    const email = 'jessy.bandya5@gmail.com '; // Replace with the email address you want to send the email to
    const body = `Dear Uwimana Jessy Bandya,\n\n${message}\n\nBest regards,\n${fullName}\n${senderEmail}`;
    const subject = 'Message from portfolio website';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, '_blank');
  };


  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div
          className='mt-0 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-1'>Your Name</span>
            <input
              type='text'
              name='name'
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-1'>Your email</span>
            <input
              type='email'
              name='email'
              placeholder="What's your email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              value={senderEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-1'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <button
            onClick={submitToAdmin}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            Send Message
          </button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:15}}>
          <a href='https://twitter.com/jessybandya' target='__blank'><TwitterIcon fontSize="medium" style={{color:"#3498db"}}/></a>
          <a href='https://www.instagram.com/jessybandya/' target='__blank'><InstagramIcon fontSize="medium" style={{color:"#3498db"}}/></a>
          <a href='https://www.linkedin.com/in/jessybandya/' target='__blank'><LinkedInIcon fontSize="medium" style={{color:"#3498db"}}/></a>
          <a href='https://github.com/jessybandya' target='__blank'><GitHubIcon fontSize="medium" style={{color:"#3498db"}}/></a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
