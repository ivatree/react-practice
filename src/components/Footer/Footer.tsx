import React from 'react'
import './Footer.css'

export default function Footer(){
    return(
    <footer>
        <div className="footer-header">
            <span className="footer-logo">REACT PIZZA</span>
            <span className='footer-watermark'>© 2025 </span>
            <a className='footer-infobase' href=''>Правовая информация</a>
        </div>
        <div className="footer-body">
            <span className='pay-info'>Принимаем к оплате</span>
            <a href='https://bepaid.by/kak-oplatit'><img  className='pay-icon' src='https://cdn.dodostatic.net/site-static/dist/assets/78e07cdb3b918637aad2..png'/></a>
        </div>
    </footer>
    )
}