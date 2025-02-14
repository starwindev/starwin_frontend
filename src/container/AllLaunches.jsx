/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import { useState, useEffect, useCallback, useRef } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { readContract, waitForTransaction, writeContract } from '@wagmi/core'
import logo1 from '../icons/logo1.svg'
import '../App.css'
import '../styles/MainContainer.css'
import LotteryAbi from '../config/LotteryAbi.json'
import UsdtAbi from '../config/UsdtAbi.json'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import BigCountDown from '../components/BigCountdown.jsx'
import Cookies from 'universal-cookie'
import { config } from '../config'
import { getLotteryAddress } from '../utils/addressHelpers.ts'
import { shortenAddress, usdtAddress, web3Clients } from '../utils/constants.ts'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const App = () => {
  const timeOffset = 24 * 60 * 60;
  const opentime = 23 * 60 * 60;
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const cookies = new Cookies()

  const [currentId, setCurrentId] = useState(0)
  const [adminCurrentId, setAdminCurrentId] = useState(0)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [ticketAmount, setTicketAmount] = useState()
  const [lotteryInfo, setLotteryInfo] = useState()
  const [currentDate, setCurrentDate] = useState(0)
  const [adminLotteryInfo, setAdminLotteryInfo] = useState()
  const [timeOption, setTimeOption] = useState(0)
  const [userHistory, setUserHistory] = useState()
  const [allowance, setAllowance] = useState(0)
  const [lotteryStartTime, setLotteryStartTime] = useState(0)

  const [approveLoading, setApproveLoading] = useState(false)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [guideModalIsOpen, setGuideModalIsOpen] = useState(false)
  const [isDouble, setIsDouble] = useState(true)

  const [firstDigit, setFirstDigit] = useState(1)
  const [secondDigit, setSecondDigit] = useState(1)

  const [lastDigit, setLastDigit] = useState(0)
  const [tickets, setTickets] = useState([]);

  const [sevenLotteryHistory, setSevenLotteryHistory] = useState([])
  const [myTicketHistory, setMyTicketHistory] = useState([])

  const [adminLotteryHistory, setAdminLotteryHistory] = useState([])
  const [owner, setOwner] = useState()
  const [winningNumber, setWinningNumber] = useState();

  const [searchWallet, setSearchWallet] = useState()
  const [admin_searchUserHistory, setAdminSearchUserHistory] = useState([])

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmBuyLoading, setConfirmBuyLoading] = useState(false);
  const handleBuyClick = () => {
    setShowConfirmationModal(true);
  }

  const handleConfirmBuy = async () => {
    setConfirmBuyLoading(true);
    await buyHandler();
    setConfirmBuyLoading(false);
    setShowConfirmationModal(false);
  }
  const handleCancel = () => {
    setShowConfirmationModal(false);
    setTickets([])
  }
  const handleAdminStatus = async (flag) => {
    let adminId = adminCurrentId;
    if (flag == 1) {
      adminId = adminCurrentId + 1;
    } else {
      if (adminCurrentId > 1) {
        adminId = adminCurrentId - 1;
      } else {
        toast.error('No more rounds to go back to.')
        return;
      }
    }

    const _lotteryInfo = await readContract(config, {
      address: getLotteryAddress(chainId),
      abi: LotteryAbi,
      functionName: 'getRoundData',
      args: [Number(adminId)],
      chainId: chainId
    })
    setAdminLotteryInfo(_lotteryInfo)

    const _adminLotteryHistory = await readContract(config, {
      address: getLotteryAddress(chainId),
      abi: LotteryAbi,
      functionName: 'getBetsByRound',
      args: [Number(adminId)],
      chainId: chainId
    })

    setAdminLotteryHistory(_adminLotteryHistory)

    if (flag == 1) {
      setAdminCurrentId(adminCurrentId + 1)
    } else {
      if (adminCurrentId > 1) {
        setAdminCurrentId(adminCurrentId - 1)
      }
    }
    if (_lotteryInfo[3] == true) {
      setWinningNumber(Number(_lotteryInfo[2]))
    }
    else {
      setWinningNumber(null)
    }
  }

  const handleSetWinningNumber = async () => {
    if (winningNumber == undefined || winningNumber == '' || winningNumber < 0 || winningNumber > 99) {
      toast.error('Please set the valid winning number.');
      return;
    }
    if (adminLotteryInfo[3] == true) {
      toast.error('Winning number is already set.');
      return;
    }
    try {
      // Logic to set the winning number for the specified round
      const setNumber = await writeContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'setWinningNumber',
        args: [adminCurrentId, winningNumber],
        chainId: Number(chainId),
        gasLimit: 150_000_000n
      });
      await waitForTransaction(config, {
        hash: setNumber
      });
      toast.success('Set Winning Number for Round ' + adminCurrentId + ' Transaction confirmed successfully.');
      let tempLotteries = [];
      for (let i = 1; i <= Number(currentId); i++) {
        const _lotteryInfo = await readContract(config, {
          address: getLotteryAddress(chainId),
          abi: LotteryAbi,
          functionName: 'getRoundData',
          args: [i],
          chainId: chainId
        })
        _lotteryInfo.roundNumber = i;
        tempLotteries.push(_lotteryInfo);
      }
      setSevenLotteryHistory(tempLotteries);

      const _adminLotteryInfo = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'getRoundData',
        args: [Number(adminCurrentId)],
        chainId: chainId
      })
      setAdminLotteryInfo(_adminLotteryInfo)
    } catch (error) {
      if (error.code === 'USER_REJECTED') {
        toast.error('Transaction was cancelled by the user.');
      } else {
        toast.error('An error occurred during the transaction.');
      }
    }

  };

  const handleShowUserHistory = async () => {
    const _userHistory = await readContract(config, {
      address: getLotteryAddress(chainId),
      abi: LotteryAbi,
      functionName: 'userTicketHistory',
      args: [searchWallet],
      chainId: chainId
    })
    setAdminSearchUserHistory(_userHistory)
  }
  const addTicket = (id, date, option, ticketPrice, ticketNumber, ticketType, realticketNumber) => {
    const newTicket = {
      id,
      date,
      option,
      ticketPrice,
      ticketNumber,
      realticketNumber,
      ticketType
    };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  };

  const increaseFirstDigit = () => {
    setFirstDigit(prev => (prev + 1) % 10)
    setLastDigit(0);
  }

  const decreaseFirstDigit = () => {
    setFirstDigit(prev => (prev > 0 ? prev - 1 : 9))
    setLastDigit(0);
  }
  const clickedFirstDigit = () => {
    setLastDigit(0);
  }
  const increaseSecondDigit = () => {
    setSecondDigit(prev => (prev + 1) % 10)
    setLastDigit(1);
  }

  const decreaseSecondDigit = () => {
    setSecondDigit(prev => (prev > 0 ? prev - 1 : 9))
    setLastDigit(1);
  }
  const clickedSecondDigit = () => {
    setLastDigit(1);
  }
  // Modal Section
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
    cookies.set('show-how-it-works', 'true')
  }

  const closeModal = e => {
    if (e.target.id === 'modal') {
      setModalIsOpen(false)
      setGuideModalIsOpen(false)
      cookies.set('show-how-it-works', 'true')
    }
  }

  const addMoreTicket = () => {
    const time1 = new Date();
    const time2 = new Date(Number(lotteryInfo[1]) * 1000)
    const difference = Number((time2.getTime() - time1) / 1000);
    if (currentId <= 0) {
      toast.error('Lottery is not started yet');
      return;
    }
    if (timeOption == 0 && difference < (timeOffset - opentime)) {
      toast.error('Open Duration is already over for this round');
      return;
    }
    if (ticketAmount >= 5 || ticketAmount == null || ticketAmount == "") {
      const saveTicket = ticketAmount >= 5 ? ticketAmount : 5;
      const id = tickets.length + 1;
      const data11 = new Date(Number(currentDate) * 1000 + Number(timeOption) * timeOffset * 1000);
      const date = data11.getFullYear() + "-" + (data11.getMonth() + 1) + "-" + data11.getDate();
      const option = timeOption;
      const ticketPrice = saveTicket;
      const realticketNumber = firstDigit * 10 + secondDigit;
      const ticketNumber = isDouble ? firstDigit + " " + secondDigit : lastDigit === 0 ? firstDigit + " X" : "X " + secondDigit;
      const ticketType = isDouble ? '0' : lastDigit === 0 ? '1' : '2';
      addTicket(id, date, option, ticketPrice, ticketNumber, ticketType, realticketNumber);
    }
    else {
      toast.error('Ticket amount must be greater than 5 USDT');
    }

  }
  const deleteTicket = (id) => {
    setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== id));
  };

  const totalTicketAmount = tickets.reduce((total, ticket) => total + parseInt(ticket.ticketPrice), 0);
  const buyHandler = async () => {
    try {
      const a_ticketNum = tickets.map(ticket => ticket.realticketNumber)
      const a_option = tickets.map(ticket => ticket.option)
      const a_ticketType = tickets.map(ticket => parseInt(ticket.ticketType))
      const a_ticketAmount = tickets.map(ticket => Number(ticket.ticketPrice) * 10 ** 18)
      const buy = await writeContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'enterLottery',
        args: [a_ticketNum, a_option, a_ticketType, a_ticketAmount],
        chainId: Number(chainId),
        gasLimit: 150_000_000n
      })
      await waitForTransaction(config, {
        hash: buy
      })
      toast.success('Buy Ticket Transaction confirmed successfully.')
      const _userHistory = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'userTicketHistory',
        args: [address],
        chainId: chainId
      })
      setMyTicketHistory(_userHistory)

      const _allowance = await readContract(config, {
        address: usdtAddress,
        abi: UsdtAbi,
        functionName: 'allowance',
        args: [address, getLotteryAddress(chainId)],
        chainId: chainId
      })
      //setUserHistory(_userHistory)
      setAllowance(Number(_allowance) / 10 ** 18);
      setShowConfirmationModal(true)
    } catch (error) {
      toast.error('Transaction was cancelled by the user.');
    }

  }

  const approveHandler = async () => {
    if (totalTicketAmount === 0) {
      toast.error('Please add tickets first.')
      return;
    }
    try {
      setApproveLoading(true)
      const approve = await writeContract(config, {
        address: usdtAddress,
        abi: UsdtAbi,
        functionName: 'approve',
        args: [getLotteryAddress(chainId), BigInt(totalTicketAmount * 10 ** 18)],
        chainId: Number(chainId),
        gasLimit: 150_000_000n
      });
      await waitForTransaction(config, {
        hash: approve
      });
      setApproveLoading(false)

      const _allowance = await readContract(config, {
        address: usdtAddress,
        abi: UsdtAbi,
        functionName: 'allowance',
        args: [address, getLotteryAddress(chainId)],
        chainId: chainId
      })
      //setUserHistory(_userHistory)
      setAllowance(Number(_allowance) / 10 ** 18);
      toast.success('Approve Transaction confirmed successfully.');
    } catch (error) {
      if (error.code === 'USER_REJECTED') {
        toast.error('Transaction was cancelled by the user.');
      } else {
        toast.error('Transaction was cancelled by the user.');
      }
      setApproveLoading(false)
    }
  };

  const guideModalContent = (
    <div
      id="modal"
      onClick={closeModal}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          closeModal()
        }
      }}
      role="button"
      tabIndex="0" // Make the div focusable
      className={`modal ${guideModalIsOpen ? 'show-modal' : ''}`}
    >
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-sm:max-w-[95%] translate-x-[-50%] translate-y-[-50%] gap-4 border border-transparent bg-golden-gradient p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg dark:border-slate-800 dark:bg-slate-950 text-black max-w-[90%] md:max-w-screen-lg max-h-[95%] overflow-y-auto scrollbar-y-thin">
        <div className="grid grid-cols-12 md:gap-5">
          <div className="col-span-12 md:col-span-6">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2
                id="radix-:r4:"
                className="font-semibold tracking-tight text-xl"
              >
                Rules
              </h2>
            </div>
            <ul className="list-disc pl-3 space-y-1 text-black">
              <li>
                <p className="font-bold text-black">Types of Betting:</p>
                <ul className="list-disc pl-3">
                  <li className="mb-0.5 last:mb-0">
                    <p className="text-black">Double Number Betting:</p>
                    <ul className="list-disc pl-3">
                      <li>
                        <p className="text-black">
                          Bet on numbers from 00 to 99.
                        </p>
                        <ul className="list-disc pl-3"></ul>
                      </li>
                      <li>
                        <p className="text-black">
                          Payout: 95 times the bet amount for the exact winning
                          number.
                        </p>
                        <ul className="list-disc pl-3"></ul>
                      </li>
                    </ul>
                  </li>
                  <li className="mb-0.5 last:mb-0">
                    <p className="text-black">Single Number Betting:</p>
                    <ul className="list-disc pl-3">
                      <li>
                        <p className="text-black">
                          Bet on numbers from 0 to 9, separately for:
                        </p>
                        <ul className="list-disc pl-3">
                          <li>
                            <p className="text-black">
                              First digit of the winning number.
                            </p>
                          </li>
                          <li>
                            <p className="text-black">
                              Second digit of the winning number.
                            </p>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p className="text-black">
                          Payout: 9.5 times the bet amount for the correct
                          digit.
                        </p>
                        <ul className="list-disc pl-3"></ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-bold text-black">Winning Number:</p>
                <ul className="list-disc pl-3">
                  <li className="mb-0">
                    <p className="text-black">
                      A number between 00 and 99 is drawn daily as the winning
                      number.
                    </p>
                    <ul className="list-disc pl-3"></ul>
                  </li>
                  <li className="mb-0">
                    <p className="text-black">
                      The winning number applies to both betting types.
                    </p>
                    <ul className="list-disc pl-3"></ul>
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-bold text-black">Bet Outcomes:</p>
                <ul className="list-disc pl-3">
                  <li className="mb-0.5 last:mb-0">
                    <p className="text-black">Double Number Betting:</p>
                    <ul className="list-disc pl-3">
                      <li>
                        <p className="text-black">
                          Exact match with the winning number pays 95 times the
                          bet amount.
                        </p>
                        <ul className="list-disc pl-3"></ul>
                      </li>
                      <li>
                        <p className="text-black">All other numbers lose.</p>
                        <ul className="list-disc pl-3"></ul>
                      </li>
                    </ul>
                  </li>
                  <li className="mb-0.5 last:mb-0">
                    <p className="text-black">Single Number Betting:</p>
                    <ul className="list-disc pl-3">
                      <li>
                        <p className="text-black">First digit:</p>
                        <ul className="list-disc pl-3">
                          <li>
                            <p className="text-black">
                              Correct digit pays 9.5 times the bet amount.
                            </p>
                          </li>
                          <li>
                            <p className="text-black">All other digits lose.</p>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p className="text-black">Second digit</p>
                        <ul className="list-disc pl-3">
                          <li>
                            <p className="text-black">
                              Correct digit pays 9.5 times the bet amount.
                            </p>
                          </li>
                          <li>
                            <p className="text-black">All other digits lose.</p>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2
                id="radix-:r4:"
                className="font-semibold tracking-tight text-xl"
              >
                Instructions
              </h2>
            </div>
            <ul className="list-disc pl-3 space-y-1 text-black mb-5">
              <li>
                <p className="font-bold text-black">Timings:</p>
                <ul className="list-disc pl-3">
                  <li className="mb-0">
                    <p className="text-black">
                      The winning number will be drawn daily at 09:00 AM (Costa
                      Rica Time).
                    </p>
                    <ul className="list-disc pl-3"></ul>
                  </li>
                  <li className="mb-0">
                    <p className="text-black">
                      Betting will close 30 minutes prior to the draw, i.e., at
                      08:30 AM (Costa Rica Time).
                    </p>
                    <ul className="list-disc pl-3"></ul>
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-bold text-black">Placing Bets:</p>
                <ul className="list-disc pl-3">
                  <li className="mb-0.5 last:mb-0">
                    <p className="text-black">Choose the betting type:</p>
                    <ul className="list-disc pl-3">
                      <li>
                        <p className="text-black">
                          Double Number Betting (00–99).
                        </p>
                        <ul className="list-disc pl-3"></ul>
                      </li>
                      <li>
                        <p className="text-black">
                          Single Number Betting (0–9 for each digit).
                        </p>
                        <ul className="list-disc pl-3"></ul>
                      </li>
                    </ul>
                  </li>
                  <li className="mb-0">
                    <p className="text-black">
                      Specify the amount for each number.
                    </p>
                    <ul className="list-disc pl-3"></ul>
                  </li>
                  <li className="mb-0">
                    <p className="text-black">
                      Submit bets before the daily draw.
                    </p>
                    <ul className="list-disc pl-3"></ul>
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-bold text-black">Post-Draw:</p>
                <ul className="list-disc pl-3">
                  <li className="mb-0">
                    <p className="text-black">
                      A number between 00 and 99 is drawn daily as the winning
                      number.
                    </p>
                    <ul className="list-disc pl-3"></ul>
                  </li>
                  <li className="mb-0">
                    <p className="text-black">
                      The winning number applies to both betting types.
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
  )

  useEffect(() => {
    const fetchData = async () => {
      const _currentId = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'getCurrentRound',
        chainId: chainId
      })
      const _lotteryStartTime = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'lotteryStartTime',
        chainId: chainId
      })
      setLotteryStartTime(Number(_lotteryStartTime))

      const _owner = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'owner',
        chainId: chainId
      })
      setOwner(_owner)

      if (Number(_currentId) <= 0) return;
      const _lotteryInfo = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'getRoundData',
        args: [Number(_currentId)],
        chainId: chainId
      })

      const _adminLotteryHistory = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'getBetsByRound',
        args: [Number(_currentId)],
        chainId: chainId
      })

      setCurrentDate(_lotteryInfo[1])
      setCurrentId(Number(_currentId))

      setAdminCurrentId(Number(_currentId))
      setAdminLotteryInfo(_lotteryInfo)

      setLotteryInfo(_lotteryInfo)

      setAdminLotteryHistory(_adminLotteryHistory)
      if (_lotteryInfo[3] == true) {
        setWinningNumber(Number(_lotteryInfo[2]))
      }
      else {
        setWinningNumber(null)
      }
      let tempLotteries = [];
      for (let i = 1; i <= Number(_currentId); i++) {
        const _lotteryInfo = await readContract(config, {
          address: getLotteryAddress(chainId),
          abi: LotteryAbi,
          functionName: 'getRoundData',
          args: [i],
          chainId: chainId
        })
        _lotteryInfo.roundNumber = i;
        tempLotteries.push(_lotteryInfo);
      }
      setSevenLotteryHistory(tempLotteries);
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const _userHistory = await readContract(config, {
        address: getLotteryAddress(chainId),
        abi: LotteryAbi,
        functionName: 'userTicketHistory',
        args: [address],
        chainId: chainId
      })
      const _allowance = await readContract(config, {
        address: usdtAddress,
        abi: UsdtAbi,
        functionName: 'allowance',
        args: [address, getLotteryAddress(chainId)],
        chainId: chainId
      })
      setMyTicketHistory(_userHistory)
      setAllowance(Number(_allowance) / 10 ** 18);
    }
    if (isConnected) fetchData()
  }, [address, isConnected])

  const currentTime = Date.now(); // Get the current time in milliseconds

  return (
    <div>
      <style jsx>{`
        .modal {
          opacity: 0;
          visibility: hidden;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .show-modal {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
      {guideModalContent}
      {/* {modalContent} */}
      <div className="GlobalContainer launches-all-padding">
        <div>
          <TopBar />
          <div className="max-w-7xl m-auto pt-32 pb-24 px-4 sm:px-12 sm:py-6">
            <div className="text-center mb-5">
              <img src={logo1} alt="logo1" className="w-[300px] h-[100px] m-auto" />
              <div className="space-y-2">
                <p>
                  Experience the thrill
                  of winning every day!<br></br> Join the excitement and place your bets.
                  Are you ready to make your move?
                </p>
                <p>
                  Please read the &nbsp;
                  <Link to="/rules" className="inline-block">
                    <span
                      className={'underline inline-flex items-center justify-center text-[#ecc440]'}
                    >Rules</span>
                  </Link>
                  &nbsp;and &nbsp;
                  <Link to="/instructions" className="inline-block">
                    <span
                      className={'underline inline-flex items-center justify-center text-[#ecc440]'}
                    >Instructions</span>
                  </Link> to buy tickets.
                  <br />
                </p>
              </div>
            </div>
            {lotteryStartTime * 1000 > currentTime && (
              <div className="my-6 flex flex-col m-auto justify-center border border-golden rounded-[20px]">
                <div className="flex flex-col items-center text-center p-4 bg-[#ecc440]/10 rounded-lg shadow-lg">
                  <div className="text-xl text-[#ff0000]">It's not started yet. It will start soon.</div>
                </div>
              </div>
            )}

            {owner == address && adminLotteryInfo &&
              <div className="my-6 flex flex-col m-auto justify-center border border-golden rounded-[20px]">
                <div className="flex flex-col items-center text-center p-4 bg-[#ecc440]/10 rounded-lg shadow-lg">
                  <div className="text-xl text-[#ecc440]">Admin Panel</div>
                  <div className="flex items-center gap-4">
                    <button className="text-white text-xl hover:text-[#ecc440] transition" onClick={() => handleAdminStatus(0)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-left">
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <path d="m12 8-4 4 4 4"></path>
                        <path d="M16 12H8"></path>
                      </svg>
                    </button>
                    <div className="text-base">
                      <p>Draw Date and Time:</p>
                      <strong className="text-[#ecc440]">
                        {new Date(Number(adminLotteryInfo[1]) * 1000).getUTCDate().toString().padStart(2, '0')}/
                        {(new Date(Number(adminLotteryInfo[1]) * 1000).getUTCMonth() + 1).toString().padStart(2, '0')}/
                        {new Date(Number(adminLotteryInfo[1]) * 1000).getUTCFullYear()} &nbsp;
                        {new Date(Number(adminLotteryInfo[1]) * 1000).getUTCHours().toString().padStart(2, '0')}:
                        {new Date(Number(adminLotteryInfo[1]) * 1000).getUTCMinutes().toString().padStart(2, '0')}:
                        {new Date(Number(adminLotteryInfo[1]) * 1000).getUTCSeconds().toString().padStart(2, '0')}
                      </strong>
                    </div>
                    <button className="text-white text-xl hover:text-[#ecc440] transition" onClick={() => handleAdminStatus(1)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-right">
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <path d="M8 12h8"></path>
                        <path d="m12 16 4-4-4-4"></path>
                      </svg>
                    </button>
                  </div>
                  {((adminCurrentId < currentId && adminLotteryInfo[3] === false) ||
                    (adminCurrentId === currentId && currentTime > Number(adminLotteryInfo[0]) * 1000 + opentime * 1000 && currentTime <= Number(adminLotteryInfo[1]) * 1000)) && (
                      <div className="my-4 w-full max-w-md p-4 border border-golden rounded-lg bg-[#2a2a2a] shadow-lg">
                        <h3 className="text-lg font-bold text-golden mb-2">Set Winning Number for Round</h3>
                        <div className="flex flex-row items-center justify-center">
                          <input
                            type="text"
                            value={winningNumber == null ? '' : winningNumber}
                            disabled={adminLotteryInfo[3] == true}
                            onChange={(e) => setWinningNumber(e.target.value)}
                            className="w-full border bg-transparent border-golden rounded px-2 py-1 mr-2 text-white"
                            placeholder="Enter number"
                          />
                          <button
                            disabled={adminLotteryInfo[3] === true}
                            onClick={() => handleSetWinningNumber()}
                            className={`w-full rounded-full px-4 py-2 text-black font-semibold transition-colors ${adminLotteryInfo[3] === true ? 'bg-gray-500 cursor-not-allowed' : 'bg-golden hover:bg-[#d4af37]'
                              }`}
                          >
                            Set
                          </button>
                        </div>
                      </div>
                    )}
                  <div className="grid xl:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <div className="text-center text-[#f3cc2f] text-xl mb-1.5">
                        Single Lottery Bets
                      </div>
                      <div
                        className="bg-[#333c2f] rounded-[25px] lg:px-8 px-2.5 py-5"
                        style={{ boxShadow: '#676767 0px 5px 10px 0px' }}
                      >
                        <div className="w-full text-xs sm:text-sm">
                          <div className="grid grid-cols-6 text-[#ffffff]">
                            <div className="uppercase text-center px-2 py-3 col-span-3">
                              Number
                            </div>
                            <div className="uppercase text-center px-2 py-3 col-span-3">
                              Amount
                            </div>
                          </div>

                          <div className="gap-2 flex flex-col text-[#f8ffe8] overflow-y-auto no-scrollbar h-[220px]">
                            {!adminLotteryHistory || (adminLotteryHistory && adminLotteryHistory.filter(lottery => lottery.isDouble != 0).length === 0) && (
                              <div className="bg-[#0d0d0d] rounded-full">
                                <div className="px-4 py-2.5 text-center">No Data</div>
                              </div>
                            )}
                            {adminLotteryHistory && (() => {
                              // Aggregate bets by number, considering first and second digits separately
                              const aggregatedBets = adminLotteryHistory.reduce((acc, lottery) => {
                                if (lottery.isDouble != 0) {
                                  const firstDigit = Math.floor(Number(lottery.number) / 10);
                                  const secondDigit = Number(lottery.number) % 10;
                                  if (lottery.isDouble == 1) {
                                    // Aggregate for first digit
                                    acc[`${firstDigit} X`] = (acc[`${firstDigit} X`] || 0) + Number(lottery.amount) / 10 ** 18;
                                  } else {
                                    // Aggregate for second digit
                                    acc[`X ${secondDigit}`] = (acc[`X ${secondDigit}`] || 0) + Number(lottery.amount) / 10 ** 18;
                                  }
                                }
                                return acc;
                              }, {});

                              // Convert aggregated results to an array and sort by number
                              return Object.entries(aggregatedBets).sort((a, b) => a[0].localeCompare(b[0])).map(([number, totalAmount]) => (
                                <div key={number} className="grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm">
                                  <div className="uppercase text-center px-2 py-3 col-span-3">
                                    {number}
                                  </div>
                                  <div className="uppercase text-center px-2 py-3 col-span-3">
                                    {totalAmount.toFixed(2)} &nbsp;USDT
                                  </div>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-center text-[#f3cc2f] text-xl mb-1.5">
                        Double Lottery Bets
                      </div>
                      <div
                        className="bg-[#333c2f] rounded-[25px] lg:px-8 px-2.5 py-5"
                        style={{ boxShadow: '#676767 0px 5px 10px 0px' }}
                      >
                        <div className="w-full text-xs sm:text-sm">
                          <div className="grid grid-cols-6 text-[#ffffff]">
                            <div className="uppercase text-center px-2 py-3 col-span-3">
                              Number
                            </div>
                            <div className="uppercase text-center px-2 py-3 col-span-3">
                              Amount
                            </div>
                          </div>

                          <div className="gap-2 flex flex-col text-[#f8ffe8] overflow-y-auto no-scrollbar h-[220px]">
                            {!adminLotteryHistory || (adminLotteryHistory && adminLotteryHistory.filter(lottery => lottery.isDouble == 0).length === 0) && (
                              <div className="bg-[#0d0d0d] rounded-full">
                                <div className="px-4 py-2.5 text-center">No Data</div>
                              </div>
                            )}
                            {adminLotteryHistory && (() => {
                              // Aggregate bets by number
                              const aggregatedBets = adminLotteryHistory.reduce((acc, lottery) => {
                                if (lottery.isDouble == 0) {
                                  const number = Number(lottery.number);
                                  acc[number] = (acc[number] || 0) + Number(lottery.amount) / 10 ** 18;
                                }
                                return acc;
                              }, {});

                              // Convert aggregated results to an array and sort by number
                              return Object.entries(aggregatedBets).sort((a, b) => a[0] - b[0]).map(([number, totalAmount]) => (
                                <div key={number} className="grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm">
                                  <div className="uppercase text-center px-2 py-3 col-span-3">
                                    {number}
                                  </div>
                                  <div className="uppercase text-center px-2 py-3 col-span-3">
                                    {totalAmount.toFixed(2)} &nbsp;USDT
                                  </div>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-center text-[#f3cc2f] text-xl mb-1.5">
                        User History
                      </div>
                      <div className="grid grid-cols-12 gap-3 items-center justify-center mx-3 mb-3">
                        <div className="col-span-8">
                          <input
                            type="text"
                            value={searchWallet}
                            onChange={(e) => setSearchWallet(e.target.value)}
                            className="w-full border bg-transparent border-golden rounded px-2 py-1 text-white"
                            placeholder="Enter wallet address"
                          />
                        </div>
                        <div className="col-span-4">
                          <button
                            onClick={() => handleShowUserHistory()}
                            className="w-full rounded-full px-4 py-2 text-black font-semibold transition-colors bg-golden hover:bg-[#d4af37]"
                          >
                            Show
                          </button>
                        </div>
                      </div>
                      <div
                        className="bg-[#f3cc2f] rounded-[25px] lg:px-8 px-2.5 py-5"
                        style={{ boxShadow: '#676767 0px 5px 10px 0px' }}
                      >
                        <div className="w-full text-xs sm:text-sm">
                          <div className="grid grid-cols-6 text-[#0f0f0f]">
                            <div className="uppercase text-center px-2 py-3  col-span-2">
                              Date
                            </div>
                            <div className="uppercase text-center px-2 py-3  ">
                              Type
                            </div>
                            <div className="uppercase text-center px-2 py-3 col-span-2">
                              Numbers
                            </div>
                            <div className="uppercase text-center px-2 py-3  ">
                              Amount
                            </div>
                          </div>
                          <div className="gap-2 flex flex-col text-[#f8ffe8] overflow-y-auto no-scrollbar h-[268px]">
                            {admin_searchUserHistory && admin_searchUserHistory.length > 0 && sevenLotteryHistory && sevenLotteryHistory.length > 0 ? (
                              [...admin_searchUserHistory].reverse().map((ticket, index) => (
                                <div key={index} className="grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm">
                                  <div className="uppercase text-center px-2 py-3 col-span-2">
                                    {new Date(Number(lotteryStartTime) * 1000 + Number(ticket.roundNumber) * timeOffset * 1000).toLocaleString()}
                                  </div>
                                  <div className="uppercase text-center px-2 py-3">
                                    <div className={`flex flex-row items-center border ${ticket.isDouble == 0 ? 'border-[#f3cc2f] text-[#f3cc2f]' : 'border-[#c51f1f] text-[#c51f1f]'} rounded-full w-fit`}>
                                      <div className="text-[10px] sm:text-[12px] inline-block whitespace-nowrap overflow-hidden w-14 mx-1 sm:mx-3">
                                        {ticket.isDouble == 0 ? 'Double' : (ticket.isDouble == 1 ? '1st Digit' : '2nd Digit')}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="uppercase text-center px-2 py-3 col-span-2">
                                    {ticket.isDouble == 0 ? `${Number(ticket.number)}` : ticket.isDouble == 1 ? `${parseInt(Number(ticket.number) / 10)}` + " X" : "X " + `${Number(ticket.number) % 10}`}
                                  </div>
                                  <div className="uppercase text-center px-2 py-3">
                                    {Number(ticket.amount) / 10 ** 18} &nbsp;USDT
                                  </div>
                                  {/* <div className={`uppercase text-center px-2 py-3 ${currentId == ticket.roundNumber ? 'text-[#f3cc2f]' : sevenLotteryHistory[Number(ticket.roundNumber) - 1][3] == false ? "text-[#ffffff]" : ticket.isWin ? 'text-[#32CD32]' : 'text-[#c51f1f]'}`}>
                                    {currentId == ticket.roundNumber ? 'Pending' : sevenLotteryHistory[Number(ticket.roundNumber) - 1][3] == false ? "Not Set" : ticket.isWin ? 'WIN' : 'LOSE'}
                                  </div> */}
                                </div>
                              ))
                            ) : (
                              <div className="bg-[#0d0d0d] rounded-full">
                                <div className="px-4 py-2.5 text-center">No Data</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className="my-6 flex flex-col m-auto justify-center border border-golden rounded-[20px]">
              <div className="flex flex-col items-center text-center p-4 bg-[#ecc440]/10 rounded-lg shadow-lg">
                <div className="flex items-center gap-4">
                  <button disabled={timeOption == 0} className="disabled:opacity-50 text-white text-xl hover:text-[#ecc440] transition" onClick={() => setTimeOption(timeOption == 0 ? 0 : timeOption - 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-left">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="m12 8-4 4 4 4"></path>
                      <path d="M16 12H8"></path>
                    </svg>
                  </button>
                  <div className="text-base">
                    <p>Draw Date and Time:</p>
                    <strong className="text-[#ecc440]">
                      {(() => {
                        const date = new Date(Number(currentDate) * 1000 + Number(timeOption) * timeOffset * 1000);
                        const options = {
                          timeZone: 'America/Costa_Rica',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        };
                        const day = new Intl.DateTimeFormat('en-CR', { day: '2-digit', timeZone: 'America/Costa_Rica' }).format(date);
                        const month = new Intl.DateTimeFormat('en-CR', { month: '2-digit', timeZone: 'America/Costa_Rica' }).format(date);
                        const year = new Intl.DateTimeFormat('en-CR', { year: 'numeric', timeZone: 'America/Costa_Rica' }).format(date);
                        const time = new Intl.DateTimeFormat('en-CR', options).format(date);

                        return `${day}/${month}/${year} ${time}`;
                      })()}
                    </strong>
                  </div>
                  <button disabled={timeOption == 6} className="disabled:opacity-50 text-white text-xl hover:text-[#ecc440] transition" onClick={() => setTimeOption(timeOption == 6 ? 6 : timeOption + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-right">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M8 12h8"></path>
                      <path d="m12 16 4-4-4-4"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex justify-center flex-col bg-[#333333] rounded-[20px] w-[300px] mx-auto mt-4 p-4">
                {/* <div className="text-xl text-white flex justify-center">Round # {currentId + timeOption}</div> */}
                <div className="text-xl text-white flex justify-center">Tickets Closing in</div>
                <div className="text-xl text-white flex justify-center">

                  {lotteryInfo && (
                    <BigCountDown futureDate={Number(lotteryInfo[1]) + Number(timeOption) * timeOffset - 1 * 60 * 60} />
                  )}
                </div>
              </div>
              <div className="rounded-[25px]  p-[24px]">
                <div className="flex justify-center mb-4 mt-4">
                  <button
                    className={`rounded-full ${!isDouble ? 'bg-[#2f6434]' : 'bg-[#a6b1a8]'
                      } px-4 py-3 text-white ml-4`}
                    onClick={() => setIsDouble(false)}
                  >
                    Single
                  </button>
                  <button
                    className={`rounded-full ${isDouble ? 'bg-[#2f6434]' : 'bg-[#a6b1a8]'
                      } px-4 py-3 text-white ml-4`}
                    onClick={() => setIsDouble(true)}
                  >
                    Double
                  </button>
                </div>
                <div className="flex justify-center border border-golden rounded-[20px] mb-4">
                  <div className="flex-col !flex items-center mx-2 justify-center rounded-2xl z-10">
                    <button
                      type="button"
                      className="w-7 m-1 h-7 inline-flex items-center justify-center p-1 text-md rounded-3xl bg-[#99efa2] text-black font-bold"
                      onClick={increaseFirstDigit}
                    >
                      +
                    </button>
                    <div onClick={clickedFirstDigit} className={`w-14 h-14 inline-flex items-center justify-center text-black rounded-full text-xl font-bold bg-golden-gradient ${(isDouble == false && lastDigit == 1) ? 'opacity-50' : ''}`}>
                      {firstDigit}
                    </div>
                    <button
                      type="button"
                      className="w-7 h-7 m-1 inline-flex items-center justify-center p-1 rounded-3xl bg-[#99efa2] text-black font-bold"
                      onClick={decreaseFirstDigit}
                    >
                      -
                    </button>
                    {!isDouble && (
                      <p className="mt-2">
                        1st digit
                      </p>
                    )}
                  </div>
                  <div className="flex-col !flex items-center mx-2 justify-center rounded-2xl z-10">
                    <button
                      type="button"
                      className="w-7 m-1 h-7 inline-flex items-center justify-center p-1 text-md rounded-3xl bg-[#99efa2] text-black font-bold"
                      onClick={increaseSecondDigit}
                    >
                      +
                    </button>
                    <div onClick={clickedSecondDigit} className={`w-14 h-14 inline-flex items-center justify-center text-black rounded-full text-xl font-bold bg-golden-gradient ${(isDouble == false && lastDigit == 0) ? 'opacity-50' : ''}`}>
                      {secondDigit}
                    </div>
                    <button
                      type="button"
                      className="w-7 h-7 m-1 inline-flex items-center justify-center p-1 rounded-3xl bg-[#99efa2] text-black font-bold"
                      onClick={decreaseSecondDigit}
                    >
                      -
                    </button>
                    {!isDouble && (
                      <p className="mt-2">
                        2nd digit
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center mb-[15px]">
                  <span className="text-[#f3cc2f] ">Ticket Amount: </span> &nbsp;
                  <input
                    type="number"
                    placeholder='5'
                    className="border border-golden rounded-[5px] text-white w-[80px] bg-transparent"
                    value={ticketAmount}
                    onChange={(e) => setTicketAmount(e.target.value)}
                    onBlur={() => {
                      if (ticketAmount < 5 && ticketAmount != null && ticketAmount != "") {
                        toast.error('Ticket amount is less than the minimum ticket price.');
                      }
                    }}
                  />
                  &nbsp;<span className="text-white"> {' '}USDT</span>
                </div>
                <p className="flex justify-center text-[14px]">
                  <span className="text-[#f3cc2f]">Minimun Ticket Amount: </span>
                  <span className="text-white"> {' '}&nbsp;5 USDT</span>
                </p>

              </div>
            </div>

            <div className="flex justify-center">
              <button disabled={lotteryStartTime * 1000 > currentTime} className={`rounded-full bg-golden px-4 py-3 text-black mb-2 ${lotteryStartTime * 1000 > currentTime ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => addMoreTicket()}>
                {tickets.length > 0 ? 'Add Ticket' : 'Add Ticket'}
              </button>
            </div>
            <div class="w-full overflow-x-auto">
              <table class="table w-full text-xs sm:text-sm">
                <thead>
                  <tr class="bg-[#ecc440]/10">
                    <th class="p-3 text-left text-white">No</th>
                    <th class="p-3 text-left text-white">Date of Draw</th>
                    <th class="p-3 text-left text-white">Ticket Amount</th>
                    <th class="p-3 text-left text-white">Ticket Type</th>
                    <th class="p-3 text-left text-white">Ticket Number</th>
                    <th class="p-3 text-left text-white"></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr class="border-b border-[#ecc440]/10">
                      <td class="p-3 text-white">{ticket.id}</td>
                      <td class="p-3 text-white">{ticket.date}</td>
                      <td class="p-3 text-white">{ticket.ticketPrice} USDT</td>
                      <td class="p-3 text-white">{ticket.ticketType == 0 ? "Double" : (ticket.ticketType == 1 ? "1st Digit" : "2nd Digit")}</td>
                      <td class="p-3 text-white">{ticket.ticketNumber}</td>
                      <td class="p-3">
                        <button class="text-red-500 hover:text-red-700 transition-all" onClick={() => deleteTicket(ticket.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash w-5 h-5"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center text-[14px] mt-2">
              <span className="text-[#f3cc2f]">Total Ticket Amount: </span>
              <span className="text-white"> &nbsp;{totalTicketAmount}&nbsp; USDT</span>
            </div>
            <div className="flex justify-center">
              <div className="text-center mt-4">
                {isConnected && (
                  <button
                    onClick={
                      allowance >= totalTicketAmount && totalTicketAmount > 0 ? buyHandler : approveHandler
                    }
                    className="rounded-full bg-golden px-4 py-3 text-black mb-2"
                    disabled={approveLoading}
                  >
                    {allowance >= totalTicketAmount && totalTicketAmount > 0 ? 'Buy Tickets' : approveLoading ? 'Approving...' : 'Approve Tickets'}
                  </button>
                )}
              </div>
            </div>
            {showConfirmationModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-4/5">
                  <h2 className="text-lg font-bold mb-4">Your Tickets Summary</h2>
                  <h2 className="text-lg font-bold mb-4 text-red-500">Total Ticket Amount: {totalTicketAmount} USDT</h2>
                  <div class="w-full overflow-x-auto bg-black max-h-[200px]">
                    <table class="table w-full text-xs sm:text-sm">
                      <thead>
                        <tr class="bg-[#ecc440]/10">
                          <th class="p-3 text-left text-white">No</th>
                          <th class="p-3 text-left text-white">Date</th>
                          <th class="p-3 text-left text-white">Amount</th>
                          <th class="p-3 text-left text-white">Type</th>
                          <th class="p-3 text-left text-white">Num</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tickets.map((ticket, index) => (
                          <tr class="border-b border-[#ecc440]/10">
                            <td class="p-3 text-white">{ticket.id}</td>
                            <td class="p-3 text-white">{ticket.date}</td>
                            <td class="p-3 text-white">{ticket.ticketPrice} USDT</td>
                            <td class="p-3 text-white">{ticket.ticketType == 0 ? "Double" : (ticket.ticketType == 1 ? "1st Digit" : "2nd Digit")}</td>
                            <td class="p-3 text-white">{ticket.ticketNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleCancel}
                      className="mr-4 px-4 py-2 bg-gray-300 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="grid xl:grid-cols-2 gap-12">
              <div className="flex flex-col">
                <div className="text-center text-[#f3cc2f] text-xl mb-1.5">
                  Results
                </div>
                <div
                  className="bg-[#f3cc2f] rounded-[25px] lg:px-8 px-2.5 py-5"
                  style={{ boxShadow: '#676767 0px 5px 10px 0px' }}
                >
                  <div className="w-full text-xs sm:text-sm">
                    <div className="grid grid-cols-6 text-[#0f0f0f]">
                      <div className="uppercase text-center px-2 py-3 col-span-3">
                        DRAW DATE
                      </div>
                      <div className="uppercase text-center px-2 py-3 col-span-3">
                        Number
                      </div>
                    </div>

                    {sevenLotteryHistory && sevenLotteryHistory.length > 0 && (
                      <div className="grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm mb-4 text-white">
                        <div className="uppercase text-center px-2 py-3 col-span-3 font-bold text-lg">
                          {(() => {
                            const date = new Date(Number(sevenLotteryHistory[sevenLotteryHistory.length - 1][1]) * 1000);
                            const day = new Intl.DateTimeFormat('en-CR', { day: '2-digit', timeZone: 'America/Costa_Rica' }).format(date);
                            const month = new Intl.DateTimeFormat('en-CR', { month: '2-digit', timeZone: 'America/Costa_Rica' }).format(date);
                            const year = new Intl.DateTimeFormat('en-CR', { year: 'numeric', timeZone: 'America/Costa_Rica' }).format(date);

                            return `${day}/${month}/${year}`;
                          })()}
                        </div>
                        <div className="uppercase text-center px-2 py-3 col-span-3 font-bold text-lg">
                          {sevenLotteryHistory[sevenLotteryHistory.length - 1][3] === true ? Number(sevenLotteryHistory[sevenLotteryHistory.length - 1][2]).toString().padStart(2, '0') : 'Not Set'}
                        </div>
                      </div>
                    )}

                    <div className="gap-2 flex flex-col text-[#f8ffe8] overflow-y-auto no-scrollbar h-[100px]">
                      {!sevenLotteryHistory || (sevenLotteryHistory && sevenLotteryHistory.length === 0) && (
                        <div className="bg-[#0d0d0d] rounded-full">
                          <div className="px-4 py-2.5 text-center">No Data</div>
                        </div>
                      )}
                      {sevenLotteryHistory &&
                        [...sevenLotteryHistory].slice(0, sevenLotteryHistory.length - 1)
                          .sort((a, b) => b[0].toString() - a[0].toString())
                          .map(lottery => (
                            <div className="grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm">
                              <div className="uppercase text-center px-2 py-3 col-span-3">
                                {(() => {
                                  const date = new Date(Number(lottery[1]) * 1000);
                                  const day = new Intl.DateTimeFormat('en-CR', { day: '2-digit', timeZone: 'America/Costa_Rica' }).format(date);
                                  const month = new Intl.DateTimeFormat('en-CR', { month: '2-digit', timeZone: 'America/Costa_Rica' }).format(date);
                                  const year = new Intl.DateTimeFormat('en-CR', { year: 'numeric', timeZone: 'America/Costa_Rica' }).format(date);

                                  return `${day}/${month}/${year}`;
                                })()}
                              </div>
                              <div className="uppercase text-center px-2 py-3 col-span-3">
                                {(((Number(lottery[1]) - Number(lotteryStartTime)) / timeOffset === currentId) ? 'Running' : lottery[3] === true ? Number(lottery[2]).toString().padStart(2, '0') : 'Not Set')}
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-center text-[#f3cc2f] text-xl mb-1.5">
                  My Tickets History
                </div>
                <div
                  className="bg-[#f3cc2f] rounded-[25px] lg:px-8 px-2.5 py-5"
                  style={{ boxShadow: '#676767 0px 5px 10px 0px' }}
                >
                  <div className="w-full text-xs sm:text-sm">
                    <div className="grid grid-cols-6 text-[#0f0f0f]">
                      <div className="uppercase text-center px-2 py-3  col-span-2">
                        Date
                      </div>
                      <div className="uppercase text-center px-2 py-3  ">
                        Type
                      </div>
                      <div className="uppercase text-center px-2 py-3 col-span-2">
                        Number
                      </div>
                      <div className="uppercase text-center px-2 py-3  ">
                        Result
                      </div>
                    </div>
                    <div className="gap-2 flex flex-col text-[#f8ffe8] overflow-y-auto no-scrollbar h-[268px]">
                      {myTicketHistory && myTicketHistory.length > 0 && sevenLotteryHistory && sevenLotteryHistory.length > 0 ? (
                        [...myTicketHistory].reverse().map((ticket, index) => (
                          <div key={index} className="grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm">
                            <div className="uppercase text-center px-2 py-3 col-span-2">
                              {new Intl.DateTimeFormat('en-CR', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                timeZone: 'America/Costa_Rica'
                              }).format(new Date(Number(lotteryStartTime) * 1000 + Number(ticket.roundNumber) * timeOffset * 1000))}
                            </div>
                            <div className="uppercase text-center px-2 py-3">
                              <div className={`flex flex-row items-center border ${ticket.isDouble == 0 ? 'border-[#f3cc2f] text-[#f3cc2f]' : 'border-[#c51f1f] text-[#c51f1f]'} rounded-full w-fit`}>
                                <div className="text-[10px] sm:text-[12px] inline-block whitespace-nowrap overflow-hidden w-14 mx-1 sm:mx-3">
                                  {ticket.isDouble == 0 ? 'Double' : (ticket.isDouble == 1 ? '1st Digit' : '2nd Digit')}
                                </div>
                              </div>
                            </div>
                            <div className="uppercase text-center px-2 py-3 col-span-2">
                              {ticket.isDouble == 0 ? `${Number(ticket.number)}` : ticket.isDouble == 1 ? `${parseInt(Number(ticket.number) / 10)}` + " X" : "X " + `${Number(ticket.number) % 10}`}
                            </div>
                            <div className={`uppercase text-center px-2 py-3 ${currentId == ticket.roundNumber ? 'text-[#f3cc2f]' : sevenLotteryHistory[Number(ticket.roundNumber) - 1][3] == false ? "text-[#ffffff]" : ticket.isWin ? 'text-[#32CD32]' : 'text-[#c51f1f]'}`}>
                              {currentId == ticket.roundNumber ? 'Pending' : sevenLotteryHistory[Number(ticket.roundNumber) - 1][3] == false ? "Not Set" : ticket.isWin ? 'WIN' : 'LOSE'}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="bg-[#0d0d0d] rounded-full">
                          <div className="px-4 py-2.5 text-center">No Data</div>
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
    </div >
  )
}

export default App