import React, { useState, useEffect, useCallback } from 'react'
import iconHamburger from '../icons/hamburger.svg'
import iconCross from '../icons/cross-icon.svg'
import iconTg from '../icons/tg.svg'
import iconX from '../icons/x.svg'
import iconChart from '../icons/chart.svg'
import iconTg1 from '../icons/tg-1.svg'
import iconX1 from '../icons/x-1.svg'
import iconChart1 from '../icons/chart-1.svg'
import logo from '../icons/logo.png'
// import LeftBar from './LeftBar'
import {
  useAppKitEvents,
  useAppKitAccount,
} from '@reown/appkit/react'
import ChadHeaderLink from '../components/ChadHeaderLink'
import { Link } from 'react-router-dom'

import formatNumber, {
  imageUrl,
  apiUrl,
  coinNames,
  supportedChainIds
} from '../utils/constants.ts'
import { ConnectButton } from './ConnectButton.jsx'
import { animate } from 'framer-motion'

const TopBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [firstConnect, setFirstConnect] = useState(false)
  const { address, isConnected } = useAppKitAccount();
  console.log("address, isConnected", address, isConnected)

  const events = useAppKitEvents()

  useEffect(() => {
    console.log("Events: ", events);
  }, [events]);

  const handleHamburgerClick = () => {
    setIsExpanded(!isExpanded)
  }

  let currentPath = window.location.pathname

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 px-2 bg-[#0000009e]">
        <div
          className={`my-0 max-w-7xl m-auto w-full bg-[#00000000] rounded-[25px] lg:rounded-full lg:h-[70px] items-center ${isExpanded ? 'pb-2 px-2' : 'px-2'
            }`}
        >
          <div className="flex justify-between">
            <div className="flex flex-row items-center">
              <ChadHeaderLink className="w-[120px] h-[100px]" />
              <div
                className="lg:flex hidden flex-row gap-4"
                style={{ fontFamily: 'Bricolage Grotesque,  sans-serif' }}
              >
                <Link to="/dashboard" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/' || currentPath === '/dashboard'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    Home
                  </span>
                </Link>
                <Link to="/rules" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/rules'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    Rules
                  </span>
                </Link>
                <Link to="/instructions" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/instructions'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    Instructions
                  </span>
                </Link>
                <Link to="/faq" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/faq'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    FAQ
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              {/* <div className="sm:flex hidden flex-row gap-4">
                <a
                  href="https://x.com/BlackPumpofc"
                  target="_blank"
                  className="p-2  text-white"
                >
                  <img src={iconX1} className="w-[24px] h-[24px]" />
                </a>
                <a
                  href="https://t.me/blackpumpchat"
                  target="_blank"
                  className="p-2"
                >
                  <img src={iconTg1} className="w-[24px] h-[24px]" />
                </a>
              </div> */}
              <div className="navConnectButtonBox">
                <appkit-button />
              </div>
              <button
                className="bg-black hover:bg-[#222] rounded-full p-2 flex lg:hidden"
                onClick={handleHamburgerClick}
              >
                <img
                  src={isExpanded ? iconCross : iconHamburger}
                  className="w-[32px] h-[32px]"
                />
              </button>
            </div>
          </div>
          {isExpanded && (
            <div
              className="relative bg-[#212121] rounded-[25px] flex flex-col gap-[10px] px-[32px] pt-[40px] pb-[160px] sm:p-[48px] w-full items-center overflow-hidden"
              style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
            >
              <div
                className="flex flex-col gap-4"
                style={{ fontFamily: 'Kanit, sans-serif' }}
              >
                <Link to="/dashboard" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/' || currentPath === '/dashboard'
                        ? 'text-[20px] text-[#e2fea5]'
                        : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                    }
                  >
                    Home
                  </span>
                </Link>
                <Link to="/rules" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/rules'
                        ? 'text-[20px] text-[#e2fea5]'
                        : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                    }
                  >
                    Rules
                  </span>
                </Link>
                <Link to="/instructions" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/instructions'
                        ? 'text-[20px] text-[#e2fea5]'
                        : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                    }
                  >
                    Instructions
                  </span>
                </Link>
                <Link to="/faq" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/faq'
                        ? 'text-[20px] text-[#e2fea5]'
                        : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                    }
                  >
                    FAQ
                  </span>
                </Link>
              </div>
              {/* <div className="sm:hidden flex flex-row gap-4">
                <Link to="#" target="_blank" className="p-2">
                  <img src={iconX1} className="w-[24px] h-[24px]" />
                </Link>
                <Link to="#" target="_blank" className="p-2">
                  <img src={iconTg1} className="w-[24px] h-[24px]" />
                </Link>
                <Link to="#" target="_blank" className="p-2">
                  <img src={iconChart1} className="w-[24px] h-[24px]" />
                </Link>
              </div> */}
              <div
                className="h-[240px] sm:h-[350px] absolute right-[-57px] bottom-[-72px] sm:right-[-97px] sm:bottom-[-115px]"
                style={{
                  transform: 'rotate(-34deg)',
                  transformOrigin: '50% 50% 0px',
                  aspectRatio: '1.0713153724247226 / 1'
                }}
              >
                <img src={logo} className="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TopBar
