import React, { useState, useEffect } from 'react'

function BigCountdown({ futureDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const utcNow = new Date();
      let futureDateObj
      if (typeof futureDate === 'string') {
        if (/\d{10,}/.test(futureDate)) {
          // Assume it's a Unix timestamp as a string
          futureDateObj = new Date(Number(futureDate) * 1000)
        } else {
          // Assume it's a formatted date string
          futureDateObj = new Date(futureDate)
        }
      } else if (typeof futureDate === 'number') {
        // Assume it's a Unix timestamp as a number
        futureDateObj = new Date(futureDate * 1000)
      }

      const difference = utcNow - futureDateObj.getTime()

      var days = 0
      var hours = 0
      var minutes = 0
      var seconds = 0
      if (difference < 0) {
        days = Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24) + 1))
        hours = Math.abs(
          Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + 1
          )
        )
        minutes = Math.abs(
          Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60) + 1
          )
        )
        seconds = Math.abs(Math.floor((difference % (1000 * 60)) / 1000 + 1))
      }

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const interval = setInterval(() => calculateTimeLeft(), 1000)
    return () => clearInterval(interval)
  }, [futureDate])

  const formattedDays = timeLeft.days.toString().padStart(2, '0') //+ ':'
  const formattedHours = timeLeft.hours.toString().padStart(2, '0') //+ ':'
  const formattedMinutes = timeLeft.minutes.toString().padStart(2, '0') //+ ':'
  const formattedSeconds = timeLeft.seconds.toString().padStart(2, '0')

  return (
    <>
      <section className="countdownContainer">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'left',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '0px'
                }}
              >
                <div className="countdown">
                  <span>
                    <b>{formattedDays}</b>
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '0px'
                }}
              >
                <div className="countdown">
                  <span>
                    <b>{formattedHours}</b>
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '0px'
                }}
              >
                <div className="countdown">
                  <span>
                    <b>{formattedMinutes}</b>
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '0px'
                }}
              >
                <div className="countdown">
                  <span>
                    <b style={{ marginLeft: '0px' }}>{formattedSeconds}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BigCountdown