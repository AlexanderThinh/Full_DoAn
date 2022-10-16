import { useRef, useState } from 'react'
import emailjs from "emailjs-com"

function ContactUs() {
    const form = useRef()
    const [toName, setToName] = useState('')
    const [message, setMessage] = useState('')

    function sendEmail(e) {
      e.preventDefault();

      const emailContent = {
        to_name: toName,
        message: message
      }

      emailjs.send('service_zv05jnj', 'template_qlz5dpg', emailContent, 'xFO6TgrO2DaK4ACBm')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }
  
    return (
      <form ref={form} onSubmit={sendEmail}>
        <label>To: </label>
        <input type="text" name="to_name" onChange={e => setToName(e.target.value)} />
        <textarea name="message" onChange={e => setMessage(e.target.value)} />
        <input type="submit" value="Send" />
      </form>
    );  
}

export default ContactUs