import React from 'react'
import "../styles/alert.css";

const AlertErreur = ({ message }) => {
  return (
    <div className="notfication">
              <svg viewBox="0 0 311 49">
                <defs>
                  <filter
                    id="Rectangle_344"
                    x="0"
                    y="0"
                    width="311"
                    height="49"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dy="1" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feFlood floodColor="#111" floodOpacity="0.071" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                  <clipPath id="clip-path">
                    <rect
                      id="Rectangle_345"
                      data-name="Rectangle 345"
                      className="cls2-1"
                      width="33"
                      height="40"
                      rx="12"
                    />
                  </clipPath>
                </defs>
                <g
                  id="Status_Message_-_Error"
                  data-name="Status Message - Error"
                  transform="translate(4.5 3.5)"
                >
                  <g className="cls2-11" transform="matrix(1, 0, 0, 1, -4.5, -3.5)">
                    <g
                      id="Rectangle_344-2"
                      data-name="Rectangle 344"
                      className="cls2-2"
                      transform="translate(4.5 3.5)"
                    >
                      <rect className="cls2-10" width="302" height="40" rx="12" />
                      <rect
                        className="cls2-4"
                        x="0.5"
                        y="0.5"
                        width="301"
                        height="39"
                        rx="11.5"
                      />
                    </g>
                  </g>
                  <g
                    id="Group_264"
                    data-name="Group 264"
                    transform="translate(12 10)"
                  >
                    <text
                      id="Il_ya_pas_de_compte_avec_cette_identifiant"
                      data-name="Il ya pas de compte avec cette identifiant"
                      className="cls2-3"
                      transform="translate(29 3)"
                    >
                      <tspan x="0" y="12">
                      {message}
                      </tspan>
                    </text>
                    <g
                      id="Icons_Actions_ic-actions-danger"
                      data-name="Icons / Actions / ic-actions-danger"
                    >
                      <rect
                        id="Rectangle_133"
                        data-name="Rectangle 133"
                        className="cls2-4"
                        width="20"
                        height="20"
                      />
                      <g
                        id="ic-actions-danger"
                        transform="translate(1.253 1.252)"
                      >
                        <path
                          id="Path_12"
                          data-name="Path 12"
                          className="cls2-5"
                          d="M9.509,2.509,1.592,18.343a.833.833,0,0,0,.742,1.208H18.167a.833.833,0,0,0,.742-1.208L10.992,2.509a.833.833,0,0,0-1.483,0Z"
                          transform="translate(-1.503 -2.056)"
                        />
                        <rect
                          id="Rectangle_7"
                          data-name="Rectangle 7"
                          className="cls2-6"
                          width="1.667"
                          height="7.5"
                          rx="0.833"
                          transform="translate(7.914 4.412)"
                        />
                        <rect
                          id="Rectangle_8"
                          data-name="Rectangle 8"
                          className="cls2-6"
                          width="2.225"
                          height="2.225"
                          rx="1.113"
                          transform="translate(7.639 13.562)"
                        />
                      </g>
                    </g>
                  </g>
                  <g id="Mask_Group_2" data-name="Mask Group 2" className="cls2-7">
                    <rect
                      id="Rectangle_346"
                      data-name="Rectangle 346"
                      className="cls2-8"
                      width="4"
                      height="40"
                      rx="2"
                    />
                  </g>
                  <g
                    id="Icons_Actions_ic-actions-close-simple"
                    data-name="Icons / Actions / ic-actions-close-simple"
                    transform="translate(278 12)"
                  >
                    <rect
                      id="Rectangle_138"
                      data-name="Rectangle 138"
                      className="cls2-4"
                      width="16"
                      height="16"
                    />
                    <g
                      id="ic-actions-close-simple"
                      transform="translate(3.76 3.76)"
                    >
                      <line
                        id="Line_14"
                        data-name="Line 14"
                        className="cls2-9"
                        x1="8.48"
                        y1="8.48"
                      />
                      <line
                        id="Line_15"
                        data-name="Line 15"
                        className="cls2-9"
                        x1="8.48"
                        y2="8.48"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
  )
}

export default AlertErreur