import { BottomNavigation } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Instagram } from '@mui/icons-material';
import Link from 'next/link';
import './footer.css';
const WhatsApp = `https://wa.me/+2348145938130`;
const Ig = "https://www.instagram.com/the_.tom?igsh=aWdyOHNudnNzbXB0";
export default function Footer(){
    
    return <div className='footer'>
    <BottomNavigation sx={{background:"black", color:"white", marginBottom:0}}>
    <code style={{width:"50dvw"}}>If you have any intersting ideas you'd
     like to collaborate on or just want to connect about anything,
      feel free to reach out to me
    </code>
    <Link href="https://www.linkedin.com/in/oluwatomiwa-olu-ajayi-606389199/"
    target='_blank' className='social'
    ><LinkedInIcon/></Link>
    <Link className='social' href="mailto:timmeysam@gmail.com"><EmailIcon/></Link>
    <Link className='social' href={Ig} target='_blank'><Instagram/></Link>
    
    </BottomNavigation>
    </div>
}