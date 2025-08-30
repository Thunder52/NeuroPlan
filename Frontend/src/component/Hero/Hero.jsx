import './Hero.css'
import {Box} from '@mui/material'
import calender from '../../assets/WhatsApp Image 2025-08-10 at 15.28.11_5fae4a1c.jpg'

const Hero = () => {
  return (
    <div className='HeroContainer'>
        <div className='tagLine'>
            <h1>Plan Samrter</h1>
            <h1>Live Better</h1>
            <h1>With AI</h1>
        </div>
        <div className='image'>
            <Box component={'img'} src={calender} />
        </div>
    </div>
  )
}

export default Hero