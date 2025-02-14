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
function Faq() {
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
                    FAQS
                  </div>
                </div>

              </section>
            </div>
            <div className="max-w-7xl m-auto pb-24 px-4 sm:px-12">
              <div className="grid xl:grid-cols-2 gap-12">
                <div className="flex flex-col">
                  <div
                    className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                      , cursor: 'pointer'
                    }}
                    onClick={() => toggleVisibility(0)}
                  >
                    <div className="Text1 text-[11px] lg:text-[14px]" style={{ cursor: "pointer" }}>
                      What are the two types of betting available?
                    </div>
                    <img
                      style={{ height: '40px', cursor: 'pointer' }}
                      src={visibleSection === 0 ? arrowup : arrow}
                    />
                  </div>
                  {visibleSection === 0 && (
                    <div
                      className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                      style={{
                        boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                        border: '2px solid white',
                        zIndex: '-1',
                        marginTop: '-27px',
                      }}
                    >
                      <div
                        className="Text1 text-[11px] lg:text-[14px]"
                        style={{
                          paddingTop: '16px'
                        }}
                      >
                        Double Number Betting: Bet on any two-digit number from 00 to 99.
                        Single Number Betting: Bet on any single-digit number from 0 to 9 for either the 1st digit
                        or the 2nd digit.
                      </div>
                    </div>
                  )}

                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(1)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px] break-words"
                          style={{ cursor: "pointer", width: '90%' }}
                        >
                          What happens in Double Number Betting if I bet on the winning number?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 1 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 1 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            If the winning number matches your bet You receive 95 times the amount bet on that number.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(2)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px] break-words"
                          style={{ cursor: "pointer", width: '90%' }}
                        >
                          What happens in Single Number - 1st digit Betting if I bet on the winning number?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 2 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 2 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            If the 1st digit of the winning number matches your Single Number - 1st digit bet, You
                            receive 9.5 times the amount bet on the winning number.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(3)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px] break-words"
                          style={{ cursor: "pointer", width: '90%' }}
                        >
                          What happens in Single Number – 2nd digit Betting if I bet on the winning number?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 3 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 3 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            If the 2nd digit of the winning number matches your Single Number – 2nd digit bet, You
                            receive 9.5 times the amount bet on the winning number.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(4)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px] break-words"
                          style={{ cursor: "pointer", width: '90%' }}
                        >
                          Can I place multiple number bets in a single session?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 4 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 4 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            Yes, you can place multiple number bets in a single session by adding a new number
                            to bet using the <b>Add Ticket</b> option.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>


                </div>

                <div className="flex flex-col">
                  <div
                    className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                      , cursor: 'pointer'
                    }}
                    onClick={() => toggleVisibility(6)}
                  >
                    <div
                      className="Text1 text-[11px] lg:text-[14px] break-words"
                      style={{ cursor: "pointer", width: '90%' }}
                    >
                      Can I win both the Single Number and the Double Number bets on the same number?
                    </div>
                    <img
                      style={{ height: '40px', cursor: 'pointer' }}
                      src={visibleSection === 6 ? arrowup : arrow}

                    />
                  </div>
                  {visibleSection === 6 && (
                    <div
                      className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                      style={{
                        boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                        border: '2px solid white',
                        zIndex: '-1',
                        marginTop: '-27px'
                      }}
                    >
                      <div
                        className="Text1 text-[11px] lg:text-[14px]"
                        style={{
                          paddingTop: '16px'
                        }}
                      >
                        If the 1st digit of the winning number matches your Single Number - 1st digit bet you
                        will win.
                        If the 2nd digit of the winning number matches your Single Number – 2nd digit bet you will
                        win.
                        If the winning number matches your Double Number bet you will win.
                        If all the three matches, you will win in all the three.
                      </div>
                    </div>
                  )}

                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(5)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{ cursor: "pointer" }}
                        >
                          Are the payouts fixed, or do they change daily?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 5 ? arrowup : arrow}

                        />
                      </div>
                      {visibleSection === 5 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            The payouts are fixed every day.
                            Double Number Betting: 95 times the bet amount
                            Single Number Betting: 9.5 times the bet amount.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(7)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{ cursor: "pointer" }}
                        >
                          How do I know if I have won a bet?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 7 ? arrowup : arrow}

                        />
                      </div>
                      {visibleSection === 7 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            You can check the website for the winning number any time. You can also check your
                            results in the My Tickets History section of the website by connecting your wallet to the
                            website. After your wallet is connected, the website will show the results of all the bets
                            you had placed using the same wallet.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(8)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{ cursor: "pointer" }}
                        >
                          How do I claim my winning amount?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 8 ? arrowup : arrow}

                        />
                      </div>
                      {visibleSection === 8 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            After the daily draw the system checks for the bets placed on the winning number and
                            the winning amount is transferred automatically to the respective wallet from which the
                            bets were placed.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer'
                        }}
                        onClick={() => toggleVisibility(9)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{ cursor: "pointer" }}
                        >
                          How can I maximize my chances of winning?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 9 ? arrowup : arrow}

                        />
                      </div>
                      {visibleSection === 9 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            Spread your bets across multiple Double Numbers and multiple Single Numbers (1st
                            digit and 2nd digit) to maximize your chances of winning.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Faq
