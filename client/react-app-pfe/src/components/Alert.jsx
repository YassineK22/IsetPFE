import React from "react";
import "../css/alert.css";

const Alert = () => {
  return (
    <div className="notfication">
      <svg viewBox="0 0 315 49">
        <defs>
          <filter
            id="Rectangle_344"
            x="0"
            y="0"
            width="315"
            height="49"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="1" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feFlood flood-color="#111" flood-opacity="0.071" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
          <clipPath id="clip-path">
            <rect
              id="Rectangle_345"
              data-name="Rectangle 345"
              className="cls-1"
              width="33"
              height="40"
              rx="12"
            />
          </clipPath>
        </defs>
        <g
          id="Status_Message_-_Info"
          data-name="Status Message - Info"
          transform="translate(4.5 3.5)"
        >
          <g className="cls-10" transform="matrix(1, 0, 0, 1, -4.5, -3.5)">
            <g
              id="Rectangle_344-2"
              data-name="Rectangle 344"
              className="cls-2"
              transform="translate(4.5 3.5)"
            >
              <rect className="cls-9" width="306" height="40" rx="12" />
              <rect
                className="cls-4"
                x="0.5"
                y="0.5"
                width="305"
                height="39"
                rx="11.5"
              />
            </g>
          </g>
          <g id="Group_265" data-name="Group 265" transform="translate(12 10)">
            <text
              id="Envoi_de_l_e-mail_de_réinitialisation"
              data-name="Envoi de l'e-mail de réinitialisation"
              className="cls-3"
              transform="translate(28)"
            >
              <tspan x="0" y="15">
                Envoi de l&apos;e-mail de réinitialisation
              </tspan>
            </text>
            <g
              id="Icons_Actions_ic-actions-danger-simple"
              data-name="Icons / Actions / ic-actions-danger-simple"
              transform="translate(20 20) rotate(180)"
            >
              <rect
                id="Rectangle_134"
                data-name="Rectangle 134"
                className="cls-4"
                width="20"
                height="20"
              />
              <g
                id="ic-actions-danger-simple"
                transform="translate(8.887 2.779)"
              >
                <rect
                  id="Rectangle_5"
                  data-name="Rectangle 5"
                  className="cls-5"
                  width="1.667"
                  height="10"
                  rx="0.833"
                  transform="translate(0.275 0)"
                />
                <rect
                  id="Rectangle_6"
                  data-name="Rectangle 6"
                  className="cls-5"
                  width="2.225"
                  height="2.225"
                  rx="1.113"
                  transform="translate(0 12.217)"
                />
              </g>
            </g>
          </g>
          <g id="Mask_Group_2" data-name="Mask Group 2" className="cls-6">
            <path
              id="Path_741"
              data-name="Path 741"
              className="cls-7"
              d="M2,0A2,2,0,0,1,4,2V38a2,2,0,0,1-4,0V2A2,2,0,0,1,2,0Z"
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
              className="cls-4"
              width="16"
              height="16"
            />
            <g id="ic-actions-close-simple" transform="translate(3.76 3.76)">
              <line
                id="Line_14"
                data-name="Line 14"
                className="cls-8"
                x1="8.48"
                y1="8.48"
              />
              <line
                id="Line_15"
                data-name="Line 15"
                className="cls-8"
                x1="8.48"
                y2="8.48"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Alert;
