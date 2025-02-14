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
function Instructions() {
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
                                        Instructions
                                    </div>
                                </div>

                            </section>
                        </div>
                        <div className="max-w-7xl m-auto pb-24 px-4 sm:px-12">

                            <div className="max-w-lg mx-auto">

                                <ul className="list-disc pl-3 space-y-1 text-white mb-5">
                                    <li>
                                        <p className="font-bold text-white">Timings:</p>
                                        <br></br>
                                        <ul className="list-disc pl-3">
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    The winning number will be drawn daily at 11:00 AM (Costa
                                                    Rica Time).
                                                </p>
                                                <ul className="list-disc pl-3"></ul>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    The tickets will close 60 minutes prior to the draw, i.e., at 10:00 AM (Costa Rica Time).
                                                </p>
                                                <ul className="list-disc pl-3"></ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <br></br>
                                    <li>
                                        <p className="font-bold text-white">Placing the bets:</p>
                                        <br></br>
                                        <ul className="list-disc pl-3">
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Connect your wallet to the website by clicking the Connect Wallet icon on
                                                    the upper right side of the website.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    A pop-up will appear where you can select your desired wallet
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Confirm in your wallet to connect with the website.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    On the website then select the draw date in which you want to participate
                                                    using the (&lt;-) and the (-&gt;) arrows on the sides of the Draw Date and Time.
                                                </p>
                                            </li>
                                            <li className="mb-0.5 last:mb-0">
                                                <p className="text-white">Choose the betting type:</p>
                                                <ul className="list-disc pl-3">
                                                    <li className='mb-0'>
                                                        <p className="text-white">
                                                            Double - To bet on any number from 00 to 99.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="text-white">
                                                            Single - To bet on any number from 0 to 9 for the 1st digit or the 2nd digit.
                                                        </p>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    For Single bets, choose either the 1st or 2nd digit.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Change the number to bet using the (+) or the (-) icon.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Specify the amount to bet in the Ticket Amount field.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Click the Add Ticket icon to add the selected bet.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    The selected bet will be displayed below for approval.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    For adding multiple bets, please select the required parameters in the above
                                                    fields and click on Add Ticket.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    You can add as many tickets as you want.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    All the added tickets will be displayed below the Add Ticket icon.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white ">
                                                    Any unwanted or wrong added tickets can be deleted by clicking the icon
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash w-5 h-5 inline-block mx-1 text-red-500"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                    </svg>in the right side of the corresponding row.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Click on Approve Tickets.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Confirm the approval in your wallet.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    On the website the Approve Tickets icon will change to Buy Tickets.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Click on Buy Tickets.
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    Again confirm the approval in your wallet
                                                </p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    The tickets will be purchased and on the website a summary of the tickets
                                                    purchased will be shown.
                                                </p>
                                            </li>
                                        </ul>
                                    </li>
                                    <br></br><br></br>
                                    <li>
                                        <p className="font-bold text-white">Result:</p>
                                        <br></br>
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
                                                    The winning number applies to both betting types i.e, Double and Single.
                                                </p>
                                                <ul className="list-disc pl-3"></ul>
                                            </li>
                                            <li className="mb-0">
                                                <p className="text-white">
                                                    The winning amount will be automatically sent to the wallets from which the bets were placed.
                                                </p>
                                                <ul className="list-disc pl-3"></ul>
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

export default Instructions
