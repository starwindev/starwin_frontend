import React, { useState, useEffect, useRef } from 'react'
import '../App.css'
import '../styles/MainContainer.css'
import './aboutus.css'
import 'react-datepicker/dist/react-datepicker.css'
import TopBar from '../components/TopBar.jsx'
import graph from '../../public/img/Bonding Curve.png'
import logo from '../../public/img/coollogo_com-22031459.png'
import footericon from '../../public/img/hot.png'
import arrow from '../../public/img/Yellow Arrow.png'
import arrowup from '../../public/img/Yellow Arrow-up.png'
import Footer from '../components/Footer.jsx'
function Rules() {
    const [visibleSection, setVisibleSection] = useState(null) // Manages which section is visible

    const toggleVisibility = section => {
        if (visibleSection === section) {
            setVisibleSection(null) // Close the section if it's already open
        } else {
            setVisibleSection(section) // Open the clicked section and close others
        }
    }
    return (
        <div>
            <div className="GlobalContainer">
                <div style={{ zIndex: 1 }}>
                    <TopBar />
                    <div>
                        <div className="max-w-7xl mx-auto pt-36 px-4 sm:px-12 sm:py-4">
                            <section className="lg:mx-auto  w-full lg:w-[741px] min-w-0">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {/* <img style={{ height: '113px' }} src={logo} /> */}
                                    <div
                                        className="text-center text-[#f3f3f3] text-xl mb-1.5 impact-headings"
                                        style={{
                                            fontSize: '60px',
                                            fontWeight: 'bold',
                                            marginBottom: '30px'
                                        }}
                                    >
                                        Rules
                                    </div>
                                </div>

                            </section>
                        </div>
                        <div className="max-w-7xl m-auto pb-24 px-4 sm:px-12">

                            <div className="max-w-lg mx-auto">

                                <ul className="list-disc pl-3 space-y-1 text-white">
                                    <li className='mb-0'>
                                        <p className="font-bold text-white mb-3">Types of Betting:</p>

                                        <ul className="list-disc pl-3">
                                            <li className="mb-3">
                                                <p className="text-white">Double Number Betting:</p>
                                                <ul className="list-disc pl-3">
                                                    <li className='mb-0'>
                                                        <p className="text-white">
                                                            Bet on numbers from 00 to 99.
                                                        </p>
                                                        <ul className="list-disc pl-3"></ul>
                                                    </li>
                                                    <li>
                                                        <p className="text-white">
                                                            Payout: 95 times the bet amount for the exact winning
                                                            number.
                                                        </p>
                                                        <ul className="list-disc pl-3"></ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mb-0.5 last:mb-0">
                                                <p className="text-white">Single Number Betting:</p>
                                                <ul className="list-disc pl-3">
                                                    <li className='mb-0'>
                                                        <p className="text-white">
                                                            Bet on numbers from 0 to 9, separately for:
                                                        </p>
                                                        <ul className="list-disc pl-3">
                                                            <li className='mb-0'>
                                                                <p className="text-white">
                                                                    First digit of the winning number.
                                                                </p>
                                                            </li>
                                                            <li className='mb-0'>
                                                                <p className="text-white">
                                                                    Second digit of the winning number.
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className='mb-0'>
                                                        <p className="text-white">
                                                            Payout: 9.5 times the bet amount for the correct
                                                            digit.
                                                        </p>

                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <br />
                                    <li>
                                        <p className="font-bold text-white mb-3">Winning Number:</p>
                                        <ul className="list-disc pl-3">
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    A number between 00 and 99 is drawn daily as the winning
                                                    number.
                                                </p>
                                                <ul className="list-disc pl-3"></ul>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    The winning number applies to both betting types.
                                                </p>
                                                <ul className="list-disc pl-3"></ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <br></br>
                                    <li>
                                        <p className="font-bold text-white mb-3">Bet Outcomes:</p>
                                        <ul className="list-disc pl-3">
                                            <li className="mb-3">
                                                <p className="text-white">Double Number Betting:</p>
                                                <ul className="list-disc pl-3">
                                                    <li className='mb-0'>
                                                        <p className="text-white">
                                                            Exact match with the winning number pays 95 times the
                                                            bet amount.
                                                        </p>
                                                        <ul className="list-disc pl-3"></ul>
                                                    </li>
                                                    <li className='mb-0'>
                                                        <p className="text-white">All other numbers lose.</p>
                                                        <ul className="list-disc pl-3"></ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mb-0.5 last:mb-0">
                                                <p className="text-white">Single Number Betting:</p>
                                                <ul className="list-disc pl-3">
                                                    <li className='mb-3 mt-3'>
                                                        <p className="text-white">First digit:</p>
                                                        <ul className="list-disc pl-3">
                                                            <li className='mb-0'>
                                                                <p className="text-white">
                                                                    Correct digit pays 9.5 times the bet amount.
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p className="text-white">All other digits lose.</p>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <p className="text-white">Second digit</p>
                                                        <ul className="list-disc pl-3">
                                                            <li className='mb-0'>
                                                                <p className="text-white">
                                                                    Correct digit pays 9.5 times the bet amount.
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p className="text-white">All other digits lose.</p>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Rules
