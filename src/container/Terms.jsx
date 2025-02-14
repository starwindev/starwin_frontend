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
function Terms() {
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
                                        Terms of Usage for STARWIN
                                    </div>
                                </div>

                            </section>
                        </div>
                        <div className="max-w-7xl m-auto pb-24 px-4 sm:px-12">

                            <div className="lg:mx-auto  w-full lg:w-[741px] min-w-0">

                                <div className="list-disc pl-3 space-y-1 text-white mb-5">
                                    <p className="text-white">Welcome to https://starwin.money (the "Website"), operated by STARWIN ("we," "us," or
                                        "our"). By accessing or using the Website, you agree to be bound by these Terms of Usage.
                                        Please read them carefully before using the Website. If you do not agree with these Terms,
                                        you may not access or use the Website.</p>
                                    <br></br>
                                    <br></br>

                                    <p className="text-white">
                                        1. Policy
                                        <br></br>
                                        <br></br>
                                        This site is generated by STARWIN and shall be used for informational purposes only. By
                                        using this site, You hereby agree to abide by the terms and conditions set forth on this page.
                                        In the event of you not agreeing to these terms and conditions, You are requested not to use
                                        the site. This site is the property of STARWIN and is copyrighted and protected by
                                        worldwide copyright laws and treaty provisions. You hereby agree to comply with all
                                        copyright laws worldwide in your use of this site and to prevent any unauthorized copying of
                                        the site. We do not grant any express or implied rights under any patents, trademarks,
                                        copyrights or trade secret information.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        2. Limited License
                                        <br></br>
                                        <br></br>
                                        Subject to the terms and conditions set forth in this page, StarWin grants you a non-exclusive,
                                        non-transferable, limited right to access, use and display this site. You agree not to interrupt
                                        or attempt to interrupt the operation of the site in any manner. Unless otherwise specified, the
                                        site is for your personal and non-commercial use. You shall not modify, copy, distribute,
                                        transmit, display, perform, reproduce, publish, license, create derivative works from, transfer,
                                        or sell any information, products or services obtained from this site.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        3. Eligibility:
                                        <br></br>
                                        <br></br>
                                        You must be at least 18 years old to use this Website and participate in any lottery games
                                        offered. You must be legally allowed to participate in lotteries in your jurisdiction. It is your
                                        responsibility to ensure compliance with all applicable laws and regulations. We do not offer
                                        lottery services where prohibited by law. Employees of STARWIN and their immediate
                                        family members are prohibited from participating in lottery games offered on this Website.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        4. Lottery Purchases and Gameplay:
                                        <br></br>
                                        <br></br>
                                        All lottery purchases are final. No refunds will be issued except in specific circumstances as
                                        determined by us (e.g., technical errors). The rules and instructions of each lottery game are
                                        displayed on the Website. It is your responsibility to review these rules before participating.
                                        <br></br>
                                        Winnings will be credited to your wallet. We reserve the right to cancel or postpone any
                                        lottery game at our discretion.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        5. Third Party Content
                                        <br></br>
                                        <br></br>
                                        The site makes information of third parties available, including articles, analyst reports, tools
                                        to facilitate calculation, company information, including any regulatory authority and other
                                        data from external sources. You acknowledge and agree that the third party content is not
                                        created or endorsed by us. We make no warranty or representation regarding and do not
                                        endorse, any linked sites or the information appearing thereon or any of the products or
                                        services described thereon. Links do not imply that we sponsor, endorse, affiliated or
                                        associated with, or legally authorized to use any trademark, trade name, logo or copyright
                                        symbol displayed in or accessible through the links. You hereby expressly acknowledge and
                                        agree that the linked sites are not under the control of us and we are not responsible for the
                                        contents of any linked site or any link contained in a linked site, or any changes or updates to
                                        such sites. We are providing these links to you only as a convenience, and the inclusion of
                                        any link shall not be construed to imply endorsement by us in any manner of the site.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        6. Disclaimer of Warranty
                                        <br></br>
                                        <br></br>
                                        This site, the information and any services made available on the site, are provided “as is”
                                        and without any representation or warranty, express or implied, of any kind, including, but
                                        not limited to, warranties of merchantability, non-infringement, or fitness for any particular
                                        purpose. There are no warranties of any kind, express or implied, regarding third-party
                                        content. We do not warrant that the Website will be uninterrupted, free of any viruses, errorfree, or that any defects will be corrected.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        7. Limitation of Damage
                                        <br></br>
                                        <br></br>
                                        In no event shall we or our affiliates, our subsidiaries or our joint ventures be liable to any
                                        entity or person for any direct, indirect, special, consequential or other damages (including,
                                        without limitation, any lost profits, business interruption, loss of information or programs or
                                        other data on your information handling system) that are related to the use of, or the inability
                                        to use, the content, materials, and functions of this site or any linked site, even if we are
                                        expressly advised of the possibility of such damages.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        8. Disclaimer
                                        <br></br>
                                        <br></br>
                                        The site may contain inaccuracies and typographical and clerical errors. We expressly
                                        disclaim any obligation(s) to update this site or any of the materials on this site. We do not
                                        warrant the accuracy or completeness of the materials or the reliability of any advice,
                                        opinion, statement or other information displayed or distributed through the site. You acknowledge that any reliance on any such opinion, advice, statement, memorandum, or
                                        information shall be at your sole risk. We reserve the right, in its sole discretion, to correct
                                        any errors or omissions in any portion of the site. We may make any other changes to the site,
                                        the materials, and the products, programs, services or prices (if any) described in the site at
                                        any time without notice. This site is for informational purposes only and should not be
                                        construed as technical advice of any manner.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        9. Intellectual Property:
                                        <br></br>
                                        <br></br>
                                        All content on this Website, including text, graphics, logos, and software, is the property of
                                        STARWIN and is protected by copyright and other intellectual property laws. You may not
                                        use any content from this Website without our prior written consent.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        10. Lawful and/or Prohibited Use
                                        <br></br>
                                        <br></br>
                                        As a condition of your usage of this site, you shall not use the site for any purpose that is
                                        unlawful or prohibited by the prevailing rules and regulations. You shall not use the site in
                                        any manner that could damage, disable, overburden, or impair our server, or the network
                                        connected to our server, or interfere with any other party’s use and enjoyment of any service
                                        associated with this site. You shall not attempt to gain unauthorized access to any section of
                                        this site, other accounts, computer systems or networks connected to any of our server or to
                                        any of the service associated with this site, through hacking, password mining or any other
                                        means. You shall not obtain or attempt to obtain any information through any means not
                                        intentionally made available through the site.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        11. Indemnity
                                        <br></br>
                                        <br></br>
                                        You agree to indemnify and hold harmless STARWIN or our affiliates, our subsidiaries or
                                        our joint ventures from any claim, cost, expense, judgment or other loss relating to your use
                                        of this site in any manner, including without limitation of the foregoing, any action You take
                                        which is in violation of the terms and conditions and against the prevailing rules and
                                        regulations.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        12. Changes
                                        <br></br>
                                        <br></br>
                                        We reserve the rights, at its sole discretion, to change, modify, add or remove any portion of
                                        these terms and conditions in whole or in part, at any time. Changes in these terms and
                                        conditions will be effective when notice of such change is posted. Your continued use of the
                                        site after any changes to these terms and conditions will be considered acceptance of those
                                        changes. We may terminate, change, suspend or discontinue any aspect of the site, including
                                        the availability of any feature(s) of the website, at any time. We may also impose limits on
                                        certain features and services or restrict your access to certain sections or all of the sites without notice or liability. You hereby acknowledge and agree that we may terminate the
                                        authorization, rights, and license given above at any point of time at its own sole discretion
                                        and upon such termination; You shall immediately destroy all the information downloaded
                                        from the site.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        13. Governing Law:
                                        <br></br>
                                        <br></br>
                                        These Terms will be governed by and construed in accordance with the laws of Costa Rica.
                                        This site is controlled, operated and administered by STARWIN from within Costa Rica. We
                                        make no representation that information on this site is appropriate or available for use at any
                                        other location(s) outside Costa Rica. Any access to this site from territories where their
                                        contents are illegal is prohibited. You may not use the site in violation of any prevailing rules
                                        and regulations. If you access this site from a location outside Costa Rica, You are
                                        responsible for compliance with all local laws. You agree that the appropriate court in Costa
                                        Rica, will have the exclusive jurisdiction to resolve all disputes arising under these terms and
                                        conditions and you hereby consent to personal jurisdiction in such forum.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        14. Responsible Gaming:
                                        <br></br>
                                        <br></br>
                                        We encourage responsible gaming. Please set limits for yourself and play within your means.
                                        If you or someone you know has a gambling problem, please seek help.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        15. Severability:
                                        <br></br>
                                        <br></br>
                                        These terms and conditions constitute the entire agreement between STARWIN and you with
                                        respect to your use of this site. If any provision(s) of this terms and conditions is held by a
                                        court of competent jurisdiction to be contrary to law then such provision(s) shall be severed
                                        from this terms and conditions and the other remaining provisions of this terms and
                                        conditions shall remain in full force and effect.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        9. Intellectual Property:
                                        <br></br>
                                        <br></br>
                                        All content on this Website, including text, graphics, logos, and software, is the property of
                                        STARWIN and is protected by copyright and other intellectual property laws. You may not
                                        use any content from this Website without our prior written consent.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        16. Changes to these Terms:
                                        <br></br>
                                        <br></br>
                                        We reserve the right to modify these Terms at any time. Any changes will be posted on the
                                        Website. Your continued use of the Website following the posting of changes constitutes
                                        your acceptance of the revised Terms.
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        17. Contact Us:
                                        <br></br>
                                        <br></br>
                                        If you have any questions about these Terms, please contact us at info@starwin.money
                                        <br></br>

                                    </p>
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

export default Terms
